import Link from '@/components/Link';

export default function Header() {
  return (
    <header className="mt-24">
      <ul className="flex items-center gap-3">
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/writings">Writings</Link>
        </li>
        <li>
          <Link to="/arts">Arts</Link>
        </li>
        <li>
          <Link to="/inspirations">Inspirations</Link>
        </li>
      </ul>
    </header>
  );
}
