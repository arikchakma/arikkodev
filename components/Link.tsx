import { ReactNode } from 'react';
import NextLink from 'next/link';

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
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (to && !href) {
    return (
      <NextLink href={to}>
        <a className={className}>{children}</a>
      </NextLink>
    );
  }

  return null;
}
