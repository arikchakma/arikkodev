import Link from '@/components/Link';
import Location from '@/components/Location';
import MarqueeLocation from '@/components/MarqueeLocation';

export default function Footer() {
  return (
    <footer>
      <hr className="mt-12 text-[#5d676a]" />

      <div className="mt-12">
        <ul className="flex items-center gap-1">
          <li>
            <Link href="https://twitter.com/ImArikChakma">Twitter</Link>
          </li>
          <li aria-hidden className="select-none">
            ·
          </li>
          <li>
            <Link href="https://instagram.com/imarikchakma">Instagram</Link>
          </li>
          <li aria-hidden className="select-none">
            ·
          </li>
          <li>
            <Link href="https://github.com/arikchakma">GitHub</Link>
          </li>
          <li aria-hidden className="select-none">
            ·
          </li>
          <li>
            <Link href="mailto:hello@arikko.dev">hello@arikko.dev</Link>
          </li>
        </ul>
      </div>

      <div className="mt-28">
        <div className="-sm:hidden">
          <Location />
        </div>
        <MarqueeLocation />
      </div>
    </footer>
  );
}
