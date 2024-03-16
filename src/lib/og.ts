export function getOpenGraphImage(type: 'writing' | 'note', id: string) {
  const isDev = import.meta.env.DEV;
  return `${
    isDev ? 'http://localhost:3000' : 'https://arikko.dev'
  }/images/og-images/${type}s/${id}.png`;
}
