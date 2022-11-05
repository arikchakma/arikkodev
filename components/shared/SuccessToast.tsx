import * as ToastPrimitive from '@radix-ui/react-toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SuccessToast = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed right-4 bottom-4 z-50 w-[280px] animate-toast-slide-in rounded-lg bg-green-200/50 text-green-800 ring-1 ring-green-400/40"
      >
        <ToastPrimitive.Title className="border-b border-green-400/40 p-2 font-semibold">
          Feedback sent!
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="p-2">
          Thank you for your feedback!
        </ToastPrimitive.Description>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default SuccessToast;
