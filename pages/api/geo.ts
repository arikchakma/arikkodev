import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
  const country = req.geo?.country || 'BD';
  const city = req.geo?.city || 'Dhaka';

  return NextResponse.json({
    country,
    city,
  });
}
