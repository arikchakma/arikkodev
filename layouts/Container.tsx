import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';
import { ReactNode } from 'react';

export default function Container(props: {
  [x: string]: any;
  children: ReactNode;
}) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta: {
    title: string;
    description?: string;
    image?: string;
    type?: string;
    keywords?: string;
    date?: string;
  } = {
    title: 'Arik Chakma - Developer, creator.',
    description: `Web3 Front-end developer, content creator, and an explorer.`,
    image: 'https://beta.arikko.dev/static/images/banner.png',
    keywords:
      'Arik Chakma, Arikko, Arik, Chakma, Developer, Frontend Master, Frontend Developer, Web3, Crypto Dev, Blockchain Developer, Web3 Frontend Developer',
    type: 'website',
    ...customMeta,
  };
  return (
    <>
      <div
        aria-hidden
        className="top-blur pointer-events-none sticky top-0 left-0 z-10 h-20 w-full cursor-none select-none opacity-95 backdrop-blur-[5px] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,rgba(252,252,252,1),rgba(252,252,252,0))] -sm:h-10"
      />
      <div className="mx-auto max-w-[640px] pb-20">
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <meta content={meta.description} name="description" />
          <meta name="keywords" content={meta.keywords} />
          <meta
            property="og:url"
            content={`https://beta.arikko.dev${router.asPath}`}
          />
          <link
            rel="canonical"
            href={`https://beta.arikko.dev${router.asPath}`}
          />
          <meta property="og:type" content={meta.type} />
          <meta property="og:site_name" content="Arik Chakma" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@imarikchakma" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
          {meta?.date && (
            <meta property="article:published_time" content={meta.date} />
          )}
        </Head>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
