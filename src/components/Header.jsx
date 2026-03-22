import { Link, useLocation } from 'react-router'
import NavMenu from './NavMenu'
import logo from '../assets/images/logo.svg'
import { getPageLabelForPath } from '../pageRegistry.js'
import styled from 'styled-components'

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 50;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding: 56px 68px;
    pointer-events: auto;
`

const BrandBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HKWLogo = styled(Link)`
    width: 136px;
    height: 68px;
    display: grid;
    place-items: center;

    background-color: ${({ $isServicesPage, theme }) =>
        $isServicesPage ? theme.colors.blue.light : 'transparent'};
    border-radius: 8px;
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
    color: ${({ isServicesPage, theme }) => isServicesPage ? theme.colors.orange.base : theme.colors.white};
`

const Header = () => {
    const location = useLocation()
    const pageLabel = getPageLabelForPath(location.pathname)
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

            <NavMenu />
        </StyledHeader>
    )
}

export default Header
