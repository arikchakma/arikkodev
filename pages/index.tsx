import type { NextPage } from 'next';
import Link from '../components/Link';
import Container from '@/layouts/Container';
import LinkPreview from '@/components/LinkPreview';

const Home: NextPage = () => {
  return (
    <Container>
      <article>
        <div className="mt-10 text-base leading-[26`px] text-[#313233]">
          <p>
            I&apos;m a frontend developer interested in filmmaking, content
            creation, vlogging, and backend based in Bangladesh. I enjoy
            visualizing problems and writing code to solve them.
          </p>
          <p className="mt-5">
            I came across computer kinds of stuff in school and have spent five
            years as a cinematographer and editor. Taken programming more
            seriously after joining college, worked as a freelance developer,
            and am pursuing a BSc degree in Computer Science. Building projects
            and experimenting in a{' '}
            <LinkPreview href="https://1x3.studio">little lab</LinkPreview>
            —and now writing html at{' '}
            <LinkPreview href="https://roadmap.sh">roadmap.sh</LinkPreview>.
            Building my side project,{' '}
            <LinkPreview href="https://shoutly.club">Shoutly(beta)</LinkPreview>
            .
          </p>

          <p className="mt-5">
            My goal is to build cool things that make people&apos;s lives easier
            or more interesting—whether that&apos;s through building an app or
            writing code for other people.
          </p>

          <div className="mt-5">
            <ul className="list-disc space-y-1 pl-6 marker:text-[#5d676a]">
              <li className="pl-1.5">
                Created <Link href="https://chat.arikko.dev/">Chat</Link>, where
                you can create project specific chat rooms and invite your team
                members.
              </li>
              <li className="pl-1.5">
                Building{' '}
                <LinkPreview href="https://tokens-army.vercel.app/">
                  Tokens.Army
                </LinkPreview>
                , which helps you explore your fantastic nfts on Ethreum and
                manage your ens domains.{' '}
                <span className="whitespace-nowrap font-medium leading-none tracking-tight text-[#313233]/70">
                  (cooking)
                </span>
              </li>
              <li className="pl-1.5">
                Created <Link href="https://og.arikko.dev/">OG</Link>, which
                gerates open graph data from a url and helps you create dynamic
                og images for Tokens.Army.{' '}
                <span className="whitespace-nowrap font-medium leading-none tracking-tight text-[#313233]/70">
                  (cooking)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </Container>
  );
};

export default Home;
