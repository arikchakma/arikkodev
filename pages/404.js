import NextLink from 'next/link';

import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container title="404 - Arik Chakma">
      <div className="my-52 grid items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          451 - Are You Lost Baby?
        </h1>
        <p className="mt-4 max-w-md text-gray-400">
          Oops! Looks like this page got lost in the matrix. Can you double
          check that URL?
        </p>

        <NextLink href="/">
          <a className="mt-8 w-36 justify-self-center rounded-md border-2 border-gray-700 bg-gray-800 p-1 text-center font-semibold text-gray-400 transition-all hover:text-gray-0">
            Return Home
          </a>
        </NextLink>
      </div>
    </Container>
  );
}
