import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router'
import theme from '@/styles/theme'
import Contact from '@/pages/Contact'

const renderContact = (props = {}) =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Contact {...props} />
      </ThemeProvider>
    </MemoryRouter>,
  )

const renderContactRoute = (props = {}) => {
  const router = createMemoryRouter(
    [
      {
        path: '/contact',
        element: (
          <ThemeProvider theme={theme}>
            <Contact {...props} />
          </ThemeProvider>
        ),
      },
      {
        path: '/',
        element: <div>Home page</div>,
      },
    ],
    { initialEntries: ['/contact'] },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

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

  it('renders a desktop close button on the contact route', () => {
    renderContactRoute()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('calls onClose when the desktop close button is clicked', () => {
    const handleClose = vi.fn()
    renderContact({ onClose: handleClose })

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('navigates home when the desktop close button is clicked without onClose', async () => {
    const { router } = renderContactRoute()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })
})
