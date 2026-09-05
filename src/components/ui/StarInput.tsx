'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StarInput({
  value,
  onChange,
  size = 28,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: number;
  className?: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      onMouseLeave={() => setHover(0)}
      role="radiogroup"
      aria-label="Puanınız"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} yıldız`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          className="rounded p-0.5 text-gold-400 transition-transform hover:scale-110"
        >
          <Star
            size={size}
            fill={n <= shown ? 'currentColor' : 'none'}
            className={n <= shown ? 'text-gold-400' : 'text-purple-200'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
