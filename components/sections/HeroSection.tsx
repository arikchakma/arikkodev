function NameWrapper() {
  return (
    <div className="mt-28">
      <h1 className="text-xl font-normal">Arik Chakma</h1>
      <p className="mt-6 max-w-xl text-xl">
        Web3 Frontend developer interested in filmmaking, content creation, vlogging, and backend.
      </p>
    </div>
  );
}

function NowContainer() {
  return (
    <div className="mt-16">
      <p className="mt-4 max-w-xl text-xl">
        Currently working as a frontend developer at a creative agency called{' '}
        <a
          className="text-blue-700 transition-all hover:underline dark:text-blue-500"
          href="http://eetpixel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          eetpixel
        </a>
        .
      </p>
      <p className="mt-4 text-xl">Other stuff I am building right now.</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section>
      <NameWrapper />
      <NowContainer />
    </section>
  );
}
