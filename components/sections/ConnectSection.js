const socialData = [
  {
    name: 'Twitter',
    username: '@imarikchakma',
    href: 'https://twitter.com/imarikchakma'
  },
  {
    name: 'Email',
    username: 'hello@arikko.dev',
    href: 'mailto:hello@arikko.dev'
  },
  {
    name: 'GitHub',
    username: 'arikchakma',
    href: 'https://github.com/arikchakma'
  },
  {
    name: 'Instagram',
    username: '@imarikchakma',
    href: 'https://instagram.com/imarikchakma'
  }
];

function Social({ name, username, href }) {
  return (
    <div className=" grid justify-start items-center text-lg font-medium grid-cols-3 sm:grid-cols-2">
      <p>{name}</p>
      <a
        className="text-gray-500 no-underline hover:underline"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {username}
      </a>
    </div>
  );
}

export default function ConnectSection() {
  return (
    <section>
      <div className="mt-32">
        <div>
          <h2 className="font-bold text-3xl">Connect</h2>
          <p className="mt-3 text-xl max-w-xl">
            The best day to connect me was one year ago. The second best is
            today! Just buzz me anywhere.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {socialData.map(el => (
            <Social {...el} key={el.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
