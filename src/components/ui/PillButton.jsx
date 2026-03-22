import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const variants = {
  'nav-active': css`
    background: ${({ theme }) => theme.colors.orange.base};
    color: ${({ theme }) => theme.colors.white};
    font-variation-settings: 'wdth' 75;
    font-weight: 600;
  `,
  'nav-inactive': css`
    background: transparent;
    color: ${({ theme }) => theme.colors.yellow.light};
    font-variation-settings: 'wdth' 75;
    font-weight: 500;
  `,
  send: css`
    background: ${({ theme }) => theme.colors.blue.dark};
    color: ${({ theme }) => theme.colors.yellow.light};
    font-variation-settings: 'wdth' 75;
    font-weight: 500;
  `,
  close: css`
    background: ${({ theme }) => theme.colors.orange.dark};
    color: ${({ theme }) => theme.colors.yellow.light};
    font-variation-settings: 'wdth' 75;
    font-weight: 500;

    &:hover {
      background: ${({ theme }) => theme.colors.orange.base};
    }
  `,
}

const StyledButton = styled.button`
  ${applyTypography('buttonMedium')}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 21px;
  border-radius: 9999px;
  transition: ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  cursor: pointer;

  ${({ $variant }) => variants[$variant] || variants['nav-inactive']}

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
`

export default function PillButton({ variant = 'nav-inactive', children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}
