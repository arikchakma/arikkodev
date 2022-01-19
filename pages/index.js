import Head from 'next/head';
import Divider from '../components/Divider';
import ConnectSection from '../components/sections/ConnectSection';
import HeroSection from '../components/sections/HeroSection';
import Footer from '../layouts/Footer';
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
        <ConnectSection />
        <Divider />
        <Footer />
      </main>
    </div>
  );
}
