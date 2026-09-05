'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useUI } from '@/store/ui';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { useMounted } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export function MobileTabBar() {
  const pathname = usePathname();
  const { setSearch, openCart } = useUI();
  const mounted = useMounted();
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const favCount = useFavorites((s) => s.ids.length);

  const items = [
    { label: 'Ana Sayfa', href: '/', icon: Home },
    { label: 'Kategoriler', href: '/urunler', icon: LayoutGrid },
    { label: 'Ara', icon: Search, action: () => setSearch(true) },
    { label: 'Favoriler', href: '/favoriler', icon: Heart, badge: mounted ? favCount : 0 },
    { label: 'Sepet', icon: ShoppingBag, action: openCart, badge: mounted ? cartCount : 0 },
  ];

  return (
    <nav
      aria-label="Alt gezinme"
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-purple-100 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch">
        {items.map((it) => {
          const active = it.href && (it.href === '/' ? pathname === '/' : pathname.startsWith(it.href));
          const Icon = it.icon;
          const inner = (
            <span className="relative flex flex-col items-center gap-1 py-2.5">
              <span className="relative">
                <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />
                {!!it.badge && it.badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-purple-900">
                    {it.badge > 9 ? '9+' : it.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{it.label}</span>
            </span>
          );
          return (
            <li key={it.label} className="flex-1">
              {it.href ? (
                <Link
                  href={it.href}
                  className={cn(
                    'flex w-full justify-center transition-colors',
                    active ? 'text-purple-700' : 'text-ink-soft',
                  )}
                >
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={it.action}
                  className="flex w-full justify-center text-ink-soft transition-colors active:text-purple-700"
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
