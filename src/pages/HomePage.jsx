import styled, { keyframes } from 'styled-components'
import ViewContainer from '@/components/ui/ViewContainer'
import { Display, Label, BodySmall } from '@/components/ui/Typography'
import usePageActive from '@/hooks/usePageActive'

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const DesktopHome = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;

  @media (max-width: 767px) {
    display: none;
  }
`

const Content = styled.div`
  position: absolute;
  bottom: 10%;
  left: 40px;
  max-width: 640px;
  z-index: 5;
`

const Subtitle = styled(Label)`
  color: ${({ theme }) => theme.colors.orange.base};
  margin-bottom: 16px;
  display: block;
`

const HeroText = styled(Display)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: clamp(36px, 5vw, 64px);
  margin-bottom: 0;
`

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  left: 40px;
  z-index: 5;
`

const FooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  opacity: 0.8;

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

const MobileHome = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.yellow.light};

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileScene = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const MobileSky = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.yellow.light};
`

const MobileSun = styled.div`
  position: absolute;
  top: 84px;
  left: 124px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.orange.base};
`

const Ribbon = styled.div`
  position: absolute;
  top: 48px;
  left: 74px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 34px;
  padding: 0 18px 0 20px;
  background: ${({ theme }) => theme.colors.orange.base};
  color: ${({ theme }) => theme.colors.yellow.light};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  line-height: 1;
  font-variation-settings: 'wdth' 75, 'wght' 500;
  text-transform: none;
  border-radius: 0 9999px 9999px 0;
  clip-path: polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%, 7% 50%);
  transform: rotate(-1deg);
`

const RibbonPlane = styled.span`
  position: absolute;
  top: 58px;
  left: 222px;
  width: 92px;
  height: 24px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.green};
  box-shadow: 26px 3px 0 -14px ${({ theme }) => theme.colors.green},
    32px -4px 0 -14px ${({ theme }) => theme.colors.orange.base};
  transform: rotate(-2deg);

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 7px;
    width: 24px;
    height: 10px;
    border-radius: 9999px 0 0 9999px;
    background: ${({ theme }) => theme.colors.green};
    transform: rotate(-8deg);
  }

  &::after {
    content: '';
    position: absolute;
    right: 6px;
    top: -2px;
    width: 18px;
    height: 18px;
    border: 2px solid ${({ theme }) => theme.colors.orange.dark};
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    transform: rotate(18deg);
  }
`

const MobileMountains = styled.div`
  position: absolute;
  inset: 0;
`

const Mountain = styled.div`
  position: absolute;
  top: ${({ $top }) => $top ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? '136px'};
  left: ${({ $left }) => $left};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background: ${({ $color }) => $color};
  clip-path: ${({ $shape }) => $shape};
`

const Ground = styled.div`
  position: absolute;
  left: -20px;
  right: -20px;
  bottom: 0;
  height: 448px;
  background: ${({ theme }) => theme.colors.green};
  clip-path: polygon(0 30%, 13% 23%, 28% 9%, 41% 4%, 57% 10%, 74% 19%, 100% 29%, 100% 100%, 0 100%);
`

const GroundTree = styled.span`
  position: absolute;
  bottom: 135px;
  left: ${({ $left }) => $left};
  width: 0;
  height: 0;
  border-left: ${({ $size }) => `${$size / 2}px`} solid transparent;
  border-right: ${({ $size }) => `${$size / 2}px`} solid transparent;
  border-bottom: ${({ $size }) => `${$size}px`} solid ${({ theme }) => theme.colors.blue.dark};

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -1px;
    width: 0;
    height: 0;
    border-left: ${({ $size }) => `${$size / 2}px`} solid transparent;
    border-right: ${({ $size }) => `${$size / 2}px`} solid transparent;
    border-bottom: ${({ $size }) => `${$size}px`} solid ${({ theme }) => theme.colors.blue.dark};
  }

  &::before {
    top: 10px;
    transform: scale(0.8);
  }

  &::after {
    top: 22px;
    transform: scale(0.6);
  }
`

const MobileCopy = styled.div`
  position: absolute;
  left: 20px;
  right: 0;
  top: 300px;
  z-index: 4;
  animation: ${riseIn} 700ms ease both;

  @media (max-height: 660px) {
    top: 272px;
  }
`

const MobileKicker = styled(Label)`
  display: block;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: 1.2;
  font-variation-settings: 'wdth' 67.5, 'wght' 600;
`

const MobileHero = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  max-width: 353px;
`

const MobileRoles = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 28px;
`

const MobileRoleText = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: 1.2;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
`

const MobileFooter = styled.footer`
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 4;
`

const MobileFooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 16px;
  line-height: 1.25;

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

const MobileMascot = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 170px;
  height: 252px;
  z-index: 5;
`

const Stump = styled.div`
  position: absolute;
  left: -2px;
  right: -8px;
  bottom: 0;
  height: 64px;
  background: #3f2a1f;
  border-radius: 36px 36px 0 0;
  box-shadow: inset 0 12px 0 rgba(0, 0, 0, 0.18);
`

