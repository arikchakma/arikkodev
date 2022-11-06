import { ReactNode, useEffect, useRef } from 'react';
import cn from 'clsx';

export default function DemoLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }, []);

  return (
    <div className="">
      <div
        ref={cardRef}
        className={cn(
          'demo-card relative mt-12 grid w-full place-items-center rounded-lg bg-gray-100 p-24 ring-1 ring-gray-200',
          className
        )}
      >
        <div className="relative z-10">{children}</div>
      </div>
      <div className="mt-4 flex items-center justify-center text-[#313233]">
        <span className="w-full whitespace-nowrap text-center text-sm font-medium italic opacity-60">
          Component&apos;s Demo
        </span>
      </div>
    </div>
  );
}
