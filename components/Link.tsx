import { ReactNode } from 'react';
import NextLink from 'next/link';
import cn from 'clsx';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const isActive = router.pathname === href || router.pathname === to;

  if (href && !to) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out',
          isActive ? 'no-underline opacity-70' : 'opacity-100 hover:opacity-70',
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
            'text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out hover:opacity-70',
            isActive
              ? 'no-underline opacity-70'
              : 'opacity-100 hover:opacity-70',
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
          'text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out hover:opacity-70',
          isActive ? 'no-underline opacity-70' : 'opacity-100 hover:opacity-70',
          className
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}
