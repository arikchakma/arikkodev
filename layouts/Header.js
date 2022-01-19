import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '../components/icons/Logo';
import theme from '../data/theme';
const navigationData = [
  { name: 'Home', url: '/' },
  { name: 'Dashboard', url: '/dashboard' },
  { name: 'Blog', url: '/blog' },
  { name: 'Snippets', url: '/snippets' }
];

function Navigation({ name, url }) {
  const router = useRouter();
  const isActive = router.asPath === url;
  return (
    <Link href={url} passHref={true}>
      <NavLink isActive={isActive}>{name}</NavLink>
    </Link>
  );
}

export default function Header() {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <Link href="/" passHref={true}>
            <LogoLink>
              <Logo />
            </LogoLink>
          </Link>
        </LogoWrapper>

        <NavigationWrapper>
          {navigationData.map(el => (
            <NavItem key={el.name}>
              <Navigation {...el} />
            </NavItem>
          ))}
        </NavigationWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header``;

const ContentWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 45px;
`;

// Logo
const LogoWrapper = styled.div``;

const LogoLink = styled.a``;

// Navigation
const NavigationWrapper = styled.ul`
  display: flex;
  list-style: none;
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  padding: 8px 12px;

  text-decoration: none;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: ${theme.dark.grey};
  border-radius: 5px;

  ${props =>
    props.isActive &&
    css`
      font-weight: 600;
      color: ${theme.dark.textColor};
    `}

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
