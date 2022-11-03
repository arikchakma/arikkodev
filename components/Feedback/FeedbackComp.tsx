import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import Textarea from '../shared/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

type FeedbackData = {
  feedback: string;
  emoji: string;
};

export default function FeedbackComp() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
  } = useForm<FeedbackData>();

  const { mutate, status } = useMutation(
    async (data: FeedbackData) => {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    {
      onSuccess: () => {
        console.log('Done');
      },
      onError: error => {
        setError('feedback', { message: (error as any).message });
      },
    }
  );

  const onSubmit = handleSubmit(data => {
    mutate(data);
    reset();
  });

  useEffect(() => {
    console.log('Rendering');
  });

  return (
    <form
      className="w-[min(300px,100%)] rounded-lg bg-link-color/[0.02] bg-bgWhite ring-1 ring-link-color/10"
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
          {status === 'loading' ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
