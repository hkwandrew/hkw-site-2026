import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import WorkPage from '@/routes/work/WorkPage'
import {
  NAV_BUTTON_LAYOUT_DEFAULTS,
  resolveNavButtonLayout,
} from '@/routes/work/navButtonLayout'
import caseStudies from '@/routes/work/caseStudies'

const renderWorkPage = () => render(<WorkPage />)

const getDesktopNav = () => screen.getByTestId('work-nav-desktop')
const getActiveStudyPane = () => screen.getByTestId('work-study-active')
const expectedCaseStudyContent = [
  {
    id: 'celdf',
    name: 'CELDF',
    quote:
      '"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."',
    attribution: 'Emelyn Lybarger, Outreach Coordinator',
    services: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
  },
  {
    id: 'voxus',
    name: 'Voxus PR',
    quote:
      '“We communicate for a living, but HKW helped us crystalize our brand message.”',
    attribution: 'Kevin Pedraja, Partner at Voxus PR',
    services: ['Website Design', 'Web Development', 'Branding'],
  },
  {
    id: 'lumiere',
    name: 'Lumiere Work',
    quote:
      '“HKW took something as abstract as consciousness-based leadership and translated it into a site that actually feels like the work: structured, luminous, and alive. Professional, thoughtful, and a pleasure to collaborate with from start to finish.”',
    attribution: 'Kathi Joy, Founder at Lumiere Work',
    services: [
      'Logo Design',
      'Website Design',
      'Collateral Design',
      'Website Development',
      'Branding',
    ],
  },
  {
    id: 'rogue-heart',
    name: 'Rogue Heart Media',
    quote:
      '“It has been our joy to work with HKW - on as many occasions as we can foster, really! Trust is well-placed with them, to create sites of lasting value, as well as the characteristic flair & function that you need.”',
    attribution: 'Megan Kennedy, Founder & Creative Director',
    services: ['Website Design', 'Website Development'],
  },
  {
    id: 'conviva',
    name: 'Conviva',
    quote: '"HKW felt like full-fledged members of my team."',
    attribution: 'Paula Mantle, Marketing Director at Conviva',
    services: [
      'Web Design',
      'Illustration',
      'Collateral Design',
      'Branding',
      'Physical Spaces',
      'Email Marketing',
      'SEO',
      'SEM',
      'Content Creation',
    ],
  },
  {
    id: 'scar',
    name: 'SCAR',
    quote: 'TBD',
    attribution: 'TBD',
    services: [
      'Logo Design',
      'Web Design',
      'Collateral Design',
      'Branding',
      'Web Development',
    ],
  },
  {
    id: 'reltio',
    name: 'Reltio',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design', 'Web Development'],
  },
  {
    id: 'inclusively',
    name: 'Inclusively',
    quote:
      '"The expertise and attention to detail by the entire team was evident throughout the project..."',
    attribution: 'Tiffany Meehan, VP of Marketing at Inclusively',
    services: [
      'Logo Redesign',
      'Web Design',
      'Illustration System',
      'Web Development',
      'Animation',
    ],
  },
  {
    id: 'mediabricks',
    name: 'MediaBricks',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Logo Design'],
  },
  {
    id: 'optable',
    name: 'Optable',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design', 'Illustration'],
  },
  {
    id: 'ma-ch',
    name: 'MA-CH',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design'],
  },
  {
    id: 'computercare',
    name: 'ComputerCare',
    quote:
      '“HKW has done many wonderful projects for us over the years. Most recently they helped us implement a new and modern looking website, as well as a huge integration project for our website to connect to our internal systems, which has automated so much of our manual processes. They built a user friendly interface for our customers, and keep our site well maintained.”',
    attribution: 'Melissa Marsh, Senior Business Systems Analyst at ComputerCare',
    services: ['Web Design', 'Web Development'],
  },
]

