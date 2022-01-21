import React from "react";

const socialData = [
  {
    name: "Twitter",
    username: "@imarikchakma",
    href: "https://twitter.com/imarikchakma"
  },
  {
    name: "Email",
    username: "hello@arikko.dev",
    href: "mailto:hello@arikko.dev"
  },
  {
    name: "GitHub",
    username: "arikchakma",
    href: "https://github.com/arikchakma"
  },
  {
    name: "Instagram",
    username: "@imarikchakma",
    href: "https://instagram.com/imarikchakma"
  }
];

function Social({ name, username, href }) {
  return (
    <div className="flex justify-start items-center text-lg font-medium">
      <p className="w-24">{name}</p>
      <a
        className="ml-24 text-gray-500 no-underline hover:underline"
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
          <h3 className="font-bold text-3xl">Connect</h3>
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
