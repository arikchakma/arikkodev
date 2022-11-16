/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const fontBold = fetch(
  new URL('../../public/static/fonts/Inter-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer());
const fontRegular = fetch(
  new URL('../../public/static/fonts/Inter-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer());
import { NextRequest } from 'next/server';

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title');
  const summary = searchParams.get('summary');
  const date = searchParams.get('date');

  const interBold = await fontBold;
  const interRegular = await fontRegular;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FCFCFC',
          position: 'relative',
          color: '#313233',
          fontFamily: 'Inter Regular',
        }}
      >
        <img
          src="https://arikko.dev/static/images/gradient.png"
          tw="absolute inset-0 w-full h-full"
        />

        <div
          tw="flex items-center font-bold text-sm absolute left-[100px] top-[100px] opacity-50"
          style={{ fontFamily: 'Inter Bold' }}
        >
          {'/. {think} globally, {act} locally_'}
        </div>

        <div tw="absolute flex flex-col left-[100px] bottom-[100px]">
          <div
            tw="text-[48px] -mb-[8px] w-[900px] text-left"
            style={{ fontFamily: 'Inter Bold' }}
          >
            {title}
          </div>
          <p tw="flex text-[24px] mb-[10px] w-[800px] text-left opacity-80">
            {summary}
          </p>
          <div tw="flex items-center opacity-50">
            <div tw="leading-none">Arik Chakma</div>
            <div tw="ml-2">·</div>
            <div tw="ml-2">{date}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter Bold',
          weight: 700,
          data: interBold,
          style: 'normal',
        },
        {
          name: 'Inter Regular',
          weight: 400,
          data: interRegular,
          style: 'normal',
        },
      ],
    }
  );
}
