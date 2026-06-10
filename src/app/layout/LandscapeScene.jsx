import { Link } from 'react-router'
import theme from '@/styles/theme'
import { CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY } from '@/styles/viewportUnits'
import BlueMountain from '@/app/landscape/layers/BlueMountain'
import DirtLayer from '@/app/landscape/layers/DirtLayer'
import DkBlueMountain from '@/app/landscape/layers/DkBlueMountain'
import GoldMountain from '@/app/landscape/layers/GoldMountain'
import Sun from '@/app/landscape/layers/Sun'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import UpperField from '@/app/landscape/layers/UpperField'
import WhiteSand from '@/app/landscape/layers/WhiteSand'
import styled from 'styled-components'
import {
  canStartSceneTransitionFromClick,
  usePageSceneTransition,
} from '@/app/landscape/pageSceneTransition'

const LandscapeSceneWrapper = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: block;
  width: var(${CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY}, 100%);
  max-width: none;
  margin-inline: auto;
  overflow: visible;
`

const getHomeLayerLinkProps = (
  isInteractive,
  to,
  label,
  transitionSceneToPath,
) => ({
  'aria-hidden': isInteractive ? undefined : true,
  'aria-label': label,
  onClick: (event) => {
    if (
      to !== '/about' ||
      !isInteractive ||
      !canStartSceneTransitionFromClick(event)
    ) {
      return
    }

    transitionSceneToPath(to)
  },
  style: {
    pointerEvents: isInteractive ? 'auto' : 'none',
  },
  tabIndex: isInteractive ? undefined : -1,
})

const LandscapeScene = ({ areHomeLayerLinksInteractive, scenePathname }) => {
  const { transitionSceneToPath } = usePageSceneTransition()

  return (
    <LandscapeSceneWrapper
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
          {...getHomeLayerLinkProps(
            areHomeLayerLinksInteractive,
            '/about',
            'About',
            transitionSceneToPath,
          )}
        >
          <BlueMountain />
        </Link>
        <Link
          to='/work'
          {...getHomeLayerLinkProps(
            areHomeLayerLinksInteractive,
            '/work',
            'Work',
            transitionSceneToPath,
          )}
        >
          <GoldMountain />
        </Link>
        <WhiteSand />
        <Sun />
        <Link
          to='/services'
          {...getHomeLayerLinkProps(
            areHomeLayerLinksInteractive,
            '/services',
            'Services',
            transitionSceneToPath,
          )}
        >
          <DkBlueMountain />
          <TreeMountain />
        </Link>
        <UpperField />
        <DirtLayer showWorkDirtLayer={scenePathname === '/work'} />
      </g>
    </LandscapeSceneWrapper>
  )
}

export default LandscapeScene
