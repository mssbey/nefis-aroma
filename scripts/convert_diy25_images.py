"""25 Yuksek Aroma DIY Kit serisi icin gercek urun fotograflarini
gorseller/ klasorunden public/images/products/ altina webp olarak kopyalar.
Tek seferlik yardimci script; generate_images.py pipeline'indan bagimsizdir.
"""
import os
from PIL import Image

SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "gorseller")
DST_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

MAPPING = {
    "01-fizzy-santa-25-yuksek-aroma-diykit.jpg": "fizzy",
    "02-vortex-santa-25-yuksek-aroma-diykit.jpg": "vortex",
    "03-welamon-santa-25-yuksek-aroma-diykit.jpg": "welamon",
    "04-virginia-black-note-25-yuksek-aroma-diykit.jpg": "virginia",
    "05-violet-santa-25-yuksek-aroma-diykit.jpg": "violet",
    "06-unicorn-blood-santa-25-yuksek-aroma-diykit.jpg": "unicorn-blood",
    "07-twist-melon-santa-25-yuksek-aroma-diykit.jpg": "twist-melon",
    "08-the-milky-o-s-the-milkman-25-yuksek-aroma-diykit.jpg": "the-milky-o-s",
    "09-subzero-halo-25-yuksek-aroma-diykit.jpg": "subzero",
    "10-strawberry-yogurt-santa-25-yuksek-aroma-diykit.jpg": "strawberry-yogurt",
    "11-storming-gum-santa-25-yuksek-aroma-diykit.jpg": "storming-gum",
    "12-special-santa-25-yuksek-aroma-diykit.jpg": "special",
    "13-skinny-banana-santa-25-yuksek-aroma-diykit.jpg": "skinny-banana",
    "14-sexy-mango-25-yuksek-aroma-diykit.jpg": "sexy-mango",
    "15-red-dragon-santa-25-yuksek-aroma-diykit.jpg": "red-dragon",
    "16-red-astray-santa-25-yuksek-aroma-diykit.jpg": "red-astray",
    "17-purple-lemonade-santa-25-yuksek-aroma-diykit.jpg": "purple-lemonade",
    "18-merengli-santa-25-yuksek-aroma-diykit.jpg": "merengli",
    "19-mentoloda-25-yuksek-aroma-diykit.jpg": "mentoloda",
    "20-melodi-santa-25-yuksek-aroma-diykit.jpg": "melodi",
    "21-mb-ash-santa-25-yuksek-aroma-diykit.jpg": "mb-ash",
    "22-magic-man-one-hit-wonder-25-yuksek-aroma-diykit.jpg": "magic-man",
    "23-madrina-suicide-bunny-25-yuksek-aroma-diykit.jpg": "madrina",
    "24-macchiato-santa-25-yuksek-aroma-diykit.jpg": "macchiato",
    "25-macaron-santa-25-yuksek-aroma-diykit.jpg": "macaron",
    "26-lemon-santa-25-yuksek-aroma-diykit.jpg": "lemon",
    "27-peach-ice-tea-25-yuksek-aroma-diykit.jpg": "peach-ice-tea",
    "28-peach-ice-cream-25-yuksek-aroma-diykit.jpg": "peach-ice-cream",
    "29-o-b-suicide-bunny-25-yuksek-aroma-diykit.jpg": "o-b",
    "30-mr-lopin-santa-25-yuksek-aroma-diykit.jpg": "mr-lopin",
}

SIZE = 1000

def main():
    os.makedirs(DST_DIR, exist_ok=True)
    for filename, slug in MAPPING.items():
        src_path = os.path.join(SRC_DIR, filename)
        dst_path = os.path.join(DST_DIR, f"diy25-{slug}.webp")
        with Image.open(src_path) as im:
            im = im.convert("RGB")
            if im.size != (SIZE, SIZE):
                im = im.resize((SIZE, SIZE), Image.LANCZOS)
            im.save(dst_path, "WEBP", quality=90, method=6)
        print(f"{filename} -> {os.path.relpath(dst_path)}")

if __name__ == "__main__":
    main()
