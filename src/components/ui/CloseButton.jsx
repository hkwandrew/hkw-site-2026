import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.orange.dark};
  color: ${({ theme }) => theme.colors.yellow.light};
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.orange.base};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
`

export default function CloseButton({ onClick, ...props }) {
  return (
    <StyledButton type='button' onClick={onClick} aria-label='Close' {...props}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </StyledButton>
  )
}
