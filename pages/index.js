import Divider from '../components/Divider';
import ConnectSection from '../components/sections/ConnectSection';
import HeroSection from '../components/sections/HeroSection';
import Container from '../components/Container';

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <ConnectSection />
      <Divider />
    </Container>
  );
}
