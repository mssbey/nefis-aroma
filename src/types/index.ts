// Merkezi tip tanımları — Nefis Aroma
// Backend bağlanınca bu tipler API sözleşmesine dönüştürülebilir.

export type CategorySlug =
  | 'meyveli'
  | 'ferah'
  | 'tatli-kremsi'
  | 'icecek'
  | 'tutun'
  | 'mix'
  | 'diy-kitler'
  | 'nbase';

export type CollectionSlug = 'golden-drop' | 'purple-reserve' | 'fresh-lab';

export type FlavorProfile =
  | 'meyveli'
  | 'ferah'
  | 'tatli'
  | 'eksi'
  | 'kremsi'
  | 'tutun'
  | 'icecek'
  | 'mentollu';

export type ProductForm = 'konsantre' | 'shortfill' | 'diy-kit' | 'baz';

export type BadgeKind = 'yeni' | 'cok-satan' | 'sinirli-seri' | 'indirim';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export type VariantVolume = '10ml' | '30ml' | '60ml' | '100ml';
export type VariantType = 'Konsantre Aroma' | 'DIY Kit' | 'Shortfill' | 'Mix Aroma';
export type VariantIntensity = 'Standart' | 'Yoğun' | 'Extra Fresh';

export interface ProductVariant {
  id: string;
  sku: string;
  volume: VariantVolume;
  type: VariantType;
  intensity: VariantIntensity;
  price: number;
  oldPrice?: number;
  stock: StockStatus;
  stockCount: number;
  image: string;
  onSale: boolean;
}

export interface FlavorNote {
  label: string;
  /** tat ailesi rengi için */
  profile: FlavorProfile;
}

export interface TasteRadar {
  sweetness: number; // 0-10
  freshness: number;
  intensity: number;
  sourness: number;
  creaminess: number;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string; // marka/seri adı, ör. "Signature", "Lab Serisi"
  shortDescription: string;
  longDescription: string;
  category: CategorySlug;
  subcategory: string;
  collection?: CollectionSlug;
  flavorNotes: FlavorNote[];
  flavorProfiles: FlavorProfile[];
  badges: BadgeKind[];
  images: ProductImage[];
  gallery: ProductImage[];
  videoPlaceholder?: string;
  basePrice: number;
  oldPrice?: number;
  rating: number; // 0-5
  reviewCount: number;
  stockStatus: StockStatus;
  ingredientsNote: string; // içerik bilgisi placeholder
  usageRate: string; // aroma kullanım oranı, ör. "%8 - %12"
  steepTime: string; // önerilen bekleme/demlenme
  origin: string; // menşei — düzenlenebilir placeholder
  storage: string;
  warnings: string;
  taste: TasteRadar;
  form: ProductForm;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  variants: ProductVariant[];
  relatedProductIds: string[];
  faq: ProductFaqItem[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  icon: string;
  subcategories: string[];
  accent: 'purple' | 'gold' | 'fresh' | 'dark';
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  subtitle: string;
  description: string;
  cover: string;
  atmosphere: string;
}

export interface CartLine {
  key: string; // productId + variantId
  productId: string;
  variantId: string;
  qty: number;
  addedAt: number;
}

export interface CartLineDetailed extends CartLine {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
  lineOldTotal: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  /** demo veri olduğunu kod tarafında belli eden bayrak */
  demo: true;
}

export interface QuestionAnswer {
  id: string;
  productId: string;
  author: string;
  date: string;
  question: string;
  answer?: string;
  demo: true;
}
