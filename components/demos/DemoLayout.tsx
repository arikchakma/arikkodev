import { ReactNode } from 'react';
import cn from 'clsx';

export default function DemoLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="">
      <div
        className={cn(
          'demo-card relative mt-12 grid w-full place-items-center rounded-lg bg-gray-100 p-24 ring-1 ring-gray-200',
          className
        )}
      >
        {children}
      </div>
      <div className="mt-4 flex items-center justify-center text-[#313233]">
        <span className="w-full whitespace-nowrap text-center text-sm font-medium opacity-60">
          Component&apos;s Demo
        </span>
      </div>
    </div>
  );
}
