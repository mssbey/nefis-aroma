import type { Metadata } from 'next';
import { CheckCircle2, Info } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { OrderNumber } from './OrderNumber';

export const metadata: Metadata = {
  title: 'Sipariş Simülasyonu',
  robots: { index: false, follow: false },
};

export default function OrderDemoPage() {
  return (
    <div className="container-page section flex justify-center !pt-16">
      <div className="max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-5 text-display-sm">Demo sipariş alındı</h1>
        <p className="mt-3 text-ink-soft">
          Örnek sipariş numaranız <OrderNumber />. Bu ekran yalnızca
          frontend akışını göstermek için hazırlanmıştır; herhangi bir ödeme alınmamış ve gerçek bir sipariş
          oluşturulmamıştır.
        </p>
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-purple-50 p-4 text-left text-sm text-ink-soft">
          <Info size={16} className="mt-0.5 shrink-0 text-purple-500" />
          <p>
            Gerçek ödeme, üyelik ve sipariş takibi altyapısı bu sürümde bulunmuyor. Bu bölüm ileride canlı
            sisteme bağlanacak şekilde tasarlanmıştır.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/urunler">Alışverişe devam et</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            Ana sayfaya dön
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
