import { getWritingIds } from './sitemap.mjs';

export async function writingRedirects() {
  const writingIds = await getWritingIds();
  const redirect = {};
  for (let id of writingIds) {
    redirect[`/writing/${id}`] = {
      status: 301,
      destination: `/writings/${id}`,
    };
  }
  redirect['/writing'] = {
    status: 301, // Moved Permanently
    destination: '/writings',
  };
  return redirect;
}
