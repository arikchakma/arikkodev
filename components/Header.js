import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import cn from 'classnames';

import Logo from './icons/Logo';
import Switch from './Switch';

const navigationData = [
  { name: 'Home', url: '/' },
  // { name: 'Dashboard', url: '/dashboard' },
  { name: 'Blog', url: '/blog' }
];

function Navigation({ name, url }) {
  const router = useRouter();
  const isActive = router.asPath === url;
  return (
    <Link href={url} passHref={true}>
      <a
        className={cn(
          isActive ? 'font-semibold' : 'font-normal',
          'rounded-md py-2 px-3 text-base no-underline transition-all hover:bg-gray-200 dark:hover:bg-gray-800'
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
      <nav className="flex items-center justify-between">
        <div className="sm:hidden">
          <Link href="/" passHref={true}>
            <a aria-label="Arik Chakma's logo">
              <Logo />
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-6 sm:w-full sm:justify-between">
          <ul className="flex list-none">
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
