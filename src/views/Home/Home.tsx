/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, Grid } from 'hideaway-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import * as TokenBalance from 'hooks/useTokenBalance'
import { usePriceColaBusd } from 'state/farms/hooks'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { getColaAddress } from 'utils/addressHelpers'
import Footer from 'components/Menu/Footer'

import HomeCardList from 'views/Home/components/HomeCardList'
import CardValue from './components/CardValue'
// import Footer from '../../components/Menu/Footer'
import Lock from './components/Lock'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 320px);
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  background: ${({ theme }) => (theme.isDark ? '#343135' : '#fbfbfb')};
`

const StyledText = styled(Text)`
  font-size: 20px;
  line-height: 28px;
  max-width: 480px;
  padding: 0px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#222')};
  
`

const StyledText1 = styled(Text)`
  font-size: 14px;
  line-height: 28px;
  max-width: 480px;
  padding: 0px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#7d7d7d')};
  `



const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  max-width: 1188px;
  width: 90%;
  justify-content: space-between;
  margin-bottom: 24px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const StyledCol = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : 'white')};
  border-top-left-radius: 36px;
  border-bottom-right-radius: 36px;
  border-radius: 20px;
  height: inherit;
  font-size: 12px;
  justify-content: space-between;
  width: 100%;
  margin-left: 12px;
  @media screen and (max-width: 800px) {
    margin: 12px 0;
    width: 100%;
  }
`

const FeatureCol = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : 'white')};
  border-top-left-radius: 36px;
  border-bottom-right-radius: 36px;
  border-radius: 20px;
  height: inherit;
  font-size: 12px;
  justify-content: space-between;
  width: 33%;
  margin-left: 12px;
  @media screen and (max-width: 800px) {
    margin: 12px 0;
    width: 100%;
  }
`

const SwapCard = styled.a`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(34, 34, 34);
    background: url(./images/landing-back.png) right center / auto 100% no-repeat border-box white;
    background-position: right center;
    background-color: ${({ theme }) => (theme.isDark ? ' rgb(27, 27, 27)' : '#fff')};
    border: ${({ theme }) => (theme.isDark ? ' 4px solid   rgb(19, 19, 19)' : ' 4px solid rgb(255, 255, 255)')}; 
    text-decoration: none;
    padding: 24px;
    border-radius: 24px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    transition: border 250ms;
    height:360px;
    cursor : pointer;
    :hover {
        border: 1px solid rgb(206, 206, 206);
    }
`

const FeatureCard = styled.a`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(34, 34, 34);
    background-position: right center;
    background-color: ${({ theme }) => (theme.isDark ? ' rgb(27, 27, 27)' : '#fff')};
    border: ${({ theme }) => (theme.isDark ? ' 1px solid   rgb(19, 19, 19)' : ' 1px solid rgb(206, 206, 156)')}; 
    text-decoration: none;
    padding: 24px;
    border-radius: 24px;
    border-image: initial;
    transition: border 250ms;
    height:260px;
    cursor : pointer;
    :hover {
        border: 1px solid rgb(206, 206, 206);
    }
`


const SwapText = styled.div`
    font-size: 28px;
    line-height: 36px;
    font-weight: 535;
    color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
`


const LandingTitle = styled.h1`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#3dad5d')};
  font-weight: 600;
  font-size: 2rem;
  line-height: 120%;
`

const ProtocolBanner = styled.div`
  height: 140px;
  flex-direction: row;
  width: 100%;
  border-radius: 32px;
  margin: 80px 0px;
  display: flex;
  justify-content: space-between;
  padding: 32px 48px;
  box-shadow: rgba(51, 53, 72, 0.04) 0px 10px 24px;
  background: ${({ theme }) => (theme.isDark
    ? 'url(data:image/png;base64,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), linear-gradient(90deg, rgb(88, 123, 255) 0%, rgb(132, 64, 242) 100%)'
    : 'url(data:image/png;base64,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), linear-gradient(90deg, rgb(48, 135, 73) 0%, rgb(145, 216, 166) 100%)')};
`
const ProtocolText = styled.div`
    color: white;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
