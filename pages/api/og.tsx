/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

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
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FCFCFC',
          position: 'relative',
        }}
      >
        <img
          src="https://arikko.dev/static/images/gradient.png"
          width={1200}
          height={630}
          tw="absolute -z-10 inset-0"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
