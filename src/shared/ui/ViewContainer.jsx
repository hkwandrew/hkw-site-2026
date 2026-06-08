import styled from 'styled-components'
import {
  CONTENT_FRAME_HEIGHT_CUSTOM_PROPERTY,
  CONTENT_FRAME_TOP_CUSTOM_PROPERTY,
  CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY,
} from '@/styles/viewportUnits'

const ViewContainer = styled.div`
  width: var(${CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY}, 100%);
  max-width: none;
  height: var(${CONTENT_FRAME_HEIGHT_CUSTOM_PROPERTY}, 100%);
  margin-inline: auto;
  position: absolute;
  top: var(${CONTENT_FRAME_TOP_CUSTOM_PROPERTY}, 0);
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: none;
  transform: translateY(${({ $isActive }) => ($isActive ? '0' : '20px')});
  transition:
    opacity 500ms ease,
    transform 500ms ease;
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};
`

export default ViewContainer
