import type { Category, Collection } from '@/types';

export const categories: Category[] = [
  {
    slug: 'meyveli',
    name: 'Meyveli Aromalar',
    tagline: 'Bahçeden alınan ilk ısırık',
    description:
      'Olgun çekirdekli meyveler, tropikal notalar ve kırmızı orman meyveleri. Doğal tatlılığı öne çıkaran, dengeli meyve profilleri.',
    cover: '/images/categories/meyveli.webp',
    icon: '/images/icons/meyveli.svg',
    subcategories: ['Çekirdekli Meyve', 'Kırmızı Orman Meyvesi', 'Tropikal', 'Turunçgil', 'Karpuz & Kavun'],
    accent: 'gold',
  },
  {
    slug: 'ferah',
    name: 'Ferah Aromalar',
    tagline: 'Serinliğin kontrollü hâli',
    description:
      'Buz, mentol ve soğuk meyve dokunuşları. Yaz gününde derin bir nefes hissi veren, keskin olmayan ferahlık.',
    cover: '/images/categories/ferah.webp',
    icon: '/images/icons/ferah.svg',
    subcategories: ['Buzlu Meyve', 'Mentol', 'Nane', 'Kutup Serisi'],
    accent: 'fresh',
  },
  {
    slug: 'tatli-kremsi',
    name: 'Tatlı & Kremsi',
    tagline: 'Fırından yeni çıkmış gibi',
    description:
      'Vanilya, karamel, custard ve süt tatlısı katmanları. Ağızda yumuşak kapanan, ağır olmayan tatlı profiller.',
    cover: '/images/categories/tatli-kremsi.webp',
    icon: '/images/icons/tatli.svg',
    subcategories: ['Custard & Krema', 'Karamel', 'Bisküvi & Kek', 'Sütlü Tatlı'],
    accent: 'gold',
  },
  {
    slug: 'icecek',
    name: 'İçecek Aromaları',
    tagline: 'Bardaktaki tarifin kopyası',
    description:
      'Soğuk kahve, limonata, kola ve enerji içeceği yorumları. Gün içinde tanıdık gelen içecek notaları.',
    cover: '/images/categories/icecek.webp',
    icon: '/images/icons/icecek.svg',
    subcategories: ['Kahve', 'Limonata & Soda', 'Kola', 'Enerji İçeceği', 'Çay'],
    accent: 'dark',
  },
  {
    slug: 'tutun',
    name: 'Tütün Aromaları',
    tagline: 'Sofistike ve dingin',
    description:
      'Kuru yaprak, hafif tatlı ve fırınlanmış notalar. Klasik tütün karakterini modern bir dengeyle sunan koyu profiller.',
    cover: '/images/categories/tutun.webp',
    icon: '/images/icons/tutun.svg',
    subcategories: ['Klasik Tütün', 'Tatlı Tütün', 'Kuru Meyveli Tütün', 'Karışım Tütün'],
    accent: 'dark',
  },
  {
    slug: 'mix',
    name: 'Mix Aromalar',
    tagline: 'Katmanlı, kurgulanmış tarifler',
    description:
      'Birden fazla profilin dengelenmesiyle hazırlanan hazır karışımlar. Tek şişede tamamlanmış bir tat kompozisyonu.',
    cover: '/images/categories/mix.webp',
    icon: '/images/icons/mix.svg',
    subcategories: ['Meyve Karışımı', 'Tatlı Karışım', 'Ferah Karışım', 'İmza Karışım'],
    accent: 'purple',
  },
  {
    slug: 'diy-kitler',
    name: 'DIY Kitler',
    tagline: 'Kendi tarifini kur',
    description:
      'Aroma, baz ve ölçüm ekipmanını bir arada sunan başlangıç ve ileri seviye setleri. Adım adım hazırlanmış tarif kartlarıyla.',
    cover: '/images/categories/diy-kitler.webp',
    icon: '/images/icons/diy.svg',
    subcategories: ['Başlangıç Seti', 'Karıştırma Seti', 'Ölçüm Ekipmanı', '25 Yüksek Aroma Kit'],
    accent: 'purple',
  },
  {
    slug: 'nbase',
    name: 'Nbase',
    tagline: 'Tarifin sessiz temeli',
    description:
      'Farklı oranlarda hazırlanmış nötr baz sıvıları. Aromanın önüne geçmeyen, temiz ağız hissi veren taşıyıcı.',
    cover: '/images/categories/nbase.webp',
    icon: '/images/icons/nbase.svg',
    subcategories: ['Yüksek VG', 'Dengeli Oran', 'Yüksek PG'],
    accent: 'dark',
  },
];

export const collections: Collection[] = [
  {
    slug: 'golden-drop',
    name: 'Golden Drop',
    subtitle: 'Sıcak, olgun, altın tonlu tatlar',
    description:
      'Karamelize meyve, bal dokunuşu ve fırınlanmış tatlı notalarının bir araya geldiği koleksiyon. Akşam kullanımına yakın, doygun profiller.',
    cover: '/images/collections/golden-drop.webp',
    atmosphere: 'Altın ışık, cam damlalık, kehribar sıvı',
  },
  {
    slug: 'purple-reserve',
    name: 'Purple Reserve',
    subtitle: 'Koyu meyve ve derin karakter',
    description:
      'Üzüm, böğürtlen, incir ve hafif baharatlı arka planların dengelendiği özel seri. Katmanlı ve iddialı tarifler.',
    cover: '/images/collections/purple-reserve.webp',
    atmosphere: 'Gece moru yüzey, mürekkep gibi sıvı, tek altın çizgi',
  },
  {
    slug: 'fresh-lab',
    name: 'Fresh Lab',
    subtitle: 'Ölçülü serinlik, temiz bitiş',
    description:
      'Buzlu meyve ve mentolün kontrollü dozda kullanıldığı ferah koleksiyon. Gün boyu yormayan, net profiller.',
    cover: '/images/collections/fresh-lab.webp',
    atmosphere: 'Buz zemini, soğuk mavi-mor ışık, su damlaları',
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);
