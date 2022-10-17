import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import Link from '../components/Link';
import Container from '@/layouts/Container';
import { useAtom } from 'jotai';
import geoAtom from 'atoms/geo';
import { useEffect } from 'react';

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [_, update] = useAtom(geoAtom);

  useEffect(() => {
    update({ country: props.country, city: props.city });
  }, [update, props.country, props.city]);

  return (
    <Container>
      <article>
        <div className="mt-10 text-base leading-[26`px] text-[#313233]">
          <p>
            I&apos;m a web3 frontend developer interested in filmmaking, content
            creation, vlogging, and backend based in Bangladesh. I enjoy
            visualizing problems and writing code to solve them.
          </p>
          <p className="mt-5">
            I came across computer kinds of stuff in school and have spent five
            years as a cinematographer and editor. Taken programming more
            seriously after joining college, worked as a freelance developer,
            and am pursuing a BSc degree in Computer Science. Building projects
            and experimenting in a{' '}
            <Link href="https://1x3.studio">little lab</Link>
            —and now I&apos;m applying my knowledge to help build the future of
            money with{' '}
            <Link href="https://precog.finance/">Precog Finance.</Link>
          </p>

          <p className="mt-5">
            My goal is to build cool things that make people&apos;s lives easier
            or more interesting—whether that&apos;s through building an app or
            writing code for other people.
          </p>

          <div className="mt-5">
            <ul className="list-disc space-y-1 pl-6 marker:text-[#5d676a]">
              <li className="pl-1.5">
                Building <Link href="https://precog.finance/">Tokens.Army</Link>
                , which helps you explore your fantastic nfts on Ethreum and
                manage your ens domains.
              </li>
              <li className="pl-1.5">
                Created <Link href="https://precog.finance/">OG</Link>, which
                gerates open graph data from a url and helps you create dynamic
                og images for Tokens.Army.
              </li>
            </ul>
          </div>
        </div>
      </article>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query,
});
