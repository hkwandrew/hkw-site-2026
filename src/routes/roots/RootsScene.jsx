import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import useCarousel from '@/shared/hooks/useCarousel'
import ROOTS_PORTFOLIO_ITEMS from './rootsPortfolio'
import BookShelf from './BookShelf'
import RootsPortfolioSlider from './RootsPortfolioSlider'
import RootsMarmot from './RootsMarmot'
import { ROOTS_SCENE_TRANSITION_DURATION_MS } from './useRootsPageTransition'

const DESKTOP_SCENE_WIDTH = 1442
const DESKTOP_SCENE_HEIGHT = 1024
const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

const Root = styled.section`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  transition: transform ${ROOTS_SCENE_TRANSITION_DURATION_MS}ms
    cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  isolation: isolate;
  z-index: 20;

  &[data-roots-phase='entering'],
  &[data-roots-phase='exiting'] {
    transform: translate3d(0, 100%, 0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-y: auto;
  }

  &[data-dialog-open='true'] {
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`

const VisuallyHiddenHeading = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const DesktopScene = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const DesktopFrameButton = styled.button`
  position: absolute;
  left: ${({ $left }) => `${($left / DESKTOP_SCENE_WIDTH) * 100}%`};
  top: ${({ $top }) => `${($top / DESKTOP_SCENE_HEIGHT) * 100}%`};
  width: ${({ $width }) => `${($width / DESKTOP_SCENE_WIDTH) * 100}%`};
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  user-select: none;
  z-index: 1;
  transition:
    transform 180ms ease,
    filter 180ms ease;

  &:hover {
    filter: drop-shadow(0 14px 20px rgba(28, 45, 56, 0.22));
    transform: translateY(-6px) scale(1.012);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 10px;
    border-radius: 24px;
  }

  &[data-active='true'] {
    filter: drop-shadow(0 14px 20px rgba(28, 45, 56, 0.18));
    transform: translateY(-4px);
  }

  > * {
    display: block;
    width: 100%;
    height: auto;
  }
`

const BackButton = styled.button`
  position: absolute;
  left: 6.0888%;
  bottom: 5.85%;
  width: 5.32%;
  min-width: 62px;
  max-width: 76px;
  z-index: 2;
  transition:
    transform 180ms ease,
    filter 180ms ease;

  &:hover {
    transform: translateY(-4px);
    filter: brightness(1.05);

    .arrow {
      fill: ${({ theme }) => theme.colors.brown.dark};
      transition: fill 180ms ease;
    }
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brown.dark};
    outline-offset: 6px;
    border-radius: 18px;
  }
`

const Shelf = styled(BookShelf)`
  position: absolute;
  left: 3.9221%;
  top: 49.4168%;
  width: 24.8693%;
  height: auto;
  display: block;
  z-index: 0;
`

const MobileScene = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100dvh;
  padding: 24px 20px 188px;
  overflow: hidden;
  background:
    radial-gradient(
      ellipse at 18% 8%,
      rgba(235, 104, 47, 0.5) 0 10%,
      transparent 11%
    ),
    radial-gradient(
      ellipse at 41% 5%,
      rgba(235, 104, 47, 0.48) 0 8%,
      transparent 9%
    ),
    radial-gradient(
      ellipse at 71% 10%,
      rgba(235, 104, 47, 0.44) 0 9%,
      transparent 10%
    ),
    ${({ theme }) => theme.colors.brown.brick};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14px;
    background: ${({ theme }) => theme.colors.yellow.light};
    pointer-events: none;
  }
`

const MobileBackButton = styled(BackButton)`
  position: sticky;
  top: 16px;
  left: 0;
  bottom: auto;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  margin-bottom: 12px;
  z-index: 2;
`

const MobileFrames = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const MobileMarmotAccent = styled.div`
  position: absolute;
  right: -14px;
  bottom: 14px;
  z-index: 0;
  width: min(52vw, 186px);
  pointer-events: none;

  > * {
    width: 100%;
    height: auto;
  }
