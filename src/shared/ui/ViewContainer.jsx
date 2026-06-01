import styled from 'styled-components'
import { convertCssPxToCappedViewportUnit } from '../../styles/viewportUnits'

const ViewContainer = styled.div`
  max-width: ${convertCssPxToCappedViewportUnit(1440)};
  width: 100%;
  margin-inline: auto;
  max-height: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: none;
  transform: translateY(${({ $isActive }) => ($isActive ? '0' : '20px')});
  transition:
    opacity 500ms ease,
    transform 500ms ease;
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};

  @media (max-width: ${({ theme }) =>
      theme.breakpoints
        .mobile}) and (orientation: landscape) and (max-aspect-ratio: 1440 / 1024) {
    aspect-ratio: 1440 / 1024;
    margin-inline: auto;
  }
`

export default ViewContainer
