'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { toast } from '@/store/toast';

const schema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalı.'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası girin.')
    .regex(/^[0-9+()\s-]+$/, 'Geçerli bir telefon numarası girin.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  subject: z.string().min(2, 'Konu seçin.'),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalı.'),
  kvkk: z.literal(true, { errorMap: () => ({ message: 'Devam etmek için KVKK metnini onaylayın.' }) }),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  kvkk: boolean;
};

const initial: FormState = { name: '', phone: '', email: '', subject: '', message: '', kvkk: false };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setSent(true);
    toast.success('Mesajınız alındı', 'En kısa sürede size dönüş yapacağız (demo bildirim).');
    setForm(initial);
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = (key: keyof FormState) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
      errors[key] ? 'border-rose-400' : 'border-purple-200 focus:border-purple-400'
    }`;

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-purple-100 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-xs font-semibold text-purple-800">
            Ad Soyad
          </label>
          <input id="c-name" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-xs font-semibold text-purple-800">
            Telefon
          </label>
          <input id="c-phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass('phone')} />
          {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="c-email" className="mb-1.5 block text-xs font-semibold text-purple-800">
          E-posta
        </label>
        <input id="c-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass('email')} />
        {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="c-subject" className="mb-1.5 block text-xs font-semibold text-purple-800">
          Konu
        </label>
        <select id="c-subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} className={inputClass('subject')}>
          <option value="">Bir konu seçin</option>
          <option>Ürün bilgisi</option>
          <option>Sipariş / kargo</option>
          <option>İade / değişim</option>
          <option>İş birliği</option>
          <option>Diğer</option>
        </select>
        {errors.subject && <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="c-message" className="mb-1.5 block text-xs font-semibold text-purple-800">
          Mesajınız
        </label>
        <textarea id="c-message" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} className={inputClass('message')} />
        {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-xs text-ink-soft">
        <input
          type="checkbox"
          checked={form.kvkk}
          onChange={(e) => update('kvkk', e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-purple-300"
        />
        <span>
          <a href="/gizlilik-politikasi#kvkk" className="font-semibold text-purple-700 link-underline">
            KVKK Aydınlatma Metni
          </a>
          ’ni okudum, kişisel verilerimin işlenmesini onaylıyorum.
        </span>
      </label>
      {errors.kvkk && <p className="mt-1 text-xs text-rose-500">{errors.kvkk}</p>}

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        {sent ? 'Gönderildi' : 'Mesajı Gönder'} <Send size={15} />
      </button>
      <p className="mt-3 text-xs text-ink-soft">
        Bu form frontend doğrulaması yapar; veriler gerçek bir sunucuya gönderilmez.
      </p>
    </form>
  );
}
