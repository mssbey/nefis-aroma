'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { X, Truck, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { site } from '@/lib/site';

const icons = [ShieldCheck, Truck, MessageCircle, Sparkles];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('na-announce-hidden') === '1') setHidden(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (hidden) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % site.announcements.length), 4500);
    return () => clearInterval(t);
  }, [hidden]);

  if (hidden) return null;
  const Icon = icons[index % icons.length];

  return (
    <div className="relative bg-purple-900 text-cream">
      <div className="container-page flex h-9 items-center justify-center gap-2 text-[12px] font-medium">
        <Icon size={13} className="shrink-0 text-gold-200" aria-hidden />
        <AnimatePresence mode="wait">
          <m.span
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="truncate"
          >
            {site.announcements[index]}
          </m.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem('na-announce-hidden', '1');
          } catch {}
        }}
        aria-label="Duyuruyu kapat"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream/70 transition-colors hover:text-cream"
      >
        <X size={14} />
      </button>
    </div>
  );
}
