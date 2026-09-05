# -*- coding: utf-8 -*-
"""
Nefis Aroma - prosedürel görsel üretimi.
Tüm site görselleri tek bir sanat yönetimiyle burada üretilir:
mor/altın paleti, yumuşak radial ışıklar, gren dokusu, sıvı formlar,
kategoriye göre kontrollü motifler ve gerçek logolu ambalaj etiketi.

Çalıştırma:  python scripts/generate_images.py
"""
import os, sys, math, hashlib, io
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
BRAND = os.path.join(ROOT, "public", "brand")
FONT_DIR = "C:/Windows/Fonts"

os.makedirs(OUT, exist_ok=True)

def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)

F_LABEL   = lambda s: font("segoeuib.ttf", s)
F_LIGHT   = lambda s: font("segoeui.ttf", s)
F_SERIF   = lambda s: font("georgiab.ttf", s)
F_SERIF_I = lambda s: font("georgiai.ttf", s)

# ---------------------------------------------------------------- palette
PURPLE       = (103, 39, 121)
PURPLE_DEEP  = (43, 16, 53)
NIGHT        = (20, 11, 25)
GOLD         = (210, 148, 11)
GOLD_LIGHT   = (242, 196, 94)
CREAM        = (250, 248, 244)
LAV          = (239, 230, 243)
MAGENTA      = (150, 40, 96)
ICE          = (120, 176, 200)
AMBER        = (196, 120, 40)
EMBER        = (150, 60, 30)

# kategori -> (arka plan üst, arka plan alt, sıvı accent, ışık accent, motif)
CATS = {
    "meyveli":      (( 70, 26, 84), (26, 12, 34), (176, 46, 92),  GOLD_LIGHT, "fruit"),
    "ferah":        (( 40, 40, 82), (14, 12, 28), ( 86, 150, 178), GOLD_LIGHT, "ice"),
    "tatli-kremsi": (( 78, 40, 60), (30, 16, 26), (208, 150, 70),  GOLD_LIGHT, "swirl"),
    "icecek":       (( 58, 34, 44), (18, 12, 20), (150, 92, 44),   GOLD_LIGHT, "glass"),
    "tutun":        (( 40, 22, 40), (10, 7, 12),  (150, 70, 34),   GOLD,       "smoke"),
    "mix":          (( 84, 28, 96), (28, 12, 40), (150, 44, 120),  GOLD_LIGHT, "mix"),
    "diy-kitler":   (( 44, 24, 66), (14, 9, 20),  (120, 70, 150),  GOLD_LIGHT, "lab"),
    "nbase":        (( 34, 26, 44), (12, 10, 16), (120, 120, 140), GOLD_LIGHT, "drop"),
}

def seed_of(*parts):
    h = hashlib.md5("::".join(map(str, parts)).encode()).hexdigest()
    return int(h[:8], 16)

# ---------------------------------------------------------------- backgrounds
def gradient(w, h, top, bot, angle=90):
    top = np.array(top, float); bot = np.array(bot, float)
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    a = math.radians(angle)
    t = (xx * math.cos(a) + yy * math.sin(a))
    t = (t - t.min()) / (t.max() - t.min())
    t = t[..., None]
    arr = top * (1 - t) + bot * t
    return arr

def add_glow(arr, cx, cy, radius, rgb, strength=0.9):
    h, w, _ = arr.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / radius
    fall = np.clip(1 - d, 0, 1) ** 2.2
    fall = fall[..., None] * strength
    rgb = np.array(rgb, float)
    return arr * (1 - fall) + rgb * fall

