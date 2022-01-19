import React from 'react';
import styled from 'styled-components';

export default function Divider() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Dot />
        <Dot />
        <Dot />
      </ContentWrapper>
    </Wrapper>
  );
}

// Wrapper
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;

  padding: 100px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

// Dot
const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #cccccc;
`;
