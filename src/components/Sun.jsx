import { Link } from 'react-router'

const Sun = () => {
    const sunSvg = (
        <g id="sun__container" transform="translate(1706.222193,231.108808)">
            <g id="sun__wrapper" transform="scale(1,1)">
                <path
                    id="sun"
                    d="M1689.5,291c32.03,0,58-25.967,58-58s-25.97-58-58-58-58,25.967-58,58s25.97,58,58,58Z"
                    transform="translate(-1689.5,-233)"
                    fill="#d0471b"
                />
            </g>
        </g>
    )
    
    return <Link to='/contact'>{sunSvg}</Link>
}

export default Sun
