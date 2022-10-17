import Link from '@/components/Link';

export default function Header() {
  return (
    <header className="mt-24">
      <nav className="">
        <ul className="flex items-center gap-3">
          <li>
            <Link to="/" className="text-[#4b5563]">
              About
            </Link>
          </li>
          <li>
            <Link to="/writing" className="text-[#4b5563]">
              Writing
            </Link>
          </li>
          <li>
            <Link to="/art" className="text-[#4b5563]">
              Art
            </Link>
          </li>
          <li>
            <Link to="/inspiration" className="text-[#4b5563]">
              Inspiration
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
