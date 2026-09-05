import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'gold' | 'ghost' | 'dark' | 'link';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
  link: 'inline-flex items-center gap-1.5 font-semibold text-purple-700 link-underline',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: '',
  lg: 'px-8 py-4 text-base',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={cn(variants[variant], variant !== 'link' && sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  children,
  prefetch,
  ...props
}: BaseProps & { href: string; prefetch?: boolean } & ComponentPropsWithoutRef<'a'>) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(variants[variant], variant !== 'link' && sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
