'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, User, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { primaryNav } from '@/data/nav';
import { useUI } from '@/store/ui';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { useMounted } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const { setSearch, openCart } = useUI();
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const favCount = useFavorites((s) => s.ids.length);

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [term, setTerm] = useState('');
  const closeTimer = useRef<number>(undefined);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(el?.tagName) || el?.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearch]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim().length >= 2) router.push(`/arama?q=${encodeURIComponent(term.trim())}`);
    else setSearch(true);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[80] w-full transition-shadow duration-300',
          scrolled ? 'shadow-soft' : '',
        )}
        onMouseLeave={closeMega}
      >
        <div className={cn('overflow-hidden transition-all duration-300', scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100')}>
          <AnnouncementBar />
        </div>

        <div className="border-b border-purple-100 bg-cream/90 backdrop-blur-lg">
          <div className="container-page">
            <div className={cn('flex items-center gap-3 transition-all duration-300', scrolled ? 'h-16' : 'h-[72px]')}>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Menüyü aç"
                className="grid h-10 w-10 place-items-center rounded-full text-purple-800 hover:bg-purple-50 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <Logo priority className={cn('transition-all', scrolled && 'lg:scale-95')} />

              <form onSubmit={submitSearch} className="mx-auto hidden w-full max-w-xl lg:block" role="search">
                <div className="flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2.5 transition-colors focus-within:border-purple-400">
                  <Search size={17} className="shrink-0 text-purple-400" />
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => setSearch(true)}
                    placeholder="Aroma, kategori veya tat notu ara…"
                    aria-label="Ürün ara"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft/60"
                  />
                  <kbd className="hidden rounded border border-purple-200 px-1.5 text-[10px] font-medium text-ink-soft xl:block">
                    /
                  </kbd>
                </div>
              </form>

              <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
                <button
                  type="button"
                  onClick={() => setSearch(true)}
                  aria-label="Ara"
                  className="grid h-10 w-10 place-items-center rounded-full text-purple-800 hover:bg-purple-50 lg:hidden"
                >
                  <Search size={20} />
                </button>
                <Link
                  href="/hesabim"
                  aria-label="Hesabım"
                  className="hidden h-10 w-10 place-items-center rounded-full text-purple-800 hover:bg-purple-50 sm:grid"
                >
                  <User size={20} />
                </Link>
                <Link
                  href="/favoriler"
                  aria-label="Favorilerim"
                  className="relative grid h-10 w-10 place-items-center rounded-full text-purple-800 hover:bg-purple-50"
                >
                  <Heart size={20} />
                  {mounted && favCount > 0 && (
                    <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-cream">
                      {favCount > 9 ? '9+' : favCount}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={openCart}
                  aria-label="Sepetim"
                  className="relative grid h-10 w-10 place-items-center rounded-full text-purple-800 hover:bg-purple-50"
                >
                  <ShoppingBag size={20} />
                  {mounted && cartCount > 0 && (
                    <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-purple-900">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasyon (masaüstü) */}
        <div
          className={cn(
            'hidden border-b border-purple-100 bg-cream/85 backdrop-blur-lg transition-all duration-300 lg:block',
            scrolled ? 'max-h-0 overflow-hidden border-b-0 opacity-0' : 'max-h-14 opacity-100',
          )}
        >
          <nav
            className="container-page hide-scrollbar mask-fade-x flex flex-nowrap items-center gap-1 overflow-x-auto"
            aria-label="Ana menü"
          >
            {primaryNav.map((link) => {
              const isMega = link.label === 'Tüm Aromalar';
              const active = pathname === link.href || (link.href !== '/urunler' && pathname.startsWith(link.href));
              return (
                <div
                  key={link.href}
                  onMouseEnter={isMega ? openMega : undefined}
                  className="relative shrink-0"
                >
                  <Link
                    href={link.href}
                    onFocus={isMega ? openMega : undefined}
                    aria-expanded={isMega ? megaOpen : undefined}
                    className={cn(
                      'flex items-center gap-1 whitespace-nowrap px-3 py-3.5 text-[13px] font-semibold transition-colors',
                      link.emphasis ? 'text-gold-500 hover:text-gold-400' : 'text-purple-800 hover:text-purple-600',
                      active && 'text-purple-600',
                    )}
                  >
                    {link.label}
                    {isMega && (
                      <ChevronDown size={13} className={cn('transition-transform', megaOpen && 'rotate-180')} />
                    )}
                  </Link>
                  {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold-400" />}
                </div>
              );
            })}
          </nav>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <div onMouseEnter={openMega} onMouseLeave={closeMega}>
              <MegaMenu onNavigate={() => setMegaOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
