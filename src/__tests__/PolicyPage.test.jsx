import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@/__tests__/testUtils'
import PolicyPage from '@/routes/policy/PolicyPage'

const renderPolicyPage = () =>
  render(
    <MemoryRouter initialEntries={['/policy']}>
      <PolicyPage />
    </MemoryRouter>,
  )

describe('PolicyPage', () => {
  it('renders the policy document headings and key content', () => {
    renderPolicyPage()

    expect(
      screen.getByRole('heading', { level: 1, name: 'HKW Policies' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Fulfillment Policy' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Payment Policy' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Delivery Timelines' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Contact Information' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Project Confirmation:')).toBeInTheDocument()
    expect(screen.getByText(/2 business days/)).toBeInTheDocument()
    expect(screen.getByText(/4-16 weeks/)).toBeInTheDocument()
  })

  it('link exposes the support email as mailto links', () => {
    renderPolicyPage()

    screen.getAllByRole('link', { name: 'support@hkw.io' }).forEach((link) => {
      expect(link).toHaveAttribute('href', 'mailto:support@hkw.io')
    })
  })
})
