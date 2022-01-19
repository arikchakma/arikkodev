import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Built>Built with love.</Built>
        <LoveTheLie>I love the way you lie.</LoveTheLie>
      </ContentWrapper>
    </Wrapper>
  );
}

// Wrapper
const Wrapper = styled.footer``;

const ContentWrapper = styled.div`
  padding-bottom: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
  font-size: 18px;
  line-height: 30px;

  color: #888888;
`;

const Built = styled.p``;

const LoveTheLie = styled.p``;
