'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md', className }: Props) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  const btn =
    'grid place-items-center rounded-full text-purple-700 transition-colors hover:bg-purple-50 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-purple-200 bg-white p-1',
        className,
      )}
    >
      <button
        type="button"
        className={cn(btn, dim)}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Adet azalt"
      >
        <Minus size={size === 'sm' ? 14 : 16} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          else if (e.target.value === '') onChange(min);
        }}
        aria-label="Adet"
        className={cn(
          'w-8 bg-transparent text-center text-sm font-semibold text-purple-900 outline-none',
          size === 'md' && 'w-10',
        )}
      />
      <button
        type="button"
        className={cn(btn, dim)}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Adet artır"
      >
        <Plus size={size === 'sm' ? 14 : 16} />
      </button>
    </div>
  );
}
