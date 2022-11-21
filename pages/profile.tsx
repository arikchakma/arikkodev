import { getAuthSession } from '@/lib/get-server-session';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Profile({ session }: { session: Session }) {
  if (!session) {
    return (
      <main className="flex h-screen items-center justify-center">
        {/* <button
          className="rounded-lg bg-green-300/40 p-2 px-3 font-medium text-green-700 ring-1 ring-green-500"
          onClick={() =>
            signIn('twitter', {
              callbackUrl: '/profile',
            })
          }
        >
          Sign In with Twitter
        </button> */}
        <button
          className="rounded-lg bg-green-300/40 p-2 px-3 font-medium text-green-700 ring-1 ring-green-500"
          onClick={() =>
            signIn('github', {
              callbackUrl: '/profile',
            })
          }
        >
          Sign In with Github
        </button>
      </main>
    );
  }
  return (
    <main className="flex h-screen items-center justify-center">
      <div>
        <div className="flex flex-col items-center">
          <Image
            src={`${session?.user?.image}`}
            alt={`${session?.user?.name}`}
            width={42}
            height={40}
            className="overflow-hidden rounded-full"
          />
          <h1 className="mt-1 text-center text-xl font-bold">
            {session?.user?.name}
          </h1>
          <p className="text-sm font-medium">{session?.user?.email}</p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            className="rounded-lg bg-red-300/40 p-2 px-3 font-medium text-red-700 ring-1 ring-red-500"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getAuthSession(context);
  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  return {
    props: {
      session: {
        ...session,
        user: {
          ...session?.user,
          email: null,
        },
      },
    },
  };
};
