import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function Rating({ value, count, size = 15, className, showValue = true }: RatingProps) {
  if (value <= 0) return null;
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div
        className="flex items-center"
        role="img"
        aria-label={`5 üzerinden ${value.toFixed(1)} puan`}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = rounded - i;
          return (
            <span key={i} className="relative" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-purple-200" strokeWidth={1.5} />
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fill >= 1 ? '100%' : '50%' }}
                >
                  <Star
                    size={size}
                    className="text-gold-400"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-purple-800">{value.toFixed(1)}</span>
      )}
      {typeof count === 'number' && (
        <span className="text-xs text-ink-soft">({count})</span>
      )}
    </div>
  );
}
