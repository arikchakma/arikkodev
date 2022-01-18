import React from 'react';
import styled from 'styled-components';
import theme from '../../data/theme';

function NameWrapper() {
  return (
    <NameContainer>
      <NameHeading>Arik Chakma</NameHeading>
      <NameSubHeading>
        Frontend developer interested in filmmaking, content creation, vlogging,
        and backend.
      </NameSubHeading>
    </NameContainer>
  );
}

function NowContainer() {
  return (
    <NowWrapper>
      <NowHeading>Now</NowHeading>
      <NowSub>
        Currently working as a frontend developer at a creative agency
        called—Eetpixel.
      </NowSub>
      <NowText>Other stuff I am building right now.</NowText>
    </NowWrapper>
  );
}

export default function HeroSection() {
  return (
    <Wrapper>
      <ContentWrapper>
        <NameWrapper />
        <NowContainer />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section``;

const ContentWrapper = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 0 25px;
`;

// Name Wrapper
const NameContainer = styled.div`
  margin-top: 100px;
`;

const NameHeading = styled.h1`
  font-style: italic;
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;
`;

const NameSubHeading = styled.p`
  margin-top: 20px;

  max-width: 600px;
  font-size: 20px;
  line-height: 30px;
`;

// Now Wrapper
const NowWrapper = styled.div`
  margin-top: 60px;
`;

const NowHeading = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: ${theme.dark.textColor};
  opacity: 0.7;
`;

const NowSub = styled.p`
  max-width: 600px;

  margin-top: 15px;
  font-size: 20px;
  line-height: 30px;
`;

const NowText = styled.p`
  margin-top: 15px;
  font-size: 20px;
  line-height: 30px;
`;
