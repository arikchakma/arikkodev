import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import Textarea from '../shared/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import LoadingSpinIcon from '../icons/LoadingSpinIcon';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

type FeedbackData = {
  feedback: string;
  emoji: string;
};

export default function FeedbackComp({
  isSuccessOpen,
  setIsSuccessOpen,
  isErrorOpen,
  setIsErrorOpen,
  isOpen,
  setIsOpen,
}: {
  isSuccessOpen: boolean;
  setIsSuccessOpen: (open: boolean) => void;
  isErrorOpen: boolean;
  setIsErrorOpen: (open: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
  } = useForm<FeedbackData>();
  const router = useRouter();

  const { mutate, status } = useMutation(
    async (data: FeedbackData) => {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, route: router.asPath }),
      });
      return res.json();
    },
    {
      onSuccess: () => {
        if (isSuccessOpen) {
          setIsSuccessOpen(false);
          setTimeout(() => {
            setIsSuccessOpen(true);
          }, 400);
        } else {
          setIsSuccessOpen(true);
        }
        setIsOpen(false);
      },
      onError: error => {
        if (isErrorOpen) {
          setIsErrorOpen(false);
          setTimeout(() => {
            setIsErrorOpen(true);
          }, 400);
        } else {
          setIsErrorOpen(true);
        }
        setError('feedback', { message: (error as any).message });
      },
    }
  );

  const onSubmit = handleSubmit(data => {
    mutate(data);
  });

  return (
    <form
      className={`${inter.variable} w-[min(300px,100%)] rounded-lg bg-link-color/[0.02] bg-bgWhite font-sans ring-1 ring-link-color/10`}
      onSubmit={onSubmit}
    >
      <div className="px-5 pb-4 pt-5">
        <legend className="tracking-tight [font-variation-settings:'wght'_550]">
          Feedback
        </legend>
        <Textarea
          {...register('feedback')}
          aria-label="Feedback input"
          placeholder="Your feedback..."
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          className="mt-2"
          rows={4}
          error={errors}
        />
      </div>
      {/* Reactions */}
      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
        <RadioGroupPrimitive.Root
          {...register('emoji')}
          aria-label="Reactions"
          onValueChange={value => setValue('emoji', value)}
        >
          <div className="flex items-center gap-1.5">
            <RadioGroupPrimitive.Item
              id={'1'}
              value={'happy'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30 outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-yellow-500 data-state-checked:ring-1 data-state-checked:ring-yellow-500 data-state-checked:grayscale-0 data-state-unchecked:grayscale"
            >
              <span className="text-lg leading-none">😊</span>
            </RadioGroupPrimitive.Item>
            <RadioGroupPrimitive.Item
              id={'2'}
              value={'party'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30 outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-yellow-500 data-state-checked:ring-1 data-state-checked:ring-yellow-500 data-state-checked:grayscale-0 data-state-unchecked:grayscale"
            >
              <span className="text-lg leading-none">🎉</span>
            </RadioGroupPrimitive.Item>
            <RadioGroupPrimitive.Item
              id={'3'}
              value={'sad'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30 outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-yellow-500 data-state-checked:ring-1 data-state-checked:ring-yellow-500 data-state-checked:grayscale-0 data-state-unchecked:grayscale"
            >
              <span className="text-lg leading-none">😢</span>
            </RadioGroupPrimitive.Item>
          </div>
        </RadioGroupPrimitive.Root>

        <button
          type="submit"
          className="flex min-h-[32px] min-w-[84px] items-center justify-center rounded-sm bg-text-dark text-center font-medium leading-none tracking-tight text-bgWhite"
        >
          {status === 'loading' ? <LoadingSpinIcon /> : 'Submit'}
        </button>
      </div>
    </form>
  );
}
