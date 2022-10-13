import type { NextPage } from 'next';
import Link from '../components/Link';

const Home: NextPage = () => {
  return (
    <main className="mx-auto max-w-[640px]">
      <div className="mt-10 text-base leading-[26px] text-[#313233]">
        <p>
          I&apos;m a web3 frontend developer interested in filmmaking, content
          creation, vlogging, and backend based in Bangladesh. I enjoy
          visualizing problems and writing code to solve them.
        </p>
        <p className="mt-5">
          I came across computer kinds of stuff in school and have spent five
          years as a cinematographer and editor. Taken programming more
          seriously after joining college, worked as a freelance developer, and
          am pursuing a BSc degree in Computer Science. Building projects and
          experimenting in a{' '}
          <Link
            href="https://1x3.studio"
            className="text-[#5d676a] underline transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70"
          >
            little lab
          </Link>
          —and now I&apos;m applying my knowledge to help build the future of
          money with{' '}
          <Link
            href="https://precog.finance/"
            className="text-[#5d676a] underline transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70"
          >
            Precog Finance.
          </Link>
        </p>

        <p className="mt-5">
          My goal is to build cool things that make people&apos;s lives easier
          or more interesting—whether that&apos;s through building an app or
          writing code for other people.
        </p>
      </div>
    </main>
  );
};

export default Home;
