import * as ToastPrimitive from '@radix-ui/react-toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ErrorToast = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed right-4 bottom-4 z-50 w-[280px] animate-toast-slide-in rounded-lg bg-red-200/50 text-red-800 ring-1 ring-red-400/40"
      >
        <ToastPrimitive.Title className="border-b border-red-400/40 p-2 font-semibold">
          Feedback error!
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="p-2">
          Having problems sending your feedback. Please try again later.
        </ToastPrimitive.Description>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default ErrorToast;
