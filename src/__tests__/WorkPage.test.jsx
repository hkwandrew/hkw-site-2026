import { fireEvent, render, screen, within } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import WorkPage from '@/routes/work/WorkPage'
import caseStudies from '@/routes/work/caseStudies'

const renderWorkPage = () => render(<WorkPage />)

const getDesktopNav = () => screen.getByTestId('work-nav-desktop')

describe('WorkPage', () => {
  it('renders one desktop nav button per case study in case-study order', () => {
    renderWorkPage()

    const buttons = within(getDesktopNav()).getAllByRole('button')

    expect(buttons).toHaveLength(caseStudies.length)
    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual(
      caseStudies.map((study) => `Show ${study.name}`),
    )
  })

  it('renders icon buttons for mapped studies and dot fallback buttons for missing icons', () => {
    renderWorkPage()

    const nav = getDesktopNav()
    const buttons = within(nav).getAllByRole('button')
    const studiesWithIcons = caseStudies.filter((study) => Boolean(study.navIcon))
    const studiesWithoutIcons = caseStudies.filter(
      (study) => !study.navIcon,
    )
    const iconButtons = buttons.filter(
      (button) => button.dataset.navKind === 'icon',
    )
    const dotButtons = buttons.filter((button) => button.dataset.navKind === 'dot')

    expect(iconButtons).toHaveLength(studiesWithIcons.length)
    expect(dotButtons).toHaveLength(studiesWithoutIcons.length)

    studiesWithIcons.forEach((study) => {
      expect(
        within(nav)
          .getByRole('button', { name: `Show ${study.name}` })
          .getAttribute('data-nav-kind'),
      ).toBe('icon')
    })

    studiesWithoutIcons.forEach((study) => {
      expect(
        within(nav)
          .getByRole('button', { name: `Show ${study.name}` })
          .getAttribute('data-nav-kind'),
      ).toBe('dot')
    })
  })

  it('shows the active icon treatment for the current item and updates it after selection', () => {
    renderWorkPage()

    const nav = getDesktopNav()
    const getIcon = (button) => button.querySelector('img')
    const getCurrentButtons = () =>
      within(nav)
        .getAllByRole('button')
        .filter((button) => button.getAttribute('aria-current') === 'true')

    let celdfButton = within(nav).getByRole('button', { name: 'Show CELDF' })
    let celdfIcon = getIcon(celdfButton)

    expect(getComputedStyle(celdfIcon).filter).toContain('drop-shadow')
    expect(getCurrentButtons()).toHaveLength(1)
    expect(celdfButton).toHaveAttribute('aria-current', 'true')

    fireEvent.click(within(nav).getByRole('button', { name: 'Show Conviva' }))

    expect(screen.getByRole('heading', { name: 'Conviva' })).toBeInTheDocument()

    celdfButton = within(nav).getByRole('button', { name: 'Show CELDF' })
    celdfIcon = getIcon(celdfButton)

    const convivaButton = within(nav).getByRole('button', {
      name: 'Show Conviva',
    })
    const convivaIcon = getIcon(convivaButton)

    expect(getComputedStyle(celdfIcon).filter).toBe('none')
    expect(getComputedStyle(convivaIcon).filter).toContain('drop-shadow')
    expect(getCurrentButtons()).toHaveLength(1)
    expect(convivaButton).toHaveAttribute('aria-current', 'true')
  })

  it('renders one image per icon button and keeps CELDF on the default asset', () => {
    renderWorkPage()

    const celdfButton = within(getDesktopNav()).getByRole('button', {
      name: 'Show CELDF',
    })
    const iconButtons = within(getDesktopNav())
      .getAllByRole('button')
      .filter((button) => button.dataset.navKind === 'icon')

    expect(
      iconButtons.every((button) => button.querySelectorAll('img').length === 1),
    ).toBe(true)
    expect(celdfButton.querySelector('img')?.getAttribute('src')).toContain(
      'celdf-default',
    )
  })

  it('updates the visible study copy and hero image when a nav button is selected', () => {
    renderWorkPage()

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show MA-CH' }),
    )

    expect(screen.getByRole('heading', { name: 'MA-CH' })).toBeInTheDocument()
    expect(screen.getByText('Web Design')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'MA-CH' })).toBeInTheDocument()
  })
})