def add_grain(arr, amount=10.0, rs=1):
    rng = np.random.default_rng(rs)
    h, w, _ = arr.shape
    small = rng.normal(0, 1, (h // 2, w // 2, 1))
    norm = ((small - small.min()) / (np.ptp(small) + 1e-6) * 255).astype("uint8")[:, :, 0]
    noise = np.array(Image.fromarray(norm).resize((w, h))).astype(float)[..., None]
    noise = (noise - noise.mean())
    return arr + noise / (noise.std() + 1e-6) * amount

def vignette(arr, power=0.55):
    h, w, _ = arr.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    d = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    v = np.clip(1 - (d - 0.6) * power, 0.35, 1)[..., None]
    return arr * v

def base_scene(w, h, cat, sd, glow_boost=1.0):
    top, bot, liquid, light, motif = CATS[cat]
    rng = np.random.default_rng(sd)
    arr = gradient(w, h, top, bot, angle=90 + rng.integers(-8, 8))
    arr = add_glow(arr, w * (0.2 + rng.random() * 0.2), h * 0.12,
                   max(w, h) * (0.7 * glow_boost), light, 0.30)
    arr = add_glow(arr, w * (0.8 + rng.random() * 0.15), h * (0.9 + rng.random() * 0.1),
                   max(w, h) * 0.75, PURPLE, 0.42)
    arr = add_glow(arr, w * (0.5 + rng.random() * 0.3), h * (0.55 + rng.random() * 0.2),
                   max(w, h) * 0.42, liquid, 0.18)
    return arr, (top, bot, liquid, light, motif), rng

# ---------------------------------------------------------------- liquid blobs
def liquid_layer(w, h, rng, color, n=5, blur=40, alpha=150):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        cx, cy = rng.random() * w, rng.random() * h
        rx = rng.uniform(0.12, 0.4) * w
        ry = rx * rng.uniform(0.6, 1.3)
        a = int(alpha * rng.uniform(0.5, 1.0))
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry],
                  fill=(color[0], color[1], color[2], a))
    return layer.filter(ImageFilter.GaussianBlur(blur))

def droplet(draw, cx, cy, r, fill):
    draw.ellipse([cx - r, cy - r * 0.9, cx + r, cy + r * 1.1], fill=fill)
    draw.polygon([(cx, cy - r * 2.0), (cx - r * 0.72, cy - r * 0.1),
                  (cx + r * 0.72, cy - r * 0.1)], fill=fill)

