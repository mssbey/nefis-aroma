import { cn } from '@/lib/utils';
import type { BadgeKind } from '@/types';

const config: Record<BadgeKind, { label: string; className: string }> = {
  yeni: { label: 'Yeni', className: 'bg-purple-600 text-cream' },
  'cok-satan': { label: 'Seçki', className: 'bg-gold-400 text-purple-900' },
  'sinirli-seri': { label: 'Özel Seri', className: 'bg-purple-900 text-cream' },
  indirim: { label: 'İndirim', className: 'bg-cream text-purple-800 ring-1 ring-gold-300' },
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  const c = config[kind];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-soft',
        c.className,
        className,
      )}
    >
      {c.label}
    </span>
  );
}

export function BadgeStack({ kinds, className }: { kinds: BadgeKind[]; className?: string }) {
  if (!kinds.length) return null;
  // "indirim" rozetini son sıraya al, en fazla 2 göster
  const ordered = [...kinds].sort((a, b) => (a === 'indirim' ? 1 : 0) - (b === 'indirim' ? 1 : 0));
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {ordered.slice(0, 2).map((k) => (
        <Badge key={k} kind={k} />
      ))}
    </div>
  );
}
