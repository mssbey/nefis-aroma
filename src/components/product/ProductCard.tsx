'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { Price } from '@/components/ui/Price';
import { BadgeStack } from '@/components/ui/Badge';
import { FlavorTag } from '@/components/ui/FlavorTag';
import { FavoriteButton } from './FavoriteButton';
import { QuickAddPanel } from './QuickAddPanel';
import { useCart } from '@/store/cart';
import { useUI } from '@/store/ui';
import { toast } from '@/store/toast';
import { pickDefaultVariant, stockLabel } from '@/lib/commerce';
import { cn } from '@/lib/utils';

export function ProductCard({
  product,
  onQuickView,
  priority = false,
  className,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  priority?: boolean;
  className?: string;
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const add = useCart((s) => s.add);
  const openCart = useUI((s) => s.openCart);

  const singleVariant = product.variants.length === 1;
  const defaultVariant = pickDefaultVariant(product);
  const soldOut = product.stockStatus === 'out-of-stock';
  const img2 = product.images[1]?.src ?? product.images[0].src;

  const doAdd = (variantId: string) => {
    add(product.id, variantId, 1);
    setPanelOpen(false);
    openCart();
    toast.success('Sepete eklendi', product.name);
  };

  const handleQuickAdd = () => {
    if (soldOut) return;
    if (singleVariant) doAdd(defaultVariant.id);
    else setPanelOpen((v) => !v);
  };

  const stock = stockLabel[product.stockStatus];

  return (
    <article
      className={cn(
        'product-card group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-purple-100 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-purple-50">
        <Link href={`/urun/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <Image
            src={product.images[0].src}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            preload={priority}
            className={cn(
              'object-cover transition-opacity duration-500',
              'group-hover:opacity-0',
            )}
          />
          <Image
            src={img2}
            alt=""
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <BadgeStack kinds={product.badges} />
        </div>

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <FavoriteButton productId={product.id} productName={product.name} className="h-9 w-9" />
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label="Hızlı incele"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-purple-700 opacity-100 shadow-soft backdrop-blur transition-all duration-300 hover:text-purple-900 group-hover:opacity-100"
            >
              <Eye size={17} />
            </button>
          )}
        </div>

        {soldOut && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-cream/70 backdrop-blur-[1px]">
            <span className="rounded-full bg-purple-900 px-4 py-1.5 text-xs font-semibold text-cream">
              Tükendi
            </span>
          </div>
        )}

        <AnimatePresence>{panelOpen && <QuickAddPanel product={product} onConfirm={doAdd} />}</AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-500">{product.series}</p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-purple-900">
          <Link href={`/urun/${product.slug}`} className="hover:text-purple-600">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.flavorProfiles.slice(0, 2).map((p) => (
            <FlavorTag key={p} profile={p} />
          ))}
        </div>

        <p className="mt-3 text-[10px] text-ink-soft">Temsili görsel · Demo ürün</p>

        <div className="product-price-row mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <Price price={defaultVariant.price} oldPrice={defaultVariant.oldPrice} size="md" />
            <p className={cn('mt-0.5 text-[11px] font-medium', stock.className)}>{stock.text}</p>
          </div>
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={soldOut}
            aria-label={singleVariant ? 'Sepete ekle' : 'Hızlı ekle'}
            className="relative z-20 flex h-10 shrink-0 items-center justify-center gap-1 px-3 rounded-full bg-purple-600 text-cream transition-all hover:bg-purple-700 hover:shadow-lift disabled:opacity-40"
          >
            <span className="text-[11px] font-semibold">Ekle</span><Plus size={16} className={cn('transition-transform', panelOpen && 'rotate-45')} />
          </button>
        </div>
      </div>
    </article>
  );
}