const HomeMarmotSvg = () => (
  <svg viewBox="0 0 170 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="86" cy="236" rx="56" ry="16" fill="rgba(0,0,0,0.18)" />
    <ellipse cx="92" cy="154" rx="46" ry="58" fill="#b87943" />
    <circle cx="90" cy="104" r="38" fill="#c6854e" />
    <circle cx="74" cy="96" r="10" fill="#8b5a32" />
    <circle cx="106" cy="96" r="10" fill="#8b5a32" />
    <ellipse cx="90" cy="116" rx="16" ry="14" fill="#f2c28a" />
    <ellipse cx="90" cy="124" rx="9" ry="8" fill="#d79a5a" />
    <circle cx="80" cy="96" r="4" fill="#231915" />
    <circle cx="100" cy="96" r="4" fill="#231915" />
    <path d="M76 129c6 6 24 6 30 0" stroke="#8b5a32" strokeWidth="3" strokeLinecap="round" />
    <path d="M54 148c10 28 18 49 18 73" stroke="#a86b3b" strokeWidth="10" strokeLinecap="round" />
    <path d="M124 146c10 27 17 49 17 71" stroke="#a86b3b" strokeWidth="10" strokeLinecap="round" />
    <path d="M76 180c-8 12-16 21-26 28" stroke="#7a4b28" strokeWidth="8" strokeLinecap="round" />
    <path d="M108 180c8 12 16 21 26 28" stroke="#7a4b28" strokeWidth="8" strokeLinecap="round" />
    <rect x="59" y="145" width="63" height="61" rx="24" fill="#d59a63" />
    <rect x="62" y="190" width="58" height="32" rx="16" fill="#8b5a32" opacity="0.28" />
    <rect x="72" y="188" width="10" height="18" rx="5" fill="#3f2a1f" />
    <rect x="88" y="188" width="10" height="18" rx="5" fill="#3f2a1f" />
    <rect x="104" y="188" width="10" height="18" rx="5" fill="#3f2a1f" />
    <path d="M72 198h28l7 22H65z" fill="#1c2d38" />
    <path d="M71 202l6 12h27l-8-12z" fill="#6a7a85" />
    <path d="M79 202h24" stroke="#2e3f4c" strokeWidth="2" />
    <path d="M88 204l8 6" stroke="#2e3f4c" strokeWidth="2" />
  </svg>
)

export default function Home() {
  const isActive = usePageActive()

  return (
    <ViewContainer $isActive={isActive}>
      <DesktopHome>
        <Content>
          <Subtitle>HAPPY, KNOWLEDGABLE WORK</Subtitle>
          <HeroText as="h1">
            We are a digital design and marketing studio based in Spokane, Washington.
            We build unique online experiences and engaging campaigns for non-profits and fun brands.
          </HeroText>
        </Content>
        <Footer>
          <FooterText>
            &copy; 2026 HKW &nbsp;|&nbsp; <a href="#policies">Policies</a>
          </FooterText>
        </Footer>
      </DesktopHome>

      <MobileHome aria-label="HKW home mobile hero">
        <MobileSky />
        <MobileScene>
          <Ribbon>Happy, Knowledgable Work</Ribbon>
          <RibbonPlane />
          <MobileSun />
          <MobileMountains>
            <Mountain
              $left="-44px"
              $top="138px"
              $width="236px"
              $height="168px"
              $color="#1c2d38"
              $shape="polygon(0 100%, 12% 56%, 31% 26%, 54% 36%, 72% 18%, 100% 100%)"
            />
            <Mountain
              $left="222px"
              $top="156px"
              $width="182px"
              $height="64px"
              $color="#afd3fc"
              $shape="polygon(0 100%, 18% 44%, 38% 33%, 61% 49%, 82% 38%, 100% 100%)"
            />
            <Mountain
              $left="190px"
              $top="196px"
              $width="232px"
              $height="64px"
              $color="#fb9d38"
              $shape="polygon(0 100%, 16% 46%, 40% 54%, 58% 42%, 76% 52%, 100% 34%, 100% 100%)"
            />
          </MobileMountains>
          <Ground />
          <GroundTree $left="20px" $size={16} />
          <GroundTree $left="44px" $size={14} />
          <GroundTree $left="76px" $size={18} />
          <GroundTree $left="108px" $size={14} />
          <GroundTree $left="138px" $size={17} />
          <GroundTree $left="170px" $size={14} />
          <GroundTree $left="204px" $size={16} />
          <GroundTree $left="236px" $size={13} />
          <GroundTree $left="268px" $size={14} />
          <GroundTree $left="296px" $size={13} />
          <GroundTree $left="324px" $size={16} />
        </MobileScene>

        <MobileCopy>
          <MobileKicker>HAPPY, KNOWLEDGABLE WORK</MobileKicker>
          <MobileHero>
            We are a digital design and marketing studio based in Spokane, Washington.
            We build unique online experiences and engaging campaigns for non-profits and fun brands.
          </MobileHero>
          <MobileRoles>
            <MobileRoleText>(Non-profit workers)</MobileRoleText>
            <MobileRoleText>(B2B specialists)</MobileRoleText>
            <MobileRoleText>(Friendly maestros)</MobileRoleText>
          </MobileRoles>
        </MobileCopy>

        <MobileMascot>
          <Stump />
          <HomeMarmotSvg />
        </MobileMascot>

        <MobileFooter>
          <MobileFooterText>
            &copy; 2026 HKW
            <br />
            <a href="#policies">Policies</a>
          </MobileFooterText>
        </MobileFooter>
      </MobileHome>
    </ViewContainer>
  )
}
