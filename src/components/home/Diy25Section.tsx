import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductRail } from '@/components/product/ProductRail';
import { SectionHeading, Reveal } from '@/components/ui/Reveal';

export function Diy25Section() {
  const list = products.filter((p) => p.series === '25 Yüksek Aroma');
  if (list.length === 0) return null;

  return (
    <section className="section container-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="25 Yüksek Aroma"
          title="DIY Kit serisi: 30/60/100 ml, tek etiket, net tarif"
          description="Her şişe gerçek ürün fotoğrafıyla — yüksek oranlı konsantre, üç hacim seçeneğiyle."
        />
        <Reveal>
          <Link href="/kategori/diy-kitler" className="btn-ghost">
            Tümünü gör <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <ProductRail products={list} />
      </Reveal>
    </section>
  );
}
