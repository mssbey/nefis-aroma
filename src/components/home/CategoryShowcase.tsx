import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { SectionHeading, Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const featured = ['meyveli', 'ferah', 'tatli-kremsi', 'icecek', 'tutun', 'mix'];

export function CategoryShowcase() {
  const list = featured
    .map((s) => categories.find((c) => c.slug === s)!)
    .filter(Boolean);

  return (
    <section className="section container-page">
      <SectionHeading
        eyebrow="Tat Aileleri"
        title="Nereden başlayacağını seç"
        description="Her aile kendi karakterine sahip. Kartın üzerine gel, atmosferi hisset ve keşfe başla."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-1')}>
            <Link
              href={`/kategori/${c.slug}`}
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-purple-100 p-6 text-cream shadow-soft transition-shadow duration-300 hover:shadow-lift sm:h-72"
            >
              <Image
                src={c.cover}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/85 via-purple-900/25 to-transparent" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">{c.tagline}</p>
                <h3 className="mt-1 flex items-center gap-1.5 font-display text-2xl font-semibold text-cream">
                  {c.name}
                  <ArrowUpRight
                    size={20}
                    className="text-gold-200 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </h3>
                <p className="mt-1.5 max-w-xs text-sm text-cream/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {c.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 text-center">
        <Link href="/urunler" className="btn-ghost">
          Tüm kategorileri gör
        </Link>
      </Reveal>
    </section>
  );
}
