'use client';

import { useEffect, useState } from 'react';
import { useRecentlyViewed } from '@/store/favorites';
import { productBySlug } from '@/data/products';
import { RelatedRail } from './RelatedRail';
import type { Product } from '@/types';

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const push = useRecentlyViewed((s) => s.push);
  useEffect(() => {
    push(slug);
  }, [slug, push]);
  return null;
}

export function RecentlyViewedSection({ excludeSlug }: { excludeSlug?: string }) {
  const ids = useRecentlyViewed((s) => s.ids);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const list = ids
      .filter((id) => id !== excludeSlug)
      .map((id) => productBySlug(id))
      .filter((p): p is Product => !!p)
      .slice(0, 8);
    setProducts(list);
  }, [ids, excludeSlug]);

  if (!products.length) return null;
  return <RelatedRail title="Son Görüntülenen Ürünler" products={products} />;
}
