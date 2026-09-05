import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({
  variant = 'default',
  className,
  priority = false,
  mark = false,
}: {
  variant?: 'default' | 'light';
  className?: string;
  priority?: boolean;
  mark?: boolean;
}) {
  const src = mark
    ? variant === 'light'
      ? '/brand/logo-mark-light.svg'
      : '/brand/logo-mark.svg'
    : variant === 'light'
      ? '/brand/logo-light-trimmed.svg'
      : '/brand/logo-full-trimmed.svg';

  return (
    <Link
      href="/"
      aria-label="Nefis Aroma ana sayfa"
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <Image
        src={src}
        alt="Nefis Aroma"
        width={mark ? 52 : 200}
        height={mark ? 52 : 72}
        preload={priority}
        className={cn(mark ? 'h-12 w-12' : 'h-auto w-[112px] sm:w-[156px]', 'object-contain')}
      />
    </Link>
  );
}
