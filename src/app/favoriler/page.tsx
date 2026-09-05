import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FavoritesView } from './FavoritesView';

export const metadata: Metadata = {
  title: 'Favorilerim',
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="container-page section !pt-8">
      <Breadcrumbs items={[{ label: 'Favorilerim' }]} />
      <div className="page-intro mt-5"><h1 className="mt-4 text-display-sm">Favorilerim</h1></div>
      <div className="mt-8">
        <FavoritesView />
      </div>
    </div>
  );
}
