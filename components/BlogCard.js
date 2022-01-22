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
      <a>
        <div>
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-xl font-semibold max-w-lg">{title}</h2>
            <p className="sm:hidden text-sm font-normal text-gray-400">
              {readingTime?.text || publishedAt}
            </p>
          </div>

          <p className="font-normal text-base text-gray-400 mt-2">{summary}</p>
        </div>
      </a>
    </NextLink>
  );
}
