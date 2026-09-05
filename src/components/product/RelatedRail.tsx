import { ProductRail } from './ProductRail';
import type { Product } from '@/types';

export function RelatedRail({ title, products }: { title: string; products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="mt-16 border-t border-purple-100 pt-12">
      <h2 className="font-display text-xl font-semibold text-purple-900 sm:text-2xl">{title}</h2>
      <div className="mt-6">
        <ProductRail products={products} />
      </div>
    </section>
  );
}
