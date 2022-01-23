import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import cn from 'classnames';

import Logo from './icons/Logo';
// import SwitchV from './Switch';

const Switch = dynamic(import('./Switch'));

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
          'py-2 px-3 no-underline text-base transition-all rounded-md hover:bg-gray-200 dark:hover:bg-gray-800'
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
        <div className="sm:hidden">
          <Link href="/" passHref={true}>
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <div className="flex gap-6 items-center sm:justify-between sm:w-full">
          <ul className="list-none flex">
            {navigationData.map(el => (
              <li key={el.name}>
                <Navigation {...el} />
              </li>
            ))}
          </ul>
          <Switch />
        </div>
      </nav>
    </header>
  );
}
