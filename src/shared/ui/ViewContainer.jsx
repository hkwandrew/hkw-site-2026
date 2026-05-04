import styled from 'styled-components'

const ViewContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
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

`

export default ViewContainer
