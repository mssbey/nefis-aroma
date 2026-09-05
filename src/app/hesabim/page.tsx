import type { Metadata } from 'next';
import { UserCircle2, Heart, ShoppingBag } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Hesabım',
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <div className="container-page section flex justify-center !pt-12">
      <div className="max-w-md text-center">
        <Breadcrumbs items={[{ label: 'Hesabım' }]} className="justify-center" />
        <span className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-full bg-purple-50 text-purple-600">
          <UserCircle2 size={32} strokeWidth={1.6} />
        </span>
        <h1 className="mt-5 text-display-sm">Üyelik yakında</h1>
        <p className="mt-3 text-ink-soft">
          Bu sürümde hesap ve üyelik sistemi bulunmuyor. Sepetiniz ve favorileriniz bu tarayıcıda otomatik
          olarak saklanır; başka bir cihazda görüntülenmez.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/favoriler" variant="ghost">
            <Heart size={16} /> Favorilerim
          </ButtonLink>
          <ButtonLink href="/sepet" variant="ghost">
            <ShoppingBag size={16} /> Sepetim
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
