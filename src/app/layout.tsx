import type { Metadata, Viewport } from 'next';
import { fontSans, fontDisplay, fontScript } from './fonts';
import './globals.css';
import { MotionProvider } from '@/components/motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileTabBar } from '@/components/layout/MobileTabBar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { Toaster } from '@/components/layout/Toaster';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { JsonLd, organizationJsonLd, webSiteJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'Nefis Aroma — Her Damlasında Yeni Bir Deneyim',
    template: '%s | Nefis Aroma',
  },
  description: site.description,
  applicationName: site.name,
  keywords: ['aroma', 'esans', 'DIY kit', 'nbase', 'aroma konsantresi', 'Nefis Aroma'],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: site.domain,
    siteName: site.name,
    title: 'Nefis Aroma — Her Damlasında Yeni Bir Deneyim',
    description: site.description,
    images: [{ url: '/images/og.webp', width: 1200, height: 630, alt: 'Nefis Aroma' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nefis Aroma',
    description: site.description,
    images: ['/images/og.webp'],
  },
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#140B19',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${fontSans.variable} ${fontDisplay.variable} ${fontScript.variable}`}>
      <body className="min-h-dvh bg-cream font-sans text-ink antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-purple-800 focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
        >
          İçeriğe geç
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
          <CartDrawer />
          <SearchOverlay />
          <WhatsAppFab />
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}
