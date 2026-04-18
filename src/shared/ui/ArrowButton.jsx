import styled from 'styled-components'

const rotations = {
  left: '180deg',
  right: '0deg',
  down: '90deg',
  up: '270deg',
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue.dark};
  color: ${({ theme }) => theme.colors.white};
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;

  svg {
    transform: rotate(${({ $direction }) => rotations[$direction] || '0deg'});
    transition: ${({ theme }) => theme.transition.fast};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.orange.base};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
`

export default function ArrowButton({ direction = 'right', onClick, ...props }) {
  return (
    <StyledButton $direction={direction} onClick={onClick} aria-label={`Navigate ${direction}`} {...props}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </StyledButton>
  )
}
