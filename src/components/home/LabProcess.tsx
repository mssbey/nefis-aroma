import Image from 'next/image';
import { processSteps, processNote } from '@/data/content';
import { SectionHeading, Reveal } from '@/components/ui/Reveal';

export function LabProcess() {
  return (
    <section className="section surface-dark relative overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Laboratuvardan Deneyime"
          title={<span className="text-cream">Bir aroma nasıl olgunlaşır?</span>}
          description={
            <span className="text-cream/70">
              Fikirden şişeye kadar izlediğimiz dört adım. Bu bölüm ürün geliştirme yaklaşımımızı özetler.
            </span>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-cream/10 bg-cream/[0.04] p-5 backdrop-blur">
                <div className="relative mb-4 h-32 overflow-hidden rounded-xl">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width:640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-display text-sm font-semibold text-gold-200">{s.no}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-cream/45">{processNote}</p>
      </div>
    </section>
  );
}
