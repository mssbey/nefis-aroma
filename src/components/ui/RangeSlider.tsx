'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  format?: (n: number) => string;
  label: string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (n) => String(n),
  label,
  className,
}: RangeSliderProps) {
  const [lo, hi] = value;
  const pct = (n: number) => ((n - min) / (max - min || 1)) * 100;

  const setLo = useCallback(
    (n: number) => onChange([Math.min(n, hi - step), hi]),
    [hi, step, onChange],
  );
  const setHi = useCallback(
    (n: number) => onChange([lo, Math.max(n, lo + step)]),
    [lo, step, onChange],
  );

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-xs font-medium text-ink-soft">
        <span>{format(lo)}</span>
        <span>{format(hi)}</span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-purple-100" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-purple-500"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          aria-label={`${label} — alt sınır`}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Number(e.target.value))}
          className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          aria-label={`${label} — üst sınır`}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Number(e.target.value))}
          className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
