import * as HoverCard from '@radix-ui/react-hover-card';
import cn from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export default function LinkPreview({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const name = href.replace(/[\/#]/g, '@');
  const [isLoading, setIsLoading] = useState(true);
  return (
    <HoverCard.Root openDelay={500} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'whitespace-nowrap text-[#5d676a] underline decoration-[#5d676a]/60 decoration-1 underline-offset-2 transition-colors duration-100 ease-in-out',
            'opacity-100 hover:opacity-70',
            'active:no-underline active:opacity-70'
          )}
        >
          {children}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          className="relative z-50 m-2 w-64 origin-bottom animate-preview-popup rounded-lg bg-white p-2 shadow-xl data-[side=bottom]:origin-top"
        >
          <figure className="relative aspect-[1.3333] w-full overflow-hidden rounded-md bg-gray-100">
            <Image
              src={`/previews/${name}.png`}
              className={cn(
                'absolute h-full w-full object-top',
                isLoading ? 'opacity-0' : 'animate-image-reveal'
              )}
              fill={true}
              alt={name}
              sizes="100%"
              onLoadingComplete={() => setIsLoading(false)}
            />
          </figure>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
