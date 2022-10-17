import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document(props: DocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="w-screen overflow-x-hidden px-5 font-sans antialiased selection:bg-[#95a5ac40]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