describe('WorkPage', () => {
  it('resolves per-study nav button layout overrides for desktop and mobile', () => {
    const layout = {
      desktop: {
        width: 132,
        height: 84,
        x: 10,
        y: -6,
      },
      mobile: {
        width: 68,
        height: 52,
        x: -4,
        y: 3,
      },
    }

    expect(resolveNavButtonLayout()).toEqual(NAV_BUTTON_LAYOUT_DEFAULTS.desktop)
    expect(resolveNavButtonLayout(undefined, true)).toEqual(
      NAV_BUTTON_LAYOUT_DEFAULTS.mobile,
    )
    expect(resolveNavButtonLayout(layout)).toEqual(layout.desktop)
    expect(resolveNavButtonLayout(layout, true)).toEqual(layout.mobile)
    expect(
      resolveNavButtonLayout({
        desktop: {
          width: 120,
        },
      }),
    ).toEqual({
      ...NAV_BUTTON_LAYOUT_DEFAULTS.desktop,
      width: 120,
    })
  })

  it('keeps every Figma work frame represented with copy, hero, and nav data', () => {
    expect(
      caseStudies.map(({ id, name, quote, attribution, services }) => ({
        id,
        name,
        quote,
        attribution,
        services,
      })),
    ).toEqual(expectedCaseStudyContent)

    caseStudies.forEach((study) => {
      expect(study.quote).not.toContain('TDB')
      expect(study.attribution).not.toContain('TDB')
      expect(study.image).toBeTruthy()
      expect(study.navIcon).toBeTruthy()
      expect(study.heroImage).toEqual(
        expect.objectContaining({
          width: expect.any(Number),
          height: expect.any(Number),
          x: expect.any(Number),
          y: expect.any(Number),
          aspectRatio: expect.any(String),
        }),
      )
    })
  })

  it('renders one desktop nav button per case study in case-study order', () => {
    renderWorkPage()

    const buttons = within(getDesktopNav()).getAllByRole('button')

    expect(buttons).toHaveLength(caseStudies.length)
    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual(
      caseStudies.map((study) => `Show ${study.name}`),
    )
    expect(buttons.map((button) => button.dataset.workExample)).toEqual(
      caseStudies.map((study) => study.id),
    )
  })

  it('exposes the active case study id on work copy and hero panes', () => {
    renderWorkPage()

    expect(getActiveStudyPane()).toHaveAttribute('data-work-example', 'celdf')
    expect(getActiveStudyPane()).toHaveAttribute(
      'data-work-example-region',
      'copy',
    )
    expect(
      screen.getByRole('img', { name: 'CELDF' }).parentElement,
    ).toHaveAttribute('data-work-example', 'celdf')

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show Conviva' }),
    )

    expect(getActiveStudyPane()).toHaveAttribute('data-work-example', 'conviva')
    expect(
      screen.getByRole('img', { name: 'Conviva' }).parentElement,
    ).toHaveAttribute('data-work-example', 'conviva')
  })

  it('applies per-study hero image layout from case-study data', () => {
    renderWorkPage()

    const celdfStudy = caseStudies.find((study) => study.id === 'celdf')
    const celdfImage = screen.getByRole('img', { name: 'CELDF' })
    const celdfImageStyle = getComputedStyle(celdfImage)

    expect(celdfStudy.heroImage).toEqual(
      expect.objectContaining({
        width: 760,
        height: 589,
        aspectRatio: '806 / 625',
        maxWidth: 'none',
        rotation: -0.481,
        x: 0,
        y: -18,
      }),
    )
    expect(celdfImageStyle.transform).toBe('rotate(-0.481deg)')
    expect(celdfImageStyle.translate).toBe('0px -18px')

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show Lumiere Work' }),
    )

    const lumiereStudy = caseStudies.find((study) => study.id === 'lumiere')
    const lumiereImage = screen.getByRole('img', {
      name: 'Lumiere Work',
    })
    const lumiereImageStyle = getComputedStyle(lumiereImage)

    expect(lumiereStudy.heroImage).toEqual(
      expect.objectContaining({
        width: 1277,
        height: 841,
        aspectRatio: '249 / 164',
        maxWidth: 650,
        rotation: 26,
        x: 0,
        y: -80,
      }),
    )
    expect(lumiereImageStyle.transform).toBe('rotate(26deg)')
    expect(lumiereImageStyle.translate).toBe('0px -80px')

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show MA-CH' }),
    )

    const maChStudy = caseStudies.find((study) => study.id === 'ma-ch')
    const maChImage = screen.getByRole('img', { name: 'MA-CH' })
    const maChImageStyle = getComputedStyle(maChImage)

    expect(maChStudy.heroImage).toEqual(
      expect.objectContaining({
        width: 600,
        height: 329,
        aspectRatio: '325 / 178',
        maxWidth: 'none',
        x: 0,
        y: 78,
      }),
    )
    expect(maChImageStyle.translate).toBe('0px 78px')
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

    expect(
      within(getActiveStudyPane()).getByRole('heading', { name: 'Conviva' }),
    ).toBeInTheDocument()

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

    expect(
      within(getActiveStudyPane()).getByRole('heading', { name: 'MA-CH' }),
    ).toBeInTheDocument()
    expect(within(getActiveStudyPane()).getByText('Web Design')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'MA-CH' })).toBeInTheDocument()
  })

  it('slides the desktop nav track when the active item moves beyond the first eight buttons', async () => {
    renderWorkPage()

    const desktopNav = getDesktopNav()
    const initialTransform = getComputedStyle(desktopNav).transform
    const firstStudyBeyondInitialWindow = caseStudies[8]

    expect(firstStudyBeyondInitialWindow).toBeDefined()

    fireEvent.click(
      within(desktopNav).getByRole('button', {
        name: `Show ${firstStudyBeyondInitialWindow.name}`,
      }),
    )

    await waitFor(() => {
      expect(getComputedStyle(desktopNav).transform).not.toBe(initialTransform)
    })
    expect(
      within(getActiveStudyPane()).getByRole('heading', {
        name: firstStudyBeyondInitialWindow.name,
      }),
    ).toBeInTheDocument()
  })
})
