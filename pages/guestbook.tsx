import Container from '@/layouts/Container';
import { signIn, useSession } from 'next-auth/react';
import cn from 'clsx';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinIcon from '@/components/icons/LoadingSpinIcon';

export default function GuestbookPage() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();

  const mutate = useMutation(
    ['guestbook', 'create'],
    async data => {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    },

    {
      onSuccess: () => {
        reset();
      },
    }
  );

  const onSubmit = handleSubmit(async data => {
    mutate.mutate(data as any);
  });

  return (
    <Container>
      <h1 className="mb-0 mt-10 text-4xl tracking-[-0.02em] [font-variation-settings:'wght'_700] -sm:text-3xl -sm:leading-[1.1111]">
        Guestbook
      </h1>
      <p className="mt-2">Leave a comment below. Surprise me with love!!</p>
      <form
        onSubmit={onSubmit}
        className={cn(
          'mt-5 h-10 w-full gap-2',
          session ? 'flex items-center' : 'grid grid-cols-2'
        )}
      >
        {session ? (
          <>
            <input
              {...register('body')}
              minLength={1}
              required
              placeholder="Your message"
              className="h-full w-full rounded-md bg-gray-200 px-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            />
            <button
              type="submit"
              className="grid h-full min-w-[96px] place-content-center rounded-md bg-gray-200 px-5 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              {mutate.status === 'loading' ? <LoadingSpinIcon /> : 'Sign'}
            </button>
          </>
        ) : (
          <>
            <button
              className="grid place-content-center rounded-md bg-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={e => {
                e.preventDefault();
                signIn('github');
              }}
            >
              Github
            </button>
            <button
              className="grid place-content-center rounded-md bg-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={e => {
                e.preventDefault();
                signIn('twitter');
              }}
            >
              Twitter
            </button>
          </>
        )}
      </form>
      <p className="mt-3 text-sm">
        Your information is only used to display your name and reply by email{' '}
        <span className="opacity-60">(expect twitter)</span>.
      </p>
    </Container>
  );
}
