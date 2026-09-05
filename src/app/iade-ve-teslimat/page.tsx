import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'İade ve Teslimat Koşulları',
  description: 'Örnek iade, değişim ve teslimat koşulları.',
  alternates: { canonical: '/iade-ve-teslimat' },
};

export default function ReturnsPage() {
  return (
    <div className="container-page section !pt-8">
      <Breadcrumbs items={[{ label: 'İade ve Teslimat Koşulları' }]} />
      <LegalLayout title="İade ve Teslimat Koşulları" updated="Örnek belge">
        <LegalSection title="1. Teslimat Süresi">
          <p>
            Siparişler örnek olarak {site.commerce.estimatedDelivery.toLowerCase()}. Yoğun kampanya
            dönemlerinde bu süre uzayabilir; kesin süre gerçek kargo entegrasyonu tamamlandığında
            gösterilecektir.
          </p>
        </LegalSection>
        <LegalSection title="2. Kargo Ücreti">
          <p>
            {site.commerce.freeShippingThreshold} ₺ üzeri siparişlerde kargo ücretsizdir (örnek kampanya).
            Bu tutarın altındaki siparişlerde {site.commerce.shippingFee} ₺ kargo ücreti uygulanır.
          </p>
        </LegalSection>
        <LegalSection title="3. İade Koşulları">
          <p>
            Ambalajı açılmamış, kullanılmamış ürünler teslim tarihinden itibaren 14 gün içinde iade
            edilebilir (örnek koşul). Hijyen nedeniyle ambalajı açılmış aroma ürünlerinde iade kabul
            edilmeyebilir; kesin koşullar ürün etiketinde belirtilir.
          </p>
        </LegalSection>
        <LegalSection title="4. Hasarlı veya Yanlış Ürün Teslimatı">
          <p>
            Hasarlı, eksik veya yanlış ürün teslimatlarında ürünü teslim aldıktan sonra en kısa sürede
            iletişim kanallarımızdan bize ulaşmanız rica olunur.
          </p>
        </LegalSection>
        <LegalSection title="5. Değişim">
          <p>
            Hacim veya yoğunluk değişikliği talepleri, ürün kullanılmamış ve ambalajı açılmamış olması
            koşuluyla değerlendirilir.
          </p>
        </LegalSection>
      </LegalLayout>
    </div>
  );
}
