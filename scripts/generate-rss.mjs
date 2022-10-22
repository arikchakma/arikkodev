import { writeFileSync } from 'fs';
import RSS from 'rss';
import { readFileSync } from 'fs';

const allWritings = readFileSync(
  '.contentlayer/generated/Writing/_index.json',
  'utf8'
);

async function generate() {
  const feed = new RSS({
    title: 'Arik Chakma',
    site_url: 'https://arikko.dev',
    feed_url: 'https://arikko.dev/feed.xml',
  });

  JSON.parse(allWritings).map(post => {
    feed.item({
      title: post.title,
      url: `https://arikko.dev/blog/${post.slug}`,
      date: post.date,
      description: post.summary,
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
