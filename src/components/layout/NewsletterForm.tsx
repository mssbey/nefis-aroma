'use client';

import { useState } from 'react';
import { z } from 'zod';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from '@/store/toast';
import { cn } from '@/lib/utils';

const schema = z.string().email('Geçerli bir e-posta adresi girin.');

export function NewsletterForm({ variant = 'dark', className }: { variant?: 'dark' | 'light'; className?: string }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(email.trim());
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setDone(true);
    // Not: gerçek bir sunucuya gönderilmez — yalnızca frontend geri bildirimi.
    toast.success('Kaydınız alındı', 'Yeni aroma ve kampanya duyurularını e-postayla paylaşacağız.');
    setEmail('');
    setTimeout(() => setDone(false), 3500);
  };

  const dark = variant === 'dark';

  return (
    <form onSubmit={submit} className={cn('w-full', className)} noValidate>
      <div
        className={cn(
          'flex items-center gap-2 rounded-full border p-1.5 pl-4 transition-colors',
          dark
            ? 'border-cream/20 bg-cream/5 focus-within:border-gold-200'
            : 'border-purple-200 bg-white focus-within:border-purple-400',
        )}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          aria-label="E-posta adresiniz"
          aria-invalid={!!error}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current/50',
            dark ? 'text-cream' : 'text-ink',
          )}
        />
        <button
          type="submit"
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform hover:scale-105',
            done ? 'bg-emerald-500 text-white' : 'bg-gold-400 text-purple-900',
          )}
          aria-label="Bültene kaydol"
        >
          {done ? <Check size={17} /> : <ArrowRight size={17} />}
        </button>
      </div>
      {error && (
        <p className={cn('mt-2 pl-4 text-xs', dark ? 'text-gold-200' : 'text-rose-600')}>{error}</p>
      )}
    </form>
  );
}
