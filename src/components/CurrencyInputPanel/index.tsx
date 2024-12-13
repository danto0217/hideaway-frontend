import React from 'react'
import { Currency, Pair } from '@clipdex/clip-dex-sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from 'hideaway-dex-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 1rem;
  background-color: transparent;
  // background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#85ce36')};
  border-radius: 10px;
`
const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`

const StyledSelectTokenButton = styled(Button)`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(61, 173, 93);
    opacity: 1;
    color: rgb(255, 255, 255);
    cursor: pointer;
    height: 36px;
    border-radius: 18px;
    outline: none;
    user-select: none;
    border: 1px solid rgb(61, 173, 93);
    font-size: 16px;
    font-weight: 600;
    width: initial;
    padding: 6px 6px 6px 8px;
    gap: 8px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-left: 12px;
    box-shadow: rgba(34, 34, 34, 0.04) 0px 0px 10px 0px;
    visibility: visible;
    animation: auto ease 0s 1 normal none running none;
`
const StyledChevronDownIcon = styled(ChevronDownIcon)`
  fill: white;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const StyledNumericalInput = styled(NumericalInput)`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#403832')};
  ::placeholder {
    color: #cccbd1;
  }
`
const InputPanel = styled.div<{ hideInput?: boolean, id?: string }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => (theme.isDark ? '#1b1b1b !important' : '#f9f9f9 !important')};
  border-radius: 16px;
  color: rgb(125, 125, 125) !important;
  padding: 16px;
  margin-top:  ${({ id }) => (id == "swap-currency-output" ? '-20px !important' : '0px')};
  border: ${({ theme }) => (theme.isDark ? '1px solid rgb(27, 27, 27);' : '1px solid rgb(249 249 249);')};
  `
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <StyledText>{translatedLabel}</StyledText>
              {account && (
                <StyledText onClick={onMax} style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? t('Balance: %amount%', { amount: selectedCurrencyBalance?.toSignificant(6) ?? '' })
                    : ' -'}
                </StyledText>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <StyledNumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {/* {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )} */}
            </>
          )}
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <StyledText id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledText>
              ) : (
                currency ? (
                  <StyledText id="pair">
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                      : currency?.symbol)}
                  </StyledText>
                ) : (
                  <StyledSelectTokenButton id="pair">
                    {t('Select Token')}
                  </StyledSelectTokenButton>
                )
              )}
              {/* {!disableCurrencySelect && <StyledChevronDownIcon />} */}
            </Flex>
          </CurrencySelectButton>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
