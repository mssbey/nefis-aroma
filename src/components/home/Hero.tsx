'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroContent } from '@/data/content';

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const yFront = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="surface-dark relative overflow-hidden"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <m.div style={{ y: reduce ? 0 : yBg }} className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-900/90 to-purple-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/20 to-purple-900/55" />
      </m.div>

      <div className="container-page relative grid min-h-[560px] items-center py-16 sm:py-20 lg:min-h-[640px] lg:py-24">
        <m.div style={{ y: reduce ? 0 : yFront }} className="max-w-xl">

          <m.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-200/30 bg-gold-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200"
          >
            <Sparkles size={13} /> {heroContent.eyebrow}
          </m.span>

          <m.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 max-w-lg font-display text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[1.05] tracking-tight text-cream"
          >
            {heroContent.title}
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-md text-pretty text-base text-cream/75 sm:text-lg"
          >
            {heroContent.subtitle}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href={heroContent.primaryCta.href} className="btn-gold">
              {heroContent.primaryCta.label} <ArrowRight size={16} />
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="btn border border-cream/25 text-cream hover:bg-cream/10"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </m.div>

          <m.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex gap-8 border-t border-cream/10 pt-6"
          >
            {heroContent.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-semibold text-gold-200">{s.value}</dt>
                <dd className="text-xs text-cream/60">{s.label}</dd>
              </div>
            ))}
          </m.dl>
        </m.div>

        <m.div
          style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
          className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[70%] w-[42%] -translate-y-1/2 lg:block"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-3xl" />
        </m.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
