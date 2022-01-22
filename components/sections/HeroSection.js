function NameWrapper() {
  return (
    <div className="mt-28">
      <h1 className="font-normal text-xl">Arik Chakma</h1>
      <p className="max-w-xl text-xl mt-6">
        Frontend developer interested in filmmaking, content creation, vlogging,
        and backend.
      </p>
    </div>
  );
}

function NowContainer() {
  return (
    <div className="mt-16">
      <p className="max-w-xl mt-4 text-xl">
        Currently working as a frontend developer at a creative agency
        called—eetpixel.
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
