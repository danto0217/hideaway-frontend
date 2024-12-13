import React from 'react'
import { Button, useWalletModal } from 'hideaway-dex-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const ConnectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.07)' : '#d0ffdd')};
  color:  ${({ theme }) => (theme.isDark ? '  rgb(155, 155, 155)' : '#3dad5d')}; 
  padding: 12px 0px;
  width: 100%;
  border-radius: 16px;
  text-align: center;
  border: 1px solid transparent;
  font-weight: 535;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-transform: none;
  height: fit-content;
  box-shadow: none;
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ConnectButton {...props} onClick={onPresentConnectModal}>
      {t('Connect to Wallet')}
    </ConnectButton>
  )
}

export default ConnectWalletButton
