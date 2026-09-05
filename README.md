# Nefis Aroma

Nefis Aroma için hazırlanmış Türkçe ürün vitrini ve e-ticaret arayüzü. Next.js App Router, React, TypeScript ve Tailwind CSS kullanır. Sepet ve favori durumu Zustand ile yönetilir.

## Özellikler

- Ürün listeleme, kategori ve koleksiyon sayfaları
- Ürün arama, filtreleme ve ürün detayları
- Sepet ve favoriler; tarayıcıda yerel olarak saklanan veriler
- Aroma rehberi, kampanyalar ve bilgilendirme sayfaları
- Mobil ve masaüstü ekranlara uyumlu tasarım

Bu sürüm bir vitrin/demo uygulamasıdır. Gerçek ödeme, üyelik ve sipariş takibi altyapısı bulunmaz. Sipariş tamamlama ekranı gerçek sipariş oluşturmaz.

## Kurulum ve çalıştırma

Node.js ve npm kurulu olmalıdır. Proje klasöründe:

```sh
npm ci
npm run dev
```

Uygulamayı http://localhost:3000 adresinde açın. Zorunlu ortam değişkeni yoktur. Yayın alan adı doğrulandığında `.env.local` içinde `NEXT_PUBLIC_SITE_URL` tanımlayın; aksi durumda SEO bağlantıları `https://nefisaroma.example` placeholder alan adını kullanır. Örnekler `.env.example` dosyasındadır.

Üretim derlemesini yerelde çalıştırmak için:

```sh
npm run build
npm start
```

## Kontroller

```sh
npm run lint
npm run typecheck
```

Tarayıcı kontrolleri için önce uygulamayı ayrı bir terminalde 3111 portunda başlatın:

```sh
npm run dev -- --port 3111
```

Ardından kontrolleri çalıştırın:

```sh
npm run qa:console
npm run qa:interactions
npm run qa:responsive
```

Bu betikler Puppeteer kullanır. Önce `CHROME_PATH`, sonra yaygın Windows, macOS ve Linux Chrome/Chromium yolları kontrol edilir. Tarayıcı bulunamazsa açıklayıcı hata verilir. Hedef adres `http://localhost:3111` olarak tanımlıdır.

## Proje yapısı

| Klasör | İçerik |
| --- | --- |
| `src/app` | Sayfalar, ana yerleşim, genel stiller ve SEO uçları |
| `src/components` | Arayüz, ürün, ana sayfa ve yerleşim bileşenleri |
| `src/data` | Ürünler, kategoriler, menüler ve içerikler |
| `src/store` | Sepet, favoriler ve arayüz durumu |
| `src/lib` | Arama, filtreleme, sepet hesapları ve yardımcı işlevler |
| `src/types` | TypeScript tipleri |
| `public` | Statik dosyalar |
| `scripts` | Görsel işleme ve tarayıcı kontrol betikleri |

Ürün içerikleri `src/data/products.ts`, kategoriler `src/data/categories.ts`, genel içerikler `src/data/content.ts` üzerinden düzenlenebilir.

## Geliştirme notu

Kod değişikliklerinden önce `AGENTS.md` yönergelerini ve kullanılan Next.js sürümüne ait `node_modules/next/dist/docs/` belgelerini okuyun.

## Tasarım ve görseller

Sıcak krem ve marka moru üzerine kurulu ortak tasarım sistemi kullanılır. Görsel kaynakları ve üretim promptları [GENERATED_ASSETS.md](GENERATED_ASSETS.md) dosyasındadır. Görseller temsilidir; fiyat, varyasyon ve stoklar demo katalog verileridir. Gerçek müşteri puanı, doğrulanmış yorum veya ödeme altyapısı sunulmaz.

Ek görsel ve erişilebilirlik kontrolü: `node scripts/qa-visual.mjs`. Ekran görüntüleri ve axe raporu `artifacts/qa/` altında oluşturulur. Kontrol genişlikleri: 360, 390, 768, 1024, 1440 ve 1920 piksel.
