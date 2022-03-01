import Divider from '@/components/Divider';
import ConnectSection from '@/components/sections/ConnectSection';
import HeroSection from '@/components/sections/HeroSection';
import Container from '@/components/Container';
import BlogSection from '@/components/sections/BlogSection';
import Newsletter from '@/components/Newsletter';
import ActivitesSection from '@/components/sections/ActivitesSection';

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <BlogSection />
      <ActivitesSection />
      <ConnectSection />
      <Newsletter blog={false} />
      <Divider />
    </Container>
  );
}
