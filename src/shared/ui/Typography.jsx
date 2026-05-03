import styled, { css } from 'styled-components'

const applyTypography = (key) => css`
  ${({ theme }) => {
    const type = theme.typography[key]

    if (!type) return ''

    const variationSettings = [
      type.width !== undefined ? `'wdth' ${type.width}` : null,
      type.weight !== undefined ? `'wght' ${type.weight}` : null,
    ].filter(Boolean)

    return css`
      font-family: ${theme.font.family};
      ${type.size !== undefined &&
      css`
        font-size: ${type.size};
      `}
      ${type.weight !== undefined &&
      css`
        font-weight: ${type.weight};
      `}
      ${variationSettings.length > 0 &&
      css`
        font-variation-settings: ${variationSettings.join(', ')};
      `}
      ${type.lineHeight !== undefined &&
      css`
        line-height: ${type.lineHeight};
      `}
      ${type.letterSpacing !== undefined &&
      css`
        letter-spacing: ${type.letterSpacing};
      `}
      ${type.textTransform &&
      css`
        text-transform: ${type.textTransform};
      `}
      ${type.textBox &&
      css`
        text-box: ${type.textBox};
      `}
    `
  }}
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

export const Label = styled.span`
  ${applyTypography('label')}
`

export { applyTypography }
