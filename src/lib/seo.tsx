import { site } from '@/lib/site';
import type { Product } from '@/types';
import { categories } from '@/data/categories';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/brand/logo-full.png`,
    // Not: iletişim bilgileri örnek/placeholder'dır.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.contact.email,
        availableLanguage: ['Turkish'],
      },
    ],
    sameAs: [site.social.instagram, site.social.youtube],
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.domain,
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.domain}/arama?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productJsonLd(product: Product) {
  const prices = product.variants.map((v) => v.price);
  const inStock = product.stockStatus !== 'out-of-stock';
  const catName = categories.find((c) => c.slug === product.category)?.name ?? 'Aroma';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: catName,
    sku: product.variants[0]?.sku,
    brand: { '@type': 'Brand', name: site.name },
    image: product.gallery.map((g) => `${site.domain}${g.src}`),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: site.commerce.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.variants.length,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Ana Sayfa', href: '/' }, ...items].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${site.domain}${c.href}` } : {}),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
