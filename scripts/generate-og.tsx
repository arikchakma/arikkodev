import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import satori from 'satori';
import sharp from 'sharp';

type OpenGraphFileData = {
  type: 'writing' | 'note';
  id: string;
  title: string;
  description: string;
  tags?: string[];
};

async function getAllWritings() {
  const rawWritings = await fs.readdir(
    path.join(process.cwd(), '/src/content/writings'),
  );

  const writings: OpenGraphFileData[] = [];
  for (const writing of rawWritings) {
    const raw = await fs.readFile(
      path.join(process.cwd(), `/src/content/writings/${writing}`),
    );

    const { data } = matter(raw);
    if (data?.seo?.ogImageUrl) {
      continue;
    }

    writings.push({
      type: 'writing',
      id: writing.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      tags: data?.tags,
    });
  }

  return writings;
}

async function getAllNotes() {
  const rawNotes = await fs.readdir(
    path.join(process.cwd(), '/src/content/notes'),
  );

  const notes: OpenGraphFileData[] = [];
  for (const note of rawNotes) {
    const raw = await fs.readFile(
      path.join(process.cwd(), `/src/content/notes/${note}`),
    );

    const { data } = matter(raw);
    if (data?.seo?.ogImageUrl) {
      continue;
    }

    notes.push({
      type: 'note',
      id: note.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      tags: data?.tags,
    });
  }

  return notes;
}

async function openGraphTemplate({
  type,
  id,
  title,
  description,
  tags = [],
}: OpenGraphFileData) {
  const fileName = `${type}s/${id}.png`;
  console.log('🚀 Started: ', fileName);

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '100px',
        justifyContent: 'space-between',
        backgroundColor: '#FCFCFC',
      }}
    >
      <div
        style={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize: 12,
          lineHeight: 1,
          letterSpacing: '-0.015rem',
          color: '#313233',
          opacity: 0.5,
          display: 'flex',
        }}
      >
        {'/. { think } globally, { act } locally_'}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: '-0.16rem',
            color: '#313233',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: 32,
            lineHeight: 1.2,
            letterSpacing: '-0.04rem',
            color: '#313233',
            marginTop: 13,
            textWrap: 'balance',
          }}
        >
          {description}
        </div>

        {tags?.length > 0 && (
          <div
            style={{
              display: 'flex',
              marginTop: 30,
            }}
          >
            {tags.map((tag, counter) => (
              <div
                key={tag}
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1,
                  letterSpacing: '-0.0175rem',
                  color: '#18191A',
                  opacity: 0.35,
                  display: 'flex',
                }}
              >
                #{tag}
                {counter + 1 !== tags.length && (
                  <span style={{ margin: '0 3px' }}>·</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fs.readFile(
            path.join(process.cwd(), '/public/fonts/Inter-Regular.ttf'),
          ),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await fs.readFile(
            path.join(process.cwd(), '/public/fonts/Inter-Bold.ttf'),
          ),
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await fs.readFile(
            path.join(process.cwd(), '/public/fonts/Inter-ExtraBold.ttf'),
          ),
          weight: 800,
          style: 'normal',
        },
      ],
    },
  );

  await fs.mkdir(
    path.join(process.cwd(), `/public/images/og-images/${type}s`),
    {
      recursive: true,
    },
  );
  await sharp(Buffer.from(svg), { density: 150 })
    .png()
    .toFile(path.join(process.cwd(), `/public/images/og-images/${fileName}`));

  console.log('✅ Completed: ', fileName);
}

(async () => {
  const writings = await getAllWritings();
  const notes = await getAllNotes();

  const all = [...writings, ...notes];
  for (const file of all) {
    await openGraphTemplate(file);
  }
})();