`

const ProtocolLearnMore = styled.a`
    color: white;
    border: 1px solid white;
    background-color: transparent;
    display: flex;
    padding: 16px;
    width: 200px;
    line-height: 24px;
    font-weight: 535;
    border-radius: 16px;
    outline: none;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms;
    transform: perspective(1px) translateZ(0px);
    cursor: pointer;
    align-items: center;
    justify-content: center;
`
const Home: React.FC = () => {
  const { t } = useTranslation()

  const totalSupply = TokenBalance.useTotalSupply()
  const burnedBalance = getBalanceNumber(TokenBalance.useBurnedBalance(getColaAddress()))
  const colaSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const colaPrice = usePriceColaBusd()
  const [colaUSDPrice, setColaUSDPrice] = useState(0)
  const { balance: colaBalance } = TokenBalance.default(getColaAddress())
  const [colaMarketCapUSDBalance, setColaMarketCapUSDBalance] = useState(0)
  const { account } = useWeb3React()

  useEffect(() => {
    setColaUSDPrice(Number(getFullDisplayBalance(colaPrice, 1, 18)))
    setColaMarketCapUSDBalance(new BigNumber(colaSupply).multipliedBy(colaPrice).toNumber())
  }, [colaPrice, colaSupply])

  return (
    <>
      <StyledPage>
        <StyledPage>
          <Row style={{ marginTop: "100px" , justifyContent:"center" }}>
            <LandingTitle>
              Trade crypto with confidence
            </LandingTitle>
          </Row>
          <Row>
            <StyledCol>
              <SwapCard href="/swap">
                <div >
                  <SwapText>
                    Swap tokens
                  </SwapText>
                </div>
                <StyledText>
                  Buy, sell, and explore tokens on Ethereum, Polygon, Optimism, and more.
                  <div style={{ color: "#3dad5d", fontWeight: "535", margin: "24px 0px 0px", transition: "opacity 250ms", fontSize: "20px", lineHeight: "28px", maxWidth: "480px" }}>
                    Trade Tokens
                  </div>
                </StyledText>
              </SwapCard>
            </StyledCol>

          </Row>

          <Row>
            <FeatureCol>
              <FeatureCard href="#">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <SwapText>
                    Hideaway?
                  </SwapText>
                  <img
                    src="./images/earning/cola.png"
                    alt="What is Horswap?"
                    style={{ minWidth: "20px", minHeight: "20px", maxHeight: "48px", maxWidth: "48px" }}>
                  </img>
                </div>
                <StyledText1>
                  Read more about this censorship resistant and privacy protecting Uniswap Interface.
                  <div style={{ color: "#3dad5d", fontWeight: "535", margin: "24px 0px 0px", transition: "opacity 250ms", fontSize: "16px", lineHeight: "28px", maxWidth: "480px" }}>
                    Read More
                  </div>
                </StyledText1>
              </FeatureCard>
            </FeatureCol>
            <FeatureCol>
              <FeatureCard href="/pool">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <SwapText>
                    Earn
                  </SwapText>
                  <img
                    src="data:image/png;base64,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"
                    alt="Analytics"
                    style={{ minWidth: "20px", minHeight: "20px", maxHeight: "48px", maxWidth: "48px" }}>
                  </img>
                </div>
                <StyledText1>
                  Provide liquidity to pools on Uniswap and earn fees on swaps.
                  <div style={{ color: "#3dad5d", fontWeight: "535", margin: "24px 0px 0px", transition: "opacity 250ms", fontSize: "16px", lineHeight: "28px", maxWidth: "480px" }}>
                    Provide liquidity
                  </div>
                </StyledText1>
              </FeatureCard>
            </FeatureCol>
            <FeatureCol>
              <FeatureCard target="_blank" href="https://docs.uniswap.org">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <SwapText>
                    Build dApps
                  </SwapText>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAlQSURBVHgB7VzNbiPHEa7qHmm9gACRFwECdNhFACOBgUD0wUBuIV8gfoV9BOdF9hH2EbJ+AdIXI4APkS5GAl+kg4AFdCEFMFlA4nSlfrpnRoKdaLT6WZH1ETTJkVaSv6/rp6uqB8DhcDgcDofD4XA4HA6Hw+FwOBwOx7oD4Q748OHkFRC8QwqHRGEXU/ie6vDd/uv9U3D0Qm8BPsxPXuEV/YNWMAQKAMQ/giJBios6xcnB671jcNwaAXqCLldvgdIQArF8pBISq8AKDAOm6fnJ+SE4bo3eAoSQvhXiEZl3JBL6UT4HkPfDFeD07BcX4bboLQAv+IUIwCse1f/o+/xZLALSIMTgItwSvQVImI5JV738ayKw1W/uCFQAEWKAGGdnv8xdhP+D3gJAhDfscuaACYoFMOmg5AcTgzQyw4BfWISli/A/0FuA/eEfTkMKkxBgrn5fAzGRxgFzRaCC6GcWYUWzs58vXYTfQH8LYOztfXkMNU54rV+gCWCxQKyCVcBiFeaedjlrmp0duQi/hjsJIBAR2OOMmeRFFkEzIZT0lH+qxgVNjEgSpgEHjdnZT+Qi3MCdBRB0RcixAHMgJnVFea+g7xF2eb/GIrgldPFJAghUBKAxr/yFBmbULAjVGmSfoPsF+U7+iLiLsZqdH7klFHyyAAITIbIIkEVorAEbq7AIrdlRSml27paguBcBBHt7r48Dho4lCOmp2SsQERYFOB4MsIpTF+EeBRCoCAHHQUQISbMiFHeEuVxhpT9CjRMwiFXYeEu4VwEEKkIiEYH3CVT2CblopzD+KUl2tLsVYTbfYBHuXQDB3gGLQPWEXdAFYA2NCApqvzHHhMDZ0XJD9wkPIoBARKgCp6hsCeKOtHqq5JsfQn2Q/gGBsyPOXGfLDbSEBxNAsHdwcJwoiCUsCFPrhIR4LB9ss8afd0NMs8sNE+FBBRBIh4xSGnM6upDFL+tfnpIV6eqHnKGSttYGVNXTTRLhwQUQHHzJbUrCMadD87L6gwUAqVNAyJlR7o8OKK7YEjajivooAggOvtphEcKEpKEDxRJssyz8B8lXTQTRZIDc1LncgMD8aAIIDkbIgbkec4loUVa8WYNZRNCyqrX5+UvDkFbTdbeERxVAsDfaPsY6TSK7I2snaAC2qimW6mkTKzhFxbV2R3eaC7oPLI+WhzHFKYswDDk/xe4eAcofp19a1DWNt7/ZWbuRlycTQCArGyuc8cIfdP+YrAQbh5QvtJAkX1pgiCMcvTyFNcKju6AuZEXTikvZTK7EghyYbYdMpYqtZWxpuXFnrX4Ha4YnFUAgInDdSEUotQnMUxclFqgFWJK0drGggs8FWErV+onydq3jIknL2LBmeHIB6GfOcGqYAmgcIKuUCvspN5apKaLy2+9hzfCkLohsZmgKkYY2WaEP6yUHzKVsKFuDC4DVd7BmiPBEoBMmn9KM6ZWVj7l3nB858ymBQOKDlDJGu/+CNcOTCEBzJn/F5Nv0XFufLlDi0abueNcMaSXkr+XY+6MLQMs5kw8zdvED8zXQtgggW0G7JeDWJq/8P64n+YJHjQGXy58OIeKUf+tApRe/H+QJ8iT+mlFvw75cvuaV/9X67X67eDQBhPwKt6ZM7BBKIyBKBa70jPOgr54zgDlvupj84dqftnmUNFTIxxBmHFgtj89NenU3EalUgqDWTIjdTj3B368/+YIHF2C5/PGQKphxR3JgsynFy/N/hPyk7kemGWX1z5X815tBvuBBXZCQX1UVF9vwWrHNfrM1YhoXFKRbtlnkCx5MACE/blVTZnhXPlvJv5PvaKqZXZGQj6uNI1/wIC5oefnjIVLMZWYCS3M6MykKMhGK29nbPPIF924Bhfwg5WNoG4zUZPudMqcM80LaWPIF92oBSj7wymfysRRx8g5Xj5QZSs35gi+ON5l8wb0JYOSHqZ4Lo+xt7MWGohGtsEla119wBXSMw80mX3AvLkjIZ6Z55YeBHpws5R20ifTcVgQVRQIuOfkFnyxAIT9ItkOtwy/oioC6w6UJ7jj5BZ8kQLPyNc/vDt1im3ZaVVn66xcsxAS3nfwu7iyAko/i8znbMf9eOopmAoTlPVKii1rq+TsjJ/8G7iRAWflM+pCsf65Op1SS5YRe6azzY54ojbed/F9F77mgjx///moV05H4fNtKYXPrCKVbL4ZyOvWCazxM/jdO/m+gtwWsKnyLmfxga18Ha6Hcq6NkPE7+rXCH29XQXyCvfPbtNsVGuYOYMx5+zC+d/FuhfwwgmU6AJuh2ZqnK+8XVFUx2nPxbob8AiMdWzLTzpzbSbEGY8535agVjJ//26C1AXMEbfpmTlRRQD2Db/OaivkJf+T3RW4CXL/90Gmr4mh39+3xpwUH5B0pbIye/P3qnoZ8DTv758dXWCt7xn38ItgvPd0GwUV49cab5gY29lB055DNpFr9sCqYAb7zeuF5OdGK+1QI1MRA0Hfwbd1b/uj/CU+iJZyfABya/TqsjNt6BxB9KmXilKLRCmAi6M7HDNxq5qOnKtYcCr5Fw/Vo+n3DjH2KZ5KP2rRxArDB8PewpwuczHX1L0NbHt4Fwl7S/wP/bITd9ZJ4l1dpi07umyZ2j9F5R1gGyJRzkH7SiQVM6wVaEktaV+yvYSg+ttWDoXM+/jL87DWtIcn5hDD3w7ATAL/79rd0rMGRXoyTLrSd4/QfjJQW7PRHFzh1zoh5O1ukLxHbyPU9ACgKU8kn5wYIsiLqd1L1Grenl77nD+YVnJ0Acni+Iykxp3oKkXAQRAVL29/perCEa+XUEqiNCvQW0qoCutgEuv+CmXMCKV7Ge0tSoUe4xRdA9u4ZNzGgsRGstIZd6pRpAZe6pB56dANsv/sOZFv4Zr4VHsgIgNR3QEo5zVTZPvescpLRHdd8OQaym+h3BFV+94gu1PkGfajn8OUHLe/551tlDm+JOnQ0pwXvoiWcnwIur6g2FcCStT12FnSG79n44AE15hJrbtDTBoKnaaoeOCdzmi1sAdgvsZldvQbb0shshitfJBWBqDxFCSr3PLzz5GbG+kH0IpjQKFN9HdjEVu5rIT17NGEHeayygmI99l4fNAOsUMDXxlK617igPC9vQWGTzkAFi9lj5yebHryKWPF/oe4IXtODXH2A7jXB/eAoOh8PhcDgcDofD4XA4HA6Hw+FwOBw38F85+0jh7PB+6gAAAABJRU5ErkJggg=="
                    alt="Developers"
                    style={{ minWidth: "20px", minHeight: "20px", maxHeight: "48px", maxWidth: "48px" }}>
                  </img>
                </div>
                <StyledText1>
                  Build apps and tools on the largest DeFi protocol on Ethereum.
                  <div style={{ color: "#3dad5d", fontWeight: "535", margin: "24px 0px 0px", transition: "opacity 250ms", fontSize: "16px", lineHeight: "28px", maxWidth: "480px" }}>
                    Developer Docs
                  </div>
                </StyledText1>
              </FeatureCard>
            </FeatureCol>
          </Row>
          <Row>
            <ProtocolBanner>
              <ProtocolText>
                <div style={{ fontSize: "28px", lineHeight: "36px", fontWeight: "535" }}>
                  Powered by the Uniswap Protocol
                </div>
                <div style={{ fontSize: "20px", lineHeight: "28px", margin: "10px 10px 0px 0px" }}>
                  The leading decentralized crypto trading protocol, governed by a global community.
                </div>
              </ProtocolText>
              <div style={{ width: "auto", display: "flex", transition: "opacity 250ms", alignItems: "center" }}>
                <ProtocolLearnMore href="https://uniswap.org"
                  rel="noopener noreferrer"
                  target="_blank">
                  Learn more
                </ProtocolLearnMore>
              </div>
            </ProtocolBanner>
          </Row>
        </StyledPage>
        <Footer />
      </StyledPage>
    </>
  )
}

export default Home
