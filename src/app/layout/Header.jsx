import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled, { css, keyframes, useTheme } from 'styled-components'
import logo from '@/assets/images/logo.svg'
import { getPageLabelForPath } from '@/app/router/routeRegistry'
import { applyTypography } from '@/shared/ui/Typography'
import MobileNavMenu from './MobileNavMenu'
import NavMenu from './NavMenu'

const pageLabelFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const StyledHeader = styled.header`
  max-width: 1440px;
  margin-inline: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 56px 68px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
    gap: 16px;
    padding: 11px 20px 0;
  }
`

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $isServicesPage }) => ($isServicesPage ? '72px' : '20px')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0;
  }
`

const HKWLogo = styled(Link)`
  width: 136px;
  height: 68px;
  display: grid;
  place-items: center;

  background-color: ${({ $isServicesPage, theme }) =>
    $isServicesPage ? theme.colors.blue.light : 'transparent'};
  border-radius: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 76px;
    height: 38px;
    border-radius: 2px;
  }
`

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`

const PageLabel = styled.div`
  ${applyTypography('navButton')}
  font-weight: ${({ theme }) => theme.typography.navButton.activeWeight};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.typography.navButton.width},
    'wght' ${({ theme }) => theme.typography.navButton.activeWeight};
  color: ${({ $isAboutPage, theme }) =>
    $isAboutPage ? theme.colors.orange.base : theme.colors.white};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  animation: ${({ $isActive }) =>
    $isActive ? css`${pageLabelFadeIn} 500ms ease both` : 'none'};
  will-change: opacity;

  translate: ${({ $isServicesPage }) => ($isServicesPage ? '10px 0' : '0')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const MobilePageLabel = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    margin-top: 6px;
    color: ${({ $isAboutPage, theme }) =>
      $isAboutPage ? theme.colors.orange.base : theme.colors.white};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    animation: ${({ $isActive }) =>
      $isActive ? css`${pageLabelFadeIn} 500ms ease both` : 'none'};
    will-change: opacity;
    ${applyTypography('navButton')}
    font-weight: ${({ theme }) => theme.typography.navButton.activeWeight};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.navButton.width},
      'wght' ${({ theme }) => theme.typography.navButton.activeWeight};
  }
`

const usePhoneViewport = (mobileBreakpoint) => {
  const mediaQueryString = `(max-width: ${mobileBreakpoint})`
  const [isPhoneViewport, setIsPhoneViewport] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(mediaQueryString).matches
      : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(mediaQueryString)

    const update = () => {
      setIsPhoneViewport(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [mediaQueryString])

  return isPhoneViewport
}

const Header = ({ contentPathname, isPageLabelReady = true, navPathname }) => {
  const theme = useTheme()
  const location = useLocation()
  const contentPath = contentPathname ?? location.pathname
  const activeNavPath = navPathname ?? contentPath
  const pageLabel = getPageLabelForPath(contentPath)
  const isServicesPage = contentPath === '/services'
  const isAboutPage = contentPath === '/about'
  const isPageLabelActive = isPageLabelReady
  const isPhoneViewport = usePhoneViewport(theme.breakpoints.mobile)

  return (
    <StyledHeader>
      <BrandBlock $isServicesPage={isServicesPage}>
        <HKWLogo to='/' $isServicesPage={isServicesPage}>
          <LogoImg src={logo} alt='HKW' />
        </HKWLogo>
        {pageLabel && (
          <PageLabel
            aria-hidden={!isPageLabelActive}
            key={contentPath}
            $isActive={isPageLabelActive}
            $isAboutPage={isAboutPage}
            $isServicesPage={isServicesPage}
          >
            {pageLabel}
          </PageLabel>
        )}
        {isPhoneViewport && isAboutPage && pageLabel ? (
          <MobilePageLabel
            aria-hidden={!isPageLabelActive}
            key={contentPath}
            $isActive={isPageLabelActive}
            $isAboutPage={isAboutPage}
          >
            {pageLabel}
          </MobilePageLabel>
        ) : null}
      </BrandBlock>

      {isPhoneViewport ? (
        <MobileNavMenu activePathname={activeNavPath} />
      ) : (
        <NavMenu activePathname={activeNavPath} />
      )}
    </StyledHeader>
  )
}

export default Header
