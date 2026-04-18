import { describe, it, expect, vi } from 'vitest'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router'
import { fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import Contact from '@/routes/contact/ContactPage'

const renderContact = (props = {}) =>
  render(
    <MemoryRouter>
      <Contact {...props} />
    </MemoryRouter>,
  )

const renderContactRoute = (props = {}) => {
  const router = createMemoryRouter(
    [
      {
        path: '/contact',
        element: withTheme(<Contact {...props} />),
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

  it('opens the project type dropdown when the trigger is clicked', () => {
    renderContact()

    fireEvent.click(screen.getByRole('combobox', { name: /project type/i }))

    expect(screen.getByRole('listbox', { name: /project type/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Website Design' })).toBeInTheDocument()
  })

  it('updates the project type and closes the dropdown on selection', () => {
    renderContact()

    fireEvent.click(screen.getByRole('combobox', { name: /project type/i }))
    fireEvent.click(screen.getByRole('option', { name: 'Branding' }))

    expect(screen.getByRole('combobox', { name: /project type/i })).toHaveTextContent('Branding')
    expect(screen.queryByRole('listbox', { name: /project type/i })).not.toBeInTheDocument()
  })

  it('supports keyboard selection in the project type dropdown', () => {
    renderContact()

    const trigger = screen.getByRole('combobox', { name: /project type/i })
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })

    const clearOption = screen.getByRole('option', { name: 'Select option' })
    fireEvent.keyDown(clearOption, { key: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('option', { name: 'Website Design' }), {
      key: 'Enter',
    })

    expect(screen.getByRole('combobox', { name: /project type/i })).toHaveTextContent(
      'Website Design',
    )
    expect(screen.queryByRole('listbox', { name: /project type/i })).not.toBeInTheDocument()
  })

  it('closes the project type dropdown on outside click', () => {
    renderContact()

    fireEvent.click(screen.getByRole('combobox', { name: /project type/i }))
    fireEvent.mouseDown(document.body)

    expect(screen.queryByRole('listbox', { name: /project type/i })).not.toBeInTheDocument()
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
