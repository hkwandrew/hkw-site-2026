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
  width: 45.2px;
  height: 45.2px;
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

export default function ArrowButton({
  direction = 'right',
  onClick,
  ...props
}) {
  return (
    <StyledButton
      $direction={direction}
      onClick={onClick}
      aria-label={`Navigate ${direction}`}
      {...props}
    >
      <svg
        width='12'
        height='20'
        viewBox='0 0 12 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.65088 1.48926C3.08335 0.878083 2.15506 0.839268 1.54248 1.37402L1.42432 1.48926L1.32471 1.60742C0.860677 2.21743 0.893828 3.09759 1.42432 3.66895L6.86572 9.52832L1.42432 15.3877C0.858463 15.9972 0.858582 16.9578 1.42432 17.5674C1.71582 17.8813 2.11661 18.0575 2.53662 18.0576C2.95406 18.0576 3.35493 17.8835 3.64697 17.5723L3.65088 17.5684L10.104 10.6191C10.67 10.0096 10.67 9.04803 10.104 8.43848L3.65088 1.48926Z'
          fill='white'
          stroke='#FCFAE5'
          stroke-width='2'
        />
      </svg>
    </StyledButton>
  )
}
