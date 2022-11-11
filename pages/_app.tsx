import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps as any;
  return (
    // Provide the client to your App
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
