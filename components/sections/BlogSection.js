import NextLink from 'next/link';

import BlogCard from '../BlogCard';
import Arrow from '@/icons/Arrow';

export default function BlogSection() {
  return (
    <section>
      <div className="mt-28">
        <h2 className="font-bold text-3xl">Writings</h2>

        <div className="mt-5 grid gap-8">
          <BlogCard
            title="How I developed my site with NextJs and Tailwindcss"
            publishedAt="22 Jan 2022"
            summary="A deep-dive on everything I have used in the building my modern stack based blog-polio using NextJs, tailwindcss and contentlayer."
            slug="how-i-developed-my-site-with-nextjs-and-tailwind"
          />
        </div>

        <NextLink href="/blog">
          <a className="mt-8 flex gap-1 items-center text-lg hover:underline">
            Read all posts <Arrow />
          </a>
        </NextLink>
      </div>
    </section>
  );
}
