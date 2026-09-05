import { cn } from '@/lib/utils';
import { currency, discountPercent } from '@/lib/site';

interface PriceProps {
  price: number;
  oldPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBadge?: boolean;
}

const sizeMap = {
  sm: { now: 'text-sm', was: 'text-xs' },
  md: { now: 'text-lg', was: 'text-sm' },
  lg: { now: 'text-2xl sm:text-3xl', was: 'text-base' },
};

export function Price({ price, oldPrice, size = 'md', className, showBadge = true }: PriceProps) {
  const pct = discountPercent(price, oldPrice);
  const s = sizeMap[size];
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('font-display font-semibold text-purple-800', s.now)}>
        {currency(price)}
      </span>
      {pct > 0 && (
        <>
          <span className={cn('text-ink-soft line-through', s.was)}>{currency(oldPrice!)}</span>
          {showBadge && (
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
              -%{pct}
            </span>
          )}
        </>
      )}
    </div>
  );
}
