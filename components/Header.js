import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'classnames';

import Logo from './icons/Logo';

const navigationData = [
  { name: 'Home', url: '/' },
  { name: 'Dashboard', url: '/dashboard' },
  { name: 'Blog', url: '/blog' }
  // { name: "Snippets", url: "/snippets" }
];

function Navigation({ name, url }) {
  const router = useRouter();
  const isActive = router.asPath === url;
  return (
    <Link href={url} passHref={true}>
      <a
        className={cn(
          isActive ? 'font-semibold' : 'font-normal',
          'py-2 px-3 no-underline text-base transition-all rounded-md hover:bg-gray-800'
        )}
      >
        {name}
      </a>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="my-11">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" passHref={true}>
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <ul className="list-none sm:hidden flex">
          {navigationData.map(el => (
            <li key={el.name}>
              <Navigation {...el} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
