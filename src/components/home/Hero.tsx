import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero-editorial">
      <div className="container-page grid items-center lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hero-copy relative z-10 py-9 sm:py-14 lg:py-16">
          <span className="eyebrow"><span className="h-px w-8 bg-current" /> Nefis Aroma dünyası</span>
          <h1 className="mt-6 max-w-xl text-[clamp(2.65rem,4.8vw,4.4rem)] leading-[1.06]">
            Küçük bir damla.<br /><em className="font-normal text-purple-600">Bambaşka</em><br />bir dünya.
          </h1>
          <p className="mt-6 max-w-[390px] text-base leading-7 text-ink-soft">Meyvenin canlılığından vanilyanın yumuşaklığına. Kendi tat dünyanı kurmak için aroma koleksiyonumuzu keşfet.</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/urunler" className="btn-primary !px-4 sm:!px-6">Ürünleri Keşfet <ArrowRight size={17} /></Link>
            <Link href="/aroma-rehberi" className="btn-ghost !px-4 sm:!px-6">Aroma Rehberi <ArrowUpRight size={17} /></Link>
          </div>
          <p className="mt-8 text-xs tracking-wide text-ink-soft">Özenle seç · Profilini keşfet · Favorilerini biriktir</p>
        </div>
        <figure className="hero-photo relative -mx-4 sm:-mx-6 lg:mx-0">
          <Image src="/images/nefisaroma/hero/aroma-dunyasi.webp" alt="Krem taş üzerinde cam şişe, incir, böğürtlen ve turunçgil ile temsili aroma kompozisyonu" fill preload sizes="(max-width:1023px) 100vw, (max-width:1440px) 55vw, 740px" quality={75} className="object-cover object-[65%_center]" />
          <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/60 bg-cream/90 px-4 py-2 text-[11px] tracking-wide text-purple-800 backdrop-blur-sm">Aroma dünyasından ilham · Temsili görsel</figcaption>
        </figure>
      </div>
    </section>
  );
}
