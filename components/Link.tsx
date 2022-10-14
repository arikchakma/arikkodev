import { ReactNode } from 'react';
import NextLink from 'next/link';
import cn from 'clsx';

export default function Link({
  children,
  href,
  to,
  className,
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  className?: string;
}) {
  if (href && !to) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'text-[#5d676a] underline underline-offset-2 transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70',
          className
        )}
      >
        {children}
      </a>
    );
  }

  if (to && !href) {
    return (
      <NextLink href={to}>
        <a
          className={cn(
            'text-[#5d676a] underline underline-offset-2 transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70',
            className
          )}
        >
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <NextLink href="#">
      <a
        className={cn(
          'text-[#5d676a] underline underline-offset-2 transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70',
          className
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}
