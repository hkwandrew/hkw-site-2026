import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@/__tests__/testUtils'
import { createMemoryRouter, Link, RouterProvider } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import WorkPage from '@/routes/work/WorkPage'
import {
  NAV_BUTTON_LAYOUT_DEFAULTS,
  resolveNavButtonLayout,
} from '@/routes/work/navButtonLayout'
import caseStudies from '@/routes/work/caseStudies'
import {
  ROOTS_DROP_DURATION_MS,
  ROOTS_ENTRY_STATE_KEY,
  WORK_ROOTS_ENTRY_STATE_KEY,
} from '@/routes/roots/rootsEntry'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'

const originalMatchMedia = window.matchMedia

const renderWorkPage = ({ initialEntries = ['/work'], initialIndex } = {}) => {
  const router = createMemoryRouter(
    [
      {
        path: '/work/:caseStudySlug?',
        element: <WorkPage />,
      },
    ],
    {
      initialEntries,
      initialIndex,
    },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

const renderWorkPageWithExitLink = (transitionSceneToPath) => {
  const router = createMemoryRouter(
    [
      {
        path: '/work/:caseStudySlug?',
        element: (
          <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
            <WorkPage />
            <Link to='/services'>Services</Link>
          </PageSceneTransitionProvider>
        ),
      },
      {
        path: '/services',
        element: <div>Services route body</div>,
      },
    ],
    {
      initialEntries: ['/work'],
    },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

const renderWorkPageWithRootsTransition = (transitionSceneToPath) => {
  const router = createMemoryRouter(
    [
      {
        path: '/work/:caseStudySlug?',
        element: (
          <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
            <WorkPage />
          </PageSceneTransitionProvider>
        ),
      },
      {
        path: '/roots',
        element: <div>Roots route body</div>,
      },
    ],
    {
      initialEntries: ['/work'],
    },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

const getDesktopNav = () => screen.getByTestId('work-nav-desktop')
const getDesktopNavRail = () => getDesktopNav().parentElement.parentElement
const getPreviousArrowButton = () =>
  screen.getByRole('button', { name: /show previous work item/i })
const getWorkMarmot = () => screen.getByTestId('work-marmot')
const getWorkMarmotTrigger = () =>
  screen.getByRole('button', { name: /enter non-profit roots/i })
const getActiveStudyPane = () => screen.getByTestId('work-study-active')
  const getMainContent = () =>
    getActiveStudyPane().parentElement.parentElement.parentElement
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
      'SEO, SEM, Content',
      'Creation',
    ],
  },
  {
    id: 'scar',
    name: 'SCAR',
    quote:
      "Working with HKW's web design team has been one of the easiest experiences for our organization — they understood our vision right away and have continued to turn it into a site we’re proud to share with our community.",
    attribution: 'Evee Polanski, Director of Operations',
    services: ['Web Design', 'Web Development'],
  },
  {
    id: 'reltio',
    name: 'Reltio',
    quote:
      "From strategy to launch, HKW is the rare agency that combines rock-solid reliability, outstanding design & UI/UX, and genuine partnership — all wrapped up in a team you'll actually love working with.",
    attribution: 'Sr. Director, Global Digital & Web Marketing',
    services: ['Web Design', 'Web Development', 'Marketing Support'],
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
    id: 'computercare',
    name: 'ComputerCare',
    quote:
      '“HKW has done many wonderful projects for us over the years. Most recently they helped us implement a new and modern looking website, as well as a huge integration project for our website to connect to our internal systems, which has automated so much of our manual processes. They built a user friendly interface for our customers, and keep our site well maintained.”',
    attribution: 'Melissa Marsh, Senior Business Systems Analyst at ComputerCare',
    services: ['Web Design', 'Web Development'],
  },
]

describe('WorkPage', () => {
  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  const getStudy = (id) => caseStudies.find((study) => study.id === id)
  const toCssLength = (value, fallback = 'none') =>
    value === undefined || value === null || value === ''
      ? fallback
      : typeof value === 'number'
        ? `${value}px`
        : value
  const toRenderedCssLength = (value, fallback = 'none') =>
    convertCssPxToViewportUnit(toCssLength(value, fallback))
  const normalizeAspectRatio = (value) => value.replaceAll(' ', '')
  const normalizeCssFunction = (value) => value.replace(/\s+/g, '')
  const getInjectedStyles = () =>
    Array.from(document.querySelectorAll('style'))
      .map((styleElement) => styleElement.textContent)
      .join('\n')
  const hasClassRule = (className, declarations) =>
    getInjectedStyles().includes(`.${className}{${declarations}}`)
  const hasInjectedAnimationRule = (element) =>
    Array.from(element.classList).some((className) =>
      getInjectedStyles().includes(`.${className}{animation:`),
    )

  const waitForActiveStudy = async (studyId) => {
    await waitFor(() => {
      expect(getActiveStudyPane()).toHaveAttribute('data-work-example', studyId)
    }, { timeout: 2000 })
  }

  const waitForEnteringStudy = async (studyId) => {
    await waitFor(() => {
      const enteringPane = document.querySelector('[data-study-pane="entering"]')

      expect(screen.queryByTestId('work-study-active')).not.toBeInTheDocument()
      expect(enteringPane).toHaveAttribute('data-work-example', studyId)
    }, { timeout: 2000 })
  }

  const selectDesktopStudy = async (study) => {
    fireEvent.click(
      within(getDesktopNav()).getByRole('button', {
        name: `Show ${study.name}`,
      }),
    )

    await waitForActiveStudy(study.id)
  }

  const expectHeroLayoutApplied = (studyId) => {
    const study = getStudy(studyId)
    const image = screen.getByRole('img', { name: study.name })
    const heroPaneStyle = getComputedStyle(image.parentElement)
    const imageStyle = getComputedStyle(image)

    expect(heroPaneStyle.width).toBe(toRenderedCssLength(study.heroImage.width))
    expect(heroPaneStyle.maxWidth).toBe(
      toRenderedCssLength(study.heroImage.maxWidth),
    )
    expect(normalizeAspectRatio(imageStyle.aspectRatio)).toBe(
      normalizeAspectRatio(study.heroImage.aspectRatio),
    )
    expect(imageStyle.translate).toBe(
      convertCssPxToViewportUnit(
        `${study.heroImage.desktop.x}px ${study.heroImage.desktop.y}px`,
      ),
    )

    if (study.heroImage.rotation !== undefined) {
      expect(normalizeCssFunction(imageStyle.transform)).toBe(
        `rotate(${study.heroImage.rotation}deg)`,
      )
    }
  }

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
          desktop: expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
          }),
          mobile: expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
          }),
        }),
      )

      if (study.heroImage.height !== undefined) {
        expect(study.heroImage.height).toEqual(expect.any(Number))
      }

      if (study.heroImage.aspectRatio !== undefined) {
        expect(study.heroImage.aspectRatio).toEqual(expect.any(String))
      }
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

  it('exposes the active case study id on work copy and hero panes', async () => {
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

    await waitForActiveStudy('conviva')

    expect(getActiveStudyPane()).toHaveAttribute('data-work-example', 'conviva')
    expect(
      screen.getByRole('img', { name: 'Conviva' }).parentElement,
    ).toHaveAttribute('data-work-example', 'conviva')
  })

  it('opens the requested case study from the URL slug', async () => {
    renderWorkPage({ initialEntries: ['/work/voxus-pr'] })

    await waitForActiveStudy('voxus')

    expect(screen.getByRole('img', { name: 'Voxus PR' })).toBeInTheDocument()
  })

  it('updates the URL when selecting a work case study', async () => {
    const { router } = renderWorkPage()

    await selectDesktopStudy(getStudy('voxus'))

    expect(router.state.location.pathname).toBe('/work/voxus-pr')
  })

  it('updates the selected work case study on browser history changes', async () => {
    const { router } = renderWorkPage({
      initialEntries: ['/work/celdf', '/work/voxus-pr'],
      initialIndex: 1,
    })

    await waitForActiveStudy('voxus')

    await router.navigate(-1)

    await waitForActiveStudy('celdf')
    expect(router.state.location.pathname).toBe('/work/celdf')
  })

  it('replaces invalid work slugs with the parent work route', async () => {
    const { router } = renderWorkPage({ initialEntries: ['/work/nope'] })

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/work')
    })
    expect(getActiveStudyPane()).toHaveAttribute('data-work-example', 'celdf')
  })

  it('keeps the desktop copy stage on fallback sizing when values are blank or omitted', async () => {
    renderWorkPage()

    const initialStudy = caseStudies[0]
    const omittedLayoutStudy = caseStudies.find(
      (caseStudy) =>
        caseStudy.id !== initialStudy.id &&
        caseStudy.flexBasis === undefined &&
        caseStudy.maxWidth === undefined,
    )
    const fallbackFlexBasis = 'calc(52.5% - 64px)'
    const fallbackMaxWidth = '424px'
    const initialStageStyle = getComputedStyle(getActiveStudyPane().parentElement)

    expect(omittedLayoutStudy).toBeDefined()
    expect(initialStageStyle.flexGrow).toBe('0')
    expect(initialStageStyle.flexShrink).toBe('0')
    expect(initialStageStyle.flexBasis).toBe(
      toRenderedCssLength(initialStudy.flexBasis, fallbackFlexBasis),
    )
    expect(initialStageStyle.maxWidth).toBe(
      toRenderedCssLength(initialStudy.maxWidth, fallbackMaxWidth),
    )

    await selectDesktopStudy(omittedLayoutStudy)

    expect(getComputedStyle(getActiveStudyPane().parentElement).flexBasis).toBe(
      toRenderedCssLength(undefined, fallbackFlexBasis),
    )
    expect(getComputedStyle(getActiveStudyPane().parentElement).maxWidth).toBe(
      toRenderedCssLength(undefined, fallbackMaxWidth),
    )
  })

  it('applies active study text stage layout from case-study data', async () => {
    const study = getStudy('voxus')
    const previousFlexBasis = study.flexBasis
    const previousMaxWidth = study.maxWidth

    study.flexBasis = 312
    study.maxWidth = 376

    try {
      renderWorkPage()

      fireEvent.click(
        within(getDesktopNav()).getByRole('button', { name: 'Show Voxus PR' }),
      )

      await waitForActiveStudy('voxus')

      const stageStyle = getComputedStyle(getActiveStudyPane().parentElement)

      expect(stageStyle.flexBasis).toBe(convertCssPxToViewportUnit('312px'))
      expect(stageStyle.maxWidth).toBe(convertCssPxToViewportUnit('376px'))
    } finally {
      if (previousFlexBasis === undefined) {
        delete study.flexBasis
      } else {
        study.flexBasis = previousFlexBasis
      }

      if (previousMaxWidth === undefined) {
        delete study.maxWidth
      } else {
        study.maxWidth = previousMaxWidth
      }
    }
  })

  it('applies active study quote letter spacing from case-study data', async () => {
    const study = getStudy('voxus')
    const previousLetterSpacing = study.letterSpacing

    study.letterSpacing = '-0.48px'

    try {
      renderWorkPage()

      fireEvent.click(
        within(getDesktopNav()).getByRole('button', { name: 'Show Voxus PR' }),
      )

      await waitForActiveStudy('voxus')

      expect(
        getComputedStyle(within(getActiveStudyPane()).getByText(study.quote))
          .letterSpacing,
      ).toBe(convertCssPxToViewportUnit('-0.48px'))
    } finally {
      if (previousLetterSpacing === undefined) {
        delete study.letterSpacing
      } else {
        study.letterSpacing = previousLetterSpacing
      }
    }
  })

  it('reduces the main content left padding for wide case studies', async () => {
    const wideStudy = caseStudies.find((caseStudy) => caseStudy.isWide)

    expect(wideStudy).toBeDefined()

    renderWorkPage()

    const normalClassName = getMainContent().className

    expect(normalizeCssFunction(getInjectedStyles())).toContain(
      normalizeCssFunction(
        convertCssPxToViewportUnit('clamp(132px, 17.5vw, 252px)'),
      ),
    )

    await selectDesktopStudy(wideStudy)

    expect(getMainContent().className).not.toBe(normalClassName)
    expect(normalizeCssFunction(getInjectedStyles())).toContain(
      normalizeCssFunction(
        convertCssPxToViewportUnit(
          'calc(clamp(132px, 17.5vw, 252px) - 60px)',
        ),
      ),
    )
  })

  it('applies per-study hero image layout from case-study data', async () => {
    renderWorkPage()

    expectHeroLayoutApplied('celdf')

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show Lumiere Work' }),
    )

    await waitForActiveStudy('lumiere')
    expectHeroLayoutApplied('lumiere')

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show ComputerCare' }),
    )

    await waitForActiveStudy('computercare')
    expectHeroLayoutApplied('computercare')
  })

  it('prevents mobile overflow from desktop-width work artwork', () => {
    renderWorkPage()

    const page = getMainContent().parentElement
    const activeHero = document.querySelector(
      '[data-work-example-region="hero"][data-study-pane="active"]',
    )

    const pageClipClassName = Array.from(page.classList).find((className) =>
      hasClassRule(className, 'overflow-x:clip;'),
    )
    const heroWidthClassName = Array.from(activeHero.classList).find(
      (className) =>
        hasClassRule(
          className,
          'position:relative;align-items:flex-start;justify-content:flex-start;width:100%;max-width:100%;',
        ),
    )

    expect(pageClipClassName).toBeDefined()
    expect(heroWidthClassName).toBeDefined()
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

  it('shows the active icon treatment for the current item and updates it after selection', async () => {
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

    await waitForActiveStudy('conviva')

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

  it('updates the visible study copy and hero image when a nav button is selected', async () => {
    renderWorkPage()

    await selectDesktopStudy(getStudy('reltio'))

    expect(
      within(getActiveStudyPane()).getByRole('heading', { name: 'Reltio' }),
    ).toBeInTheDocument()
    expect(within(getActiveStudyPane()).getByText('Web Design')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Reltio' })).toBeInTheDocument()
  })

  it('reveals work content and carousel controls after the dirt foreground lands', async () => {
    renderWorkPage()

    expect(getComputedStyle(getMainContent()).opacity).toBe('0')
    expect(getComputedStyle(getDesktopNavRail()).opacity).toBe('0')
    expect(getComputedStyle(getPreviousArrowButton()).opacity).toBe('0')
    expect(getComputedStyle(getWorkMarmot()).opacity).toBe('0')

    await waitFor(() => {
      expect(getComputedStyle(getMainContent()).opacity).toBe('1')
      expect(getComputedStyle(getDesktopNavRail()).opacity).toBe('1')
      expect(getComputedStyle(getPreviousArrowButton()).opacity).toBe('1')
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })
  })

  it('reveals the Non-profit Roots sign when the work marmot is focused', async () => {
    renderWorkPage()

    await waitFor(() => {
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })

    const trigger = getWorkMarmotTrigger()
    const sign = document.querySelector('[data-work-marmot-sign]')

    expect(trigger).toBe(getWorkMarmot())
    expect(sign).not.toBeNull()
    expect(getComputedStyle(sign).opacity).toBe('0')

    fireEvent.focus(trigger)

    expect(trigger).toHaveAttribute('data-work-marmot-hover-active', 'true')
    expect(getComputedStyle(sign).opacity).toBe('1')
    expect(getComputedStyle(sign).transform).toContain('translate3d')
  })

  it('clips the sign and descending marmot artwork at the work hole', async () => {
    renderWorkPage()

    await waitFor(() => {
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })

    const character = document.querySelector('#marmot-character-idle')
    const hole = document.querySelector('[data-work-marmot-hole]')
    const sign = document.querySelector('[data-work-marmot-sign]')
    const signMask = document.querySelector('[data-work-marmot-sign-mask]')
    const characterMask = document.querySelector(
      '[data-work-marmot-character-mask]',
    )
    const marmotClipRect = document.querySelector('#workMarmotAboveHoleClip rect')

    expect(character).not.toBeNull()
    expect(hole).not.toBeNull()
    expect(signMask).not.toBeNull()
    expect(signMask).toContainElement(sign)
    expect(getComputedStyle(signMask).overflow).toBe('hidden')
    expect(getComputedStyle(signMask).height).toBe(toRenderedCssLength(195.6))
    expect(normalizeCssFunction(getComputedStyle(signMask).clipPath)).toContain(
      'polygon',
    )
    expect(characterMask).toContainElement(character)
    expect(characterMask).toHaveAttribute(
      'clip-path',
      'url(#workMarmotAboveHoleClip)',
    )
    expect(marmotClipRect).toHaveAttribute('height', '190')
    expect(
      character.compareDocumentPosition(hole) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy()
  })

  it('drops the work marmot before routing directly to Non-profit Roots', async () => {
    const transitionSceneToPath = vi.fn(() => true)
    const { router } = renderWorkPageWithRootsTransition(transitionSceneToPath)

    await waitFor(() => {
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })

    fireEvent.click(getWorkMarmotTrigger())

    expect(transitionSceneToPath).toHaveBeenCalledWith('/roots')
    expect(router.state.location.pathname).toBe('/work')
    expect(getWorkMarmot()).toHaveAttribute(
      'data-work-marmot-transition-active',
      'true',
    )

    const styles = normalizeCssFunction(getInjectedStyles())
    expect(styles).toContain('#marmot-character-idle{animation:')
    expect(styles).toContain(`${ROOTS_DROP_DURATION_MS}ms`)

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/roots')
    }, { timeout: 1000 })

    expect(router.state.location.state).toEqual({
      [ROOTS_ENTRY_STATE_KEY]: true,
      [WORK_ROOTS_ENTRY_STATE_KEY]: true,
    })
  })

  it('routes immediately from the work marmot when reduced motion is preferred', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const transitionSceneToPath = vi.fn(() => true)
    const { router } = renderWorkPageWithRootsTransition(transitionSceneToPath)

    await waitFor(() => {
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })

    fireEvent.click(getWorkMarmotTrigger())

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/roots')
    })
    expect(transitionSceneToPath).not.toHaveBeenCalled()
  })

  it('keeps the work route mounted while the dirt foreground exits down', async () => {
    const transitionSceneToPath = vi.fn(() => true)
    const { router } = renderWorkPageWithExitLink(transitionSceneToPath)

    await waitFor(() => {
      expect(getComputedStyle(getMainContent()).opacity).toBe('1')
      expect(getComputedStyle(getDesktopNavRail()).opacity).toBe('1')
      expect(getComputedStyle(getPreviousArrowButton()).opacity).toBe('1')
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('1')
    }, { timeout: 2000 })

    fireEvent.click(screen.getByRole('link', { name: 'Services' }))

    await waitFor(() => {
      expect(transitionSceneToPath).toHaveBeenCalledWith('/services')
    })

    expect(router.state.location.pathname).toBe('/work')

    await waitFor(() => {
      expect(getComputedStyle(getMainContent()).opacity).toBe('0')
      expect(getComputedStyle(getDesktopNavRail()).opacity).toBe('0')
      expect(getComputedStyle(getPreviousArrowButton()).opacity).toBe('0')
      expect(getComputedStyle(getWorkMarmot()).opacity).toBe('0')
      expect(
        getComputedStyle(document.querySelector('#work-dirt-foreground'))
          .transform,
      ).toContain('128%')
    })

    expect(screen.queryByText('Services route body')).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Services route body')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('fades study panes without horizontal slide motion or layout shifts when changing items', async () => {
    renderWorkPage()

    const initialStage = getActiveStudyPane().parentElement
    const initialStageStyle = getComputedStyle(initialStage)

    fireEvent.click(
      within(getDesktopNav()).getByRole('button', { name: 'Show Conviva' }),
    )

    const leavingPane = document.querySelector('[data-study-pane="leaving"]')

    expect(screen.queryByTestId('work-study-active')).not.toBeInTheDocument()
    expect(leavingPane).toHaveAttribute('data-work-example', 'celdf')
    expect(getComputedStyle(initialStage).flexBasis).toBe(
      initialStageStyle.flexBasis,
    )
    expect(getComputedStyle(initialStage).maxWidth).toBe(
      initialStageStyle.maxWidth,
    )
    expect(getInjectedStyles()).not.toContain('translate3d(var(--study-pane-start)')
    expect(getInjectedStyles()).not.toContain('translate3d(var(--study-pane-end)')

    await waitForEnteringStudy('conviva')

    const enteringPane = document.querySelector('[data-study-pane="entering"]')

    expect(enteringPane).toHaveAttribute('data-work-example', 'conviva')
    expect(hasInjectedAnimationRule(enteringPane)).toBe(true)

    await waitForActiveStudy('conviva')
  })

  it('wraps from the last case study back to the first with the next arrow', async () => {
    renderWorkPage()

    const firstStudy = caseStudies[0]
    const lastStudy = caseStudies.at(-1)
    const initialNavTransform = getComputedStyle(getDesktopNav()).transform

    await selectDesktopStudy(lastStudy)

    expect(getActiveStudyPane()).toHaveAttribute(
      'data-work-example',
      lastStudy.id,
    )

    const lastStudyNavTransform = getComputedStyle(getDesktopNav()).transform

    expect(lastStudyNavTransform).not.toBe(initialNavTransform)

    fireEvent.click(
      screen.getByRole('button', { name: /show next work item/i }),
    )

    await waitForActiveStudy(firstStudy.id)
    await waitFor(() => {
      expect(getComputedStyle(getDesktopNav()).transform).not.toBe(
        initialNavTransform,
      )
    })

    expect(getActiveStudyPane()).toHaveAttribute(
      'data-work-example',
      firstStudy.id,
    )
    expect(
      within(getActiveStudyPane()).getByRole('heading', {
        name: firstStudy.name,
      }),
    ).toBeInTheDocument()

    const currentNavButton = getDesktopNav().querySelector('[aria-current="true"]')

    expect(currentNavButton).toHaveAttribute('data-work-example', firstStudy.id)
    expect(currentNavButton.previousElementSibling).toHaveAttribute(
      'data-work-example',
      lastStudy.id,
    )
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
    await waitForActiveStudy(firstStudyBeyondInitialWindow.id)
    expect(
      within(getActiveStudyPane()).getByRole('heading', {
        name: firstStudyBeyondInitialWindow.name,
      }),
    ).toBeInTheDocument()
  })
})
