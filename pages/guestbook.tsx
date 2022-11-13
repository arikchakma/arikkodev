import Container from '@/layouts/Container';
import { signIn, useSession } from 'next-auth/react';
import cn from 'clsx';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinIcon from '@/components/icons/LoadingSpinIcon';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Guestbook } from '@prisma/client';
import prisma from '@/lib/prisma';
import GuestbookComp from '@/components/GuestbookComp';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

export default function GuestbookPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        queryClient.invalidateQueries({
          queryKey: ['guestbookReturn'],
        });
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
      <GuestbookComp fallbackData={fallbackData} />
    </Container>
  );
}

export const getStaticProps: GetStaticProps<{
  fallbackData: Guestbook[];
}> = async ctx => {
  const fallbackData = await prisma.guestbook.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
  return {
    props: {
      fallbackData: JSON.parse(JSON.stringify(fallbackData)).map(
        (message: Guestbook) => {
          return {
            id: message.id.toString(),
            created_by: message.created_by,
            body: message.body,
            created_at: format(
              new Date(message.updated_at),
              "d MMM yyyy 'at' h:mm bb"
            ),
          };
        }
      ),
    },
    revalidate: 60,
  };
};