`

const MobileFrameButton = styled.button`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  user-select: none;
  transition:
    transform 180ms ease,
    filter 180ms ease;

  &:hover {
    filter: drop-shadow(0 12px 18px rgba(28, 45, 56, 0.22));
    transform: translateY(-4px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 8px;
    border-radius: 20px;
  }

  > * {
    display: block;
    width: 100%;
    height: auto;
  }
`

function SceneBackIcon() {
  return (
    <svg
      width='77'
      height='76'
      viewBox='0 0 77 76'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_5244_3688)'>
        <path
          d='M75.9555 10.8223C75.5336 5.15411 70.8519 0.703417 65.1359 0.473442C49.0494 -0.162371 30.2955 -0.162371 14.3451 0.473442C13.1883 0.514026 12.0451 0.744001 10.9563 1.13631C10.4119 1.3257 9.89477 1.56921 9.39121 1.83976C6.91428 3.19256 5.22669 5.53289 3.92018 7.96792C2.6681 10.2812 1.42963 12.7298 1.06217 15.3677C0.789982 17.2887 0.708325 19.2232 0.667497 21.1441C0.626668 22.8081 0.286429 24.7967 0.953297 26.3659C1.14383 26.8124 1.3888 27.2182 1.70182 27.5834C1.78348 27.6781 2.6681 28.5845 2.77698 28.4898C2.00123 29.2068 0.789982 29.4774 0.300039 30.4108C-0.244343 31.4389 0.123115 33.0217 0.177553 34.131C0.27282 36.1196 0.0142385 38.5546 0.749154 40.435C1.03495 41.152 1.55212 41.8013 2.27342 42.0583C1.22549 42.7077 0.830811 44.0064 0.640277 45.2239C0.327258 47.226 0.381696 49.2687 0.490573 51.2844C0.585839 52.9754 0.395306 55.0587 1.07578 56.6415C1.47046 57.5614 2.31425 58.3595 3.32136 58.3866C2.55922 58.5895 1.74265 58.833 1.30714 59.4823C0.667497 60.4293 0.789982 62.4585 0.885249 63.5543C1.13022 66.5439 2.3823 69.7095 4.519 71.8604C5.79829 73.1591 7.40422 74.1331 9.14624 74.6878C10.0445 74.9718 11.038 75.2153 11.9906 75.2153C28.9345 76.1758 47.9743 76.257 63.5436 75.2965C63.6116 75.2965 63.6797 75.2965 63.7477 75.283C65.6395 75.1342 67.4767 74.5119 69.0691 73.4838C70.6205 72.4827 71.9271 71.1164 72.8389 69.5201C73.8868 67.6667 74.3904 65.5023 74.9212 63.4596C75.0709 62.8779 75.207 62.2962 75.3158 61.7145C75.6833 59.8882 76.4726 56.6956 75.5336 54.9505C75.3703 54.6393 75.0573 54.3958 74.7034 54.3958C75.1661 54.3553 75.5472 53.99 75.7377 53.5706C76.1596 52.6643 76.1052 51.4197 76.1868 50.4457C76.3502 48.4841 76.4182 46.5226 76.4863 44.561C76.5815 41.9636 76.6496 39.3528 76.6768 36.7554C76.7176 34.1986 76.7312 31.6418 76.704 29.0986C76.6904 26.4471 76.8945 23.4574 76.4726 20.7924C76.391 20.2378 76.1868 19.6967 75.8874 19.2096C75.7377 18.9661 75.52 18.7091 75.2206 18.7226C75.6561 18.1004 75.9419 17.3834 76.078 16.6529C76.4318 14.786 76.1052 12.7162 75.9555 10.8358V10.8223Z'
          fill='#BF6100'
        />
        <path
          d='M76.7037 23.8902C76.7037 25.8788 76.6765 27.8539 76.6629 29.8425C76.6629 30.7894 76.6629 31.7499 76.6492 32.6969C76.6492 33.2109 76.6492 33.725 76.6492 34.2391C76.622 36.9446 76.5812 39.6367 76.5132 42.3423C76.4859 43.6816 76.4451 45.0208 76.3907 46.3601C76.3634 47.1718 76.3771 47.9023 76.1049 48.6734C75.8055 49.5121 75.8327 50.5402 75.7238 51.4195C75.683 51.7036 75.6421 52.0013 75.438 52.2042C75.2475 52.3936 74.9617 52.4341 74.6895 52.4477C74.2404 52.4883 73.7912 52.5424 73.3557 52.583C68.8646 53.0429 64.3462 53.4352 59.8551 52.9212C61.3113 53.1376 62.7675 53.354 64.2101 53.5705C67.5853 54.071 70.9605 54.5716 74.3356 55.0721C74.5942 55.1127 74.8936 55.1668 75.0842 55.3427C75.3836 55.5997 75.3972 56.0596 75.3836 56.4519C75.3563 57.0472 75.2883 57.6289 75.193 58.2241C75.0297 59.401 74.812 60.5644 74.7575 61.7549C74.7575 61.9984 74.7847 62.2419 74.7575 62.4854C74.635 63.2294 74.077 63.9464 73.6552 64.5417C71.6818 67.2878 68.5244 69.0465 65.1356 69.2494C49.8112 70.2099 31.0301 70.1287 14.3448 69.1682C11.9359 69.0329 9.62225 68.113 7.77135 66.5573C6.66898 65.6239 5.64826 64.447 5.02223 63.1483C4.73643 62.5531 4.66838 61.8767 4.38258 61.2679C4.32814 61.1326 4.2737 61.0109 4.23287 60.8756C4.13761 60.4833 4.17843 60.0369 4.51867 59.7663C4.88613 59.4687 5.40329 59.4416 5.87963 59.4281C11.1873 59.2522 16.4815 58.914 21.7892 58.7652C23.4632 58.7111 25.1371 58.6841 26.8111 58.6841C26.2123 58.5894 25.6271 58.5217 25.0146 58.4541C22.2791 58.1294 19.5164 58.0212 16.7537 57.9265C16.7128 57.9265 16.672 57.9265 16.6312 57.9265C13.3104 57.8047 10.0033 57.6695 6.70981 57.1554C6.08377 57.0472 5.43051 56.9254 4.87252 56.6549C4.45062 56.4655 4.08317 56.1949 3.82459 55.8161C3.81098 55.7891 3.78376 55.7485 3.77015 55.7214C3.38908 55.1262 3.23938 54.2469 3.36186 53.584C3.51157 52.8129 3.4163 52.0689 3.37547 51.2572C3.29381 49.8638 3.22577 48.4569 3.15772 47.05C3.11689 46.2789 3.07606 45.5214 3.03523 44.7503C3.02162 44.3309 2.9944 43.8574 3.26659 43.5328C3.48435 43.2757 3.8382 43.181 4.17843 43.0999C5.21276 42.8428 6.26069 42.5858 7.30863 42.4235C7.78496 42.3423 8.24769 42.2882 8.72402 42.2476C7.51277 41.977 6.30152 41.7065 5.07666 41.4359C4.70921 41.3548 4.34175 41.2736 4.01512 41.0842C3.93346 41.0436 3.86541 41.003 3.78376 40.9489C3.18494 40.516 3.03523 39.9208 2.93997 39.285C2.91275 39.0685 2.88553 38.8521 2.8447 38.6356C2.76304 38.1351 2.69499 37.6481 2.64056 37.134C2.5589 36.3629 2.51807 35.5919 2.47724 34.8343C2.39558 33.1568 2.31393 30.9923 3.37547 29.5854C3.75654 29.0849 4.45062 28.9632 5.07666 28.8955C8.05715 28.5438 11.0376 28.2326 14.0317 28.0027C16.5359 27.7998 19.0264 27.6509 21.5442 27.5292C16.6312 27.7321 11.6909 27.5157 6.80508 26.8663C6.01572 26.7581 5.19915 26.6363 4.47784 26.2711C4.46423 26.2711 4.43702 26.2576 4.42341 26.244C4.23287 26.1629 4.05595 26.0411 3.87902 25.9194C3.49796 25.6353 3.21216 25.2159 3.04884 24.7695C2.88553 24.296 2.96718 23.9037 3.03523 23.4302C3.04884 23.2544 3.03523 23.0785 3.03523 22.9026C2.9944 21.8475 3.07606 20.7652 3.10328 19.71C3.11689 19.1689 3.14411 18.6278 3.17133 18.0732C3.23938 15.7058 3.36186 13.3384 3.49796 10.971C3.87902 5.27572 8.56071 0.716804 14.3584 0.486829C30.3088 -0.162512 49.0491 -0.148984 65.1492 0.486829C70.3208 0.689748 74.8256 4.51816 75.7918 9.57761C76.0913 11.1333 76.2001 12.8108 75.9007 14.38C75.8191 14.7723 75.7374 15.1646 75.5741 15.5299C75.4924 15.7328 75.3427 16.1792 75.1522 16.3416C75.1522 16.3551 75.125 16.3686 75.1114 16.3822C74.9753 16.4633 74.7847 16.4904 74.635 16.5174C73.696 16.7474 72.7433 16.9368 71.7906 17.1127C69.8989 17.4509 67.98 17.6808 66.0474 17.8567C62.1823 18.1949 58.3036 18.249 54.4385 18.3167H54.3296C55.3911 18.3843 56.4527 18.4384 57.5142 18.5061C62.3048 18.7766 67.0954 19.0607 71.8859 19.3313C73.0427 19.4124 74.254 19.4801 75.2475 20.0753C75.2475 20.0753 75.2475 20.0753 75.2611 20.0753C76.6492 20.914 76.7309 22.4427 76.7037 23.8902Z'
          fill='#F69833'
        />
        <path
          d='M76.7039 23.8902C76.7039 25.8788 76.6767 27.8539 76.6631 29.8425C76.6631 30.7895 76.6631 31.75 76.6495 32.6969C76.6495 33.211 76.6495 33.725 76.6495 34.2391C69.2731 34.7261 61.8831 35.3619 54.4795 35.8083C45.8647 36.3359 34.5143 36.9176 25.8995 37.4588C21.2586 37.7564 16.645 38.1081 12.0313 38.6222C8.94197 38.9739 5.9887 39.4744 2.96738 39.2986C2.94016 39.0821 2.91294 38.8657 2.87211 38.6492C2.79045 38.1487 2.72241 37.6617 2.66797 37.1476C5.73012 36.5118 8.77865 36.6065 12.0177 36.5118C16.3592 36.363 20.6462 36.0654 24.9604 35.6731C33.5889 34.8749 44.9256 34.0362 53.5541 33.0486C58.6849 32.4534 63.8293 31.9393 68.9737 31.3576C68.8104 31.3576 68.6334 31.3441 68.4701 31.3306C60.0458 30.8706 51.7576 29.3285 43.3605 28.5844C35.0315 27.8404 23.9669 27.2046 15.597 26.704C12.2219 26.5011 8.34315 26.5552 4.51887 26.2847C4.50526 26.2847 4.47804 26.2711 4.46443 26.2576C4.27389 26.1764 4.09697 26.0547 3.92005 25.9329C3.53898 25.6489 3.25318 25.2295 3.08986 24.7831C2.92655 24.3096 3.00821 23.9173 3.07625 23.4438C3.08986 23.2679 3.07625 23.0921 3.07625 22.9162C3.03543 21.861 3.11708 20.7788 3.1443 19.7236C3.15791 19.1825 3.18513 18.6414 3.21235 18.0867C7.45853 17.8568 11.8272 18.1273 15.597 18.1679C23.9533 18.2355 35.0179 18.6414 43.3605 19.1284C51.7304 19.6154 60.1002 19.4125 68.4701 19.8048C70.7293 19.913 73.0157 19.9942 75.2749 20.0483C76.6631 20.887 76.7447 22.4157 76.7175 23.8632L76.7039 23.8902ZM49.0221 43.3569C34.7865 44.0333 17.0533 43.411 3.17152 47.0636C3.23957 48.457 3.30762 49.8639 3.38927 51.2708C3.4301 52.0825 3.52537 52.8265 3.37567 53.5976C3.25318 54.2605 3.40288 55.1398 3.78395 55.735C7.9893 56.8308 12.2899 57.5072 16.645 57.9401C16.6858 57.9401 16.7266 57.9401 16.7675 57.9401C19.503 58.2106 22.2657 58.373 25.0285 58.4677C32.1599 58.7247 42.0676 58.5624 49.0357 58.63C57.7594 58.7112 66.4831 58.5353 75.2068 58.2242C75.3021 57.6289 75.3702 57.0472 75.3974 56.452C75.3974 56.0597 75.3974 55.6133 75.098 55.3427C74.8938 55.1668 74.608 55.1127 74.3494 55.0721C70.9743 54.5716 67.5991 54.0846 64.2239 53.5705C62.7677 53.3541 61.3115 53.1376 59.8689 52.9212C64.36 53.4217 68.8784 53.0429 73.3696 52.583C73.8187 52.5424 74.2678 52.4883 74.7033 52.4477C74.9619 52.4342 75.2613 52.3936 75.4518 52.2042C75.656 52.0013 75.7104 51.7037 75.7376 51.4196C75.8465 50.5403 75.8057 49.5122 76.1187 48.6734C76.3773 47.9159 76.3773 47.1718 76.4045 46.3601C76.4589 45.0209 76.4997 43.6816 76.527 42.3423C67.3677 42.64 58.1949 42.924 49.0493 43.3569H49.0221Z'
          fill='#EA8A22'
        />
        <path
          d='M63.707 53.3677C63.8295 53.4218 63.952 53.4759 64.0745 53.53C63.9384 53.503 63.8159 53.4488 63.707 53.3677Z'
          fill='#E5851D'
        />
        <path
          d='M55.3101 39.7303H48.3514L49.7542 52.5664C49.9054 53.9744 48.7915 55.2047 47.375 55.2047H32.2474C31.9448 55.2047 31.656 55.15 31.3947 55.0543C30.4183 54.6852 29.7444 53.701 29.8544 52.5937L31.1334 39.7303H24.1197C22.8545 39.7303 22.1669 38.2676 22.9645 37.3107L30.3358 28.4389L38.5735 18.5282C39.1648 17.8174 40.2788 17.8174 40.8701 18.5282L47.7463 26.8122L49.094 28.4389L53.151 33.3328L56.4516 37.3107C57.2492 38.2813 56.5616 39.7303 55.3101 39.7303Z'
          fill='#AB4D00'
          className='arrow'
        />
      </g>
      <defs>
        <clipPath id='clip0_5244_3688'>
          <rect width='76.717' height='76' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return false
    }

    return window.matchMedia(MOBILE_MEDIA_QUERY).matches
  })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return undefined
    }

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
    const updateMatch = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', updateMatch)

    return () => {
      mediaQuery.removeEventListener('change', updateMatch)
    }
  }, [])

  return isMobile
}

export default function RootsScene({ sceneRef }) {
  const navigate = useNavigate()
  const isMobile = useIsMobileViewport()
  const triggerRefs = useRef({})
  const openedFromIdRef = useRef(null)
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const { index, next, prev, goTo } = useCarousel(ROOTS_PORTFOLIO_ITEMS.length)
  const activeItem = ROOTS_PORTFOLIO_ITEMS[index]

  const handleReturnHome = () => navigate('/')
  const setTriggerRef = (id, node) => {
    if (node) {
      triggerRefs.current[id] = node
      return
    }

    delete triggerRefs.current[id]
  }

  const openPortfolio = (itemIndex, itemId) => {
    openedFromIdRef.current = itemId
    goTo(itemIndex)
    setIsSliderOpen(true)
  }

  const closePortfolio = () => {
    setIsSliderOpen(false)

    window.requestAnimationFrame(() => {
      triggerRefs.current[openedFromIdRef.current]?.focus()
    })
  }

  return (
    <Root
      ref={sceneRef}
      aria-label='Non-profit Roots scene'
      data-dialog-open={isSliderOpen}
    >
      <VisuallyHiddenHeading>Non-profit Roots</VisuallyHiddenHeading>

      {isMobile ? (
        <MobileScene aria-hidden={isSliderOpen}>
          <MobileBackButton
            type='button'
            aria-label='Return to home'
            onClick={handleReturnHome}
            disabled={isSliderOpen}
          >
            <SceneBackIcon />
          </MobileBackButton>

          <MobileFrames>
            {ROOTS_PORTFOLIO_ITEMS.map((item, itemIndex) => {
              const FrameComponent = item.FrameComponent

              return (
                <MobileFrameButton
                  key={item.id}
                  ref={(node) => setTriggerRef(item.id, node)}
                  type='button'
                  aria-label={`Open ${item.title}`}
                  aria-haspopup='dialog'
                  aria-expanded={isSliderOpen && activeItem.id === item.id}
                  onClick={() => openPortfolio(itemIndex, item.id)}
                  disabled={isSliderOpen}
                >
                  <FrameComponent />
                </MobileFrameButton>
              )
            })}
          </MobileFrames>

          <MobileMarmotAccent aria-hidden='true'>
            <RootsMarmot />
          </MobileMarmotAccent>
        </MobileScene>
      ) : (
        <DesktopScene aria-hidden={isSliderOpen}>
          <BackButton
            type='button'
            aria-label='Return to home'
            onClick={handleReturnHome}
            disabled={isSliderOpen}
          >
            <SceneBackIcon />
          </BackButton>

          <Shelf />

          {ROOTS_PORTFOLIO_ITEMS.map((item, itemIndex) => {
            const FrameComponent = item.FrameComponent

            return (
              <DesktopFrameButton
                key={item.id}
                ref={(node) => setTriggerRef(item.id, node)}
                type='button'
                aria-label={`Open ${item.title}`}
                aria-haspopup='dialog'
                aria-expanded={isSliderOpen && activeItem.id === item.id}
                data-active={isSliderOpen && activeItem.id === item.id}
                $left={item.desktopFrame.left}
                $top={item.desktopFrame.top}
                $width={item.desktopFrame.width}
                onClick={() => openPortfolio(itemIndex, item.id)}
                disabled={isSliderOpen}
              >
                <FrameComponent />
              </DesktopFrameButton>
            )
          })}

          <RootsMarmot />
        </DesktopScene>
      )}

      {isSliderOpen ? (
        <RootsPortfolioSlider
          item={activeItem}
          onClose={closePortfolio}
          onNext={next}
          onPrev={prev}
        />
      ) : null}
    </Root>
  )
}
