import * as HoverCard from '@radix-ui/react-hover-card';
import { useRouter } from 'next/router';
import cn from 'clsx';
import Image from 'next/image';

export default function LinkPreview({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;
  const name = href.replace(/\//g, '@').replace(/#/g, '@');
  return (
    <HoverCard.Root openDelay={50} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'whitespace-nowrap text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out',
            isActive
              ? 'no-underline opacity-70'
              : 'opacity-100 hover:opacity-70'
          )}
        >
          {children}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          className="m-2 w-64 origin-bottom animate-preview-popup rounded-lg bg-white p-2 shadow-xl data-[side=bottom]:origin-top"
        >
          <figure className="relative aspect-[1.3333] w-full overflow-hidden rounded-md">
            <Image
              src={`/previews/${name}.png`}
              className="absolute h-full w-full object-top"
              layout="fill"
              alt={name}
            />
          </figure>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
