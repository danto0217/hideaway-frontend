import React from 'react'
import styled from 'styled-components'
import { Flex } from 'hideaway-dex-uikit'
import SubNav from 'components/Menu/SubNav'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 16px;
  min-height: calc(100vh - 320px);
  margin-top:130px;
  // background-color: ${({ theme }) => (theme.isDark ? '#141c23' : '#cfcfcf')};
  // background-size: cover !important;
  // background: black;
  // background-image: ${({ theme }) => (theme.isDark ? `url('/images/black.png')` : `url('/images/light.png')`)};
  // background-repeat: no-repeat;
  // background-position: center top;
  // background: ${({ theme }) => (theme.isDark ? '#343135' : '#faf9fa')};
`
const BlurDiv = styled.div`
  position: relative;
  max-width: 485px;
  width: 100%;
  z-index : 1;
  :before {
    content: " ";
    display: flex;
    position: absolute;
    inset: 0px;
    transform: scale(1.1);
    filter: blur(50px);
    background-color: ${({ theme }) => (theme.isDark ? 'rgb(2, 43, 36)' : 'rgb(208, 255, 221)')};
    z-index: -2;
}

  // border: ${({ theme }) => (theme.isDark ? '1px solid white' : '1px solid #6c4b00')};
`

const Div = styled.div`
  position: relative;
  max-width: 485px;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#131313' : '#fff')};
  border-radius: 24px;
  padding: 1rem;
  padding-top: 30px;

  // border: ${({ theme }) => (theme.isDark ? '1px solid white' : '1px solid #6c4b00')};
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <StyledPage {...props}>
      <BlurDiv>
        <Div>
          <SubNav />
          {children}
        </Div>
      </BlurDiv>
      <Flex flexGrow={1} />
    </StyledPage>
  )
}

export default Page
