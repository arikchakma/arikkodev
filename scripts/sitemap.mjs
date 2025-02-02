import path from 'path';
import fs from 'fs';

export async function getWritingIds() {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'src/content/writings'),
  );

  // Only include mdx files
  const writingIds = files
    .filter((file) => path.extname(file) === '.mdx')
    // Remove the .mdx extension to get the id of the writing
    .map((file) => file.replace(/\.mdx$/, ''));
  return writingIds;
}

export function shouldIndexPage(pageUrl) {
  return !['https://arikko.dev/404'].includes(pageUrl);
}

export async function serializeSitemap(item) {
  const highPriorityPages = [
    'https://arikko.dev',
    'https://arikko.dev/projects',
    'https://arikko.dev/writings',
    'https://arikko.dev/notes',
    ...(await getWritingIds()).flatMap((id) => [
      `https://arikko.dev/writings/${id}`,
    ]),
  ];

  for (let pageUrl of highPriorityPages) {
    if (item.url === pageUrl) {
      return {
        ...item,
        // @ts-ignore
        changefreq: 'monthly',
        priority: 1,
      };
    }
  }
  return undefined;
}
