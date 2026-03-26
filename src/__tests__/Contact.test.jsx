import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router'
import theme from '@/styles/theme'
import Contact from '@/pages/Contact'

const renderContact = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    </MemoryRouter>,
  )

describe('Contact page', () => {
  it('renders without crashing', () => {
    renderContact()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders form fields', () => {
    renderContact()
    expect(screen.getAllByLabelText(/name/i).length).toBeGreaterThan(0)
    expect(screen.getAllByLabelText(/email/i).length).toBeGreaterThan(0)
  })

  it('shows validation errors on empty submit', () => {
    renderContact()
    const sendButtons = screen.getAllByRole('button', { name: /send message/i })
    fireEvent.submit(sendButtons[0].closest('form'))
    expect(screen.getAllByText('Please fill out this field.').length).toBeGreaterThan(0)
  })
})
