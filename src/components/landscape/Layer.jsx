import styled from 'styled-components'

const StyledLayer = styled.div`
  position: absolute;
  inset: 0;
  transition: ${({ theme }) => theme.transition.view};
  transform: translate(
    ${({ $x }) => $x || 0}%,
    ${({ $y }) => $y || 0}%
  ) scale(${({ $scale }) => $scale || 1});
  opacity: ${({ $opacity }) => ($opacity != null ? $opacity : 1)};
  pointer-events: none;
  will-change: transform, opacity;
`

export default function Layer({ x, y, scale, opacity, children, style }) {
  return (
    <StyledLayer $x={x} $y={y} $scale={scale} $opacity={opacity} style={style}>
      {children}
    </StyledLayer>
  )
}