# ---------------------------------------------------------------- motifs
def draw_motif(img, motif, rng, color, light):
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    if motif == "fruit":
        for _ in range(rng.integers(3, 5)):
            cx, cy = rng.random() * w, rng.random() * h * 0.9
            r = rng.uniform(0.06, 0.13) * w
            d.ellipse([cx - r, cy - r, cx + r, cy + r],
                      outline=(light[0], light[1], light[2], 70), width=max(2, int(w * 0.004)))
        layer = layer.filter(ImageFilter.GaussianBlur(1))
    elif motif == "ice":
        for _ in range(rng.integers(4, 7)):
            cx, cy = rng.random() * w, rng.random() * h
            s = rng.uniform(0.05, 0.12) * w
            pts = [(cx + s * math.cos(a) * rng.uniform(0.6, 1.2),
                    cy + s * math.sin(a) * rng.uniform(0.6, 1.2))
                   for a in np.linspace(0, 2 * math.pi, 6, endpoint=False)]
            d.polygon(pts, fill=(230, 240, 245, 26),
                      outline=(255, 255, 255, 48))
        for _ in range(120):
            x, y = rng.random() * w, rng.random() * h
            rr = rng.uniform(1, 3)
            d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(255, 255, 255, 40))
    elif motif == "swirl":
        for _ in range(rng.integers(2, 4)):
            cx, cy = rng.random() * w, rng.random() * h
            for k in range(60):
                a = k * 0.4
                rr = k * rng.uniform(1.5, 3.0)
                d.ellipse([cx + math.cos(a) * rr - 3, cy + math.sin(a) * rr - 3,
                           cx + math.cos(a) * rr + 3, cy + math.sin(a) * rr + 3],
                          fill=(light[0], light[1], light[2], 22))
        layer = layer.filter(ImageFilter.GaussianBlur(3))
    elif motif == "glass":
        gw, gh = w * 0.24, h * 0.44
        gx, gy = w * 0.5 - gw / 2, h * 0.52
        d.rounded_rectangle([gx, gy, gx + gw, gy + gh], radius=int(gw * 0.12),
                            outline=(255, 255, 255, 55), width=max(2, int(w * 0.004)))
        d.rounded_rectangle([gx + 6, gy + gh * 0.4, gx + gw - 6, gy + gh - 6],
                            radius=int(gw * 0.1), fill=(color[0], color[1], color[2], 120))
        for _ in range(30):
            bx = gx + rng.random() * gw
            by = gy + gh * 0.45 + rng.random() * gh * 0.5
            rr = rng.uniform(2, 6)
            d.ellipse([bx - rr, by - rr, bx + rr, by + rr], fill=(255, 255, 255, 60))
    elif motif == "smoke":
        for _ in range(rng.integers(3, 6)):
            x0, y0 = rng.random() * w, h * rng.uniform(0.5, 1.0)
            for k in range(40):
                x = x0 + math.sin(k * 0.3) * 40 + k * rng.uniform(-1, 1)
                y = y0 - k * rng.uniform(6, 12)
                rr = rng.uniform(10, 26)
                d.ellipse([x - rr, y - rr, x + rr, y + rr],
                          fill=(200, 170, 140, 8))
        layer = layer.filter(ImageFilter.GaussianBlur(9))
    elif motif == "mix":
        for c in (MAGENTA, GOLD, PURPLE, ICE):
            cx, cy = rng.random() * w, rng.random() * h
            r = rng.uniform(0.12, 0.26) * w
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(c[0], c[1], c[2], 70))
        layer = layer.filter(ImageFilter.GaussianBlur(40))
    elif motif == "lab":
        fx, fy = w * 0.5, h * 0.6
        fw = w * 0.2
        d.polygon([(fx - fw * 0.28, fy - fw * 0.9), (fx + fw * 0.28, fy - fw * 0.9),
                   (fx + fw * 0.6, fy + fw * 0.7), (fx - fw * 0.6, fy + fw * 0.7)],
                  outline=(255, 255, 255, 60), width=max(2, int(w * 0.004)))
        d.polygon([(fx - fw * 0.42, fy + fw * 0.2), (fx + fw * 0.42, fy + fw * 0.2),
                   (fx + fw * 0.6, fy + fw * 0.7), (fx - fw * 0.6, fy + fw * 0.7)],
                  fill=(color[0], color[1], color[2], 120))
        for i in range(5):
            yy = fy - fw * 0.7 + i * fw * 0.28
            d.line([(fx + fw * 0.32, yy), (fx + fw * 0.44, yy)], fill=(255, 255, 255, 70), width=2)
    elif motif == "drop":
        droplet(d, w * 0.5, h * 0.5, w * 0.12, (color[0], color[1], color[2], 90))
        layer = layer.filter(ImageFilter.GaussianBlur(6))
    img.alpha_composite(layer)

# ---------------------------------------------------------------- bottle
_LOGO_CACHE = {}
def logo_img():
    if "l" not in _LOGO_CACHE:
        _LOGO_CACHE["l"] = Image.open(os.path.join(BRAND, "logo-full.png")).convert("RGBA")
    return _LOGO_CACHE["l"]

FORM_TAG = {
    "konsantre": "AROMA KONSANTRESİ",
    "shortfill": "SHORTFILL",
    "diy-kit": "DIY KİT",
    "baz": "NBASE",
}

def _fit_font(draw, text, font_factory, max_w, start):
    fs = start
    f = font_factory(fs)
    while draw.textlength(text, font=f) > max_w and fs > 9:
        fs -= 1
        f = font_factory(fs)
    return f

def _wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if draw.textlength(t, font=font) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur); cur = wd
    if cur:
        lines.append(cur)
    return lines[:2]

