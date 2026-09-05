'use client';
import { useEffect, useState } from 'react';
import { X, Sprout } from 'lucide-react';
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => { try { setHidden(sessionStorage.getItem('na-announce-hidden') === '1'); } catch {} }, []);
  if (hidden) return null;
  return <div className="relative bg-purple-700 text-cream"><div className="container-page flex h-9 items-center justify-center gap-2 !px-10 text-[11px] sm:text-xs"><Sprout size={14} className="shrink-0" /><span className="truncate">Aroma dünyasını keşfet · Bu site bir ürün vitrini demosudur</span></div><button type="button" aria-label="Duyuruyu kapat" onClick={() => { setHidden(true); try { sessionStorage.setItem('na-announce-hidden', '1'); } catch {} }} className="absolute right-1 top-0 grid h-9 w-9 place-items-center"><X size={14} /></button></div>;
}
