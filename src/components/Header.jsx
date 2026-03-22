import { Link, useLocation } from 'react-router'
import NavMenu from './NavMenu'
import logo from '../assets/images/logo.svg'
import { getPageLabelForPath } from '../pageRegistry.js'

const Header = () => {
    const location = useLocation()
    const pageLabel = getPageLabelForPath(location.pathname)

    return (
        <header className='header'>
            <div className='brand-block'>
                <Link to='/' className='hkw-logo'>
                    <img className='logo-img' src={logo} alt='HKW' />
                </Link>
                <div className='page-label'>{pageLabel}</div>
            </div>
            
            <NavMenu />
        </header>
    )
}

export default Header
