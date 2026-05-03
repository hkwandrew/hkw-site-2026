import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const setActiveWeight = (typeKey) => css`
  ${({ theme }) => {
    const type = theme.typography[typeKey]
    const activeWeight = type.activeWeight ?? type.weight

    return css`
      font-weight: ${activeWeight};
      font-variation-settings:
        'wdth' ${type.width},
        'wght' ${activeWeight};
    `
  }}
`

const variants = {
  'nav-active': css`
    ${applyTypography('navButton')}
    background: ${({ theme }) => theme.colors.orange.base};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.components.navTabs.itemPadding};
    ${setActiveWeight('navButton')}
  `,
  'nav-inactive': css`
    ${applyTypography('navButton')}
    background: transparent;
    color: ${({ theme }) => theme.colors.yellow.light};
    padding: ${({ theme }) => theme.components.navTabs.itemPadding};
  `,
  send: css`
    ${applyTypography('formButton')}
    background: ${({ theme }) => theme.colors.blue.dark};
    color: ${({ theme }) => theme.colors.yellow.light};
    min-width: ${({ theme }) => theme.components.formButton.width};
    min-height: ${({ theme }) => theme.components.formButton.height};
    padding: ${({ theme }) => theme.components.formButton.padding};
    border-radius: ${({ theme }) => theme.components.formButton.borderRadius};

    &:hover {
      ${setActiveWeight('formButton')}
      background: ${({ theme }) => theme.colors.yellow.light};
      color: ${({ theme }) => theme.colors.orange.deep};
    }
  `,
  close: css`
    ${applyTypography('pillButton')}
    background: ${({ theme }) => theme.colors.orange.dark};
    color: ${({ theme }) => theme.colors.yellow.light};
    padding: ${({ theme }) => theme.components.pillButton.padding};

    &:hover {
      background: ${({ theme }) => theme.colors.orange.base};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.components.pillButton.gap};
  border: none;
  border-radius: ${({ theme }) => theme.components.pillButton.borderRadius};
  appearance: none;
  transition: ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  cursor: pointer;

  ${({ $variant }) => variants[$variant] || variants.close}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
`

export default function PillButton({
  variant = 'close',
  children,
  ...props
}) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}
