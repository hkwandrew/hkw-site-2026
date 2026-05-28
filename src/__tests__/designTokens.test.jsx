import { render, screen } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import PillButton from '@/shared/ui/PillButton'
import theme from '@/styles/theme'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'

describe('design tokens', () => {
  it('uses role-based button typography from the Figma button instances', () => {
    expect(theme.typography.navButton).toMatchObject({
      size: '24px',
      weight: 500,
      activeWeight: 600,
      width: 68,
      lineHeight: '26px',
      letterSpacing: '0',
      textTransform: 'uppercase',
    })
    expect(theme.typography.pillButton).toMatchObject({
      size: '24px',
      weight: 600,
      width: 68,
      lineHeight: '26px',
      letterSpacing: '0',
      textTransform: 'uppercase',
    })
    expect(theme.typography.formButton).toMatchObject({
      size: '20px',
      weight: 500,
      activeWeight: 600,
      width: 68,
      lineHeight: '1',
      letterSpacing: '0',
      textTransform: 'uppercase',
    })
    expect(theme.typography.smallButton.letterSpacing).toBe('0')
  })

  it('renders close and send pills with the Figma instance typography and colors', () => {
    render(
      <>
        <PillButton variant='close'>Close</PillButton>
        <PillButton variant='send'>Send Message</PillButton>
      </>,
    )

    const closeButton = screen.getByRole('button', { name: 'Close' })
    const sendButton = screen.getByRole('button', { name: 'Send Message' })

    expect(getComputedStyle(closeButton).fontSize).toBe(
      convertCssPxToViewportUnit('24px'),
    )
    expect(getComputedStyle(closeButton).lineHeight).toBe(
      convertCssPxToViewportUnit('26px'),
    )
    expect(getComputedStyle(closeButton).letterSpacing).toBe('0px')
    expect(getComputedStyle(closeButton).backgroundColor).toBe('rgb(165, 50, 19)')
    expect(getComputedStyle(closeButton).color).toBe('rgb(252, 250, 229)')
    expect(getComputedStyle(closeButton).borderRadius).toBe(
      convertCssPxToViewportUnit('9999px'),
    )

    expect(getComputedStyle(sendButton).fontSize).toBe(
      convertCssPxToViewportUnit('20px'),
    )
    expect(getComputedStyle(sendButton).lineHeight).toBe('1')
    expect(getComputedStyle(sendButton).letterSpacing).toBe('0px')
    expect(getComputedStyle(sendButton).backgroundColor).toBe('rgb(28, 45, 56)')
    expect(getComputedStyle(sendButton).color).toBe('rgb(252, 250, 229)')
    expect(getComputedStyle(sendButton).borderRadius).toBe(
      convertCssPxToViewportUnit('99px'),
    )
  })
})
