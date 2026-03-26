import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled, { useTheme } from 'styled-components'
import logo from '../assets/images/logo.svg'
import { getPageLabelForPath } from '../pageRegistry.js'
import MobileNavMenu from './MobileNavMenu'
import NavMenu from './NavMenu'

const StyledHeader = styled.header`
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
    pointer-events: auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        align-items: flex-start;
        gap: 16px;
        padding: calc(env(safe-area-inset-top, 0px) + 20px) 20px 0;
    }
`

const BrandBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

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
    font-size: 24px;
    line-height: 26px;
    text-transform: uppercase;
    font-variation-settings: "wdth" 68, "wght" ${({ theme }) => theme.font.weight.bold};
    color: ${({ $isServicesPage, theme }) => $isServicesPage ? theme.colors.orange.base : theme.colors.white};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none;
    }
`

const usePhoneViewport = (mobileBreakpoint) => {
    const mediaQueryString = `(max-width: ${mobileBreakpoint})`
    const [isPhoneViewport, setIsPhoneViewport] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(mediaQueryString).matches : false,
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

const Header = () => {
    const theme = useTheme()
    const location = useLocation()
    const pageLabel = getPageLabelForPath(location.pathname)
    const isPhoneViewport = usePhoneViewport(theme.breakpoints.mobile)
    return (
        <StyledHeader>
            <BrandBlock>
                <HKWLogo
                    to='/'
                    $isServicesPage={location.pathname === '/services'}
                >
                    <LogoImg src={logo} alt='HKW' />
                </HKWLogo>
                {pageLabel && <PageLabel>{pageLabel}</PageLabel>}
            </BrandBlock>

            {isPhoneViewport ? <MobileNavMenu /> : <NavMenu />}
        </StyledHeader>
    )
}

export default Header
