import type { NextPage } from 'next';
import Link from '../components/Link';

const Home: NextPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-[640px] bg-[#FCFCFC] font-[Inter] text-base leading-[26px] tracking-[0.08px] text-[#313233]">
      <p>
        I&apos;m a web3 frontend developer interested in filmmaking, content
        creation, vlogging, and backend based in Bangladesh. I enjoy visualizing
        problems and writing code to solve them.
      </p>
      <p className="mt-5">
        I came across computer kinds of stuff in school and have spent five
        years as a cinematographer and editor. Taken programming more seriously
        after joining college, worked as a freelance developer, and am pursuing
        a BSc degree in Computer Science. Building projects and experimenting in
        a{' '}
        <Link
          href="https://1x3.studio"
          className="text-[#5d676a] underline hover:no-underline hover:opacity-70"
        >
          little lab
        </Link>
        —and now I&apos;m applying my knowledge to help build the future of
        money with{' '}
        <Link
          href="https://precog.finance/"
          className="text-[#5d676a] underline hover:no-underline hover:opacity-70"
        >
          Precog Finance.
        </Link>
      </p>
    </div>
  );
};

export default Home;
