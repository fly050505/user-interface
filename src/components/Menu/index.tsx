import React, { useRef, useEffect } from 'react'
import { BookOpen, Code, PieChart, MessageCircle, Send, CheckCircle } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import useToggle from '../../hooks/useToggle'
import { useActiveWeb3React } from '../../hooks'
import { getEtherscanLink, getAnalysisLink } from '../../utils'
import { useTranslation } from 'react-i18next'

import { ExternalLink } from '../../theme'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const CODE_LINK = 'https://github.com/0x1-Finance'

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current?.contains(e.target) ?? false) {
        return
      }
      toggle()
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, toggle])

  return (
    <StyledMenu ref={node}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {chainId && open && (
        <MenuFlyout>
		  <MenuItem id="link" href="https://0x1.finance">
            <Send size={14} />
            Website
          </MenuItem>
          <MenuItem id="link" href={getAnalysisLink(chainId)}>
            <PieChart size={14} />
            {t('analytics')}
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/0x1Finance">
            <BookOpen size={14} />
            Twitter
          </MenuItem>
          <MenuItem id="link" href="https://t.me/finance0x1">
            <Send size={14} />
            {t('telegram')}
          </MenuItem>
          <MenuItem id="link" href="https://discord.gg/hzc98weRq5">
            <MessageCircle size={14} />
            {t('discord')}
          </MenuItem>
          <MenuItem id="link" href={CODE_LINK}>
            <Code size={14} />
            {t('code')}
          </MenuItem>
          <MenuItem id="link" href="https://0x1-finance.medium.com">
			<BookOpen size={14} />
            Medium
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
