import Head from 'next/head';
import HeroSection from '../components/sections/HeroSection';
import Header from '../layouts/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Arik Chakma - Developer, creator.</title>
        <meta
          name="description"
          content="A frontend chef, who is building his world."
        />
      </Head>
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
