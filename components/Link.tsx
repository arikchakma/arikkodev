import { ReactNode, memo } from 'react';
import NextLink from 'next/link';
import cn from 'clsx';
import { useRouter } from 'next/router';

function Link({
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
        rel="noopener noreferrer"
        className={cn(
          'whitespace-nowrap text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out',
          isActive ? 'no-underline opacity-90' : 'opacity-100 hover:opacity-70',
          className
        )}
      >
        {children}
      </a>
    );
  }

  if (to && !href) {
    return (
      <NextLink
        href={to}
        className={cn(
          'whitespace-nowrap text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out hover:opacity-70',
          isActive ? 'no-underline opacity-90' : 'opacity-100 hover:opacity-70',
          className
        )}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <NextLink
      href="#"
      className={cn(
        'whitespace-nowrap text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out hover:opacity-70',
        isActive ? 'no-underline opacity-90' : 'opacity-100 hover:opacity-70',
        className
      )}
    >
      {children}
    </NextLink>
  );
}

export default memo(Link);
