import styled, { css } from 'styled-components'

const applyTypography = (key) => css`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typography[key].size};
  font-weight: ${({ theme }) => theme.typography[key].weight};
  font-variation-settings: 'wdth' ${({ theme }) => theme.typography[key].width};
  line-height: ${({ theme }) => theme.typography[key].lineHeight};
  letter-spacing: ${({ theme }) => theme.typography[key].letterSpacing};
  ${({ theme }) =>
    theme.typography[key].textTransform &&
    css`text-transform: ${theme.typography[key].textTransform};`}
`

export const Display = styled.h1`
  ${applyTypography('display')}
`

export const H1 = styled.h1`
  ${applyTypography('h1')}
`

export const H2 = styled.h2`
  ${applyTypography('h2')}
`

export const H3 = styled.h3`
  ${applyTypography('h3')}
`

export const H4 = styled.h4`
  ${applyTypography('h4')}
`

export const H5 = styled.h5`
  ${applyTypography('h5')}
`

export const BodyLarge = styled.p`
  ${applyTypography('bodyLarge')}
`

export const BodyMedium = styled.p`
  ${applyTypography('bodyMedium')}
`

export const BodySmall = styled.p`
  ${applyTypography('bodySmall')}
`

export const ButtonText = styled.span`
  ${applyTypography('buttonLarge')}
`

export const ButtonTextMedium = styled.span`
  ${applyTypography('buttonMedium')}
`

export const ButtonTextSmall = styled.span`
  ${applyTypography('buttonSmall')}
`

export const Label = styled.span`
  ${applyTypography('label')}
`

export { applyTypography }
