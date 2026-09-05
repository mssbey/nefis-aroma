import Link from 'next/link';
import { Instagram, Youtube, Phone, Mail, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { footerNav } from '@/data/nav';
import { site } from '@/lib/site';

const assurances = [
  { icon: Truck, text: `${site.commerce.freeShippingThreshold} ₺ üzeri ücretsiz kargo (örnek)` },
  { icon: ShieldCheck, text: site.commerce.securePackaging },
  { icon: RefreshCw, text: 'Koşullu değişim ve iade süreci' },
];

export function Footer() {
  return (
    <footer className="surface-dark relative mt-16 overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-page relative">
        <div className="grid gap-3 border-b border-cream/10 py-8 sm:grid-cols-3">
          {assurances.map((a) => (
            <div key={a.text} className="flex items-center gap-3 text-sm text-cream/80">
              <a.icon size={18} className="shrink-0 text-gold-200" aria-hidden />
              {a.text}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm space-y-5">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-cream/70">
              Özenle geliştirilen aroma profilleri, DIY kitleri ve baz ürünleri. Yeni tatlardan ve
              kampanyalardan ilk siz haberdar olun.
            </p>
            <NewsletterForm variant="dark" />
            <div className="flex gap-3">
              {[
                { href: site.social.instagram, icon: Instagram, label: 'Instagram' },
                { href: site.social.youtube, icon: Youtube, label: 'YouTube' },
                { href: site.contact.whatsappUrl, icon: MessageCircle, label: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-gold-200 hover:text-gold-200"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-cream/70 transition-colors hover:text-cream"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nefis Aroma. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={site.contact.phoneUrl} className="flex items-center gap-1.5 hover:text-cream">
              <Phone size={13} /> {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 hover:text-cream">
              <Mail size={13} /> {site.contact.email}
            </a>
          </div>
          <p className="text-cream/40">
            İletişim ve kurumsal bilgiler örnek/placeholder’dır.
          </p>
        </div>
      </div>
    </footer>
  );
}