def make_label(lw, lh, name, form, volume_text):
    S = 2
    lw, lh = int(lw), int(lh)
    lab = Image.new("RGBA", (lw * S, lh * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(lab)
    W, Hh = lw * S, lh * S
    d.rounded_rectangle([2, 2, W - 3, Hh - 3], radius=int(W * 0.05),
                        fill=(250, 248, 244, 250), outline=(210, 148, 11, 210), width=max(2, int(S * 1.6)))
    d.rounded_rectangle([int(W * 0.03), int(Hh * 0.045), int(W * 0.97), int(Hh * 0.955)],
                        radius=int(W * 0.04), outline=(103, 39, 121, 45), width=S)
    # gerçek logo
    lg = logo_img()
    tw = int(W * 0.62)
    th = int(tw * lg.height / lg.width)
    lab.alpha_composite(lg.resize((tw, th), Image.LANCZOS), (int((W - tw) / 2), int(Hh * 0.11)))
    y_rule = int(Hh * 0.44)
    d.line([(W * 0.14, y_rule), (W * 0.86, y_rule)], fill=(103, 39, 121, 80), width=S)
    # ürün adı (1-2 satır)
    nm = name.upper()
    nf = _fit_font(d, nm, F_SERIF, W * 0.84, int(Hh * 0.15))
    lines = _wrap(d, nm, nf, W * 0.84)
    ly = int(Hh * 0.5)
    for ln in lines:
        d.text((W / 2, ly), ln, font=nf, fill=(43, 16, 53, 255), anchor="mm")
        ly += int(nf.size * 1.12)
    # form + hacim (iki ayrı öge, taşma yok)
    tag = FORM_TAG.get(form, "AROMA")
    if volume_text:
        tag = f"{tag}  ·  {volume_text}"
    tf = _fit_font(d, tag, F_LABEL, W * 0.86, int(Hh * 0.1))
    d.text((W / 2, Hh * 0.88), tag, font=tf, fill=(103, 39, 121, 220), anchor="mm")
    return lab.resize((lw, lh), Image.LANCZOS)

def draw_bottle(img, rng, liquid, name, form, volume_text, variant=0,
                cx_frac=None, scale=1.0, with_label=True, y_frac=0.9):
    w, h = img.size
    S = 2  # supersample
    cv = Image.new("RGBA", (w * S, h * S), (0, 0, 0, 0))
    g = ImageDraw.Draw(cv)
    if cx_frac is None:
        cx_frac = 0.5 + (rng.random() - 0.5) * 0.05
    cx = w * S * cx_frac
    bw = w * S * (0.33 + variant * 0.005) * scale
    bh = h * S * (0.52 if form != "diy-kit" else 0.5) * scale
    by = h * S * y_frac
    bx0, bx1 = cx - bw / 2, cx + bw / 2
    top = by - bh
    rad = int(bw * 0.16)
    lite = tuple(min(c + 45, 255) for c in liquid)
    dark = tuple(int(c * 0.55) for c in liquid)

    # zemin gölgesi
    sh = Image.new("RGBA", (w * S, h * S), (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([cx - bw * 0.6, by - bh * 0.04, cx + bw * 0.6, by + bh * 0.12],
                               fill=(0, 0, 0, 150))
    cv.alpha_composite(sh.filter(ImageFilter.GaussianBlur(int(30 * S))))

    # cam gövde
    g.rounded_rectangle([bx0, top, bx1, by], radius=rad, fill=(255, 255, 255, 22))
    # sıvı (dikey degrade)
    lvl = top + bh * rng.uniform(0.28, 0.4)
    liq = Image.new("RGBA", (int(bw), int(by - lvl)), (0, 0, 0, 0))
    la = np.zeros((liq.height, liq.width, 4), np.uint8)
    tcol = np.array(lite + (235,)); bcol = np.array(dark + (255,))
    tt = np.linspace(0, 1, liq.height)[:, None, None]
    la[:] = (tcol * (1 - tt) + bcol * tt).astype(np.uint8)
    liq = Image.fromarray(la)
    mask = Image.new("L", liq.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, liq.width - 1, liq.height - 1],
                                           radius=int(bw * 0.14), fill=255)
    cv.paste(liq, (int(bx0), int(lvl)), mask)
    g.ellipse([bx0 + S, lvl - 7 * S, bx1 - S, lvl + 7 * S], fill=lite + (200,))
    # iç dip gölgesi
    inner = Image.new("RGBA", (w * S, h * S), (0, 0, 0, 0))
    ImageDraw.Draw(inner).rounded_rectangle([bx0, top, bx1, by], radius=rad,
                                            outline=(0, 0, 0, 120), width=int(10 * S))
    cv.alpha_composite(inner.filter(ImageFilter.GaussianBlur(int(7 * S))))
    # cam kenar + rim light
    g.rounded_rectangle([bx0, top, bx1, by], radius=rad, outline=(255, 255, 255, 70), width=int(2.2 * S))
    g.line([(bx1 - int(3 * S), top + rad), (bx1 - int(3 * S), by - rad)], fill=(255, 255, 255, 150), width=int(2 * S))
    # sol specular
    spec = Image.new("RGBA", (w * S, h * S), (0, 0, 0, 0))
    ImageDraw.Draw(spec).rounded_rectangle(
        [bx0 + bw * 0.09, top + bh * 0.06, bx0 + bw * 0.24, by - bh * 0.1],
        radius=int(bw * 0.07), fill=(255, 255, 255, 90))
    cv.alpha_composite(spec.filter(ImageFilter.GaussianBlur(int(10 * S))))

    # omuz
    g.polygon([(bx0 + bw * 0.2, top + S), (bx1 - bw * 0.2, top + S),
               (cx + bw * 0.14, top - bh * 0.09), (cx - bw * 0.14, top - bh * 0.09)],
              fill=(255, 255, 255, 24), outline=(255, 255, 255, 55), width=int(1.6 * S))
    # boyun
    nw = bw * 0.24
    g.rectangle([cx - nw / 2, top - bh * 0.15, cx + nw / 2, top - bh * 0.07], fill=(255, 255, 255, 30))
    # kapak
    cw = nw * 1.5
    g.rounded_rectangle([cx - cw / 2, top - bh * 0.30, cx + cw / 2, top - bh * 0.12],
                        radius=int(cw * 0.14), fill=PURPLE_DEEP + (255,))
    g.rounded_rectangle([cx - cw / 2, top - bh * 0.30, cx + cw / 2, top - bh * 0.235],
                        radius=int(cw * 0.14), fill=GOLD + (255,))
    g.line([(cx - cw / 2 + int(4 * S), top - bh * 0.30 + int(4 * S)),
            (cx + cw / 2 - int(4 * S), top - bh * 0.30 + int(4 * S))], fill=(255, 255, 255, 120), width=int(2 * S))

    out = cv.resize((w, h), Image.LANCZOS)
    img.alpha_composite(out)

    if not with_label:
        return
    # ---- etiket (ayrı, keskin)
    lw, lh = bw / S * 0.92, bh / S * 0.46
    lab = make_label(lw, lh, name, form, volume_text)
    lab = lab.rotate(rng.uniform(-1.0, 1.0), expand=True, resample=Image.BICUBIC)
    cxr = cx / S
    lyr = (top + bh * 0.26) / S
    img.alpha_composite(lab, (int(cxr - lab.width / 2), int(lyr)))

# ---------------------------------------------------------------- compose helpers
def finalize(arr, grain=9, rs=1, vpow=0.5):
    arr = add_grain(arr, grain, rs)
    arr = vignette(arr, vpow)
    return Image.fromarray(np.clip(arr, 0, 255).astype("uint8")).convert("RGBA")

def save_webp(img, path, q=82):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.convert("RGB").save(path, "WEBP", quality=q, method=6)
    print("  ->", os.path.relpath(path, ROOT))

# ---------------------------------------------------------------- generators
def gen_product(slug, name, cat, form, idx):
    W = H = 900
    sd = seed_of(slug, idx)
    arr, (top, bot, liquid, light, motif), rng = base_scene(W, H, cat, sd)
    img = finalize(arr, grain=8, rs=sd % 999, vpow=0.55)
    img.alpha_composite(liquid_layer(W, H, rng, liquid, n=4, blur=55, alpha=90))
    draw_motif(img, motif, np.random.default_rng(sd + 7), liquid, light)
    vol = ["10 ml", "30 ml", "60 ml", "100 ml"][idx % 4]
    draw_bottle(img, np.random.default_rng(sd + 3), liquid, name, form, vol, variant=idx)
    # ön plan küçük damlalar
    fg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    r2 = np.random.default_rng(sd + 11)
    for _ in range(r2.integers(2, 5)):
        droplet(fd, r2.random() * W, H * (0.7 + r2.random() * 0.25),
                r2.uniform(6, 16), (light[0], light[1], light[2], 150))
    img.alpha_composite(fg)
    save_webp(img, os.path.join(OUT, "products", f"{slug}-{idx+1}.webp"))

def gen_category(slug, name):
    W, H = 1280, 960
    sd = seed_of("cat", slug)
    arr, (top, bot, liquid, light, motif), rng = base_scene(W, H, slug, sd, glow_boost=1.15)
    img = finalize(arr, grain=8, rs=sd % 999, vpow=0.45)
    img.alpha_composite(liquid_layer(W, H, rng, liquid, n=6, blur=70, alpha=110))
    draw_motif(img, motif, np.random.default_rng(sd + 5), liquid, light)
    # atmosfer — etiketsiz cam siluetleri (kart başlığı ayrıca site tarafında bindiriliyor)
    r = np.random.default_rng(sd + 2)
    draw_bottle(img, r, tuple(int(c * 0.72) for c in liquid), "", "konsantre", "",
                variant=0, cx_frac=0.34, scale=0.82, with_label=False, y_frac=0.92)
    draw_bottle(img, np.random.default_rng(sd + 12), liquid, "", "konsantre", "",
                variant=3, cx_frac=0.62, scale=1.0, with_label=False, y_frac=1.0)
    fd = ImageDraw.Draw(img)
    for _ in range(r.integers(3, 6)):
        droplet(fd, r.random() * W, H * (0.55 + r.random() * 0.4),
                r.uniform(6, 15), (light[0], light[1], light[2], 130))
    save_webp(img, os.path.join(OUT, "categories", f"{slug}.webp"))
    # icon (basit çizgi rozet)
    ic = Image.new("RGBA", (96, 96), (0, 0, 0, 0))
    d = ImageDraw.Draw(ic)
    d.ellipse([8, 8, 88, 88], outline=(103, 39, 121, 255), width=6)
    droplet(d, 48, 52, 16, (210, 148, 11, 255))
    os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)
    ic.save(os.path.join(OUT, "icons", f"{slug}.png"))

def gen_collection(slug, name, cat):
    W, H = 1440, 1040
    sd = seed_of("col", slug)
    arr, (top, bot, liquid, light, motif), rng = base_scene(W, H, cat, sd, glow_boost=1.2)
    img = finalize(arr, grain=7, rs=sd % 999, vpow=0.4)
    img.alpha_composite(liquid_layer(W, H, rng, liquid, n=7, blur=80, alpha=100))
    draw_motif(img, motif, np.random.default_rng(sd + 4), liquid, light)
    # arka silüet + ön etiketli şişe
    draw_bottle(img, np.random.default_rng(sd + 21), tuple(int(c * 0.7) for c in liquid),
                "", "konsantre", "", variant=0, cx_frac=0.30, scale=0.82,
                with_label=False, y_frac=0.86)
    draw_bottle(img, np.random.default_rng(sd + 22), tuple(int(c * 0.7) for c in liquid),
                "", "konsantre", "", variant=0, cx_frac=0.72, scale=0.9,
                with_label=False, y_frac=0.92)
    draw_bottle(img, np.random.default_rng(sd + 23), liquid, name.split()[0],
                "konsantre", "", variant=3, cx_frac=0.5, scale=1.06, y_frac=0.94)
    save_webp(img, os.path.join(OUT, "collections", f"{slug}.webp"))

def gen_wide(path, cat, w, h, title=None, grain=8, bottle=True):
    sd = seed_of(path)
    arr, (top, bot, liquid, light, motif), rng = base_scene(w, h, cat, sd, glow_boost=1.2)
    img = finalize(arr, grain=grain, rs=sd % 999, vpow=0.42)
    img.alpha_composite(liquid_layer(w, h, rng, liquid, n=7, blur=90, alpha=95))
    draw_motif(img, motif, np.random.default_rng(sd + 6), liquid, light)
    if bottle:
        r = np.random.default_rng(sd + 40)
        draw_bottle(img, r, liquid, "", "konsantre", "", variant=0,
                    cx_frac=0.5 + (r.random() - 0.5) * 0.5, scale=0.7 + r.random() * 0.25,
                    with_label=False, y_frac=1.02)
        fd = ImageDraw.Draw(img)
        for _ in range(r.integers(3, 6)):
            droplet(fd, r.random() * w, h * (0.6 + r.random() * 0.35),
                    r.uniform(5, 14), (light[0], light[1], light[2], 130))
    save_webp(img, os.path.join(OUT, path))
    return img

def gen_hero():
    W, H = 2400, 1350
    sd = seed_of("hero")
    arr, (top, bot, liquid, light, motif), rng = base_scene(W, H, "mix", sd, glow_boost=1.3)
    arr = add_glow(arr, W * 0.62, H * 0.44, W * 0.46, GOLD_LIGHT, 0.26)
    arr = add_glow(arr, W * 0.30, H * 0.30, W * 0.4, PURPLE, 0.30)
    img = finalize(arr, grain=6, rs=7, vpow=0.46)
    img.alpha_composite(liquid_layer(W, H, rng, MAGENTA, n=4, blur=130, alpha=70))
    img.alpha_composite(liquid_layer(W, H, np.random.default_rng(sd + 1), GOLD, n=3, blur=150, alpha=48))
    draw_motif(img, "swirl", np.random.default_rng(sd + 9), GOLD_LIGHT, GOLD_LIGHT)

    # zemin — yansıma bandı
    floor = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(floor).rectangle([0, H * 0.78, W, H], fill=(255, 255, 255, 10))
    img.alpha_composite(floor.filter(ImageFilter.GaussianBlur(40)))

    # üç cam siluet — sıkı, merkez-sağ küme; etiketsiz (yazı karışmasın)
    combos = [
        (0.52, 0.72, CATS["meyveli"][2], 0.86),
        (0.66, 0.92, CATS["tatli-kremsi"][2], 0.9),
        (0.80, 0.66, CATS["ferah"][2], 0.84),
    ]
    for i, (cxf, sc, liq, yf) in enumerate(combos):
        draw_bottle(img, np.random.default_rng(sd + 30 + i), liq, "", "konsantre", "",
                    variant=i, cx_frac=cxf, scale=sc, y_frac=yf, with_label=False)
    # ince altın parçacıklar
    fg = Image.new("RGBA", (W, H), (0, 0, 0, 0)); fd = ImageDraw.Draw(fg)
    r = np.random.default_rng(99)
    for _ in range(90):
        x, y = r.random() * W, r.random() * H
        rr = r.uniform(1, 3.5)
        fd.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(242, 196, 94, int(r.uniform(30, 120))))
    img.alpha_composite(fg)
    save_webp(img, os.path.join(OUT, "hero", "hero.webp"), q=84)

def gen_grain():
    rng = np.random.default_rng(1)
    n = rng.normal(128, 38, (256, 256))
    Image.fromarray(np.clip(n, 0, 255).astype("uint8")).convert("RGBA").save(
        os.path.join(OUT, "texture", "grain.png"))
    print("  -> texture/grain.png")

def gen_og():
    W, H = 1200, 630
    sd = seed_of("og")
    arr, meta, rng = base_scene(W, H, "mix", sd, glow_boost=1.2)
    img = finalize(arr, grain=7, rs=3, vpow=0.5)
    img.alpha_composite(liquid_layer(W, H, rng, MAGENTA, n=4, blur=90, alpha=70))
    lg = Image.open(os.path.join(BRAND, "logo-light.png")).convert("RGBA")
    tw = int(W * 0.5); th = int(tw * lg.height / lg.width)
    img.alpha_composite(lg.resize((tw, th), Image.LANCZOS), ((W - tw) // 2, (H - th) // 2 - 30))
    d = ImageDraw.Draw(img)
    d.text((W / 2, H * 0.74), "Her damlasında yeni bir deneyim",
           font=F_SERIF_I(38), fill=(250, 248, 244, 235), anchor="mm")
    save_webp(img, os.path.join(OUT, "og.webp"), q=86)

# ---------------------------------------------------------------- run
def main():
    # argv ile slug listesi verilirse yalnızca o ürünlerin görselleri üretilir
    # (kategori/hero/koleksiyon vb. sahneler yeniden üretilmez).
    only_slugs = set(sys.argv[1:])
    if only_slugs:
        prods = [p for p in load_products() if p["slug"] in only_slugs]
        for p in prods:
            print("ürün:", p["slug"])
            for i in range(4):
                gen_product(p["slug"], p["name"], p["category"], p["form"], i)
        missing = only_slugs - {p["slug"] for p in prods}
        if missing:
            print("!! bulunamadı:", ", ".join(sorted(missing)))
        return

    os.makedirs(os.path.join(OUT, "texture"), exist_ok=True)
    gen_grain()
    gen_hero()
    gen_og()

    # kategori & koleksiyon
    cat_names = {
        "meyveli": "Meyveli Aromalar", "ferah": "Ferah Aromalar",
        "tatli-kremsi": "Tatlı Kremsi", "icecek": "İçecek Aromaları",
        "tutun": "Tütün Aromaları", "mix": "Mix Aromalar",
        "diy-kitler": "DIY Kitler", "nbase": "Nbase",
    }
    for slug, nm in cat_names.items():
        print("kategori:", slug); gen_category(slug, nm)

    for slug, nm, cat in [
        ("golden-drop", "Golden Drop", "tatli-kremsi"),
        ("purple-reserve", "Purple Reserve", "meyveli"),
        ("fresh-lab", "Fresh Lab", "ferah"),
    ]:
        print("koleksiyon:", slug); gen_collection(slug, nm, cat)

    # kampanya / hakkımızda / süreç / feed / rehber
    for name, cat, w, h in [
        ("campaigns/a.webp", "mix", 1600, 720),
        ("campaigns/b.webp", "tatli-kremsi", 1600, 720),
        ("campaigns/c.webp", "ferah", 1600, 720),
        ("about/1.webp", "meyveli", 1200, 900),
        ("about/2.webp", "diy-kitler", 1200, 900),
        ("about/3.webp", "tutun", 1200, 900),
        ("process/1.webp", "mix", 900, 900),
        ("process/2.webp", "diy-kitler", 900, 900),
        ("process/3.webp", "ferah", 900, 900),
        ("process/4.webp", "tatli-kremsi", 900, 900),
        ("guide/1.webp", "meyveli", 1200, 800),
        ("guide/2.webp", "ferah", 1200, 800),
        ("guide/3.webp", "tatli-kremsi", 1200, 800),
        ("guide/4.webp", "tutun", 1200, 800),
    ]:
        print("sahne:", name); gen_wide(name, cat, w, h)

    cats_cycle = list(CATS.keys())
    for i in range(1, 9):
        gen_wide(f"feed/{i}.webp", cats_cycle[i % len(cats_cycle)], 720, 720, grain=9)
        print("feed:", i)

    # ürünler
    try:
        prods = load_products()
    except Exception as e:
        print("!! ürün listesi TS'den okunamadı:", e)
        prods = []
    for p in prods:
        print("ürün:", p["slug"])
        for i in range(4):
            gen_product(p["slug"], p["name"], p["category"], p["form"], i)

def load_products():
    """products.ts içinden slug/name/category/form üçlülerini kaba parse et."""
    import re
    txt = open(os.path.join(ROOT, "src", "data", "products.ts"), encoding="utf-8").read()
    seeds = []
    for m in re.finditer(r"name:\s*'([^']+)',\s*\n\s*series:.*?category:\s*'([^']+)',.*?form:\s*'([^']+)'",
                         txt, re.S):
        name, cat, form = m.group(1), m.group(2), m.group(3)
        slug = tr_slug(name)
        seeds.append({"slug": slug, "name": name, "category": cat, "form": form})
    return seeds

def tr_slug(s):
    table = str.maketrans("çğıöşü", "cgiosu")
    s = s.lower().translate(table)
    out = []
    for ch in s:
        out.append(ch if ch.isalnum() else "-")
    r = "".join(out)
    while "--" in r:
        r = r.replace("--", "-")
    return r.strip("-")

if __name__ == "__main__":
    main()
