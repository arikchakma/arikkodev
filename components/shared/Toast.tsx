import * as ToastPrimitive from '@radix-ui/react-toast';
import cn from 'clsx';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface ToastProps extends React.ComponentProps<typeof ToastPrimitive.Root> {
  status: 'success' | 'error' | 'warning' | 'info';
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description: string;
}

export default function Toast(props: ToastProps) {
  const { status, open, setOpen, className, ...restProps } = props;
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        {...restProps}
        className={cn(
          inter.variable,
          'fixed right-4 bottom-4 z-50 w-[280px] animate-toast-slide-in rounded-lg',
          status === 'success' &&
            'bg-[#DDFBE8] text-green-800 ring-1 ring-green-400/40',
          status === 'error' &&
            'bg-[#FEE2E2] text-red-800 ring-1 ring-red-400/40',
          status === 'warning' &&
            'bg-[#FEF3C7] text-yellow-800 ring-1 ring-yellow-400/40',
          status === 'info' &&
            'bg-[#BFDBFE] text-blue-800 ring-1 ring-blue-400/40',
          className
        )}
        open={open}
        onOpenChange={setOpen}
      >
        {props.title && (
          <ToastPrimitive.Title
            className={cn(
              'p-2 font-semibold',
              status === 'success' && 'border-b border-green-400/40',
              status === 'error' && 'border-b border-red-400/40',
              status === 'warning' && 'border-b border-yellow-400/40',
              status === 'info' && 'border-b border-blue-400/40'
            )}
          >
            {props.title}
          </ToastPrimitive.Title>
        )}
        <ToastPrimitive.Description className="p-2">
          {props.description}
        </ToastPrimitive.Description>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
