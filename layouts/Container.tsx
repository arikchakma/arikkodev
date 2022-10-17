import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[640px] pb-20">
      <Head>
        <title>Arik Chakma</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
