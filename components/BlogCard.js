import NextLink from 'next/link';

export default function BlogCard({
  title,
  readingTime,
  summary,
  publishedAt,
  slug
}) {
  return (
    <NextLink href={`/blog/${slug}`}>
      <a className="hover:opacity-70">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="max-w-lg text-xl font-semibold">{title}</h2>
            <p className="text-sm font-normal text-gray-400 sm:hidden">
              {readingTime?.text || publishedAt}
            </p>
          </div>

          <p className="mt-2 text-base font-normal text-gray-400">{summary}</p>
        </div>
      </a>
    </NextLink>
  );
}
