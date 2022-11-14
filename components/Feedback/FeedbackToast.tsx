import ToastRoot, { Description, Title } from '@/components/shared/Toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function SuccessToast(props: Props) {
  const { open, setOpen } = props;

  return (
    <ToastRoot status="success" open={open} setOpen={setOpen}>
      <Title status="success">Feedback sent!</Title>
      <Description>Thank you for your feedback!</Description>
    </ToastRoot>
  );
}

export function ErrorToast(props: Props) {
  const { open, setOpen } = props;

  return (
    <ToastRoot status="error" open={open} setOpen={setOpen}>
      <Title status="error">Feedback error!</Title>
      <Description>
        Having problems sending your feedback. Please try again later.
      </Description>
    </ToastRoot>
  );
}
