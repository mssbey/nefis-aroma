import type { ReactNode } from 'react';

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
      <article className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-purple-900 prose-a:text-purple-700">
        <h1 className="text-display-sm !mb-1 !text-purple-900">{title}</h1>
        {updated && <p className="text-xs text-ink-soft">{updated}</p>}
        <div className="mt-8 space-y-10">{children}</div>
      </article>
      <aside className="hidden rounded-2xl border border-dashed border-purple-200 bg-purple-50/50 p-5 text-xs leading-relaxed text-ink-soft lg:block lg:h-fit">
        Bu sayfa örnek/placeholder içerik taşır. Gerçek hukuki metinler yayınlanmadan önce bir hukuk
        danışmanı tarafından incelenmelidir.
      </aside>
    </div>
  );
}

export function LegalSection({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mb-2 font-display text-lg font-semibold text-purple-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-ink">{children}</div>
    </section>
  );
}
