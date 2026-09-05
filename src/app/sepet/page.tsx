import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CartView } from './CartView';

export const metadata: Metadata = {
  title: 'Sepetim',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="container-page section !pt-8">
      <Breadcrumbs items={[{ label: 'Sepetim' }]} />
      <h1 className="mt-4 text-display-sm">Sepetim</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
