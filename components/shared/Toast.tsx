import * as ToastPrimitive from '@radix-ui/react-toast';
import cn from 'clsx';

interface DescriptionProps
  extends React.ComponentProps<typeof ToastPrimitive.Description> {
  children: React.ReactNode;
  className?: string;
}

function ToastDescription({ children, className }: DescriptionProps) {
  return (
    <ToastPrimitive.Description className={cn('p-2', className)}>
      {children}
    </ToastPrimitive.Description>
  );
}

interface ToastTitle extends React.ComponentProps<typeof ToastPrimitive.Title> {
  children: React.ReactNode;
  className?: string;
  status: 'success' | 'error' | 'warning' | 'info';
}

function ToastTitle({ children, className, status }: ToastTitle) {
  return (
    <ToastPrimitive.Title
      className={cn(
        'p-2 font-semibold',
        status === 'success' && 'border-b border-green-400/40',
        status === 'error' && 'border-b border-red-400/40',
        status === 'warning' && 'border-b border-yellow-400/40',
        status === 'info' && 'border-b border-blue-400/40',
        className
      )}
    >
      {children}
    </ToastPrimitive.Title>
  );
}

interface ToastProps extends React.ComponentProps<typeof ToastPrimitive.Root> {
  status: 'success' | 'error' | 'warning' | 'info';
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Toast(props: ToastProps) {
  const { status, ...restProps } = props;
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        {...restProps}
        className={cn(
          'fixed right-4 bottom-4 z-50 w-[280px] animate-toast-slide-in rounded-lg',
          status === 'success' &&
            'bg-[#DDFBE8] text-green-800 ring-1 ring-green-400/40',
          status === 'error' &&
            'bg-[#FEE2E2] text-red-800 ring-1 ring-red-400/40',
          status === 'warning' &&
            'bg-[#FEF3C7] text-yellow-800 ring-1 ring-yellow-400/40',
          status === 'info' &&
            'bg-[#BFDBFE] text-blue-800 ring-1 ring-blue-400/40',
          props.className
        )}
        open={props.open}
        onOpenChange={props.setOpen}
      >
        {props.children}
      </ToastPrimitive.Root>
    </ToastPrimitive.Provider>
  );
}

export { ToastDescription as Description, ToastTitle as Title };
