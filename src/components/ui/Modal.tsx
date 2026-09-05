'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMounted, useScrollLock, useDialog } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
  align?: 'center' | 'top';
  showClose?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  label,
  className,
  align = 'center',
  showClose = true,
}: ModalProps) {
  const mounted = useMounted();
  useScrollLock(open);
  const ref = useDialog(open, onClose);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className={cn(
            'fixed inset-0 z-[100] flex justify-center overflow-y-auto p-4 sm:p-6',
            align === 'center' ? 'items-center' : 'items-start pt-[8vh]',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="fixed inset-0 bg-purple-900/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-2xl border border-purple-100 bg-cream shadow-lift outline-none',
              className,
            )}
          >
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-purple-700 transition-colors hover:bg-white hover:text-purple-900"
              >
                <X size={18} />
              </button>
            )}
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
