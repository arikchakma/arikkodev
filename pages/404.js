import NextLink from 'next/link';

import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container title="404 - Arik Chakma">
      <div className="grid justify-center items-center text-center my-52">
        <h1 className="font-bold text-3xl tracking-tight">
          451 - Are You Lost Baby?
        </h1>
        <p className="mt-4 max-w-md text-gray-400">
          Oops! Looks like this page got lost in the matrix. Can you double
          check that URL?
        </p>

        <NextLink href="/">
          <a className="p-1 mt-8 justify-self-center font-semibold bg-gray-800 w-36 rounded-md text-center border-2 border-gray-700 text-gray-400 hover:text-gray-0 transition-all">
            Return Home
          </a>
        </NextLink>
      </div>
    </Container>
  );
}
