import { getWritingIds, getNoteIds } from './sitemap.mjs';

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

export async function notesRedirects() {
  const notesIds = ['database-backup-import', 'productive-terminal'];
  const redirect = {};
  for (let id of notesIds) {
    redirect[`/notes/${id}`] = {
      status: 301,
      destination: `/writings/${id}`,
    };
  }
  redirect['/notes'] = {
    status: 301, // Moved Permanently
    destination: '/writings',
  };
  return redirect;
}
