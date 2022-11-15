import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import LoadingSpinIcon from '../icons/LoadingSpinIcon';
import cn from 'clsx';
import { useState } from 'react';
import Toast from '../shared/Toast';

export default function GuestbookForm() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();

  const mutate = useMutation(
    ['guestbookCreate'],
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
      onSuccess: async () => {
        reset();
        if (isSuccessOpen) {
          setIsSuccessOpen(false);
          setTimeout(() => {
            setIsSuccessOpen(true);
          }, 400);
        } else {
          setIsSuccessOpen(true);
        }
        queryClient.invalidateQueries({
          queryKey: ['guestbookReturn'],
        });
      },
      onError: async () => {
        if (isErrorOpen) {
          setIsErrorOpen(false);
          setTimeout(() => {
            setIsErrorOpen(true);
          }, 400);
        } else {
          setIsErrorOpen(true);
        }
      },
    }
  );

  const onSubmit = handleSubmit(async data => {
    mutate.mutate(data as any);
  });
  return (
    <>
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
              className="grid place-content-center rounded-md bg-gray-200 font-medium transition-colors duration-150 ease-in-out hover:bg-gray-300/30 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={e => {
                e.preventDefault();
                signIn('github');
              }}
            >
              Github
            </button>
            {/* <button
              className="grid place-content-center rounded-md bg-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={e => {
                e.preventDefault();
                signIn('twitter');
              }}
            >
              Twitter
            </button> */}
          </>
        )}
      </form>
      <Toast
        open={isSuccessOpen}
        setOpen={setIsSuccessOpen}
        description="Thanks for signing the guestbook!"
        status="success"
      />
      <Toast
        open={isErrorOpen}
        setOpen={setIsErrorOpen}
        description="Something went wrong. Please try again."
        status="error"
      />
    </>
  );
}
