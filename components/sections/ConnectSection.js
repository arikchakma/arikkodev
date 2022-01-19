import React from 'react';
import styled from 'styled-components';
import theme from '../../data/theme';

const socialData = [
  {
    name: 'Twitter',
    username: '@imarikchakma',
    href: 'https://twitter.com/imarikchakma'
  },
  {
    name: 'Email',
    username: 'hello@arikko.dev',
    href: 'mailto:hello@arikko.dev'
  },
  {
    name: 'GitHub',
    username: 'arikchakma',
    href: 'https://github.com/arikchakma'
  },
  {
    name: 'Instagram',
    username: '@imarikchakma',
    href: 'https://instagram.com/imarikchakma'
  }
];

function Social({ name, username, href }) {
  return (
    <SocialContainer>
      <SocialName>{name}</SocialName>
      <SocialLink href={href} target="_blank">
        {username}
      </SocialLink>
    </SocialContainer>
  );
}

export default function ConnectSection() {
  return (
    <Wrapper>
      <ContentWrapper>
        <TextWrapper>
          <Heading>Connect</Heading>
          <SubHeading>
            The best day to connect Arik was one year ago. The second best is
            today! Just buzz me anywhere.
          </SubHeading>
        </TextWrapper>

        <SocialWrapper>
          {socialData.map(el => (
            <Social {...el} key={el.name} />
          ))}
        </SocialWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

// Wrapper
const Wrapper = styled.section``;

const ContentWrapper = styled.div`
  margin-top: 120px;
`;

// Text Wrapper
const TextWrapper = styled.div``;

const Heading = styled.h3`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`;

const SubHeading = styled.p`
  margin-top: 10px;

  font-size: 20px;
  line-height: 30px;
`;

const SocialWrapper = styled.div`
  margin-top: 50px;

  display: grid;
  gap: 15px;
`;

const SocialContainer = styled.div`
  display: grid;
  justify-content: left;
  align-items: center;

  grid-template-columns: 100px 1fr;

  font-size: 18px;
  line-height: 30px;
  font-weight: 500;
`;

const SocialName = styled.p``;

const SocialLink = styled.a`
  margin-left: 100px;

  color: ${theme.dark.grey};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
