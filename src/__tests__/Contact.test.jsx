import { describe, it, expect, vi } from 'vitest'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router'
import { fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import Contact from '@/routes/contact/ContactPage'
import { CONTACT_SCENE_STATE } from '@/routes/contact/sceneSpec'

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getStyleText = () =>
  Array.from(document.head.querySelectorAll('style'))
    .map((styleTag) => styleTag.textContent ?? '')
    .join('\n')

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

  it('renders one form field tree', () => {
    const { container } = renderContact()

    expect(container.querySelectorAll('form')).toHaveLength(1)
    expect(screen.getAllByLabelText(/enter name/i)).toHaveLength(1)
    expect(screen.getAllByLabelText(/enter email address/i)).toHaveLength(1)
    expect(screen.getAllByRole('combobox', { name: /project type/i })).toHaveLength(1)
  })

  it('uses the shared scene sun for the phone contact background', () => {
    renderContact()

    const contactStage = screen.getByLabelText('Contact form')
    const styles = getStyleText()
    const contactStageClassName = Array.from(contactStage.classList).find(
      (className) => styles.includes(`.${className}`),
    )

    expect(contactStageClassName).toBeDefined()
    expect(styles).not.toMatch(
      new RegExp(`\\.${escapeRegExp(contactStageClassName)}::?before`),
    )
    expect(CONTACT_SCENE_STATE.sun.viewports.mobile.wrapper.scaleX).toBeGreaterThan(
      CONTACT_SCENE_STATE.sun.wrapper.scaleX,
    )
  })

  it('shows validation errors on empty submit', () => {
    renderContact()
    const sendButtons = screen.getAllByRole('button', { name: /send message/i })
    fireEvent.submit(sendButtons[0].closest('form'))
    expect(screen.getAllByText('Please fill out this field.').length).toBeGreaterThan(0)
  })

  it('applies Figma validation and active field styling on desktop', () => {
    renderContact()

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'))

    const nameInput = screen.getByLabelText(/enter name/i)
    const errorText = screen.getAllByText('Please fill out this field.')[0]
    const nameStyles = getComputedStyle(nameInput)
    const errorStyles = getComputedStyle(errorText)

    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(nameStyles.backgroundColor).toBe('rgb(254, 227, 202)')
    expect(nameStyles.borderColor).toBe('rgb(111, 27, 0)')
    expect(errorStyles.color).toBe('rgb(254, 227, 202)')

    const projectType = screen.getByRole('combobox', { name: /project type/i })
    fireEvent.click(projectType)

    const projectTypeStyles = getComputedStyle(projectType)
    expect(projectTypeStyles.backgroundColor).toBe('rgb(254, 227, 202)')
    expect(projectTypeStyles.borderColor).toBe('rgb(111, 27, 0)')
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
