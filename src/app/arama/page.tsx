import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResults } from './SearchResults';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Arama Sonuçları',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="container-page section !pt-8">
      <Breadcrumbs items={[{ label: 'Arama Sonuçları' }]} />
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
