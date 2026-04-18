import { Link } from 'react-router'
import theme from '@/styles/theme'
import BlueMountain from '@/app/landscape/layers/BlueMountain'
import DirtLayer from '@/app/landscape/layers/DirtLayer'
import DkBlueMountain from '@/app/landscape/layers/DkBlueMountain'
import GoldMountain from '@/app/landscape/layers/GoldMountain'
import Sun from '@/app/landscape/layers/Sun'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import UpperField from '@/app/landscape/layers/UpperField'
import WhiteSand from '@/app/landscape/layers/WhiteSand'

const getHomeLayerLinkProps = (isInteractive) => ({
  'aria-hidden': isInteractive ? undefined : true,
  style: {
    pointerEvents: isInteractive ? 'auto' : 'none',
  },
  tabIndex: isInteractive ? undefined : -1,
})

const LandscapeScene = ({ areHomeLayerLinksInteractive }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    id='scene-svg'
    viewBox='0 0 1440 1024'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
  >
    <g id='scene' transform='translate(-1181.222193 -8.108808)'>
      <path
        id='sky'
        d='M3960,0L0,0v1014h3975.5L3960,0Z'
        transform='translate(-1.849932 0)'
        fill={theme.colors.yellow.light}
      />
      <Link
        to='/about'
        {...getHomeLayerLinkProps(areHomeLayerLinksInteractive)}
      >
        <BlueMountain />
      </Link>
      <Link
        to='/work'
        {...getHomeLayerLinkProps(areHomeLayerLinksInteractive)}
      >
        <GoldMountain />
      </Link>
      <WhiteSand />
      <Sun />
      <Link
        to='/services'
        {...getHomeLayerLinkProps(areHomeLayerLinksInteractive)}
      >
        <DkBlueMountain />
        <TreeMountain />
      </Link>
      <UpperField />
      <DirtLayer />
    </g>
  </svg>
)

export default LandscapeScene
