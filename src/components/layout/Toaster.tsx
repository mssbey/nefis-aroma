'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/store/toast';
import { useMounted } from '@/lib/hooks';

const iconMap = {
  success: CheckCircle2,
  info: Info,
  error: AlertTriangle,
};

export function Toaster() {
  const mounted = useMounted();
  const { toasts, dismiss } = useToast();
  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-[calc(var(--header-h)+12px)] z-[130] flex flex-col items-center gap-2 px-4 sm:right-4 sm:left-auto sm:items-end">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconMap[t.variant];
          return (
            <m.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-purple-100 bg-white p-3.5 shadow-lift"
              role="status"
            >
              <Icon
                size={19}
                className={
                  t.variant === 'success'
                    ? 'mt-0.5 shrink-0 text-emerald-500'
                    : t.variant === 'error'
                      ? 'mt-0.5 shrink-0 text-rose-500'
                      : 'mt-0.5 shrink-0 text-purple-500'
                }
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-purple-900">{t.title}</p>
                {t.description && <p className="mt-0.5 text-xs text-ink-soft">{t.description}</p>}
                {t.actionLabel && (
                  <button
                    type="button"
                    onClick={() => {
                      t.onAction?.();
                      dismiss(t.id);
                    }}
                    className="mt-2 text-xs font-semibold text-purple-700 underline underline-offset-2"
                  >
                    {t.actionLabel}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Bildirimi kapat"
                className="shrink-0 rounded p-0.5 text-purple-300 transition-colors hover:text-purple-600"
              >
                <X size={15} />
              </button>
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
