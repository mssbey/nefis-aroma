import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:3111';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--window-size=1440,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errs = [];
page.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push('[console] ' + m.text()); });

const step = async (name, fn) => {
  try {
    await fn();
    console.log(`OK   ${name}`);
  } catch (e) {
    console.log(`FAIL ${name} -> ${e.message}`);
  }
};

await page.goto(BASE + '/', { waitUntil: 'networkidle0' });

await step('Arama overlay "/" ile açılıyor', async () => {
  await page.keyboard.press('/');
  await page.waitForSelector('[aria-label="Arama terimi"]', { timeout: 3000, visible: true });
  await page.type('[aria-label="Arama terimi"]', 'mango');
  await page.waitForFunction(
    () => document.querySelectorAll('a[href^="/urun/"]').length > 0,
    { timeout: 3000 },
  );
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="Arama terimi"]'), { timeout: 2000 });
});

await step('Mega menü "Tüm Aromalar" hover ile açılıyor', async () => {
  const link = await page.$x ? null : null;
  const handle = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('a')].find((a) => a.textContent.trim() === 'Tüm Aromalar');
  });
  const box = await handle.asElement().boundingBox();
  await page.mouse.move(box.x + 5, box.y + 5);
  await new Promise((r) => setTimeout(r, 300));
  const visible = await page.evaluate(() => !!document.querySelector('a[href="/koleksiyon/golden-drop"]'));
  if (!visible) throw new Error('mega menu içeriği görünmedi');
});

await step('Mobil menü açılıyor (viewport küçültülerek)', async () => {
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.click('button[aria-label="Menüyü aç"]');
  await page.waitForSelector('[aria-label="Menü"]', { visible: true, timeout: 3000 });
  await page.click('button[aria-label="Kapat"]');
  await page.setViewport({ width: 1440, height: 900 });
});

await step('Ürün kartından hızlı sepete ekleme + mini sepet açılıyor', async () => {
  await page.goto(BASE + '/urunler', { waitUntil: 'networkidle0' });
  await page.waitForSelector('article');
  const addBtn = await page.evaluateHandle(() => document.querySelector('article button[aria-label="Hızlı ekle"], article button[aria-label="Sepete ekle"]'));
  await addBtn.asElement().click();
  await new Promise((r) => setTimeout(r, 400));
  const panelOpen = await page.evaluate(() => !!document.querySelector('button:has(svg)'));
  // Sepete ekle veya varyant paneli açılmış olmalı
  const cartOrPanel = await page.evaluate(() =>
    !!document.querySelector('[aria-label="Sepetiniz"]') || !!document.querySelector('button.btn-gold'),
  );
  if (!cartOrPanel) throw new Error('ne sepet drawer ne varyant paneli açıldı');
});

await step('Ürün detay sayfasında varyant değişimi fiyatı güncelliyor', async () => {
  await page.goto(BASE + '/urun/purple-mirage', { waitUntil: 'networkidle0' });
  const priceBefore = await page.$eval('button[type="submit"], button.btn-primary', (el) => el.textContent);
  const volumeButtons = await page.$$('button');
  let clicked = false;
  for (const b of volumeButtons) {
    const text = await page.evaluate((el) => el.textContent.trim(), b);
    if (text === '100ml') {
      await b.click();
      clicked = true;
      break;
    }
  }
  if (!clicked) throw new Error('100ml butonu bulunamadı');
  await new Promise((r) => setTimeout(r, 200));
  const priceAfter = await page.$eval('button.btn-primary', (el) => el.textContent);
  if (priceBefore === priceAfter) throw new Error('fiyat değişmedi: ' + priceBefore);
});

await step('Favori butonu toggle çalışıyor (localStorage)', async () => {
  await page.goto(BASE + '/urun/purple-mirage', { waitUntil: 'networkidle0' });
  await page.click('button[aria-label="Favorilere ekle"]');
  await new Promise((r) => setTimeout(r, 200));
  const stored = await page.evaluate(() => localStorage.getItem('nefis-aroma-favorites'));
  if (!stored || !stored.includes('purple-mirage')) throw new Error('localStorage güncellenmedi: ' + stored);
});

await step('Aroma bulucu quiz 5 soruyu tamamlayıp sonuç veriyor', async () => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('bulucu')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 400));
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => document.body.textContent.includes('Sana uygun 3 aroma'));
    if (done) break;
    await page.waitForFunction(
      (idx) => {
        const heading = [...document.querySelectorAll('h3')].find((h) => h.textContent.includes('?'));
        return !!heading;
      },
      { timeout: 3000 },
    );
    const btn = await page.evaluateHandle(() => {
      const container = [...document.querySelectorAll('h3')].find((h) => h.textContent.includes('?'))?.parentElement;
      return container?.querySelector('button');
    });
    await btn.asElement().click();
    await new Promise((r) => setTimeout(r, 300));
  }
  const result = await page.evaluate(() => document.body.textContent.includes('Sana uygun 3 aroma'));
  if (!result) throw new Error('sonuç ekranı görünmedi');
});

await step('Filtre: kategori seçimi ürün sayısını değiştiriyor', async () => {
  await page.goto(BASE + '/urunler', { waitUntil: 'networkidle0' });
  const before = await page.evaluate(() => document.querySelector('strong').textContent);
  const checkbox = await page.evaluateHandle(() =>
    [...document.querySelectorAll('label')].find((l) => l.textContent.includes('Tütün Aromaları')),
  );
  await checkbox.asElement().click();
  await new Promise((r) => setTimeout(r, 500));
  const after = await page.evaluate(() => document.querySelector('strong').textContent);
  if (before === after) throw new Error(`sayı değişmedi: ${before}`);
  const url = page.url();
  if (!url.includes('kategori=tutun')) throw new Error('URL güncellenmedi: ' + url);
});

console.log('\nKonsol hataları:', errs.length ? errs.join('\n') : '(yok)');
await browser.close();
