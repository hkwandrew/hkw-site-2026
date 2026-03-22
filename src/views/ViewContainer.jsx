import styled from 'styled-components'

const ViewContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  transform: translateY(${({ $isActive }) => ($isActive ? '0' : '20px')});
  transition: opacity 500ms ease, transform 500ms ease;
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};
  padding: 40px;
`

export default ViewContainer
