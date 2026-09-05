import { testimonials } from '@/data/content';
import { Rating } from '@/components/ui/Rating';
import { SectionHeading, Reveal } from '@/components/ui/Reveal';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="section container-page">
      <SectionHeading
        eyebrow="Kullanıcı Yorumları"
        title="Deneyenler ne diyor?"
        description="Aşağıdaki yorumlar vitrini tanıtmak için hazırlanmış demo içeriklerdir; gerçek müşteri değerlendirmesi değildir."
      />

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06} className="break-inside-avoid">
            <figure className="rounded-[var(--radius-card)] border border-purple-100 bg-white p-6 shadow-soft">
              <Quote size={22} className="text-gold-300" />
              <blockquote className="mt-3 text-sm leading-relaxed text-ink">{t.text}</blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-purple-100 pt-3">
                <div>
                  <p className="text-sm font-semibold text-purple-900">{t.name}</p>
                  <p className="text-xs text-ink-soft">
                    {t.location} · {t.product}
                  </p>
                </div>
                <Rating value={t.rating} size={12} showValue={false} />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-ink-soft/70">
        * Demo içerik — <code className="rounded bg-purple-50 px-1">demo: true</code> ile işaretlenmiştir.
      </p>
    </section>
  );
}
