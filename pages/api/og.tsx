import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div tw="absolute inset-0 bg-[url()] h-full w-full flex items-center justify-center">
          Hello
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
