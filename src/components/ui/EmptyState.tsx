import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-purple-200 bg-white/60 px-6 py-16 text-center',
        className,
      )}
    >
      <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-purple-50 text-purple-500">
        <Icon size={28} strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-xl font-semibold text-purple-800">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
