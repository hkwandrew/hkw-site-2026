import { render, screen } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import PillButton from '@/shared/ui/PillButton'
import theme from '@/styles/theme'

describe('design tokens', () => {
  it('exposes the button typography roles used by shared controls', () => {
    ;['navButton', 'pillButton', 'formButton'].forEach((role) => {
      expect(theme.typography[role]).toEqual(
        expect.objectContaining({
          lineHeight: expect.any(String),
          size: expect.any(String),
          textTransform: expect.any(String),
          weight: expect.any(Number),
          width: expect.any(Number),
        }),
      )
    })
  })

  it('renders close and send pill variants as accessible buttons', () => {
    render(
      <>
        <PillButton variant='close'>Close</PillButton>
        <PillButton variant='send'>Send Message</PillButton>
      </>,
    )

    const closeButton = screen.getByRole('button', { name: 'Close' })
    const sendButton = screen.getByRole('button', { name: 'Send Message' })

    expect(closeButton).toHaveTextContent('Close')
    expect(sendButton).toHaveTextContent('Send Message')
    expect(closeButton.className).not.toBe(sendButton.className)
  })
})
