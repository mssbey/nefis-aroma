import { Mail } from 'lucide-react';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';

export function NewsletterSection() {
  return (
    <section className="section container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-purple-100 bg-white p-8 shadow-soft sm:p-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-100/70 blur-3xl" aria-hidden />
          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-purple-50 text-purple-600">
                <Mail size={20} strokeWidth={1.6} />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-purple-900 sm:text-3xl">
                Yeni tatlara açık bir not.
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                Bülten formunu deneyebilirsin. Bu demo sürümde abonelik oluşturulmaz ve e-posta gönderilmez.
              </p>
            </div>
            <NewsletterForm variant="light" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
