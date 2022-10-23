import Link from '@/components/Link';
import Location from '@/components/Location';
import MarqueeLocation from '@/components/MarqueeLocation';

export default function Footer() {
  return (
    <footer>
      <hr className="mt-12 text-[#5d676a]" />

      <div className="mt-12 break-words">
        <Link href="https://twitter.com/ImArikChakma">Twitter</Link>
        <span aria-hidden className="select-none px-1">
          ·
        </span>
        <Link href="https://instagram.com/imarikchakma">Instagram</Link>
        <span aria-hidden className="select-none px-1">
          ·
        </span>
        <Link href="https://github.com/arikchakma">GitHub</Link>
        <span aria-hidden className="select-none px-1">
          ·
        </span>
        <Link href="mailto:hello@arikko.dev">hello@arikko.dev</Link>
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
