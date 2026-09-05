import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const formats = [
  { name: 'Konsantre aromalar', label: 'Tat notalarını karşılaştır', href: '/urunler?form=konsantre' },
  { name: 'Mix & Shortfill', label: 'Katmanlı profilleri incele', href: '/urunler?form=shortfill' },
  { name: 'DIY kitler', label: 'Set seçeneklerini keşfet', href: '/kategori/diy-kitler' },
  { name: 'Baz ürünleri', label: 'Katalogdaki bazları görüntüle', href: '/kategori/nbase' },
];

export function ProductFormats() {
  return (
    <section className="section container-page !pt-0">
      <span className="eyebrow">Ürün biçimleri</span>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
        <h2 className="text-display-sm">Aradığın forma bir adım daha yakın.</h2>
        <p className="max-w-sm text-sm leading-6 text-ink-soft">Katalogdaki ürün biçimlerini keşfet. Kullanım alanı ve uygunluğu için ürünün resmi belgelerini esas al.</p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {formats.map((format, index) => (
          <Link key={format.name} href={format.href} className="group rounded-2xl border border-purple-100 bg-white p-6 transition-colors hover:border-purple-400">
            <span className="text-xs text-gold-600">0{index + 1}</span>
            <h3 className="mt-6 text-xl">{format.name}</h3>
            <p className="mt-2 flex items-center justify-between gap-2 text-xs text-ink-soft">{format.label}<ArrowUpRight size={17} className="shrink-0 text-purple-600" /></p>
          </Link>
        ))}
      </div>
    </section>
  );
}
