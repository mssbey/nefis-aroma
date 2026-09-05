'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, ShieldCheck, Truck, RotateCcw, Minus } from 'lucide-react';
import type { Product, ProductVariant, VariantIntensity, VariantVolume } from '@/types';
import { Price } from '@/components/ui/Price';
import { Rating } from '@/components/ui/Rating';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { FavoriteButton } from './FavoriteButton';
import { uniqueOptions, isOptionAvailable, stockLabel } from '@/lib/commerce';
import { useCart } from '@/store/cart';
import { useUI } from '@/store/ui';
import { toast } from '@/store/toast';
import { site, currency } from '@/lib/site';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  variant: ProductVariant;
  volume: VariantVolume;
  intensity: VariantIntensity;
  qty: number;
  onVolume: (v: VariantVolume) => void;
  onIntensity: (v: VariantIntensity) => void;
  onQty: (n: number) => void;
}

export function PurchasePanel({ product, variant, volume, intensity, qty, onVolume, onIntensity, onQty }: Props) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openCart = useUI((s) => s.openCart);
  const { volumes, intensities } = uniqueOptions(product);
  const catName = categories.find((c) => c.slug === product.category)?.name;
  const sel = { volume, intensity };
  const soldOut = variant.stock === 'out-of-stock';

  const handleAdd = () => {
    add(product.id, variant.id, qty);
    openCart();
    toast.success('Sepete eklendi', `${product.name} · ${qty} adet`);
  };

  const handleBuyNow = () => {
    add(product.id, variant.id, qty);
    router.push('/sepet');
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">
        {catName} · {product.series}
      </p>
      <h1 className="mt-1.5 font-display text-2xl font-semibold text-purple-900 sm:text-3xl">{product.name}</h1>
      <p className="mt-2 text-sm text-ink-soft">{product.shortDescription}</p>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} />
        <span className={cn('text-xs font-semibold', stockLabel[product.stockStatus].className)}>
          {stockLabel[product.stockStatus].text}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 rounded-2xl bg-purple-50/60 p-4">
        <Price price={variant.price} oldPrice={variant.oldPrice} size="lg" />
        <p className="max-w-[11rem] text-right text-[11px] leading-snug text-ink-soft">
          Taksit bilgisi <span className="font-semibold text-purple-700">ödeme sayfası hazır olduğunda</span> gösterilecektir.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Hacim</p>
          <div className="flex flex-wrap gap-2">
            {volumes.map((v) => {
              const available = isOptionAvailable(product, 'volume', v, sel);
              return (
                <button
                  key={v}
                  type="button"
                  disabled={!available}
                  onClick={() => onVolume(v as VariantVolume)}
                  className={cn(
                    'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
                    v === volume
                      ? 'border-purple-600 bg-purple-600 text-cream'
                      : available
                        ? 'border-purple-200 text-purple-700 hover:border-purple-400'
                        : 'cursor-not-allowed border-purple-100 text-purple-200 line-through',
                  )}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>

        {intensities.length > 1 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Yoğunluk
            </p>
            <div className="flex flex-wrap gap-2">
              {intensities.map((it) => {
                const available = isOptionAvailable(product, 'intensity', it, sel);
                return (
                  <button
                    key={it}
                    type="button"
                    disabled={!available}
                    onClick={() => onIntensity(it as VariantIntensity)}
                    className={cn(
                      'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
                      it === intensity
                        ? 'border-purple-600 bg-purple-600 text-cream'
                        : available
                          ? 'border-purple-200 text-purple-700 hover:border-purple-400'
                          : 'cursor-not-allowed border-purple-100 text-purple-200 line-through',
                    )}
                  >
                    {it}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Ürün tipi</p>
          <p className="inline-flex items-center gap-2 rounded-xl border border-purple-100 bg-white px-4 py-2 text-sm font-medium text-purple-800">
            {variant.type}
          </p>
        </div>

        <p className="text-xs text-ink-soft">
          SKU: <span className="font-mono">{variant.sku}</span>
          {variant.stock === 'low-stock' && (
            <span className="ml-2 font-semibold text-gold-600">Son {variant.stockCount} adet</span>
          )}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={onQty} max={Math.max(1, variant.stockCount || 99)} />
        <button type="button" onClick={handleAdd} disabled={soldOut} className="btn-primary flex-1">
          {soldOut ? 'Stokta Yok' : `Sepete Ekle · ${currency(variant.price * qty)}`}
        </button>
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          size={19}
          className="h-12 w-12 shrink-0 border border-purple-200 bg-white"
        />
      </div>
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={soldOut}
        className="btn-gold mt-3 w-full disabled:opacity-40"
      >
        Hemen Al
      </button>

      <a
        href={`${site.contact.whatsappUrl}?text=${encodeURIComponent(`Merhaba, ${product.name} (${variant.volume}, ${variant.intensity}) hakkında bilgi almak istiyorum.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
      >
        <MessageCircle size={16} /> WhatsApp’tan ürünü sor
      </a>

      <div className="mt-6 grid gap-3 border-t border-purple-100 pt-5 text-sm text-ink-soft sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <Truck size={17} className="mt-0.5 shrink-0 text-purple-500" />
          <span>{site.commerce.estimatedDelivery} (tahmini)</span>
        </div>
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={17} className="mt-0.5 shrink-0 text-purple-500" />
          <span>{site.commerce.securePackaging}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <RotateCcw size={17} className="mt-0.5 shrink-0 text-purple-500" />
          <Link href="/iade-ve-teslimat" className="link-underline">
            İade ve teslimat koşulları
          </Link>
        </div>
        <div className="flex items-start gap-2.5">
          <Minus size={17} className="mt-0.5 shrink-0 rotate-90 text-purple-500" />
          <span>{site.commerce.freeShippingThreshold} ₺ üzeri kargo ücretsiz (örnek)</span>
        </div>
      </div>
    </div>
  );
}
