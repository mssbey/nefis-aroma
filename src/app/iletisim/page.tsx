import type { Metadata } from 'next';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { site } from '@/lib/site';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Nefis Aroma ile iletişime geçin — WhatsApp, telefon, e-posta veya form aracılığıyla.',
  alternates: { canonical: '/iletisim' },
};

const cards = [
  { icon: MessageCircle, label: 'WhatsApp', value: site.contact.whatsapp, href: site.contact.whatsappUrl },
  { icon: Phone, label: 'Telefon', value: site.contact.phone, href: site.contact.phoneUrl },
  { icon: Mail, label: 'E-posta', value: site.contact.email, href: `mailto:${site.contact.email}` },
];

export default function ContactPage() {
  return (
    <div className="container-page section !pt-8">
      <Breadcrumbs items={[{ label: 'İletişim' }]} />
      <h1 className="mt-4 text-display-sm">İletişim</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Aşağıdaki bilgiler örnek/placeholder’dır; gerçek iletişim bilgileri{' '}
        <code className="rounded bg-purple-50 px-1">src/lib/site.ts</code> dosyasından güncellenebilir.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === 'WhatsApp' ? '_blank' : undefined}
              rel={c.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-5 transition-shadow hover:shadow-lift"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple-50 text-purple-600">
                <c.icon size={19} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">{c.label}</p>
                <p className="break-words font-medium text-purple-900">{c.value}</p>
              </div>
            </a>
          ))}

          <div className="flex items-start gap-4 rounded-2xl border border-purple-100 bg-white p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple-50 text-purple-600">
              <MapPin size={19} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">Adres</p>
              {site.contact.addressLines.map((l) => (
                <p key={l} className="text-sm text-ink">{l}</p>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-purple-100 bg-white p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple-50 text-purple-600">
              <Clock size={19} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">Çalışma Saatleri</p>
              <p className="text-sm text-ink">{site.contact.workingHours}</p>
            </div>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-purple-200 bg-purple-50/50 text-sm text-ink-soft">
            {site.contact.mapNote}
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
