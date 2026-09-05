'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Product } from '@/types';
import { uniqueOptions, resolveVariant, pickDefaultVariant } from '@/lib/commerce';
import { currency } from '@/lib/site';
import { cn } from '@/lib/utils';

export function QuickAddPanel({
  product,
  onConfirm,
}: {
  product: Product;
  onConfirm: (variantId: string) => void;
}) {
  const { volumes, intensities } = uniqueOptions(product);
  const [volume, setVolume] = useState(pickDefaultVariant(product).volume);
  const [intensity, setIntensity] = useState(pickDefaultVariant(product).intensity);
  const variant = resolveVariant(product, { volume, intensity });

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-1 z-20 overflow-y-auto rounded-xl border border-purple-100 bg-white p-3 shadow-lift"
      onClick={(e) => e.preventDefault()}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Hacim</p>
      <div className="flex flex-wrap gap-1.5">
        {volumes.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === volume}
            onClick={() => setVolume(v)}
            className={cn(
              'rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors',
              v === volume ? 'border-purple-600 bg-purple-600 text-cream' : 'border-purple-200 text-purple-700 hover:border-purple-400',
            )}
          >
            {v}
          </button>
        ))}
      </div>
      {intensities.length > 1 && (
        <>
          <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Yoğunluk</p>
          <div className="flex flex-wrap gap-1.5">
            {intensities.map((it) => (
              <button
                key={it}
                type="button"
                aria-pressed={it === intensity}
                onClick={() => setIntensity(it)}
                className={cn(
                  'rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors',
                  it === intensity ? 'border-purple-600 bg-purple-600 text-cream' : 'border-purple-200 text-purple-700 hover:border-purple-400',
                )}
              >
                {it}
              </button>
            ))}
          </div>
        </>
      )}
      <button
        type="button"
        disabled={variant.stock === 'out-of-stock'}
        onClick={() => onConfirm(variant.id)}
        className="btn-gold mt-3 w-full py-2 text-xs disabled:opacity-50"
      >
        {variant.stock === 'out-of-stock' ? (
          'Bu varyant tükendi'
        ) : (
          <>
            <Check size={14} /> Sepete ekle · {currency(variant.price)}
          </>
        )}
      </button>
    </m.div>
  );
}
