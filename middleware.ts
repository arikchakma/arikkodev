import { NextRequest, NextResponse } from 'next/server';

// run only on homepage
export const config = {
  matcher: '/',
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || 'BD';
  const city = geo?.city || 'Dhaka';

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);

  return NextResponse.rewrite(url);
}
