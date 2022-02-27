import NextLink from 'next/link';

function NameWrapper() {
  return (
    <div className="mt-28">
      <h1 className="text-xl font-normal">Arik Chakma</h1>
      <p className="mt-6 max-w-xl text-xl">
        Frontend developer interested in filmmaking, content creation, vlogging,
        and backend.
      </p>
    </div>
  );
}

function NowContainer() {
  return (
    <div className="mt-16">
      <p className="mt-4 max-w-xl text-xl">
        Currently working as a frontend developer at a creative agency called{' '}
        <NextLink
          href="http://eetpixel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a className="text-blue-500 hover:underline transition-all">eetpixel</a>
        </NextLink>
        .
      </p>
      <p className="mt-4 text-xl">Other stuff I am building right now.</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section>
      <div>
        <NameWrapper />
        <NowContainer />
      </div>
    </section>
  );
}
