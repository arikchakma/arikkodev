import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps as any;
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
