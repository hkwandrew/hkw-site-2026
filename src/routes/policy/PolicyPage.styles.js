import styled from 'styled-components'
import ViewContainer from '@/shared/ui/ViewContainer'
import { applyTypography } from '@/shared/ui/Typography'
import { MEDIA_QUERIES } from '@/styles/breakpoints'

export const Page = styled(ViewContainer)`
  width: auto;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  padding: 164px 32px 88px;
  background: rgba(252, 250, 229);
  color: ${({ theme }) => theme.colors.blue.dark};
  scroll-padding-top: 164px;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    padding: 84px 20px 56px;
    scroll-padding-top: 84px;
  }
`

export const Document = styled.article`
  width: min(860px, 100%);
  margin: 0 auto;

  p,
  li {
    ${applyTypography('bodyMedium')}
    line-height: 1.62;
    letter-spacing: 0;
  }

  p {
    margin: 0;
  }

  p + p,
  ul + p {
    margin-top: 18px;
  }

  strong {
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.bodyMedium.width},
      'wght' ${({ theme }) => theme.font.weight.semibold};
  }

  a:not([data-policy-action='true']) {
    color: ${({ theme }) => theme.colors.orange.dark};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  a:not([data-policy-action='true']):focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
    border-radius: 4px;
  }

  ol,
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 18px 0 0 1.25em;
    padding: 0;
    list-style-position: outside;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  li > ul,
  li > ol {
    gap: 8px;
    margin-top: 8px;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    p,
    li {
      font-size: 16px;
      line-height: 1.55;
    }

    ol,
    ul {
      margin-left: 1.1em;
    }
  }
`

export const Title = styled.h1`
  ${applyTypography('h2')}
  margin: 0;
  color: ${({ theme }) => theme.colors.orange.dark};
  letter-spacing: 0;
  text-transform: uppercase;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 42px;
    line-height: 1.08;
  }
`

export const PolicySection = styled.section`
  margin-top: 56px;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    margin-top: 40px;
  }
`

export const SectionTitle = styled.h2`
  ${applyTypography('h4')}
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.blue.dark};
  letter-spacing: 0;
  text-transform: uppercase;

  &::after {
    content: '';
    display: block;
    width: 72px;
    height: 4px;
    margin-top: 14px;
    background: ${({ theme }) => theme.colors.yellow.gold};
    border-radius: 9999px;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 28px;
    line-height: 1.12;
  }
`

export const Intro = styled.p`
  color: ${({ theme }) => theme.colors.blue.dark};
`
