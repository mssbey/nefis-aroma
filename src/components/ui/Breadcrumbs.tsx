import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const full: Crumb[] = [{ label: 'Ana Sayfa', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.domain}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Sayfa yolu" className={cn('text-sm', className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="transition-colors hover:text-purple-700">
                  {c.label}
                </Link>
              ) : (
                <span className={cn(last && 'font-medium text-purple-800')} aria-current={last ? 'page' : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight size={14} className="text-purple-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
