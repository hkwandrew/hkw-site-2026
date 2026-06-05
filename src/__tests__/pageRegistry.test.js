import { describe, it, expect } from 'vitest'
import {
  getPageKeyForPath,
  getPageLabelForPath,
  getPageDefinitionForPath,
  getTransitionKey,
  PAGE_DEFINITIONS,
  NAV_ITEMS,
  PHONE_NAV_ITEMS,
  getRouteChildrenConfig,
} from '@/app/router/routeRegistry'

describe('getPageKeyForPath', () => {
  it('returns correct page key for each route', () => {
    expect(getPageKeyForPath('/')).toBe('home-page')
    expect(getPageKeyForPath('/about')).toBe('about-page')
    expect(getPageKeyForPath('/services')).toBe('services-page')
    expect(getPageKeyForPath('/work')).toBe('work-page')
    expect(getPageKeyForPath('/work/voxus-pr')).toBe('work-page')
    expect(getPageKeyForPath('/contact')).toBe('contact-page')
    expect(getPageKeyForPath('/roots')).toBe('roots-page')
    expect(getPageKeyForPath('/roots/meals-on-wheels')).toBe('roots-page')
    expect(getPageKeyForPath('/policy')).toBe('policy-page')
  })

  it('returns unknown for unrecognized paths', () => {
    expect(getPageKeyForPath('/nonexistent')).toBe('unknown')
    expect(getPageKeyForPath('')).toBe('unknown')
  })
})

describe('getPageLabelForPath', () => {
  it('returns the label for known pages', () => {
    expect(getPageLabelForPath('/about')).toBe('Kind Words')
    expect(getPageLabelForPath('/services')).toBe('Our Specialties')
    expect(getPageLabelForPath('/work')).toBe('Our Work')
  })

  it('returns empty string for home page', () => {
    expect(getPageLabelForPath('/')).toBe('')
  })

  it('returns empty string for unknown pages', () => {
    expect(getPageLabelForPath('/unknown')).toBe('')
  })
})

describe('getPageDefinitionForPath', () => {
  it('returns page definition object for valid paths', () => {
    const aboutPage = getPageDefinitionForPath('/about')
    expect(aboutPage).not.toBeNull()
    expect(aboutPage.id).toBe('about')
    expect(aboutPage.pageKey).toBe('about-page')
    expect(aboutPage.routePath).toBe('/about')
    expect(aboutPage.sceneStateKey).toBe('about-page')
  })

  it('returns parent page definitions for item-level route paths', () => {
    const workPage = getPageDefinitionForPath('/work/voxus-pr')
    const rootsPage = getPageDefinitionForPath('/roots/meals-on-wheels')

    expect(workPage).not.toBeNull()
    expect(workPage.id).toBe('work')
    expect(workPage.routePath).toBe('/work')
    expect(rootsPage).not.toBeNull()
    expect(rootsPage.id).toBe('roots')
    expect(rootsPage.routePath).toBe('/roots')
  })

  it('returns the mobile-only Non-profit Roots page definition', () => {
    const rootsPage = getPageDefinitionForPath('/roots')

    expect(rootsPage).not.toBeNull()
    expect(rootsPage.id).toBe('roots')
    expect(rootsPage.pageKey).toBe('roots-page')
    expect(rootsPage.routePath).toBe('/roots')
    expect(rootsPage.sceneStateKey).toBe('roots-page')
    expect(rootsPage.showInNav).toBe(false)
    expect(rootsPage.showInPhoneNav).toBe(true)
  })

  it('returns null for unknown paths', () => {
    expect(getPageDefinitionForPath('/nonexistent')).toBeNull()
  })
})

describe('getTransitionKey', () => {
  it('returns correct transition key for valid paths', () => {
    expect(getTransitionKey('/', '/about')).toBe('home-to-about')
    expect(getTransitionKey('/about', '/services')).toBe('about-to-services')
    expect(getTransitionKey('/work', '/')).toBe('work-to-home')
    expect(getTransitionKey('/work/celdf', '/services')).toBe(
      'work-to-services',
    )
    expect(getTransitionKey('/roots/meals-on-wheels', '/work')).toBe(
      'roots-to-work',
    )
  })

  it('returns empty string for same-page transitions', () => {
    expect(getTransitionKey('/', '/')).toBe('')
    expect(getTransitionKey('/about', '/about')).toBe('')
    expect(getTransitionKey('/work/celdf', '/work/voxus-pr')).toBe('')
    expect(getTransitionKey('/roots', '/roots/meals-on-wheels')).toBe('')
  })

  it('returns empty string when either path is unknown', () => {
    expect(getTransitionKey('/unknown', '/about')).toBe('')
    expect(getTransitionKey('/', '/unknown')).toBe('')
  })
})

describe('getRouteChildrenConfig', () => {
  it('registers optional slug segments for item-level routes', () => {
    const routeChildren = getRouteChildrenConfig()

    expect(routeChildren).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'work/:caseStudySlug?' }),
        expect.objectContaining({ path: 'roots/:portfolioSlug?' }),
      ]),
    )
  })

  it('registers the policy route as a static route', () => {
    const routeChildren = getRouteChildrenConfig()

    expect(routeChildren).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: 'policy',
        }),
      ]),
    )
  })
})

describe('PAGE_DEFINITIONS', () => {
  it('contains exactly 7 page definitions', () => {
    expect(PAGE_DEFINITIONS).toHaveLength(7)
  })

  it('each definition has required properties', () => {
    PAGE_DEFINITIONS.forEach((def) => {
      expect(def).toHaveProperty('id')
      expect(def).toHaveProperty('routePath')
      expect(def).toHaveProperty('pageKey')
      expect(def).toHaveProperty('sceneStateKey')
    })
  })
})

describe('NAV_ITEMS', () => {
  it('contains only pages with showInNav: true', () => {
    expect(NAV_ITEMS.length).toBeGreaterThan(0)
    NAV_ITEMS.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('label')
      expect(item).toHaveProperty('path')
    })
  })

  it('does not expose the policy page in desktop navigation', () => {
    expect(NAV_ITEMS.map((item) => item.path)).not.toContain('/policy')
  })
})

describe('PHONE_NAV_ITEMS', () => {
  it('contains only pages with showInPhoneNav: true', () => {
    expect(PHONE_NAV_ITEMS.length).toBeGreaterThan(0)
    PHONE_NAV_ITEMS.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('label')
      expect(item).toHaveProperty('path')
    })
  })

  it('uses the mobile navigation order and labels', () => {
    expect(PHONE_NAV_ITEMS).toEqual([
      {
        id: 'about',
        label: 'About',
        path: '/about',
      },
      {
        id: 'services',
        label: 'Services',
        path: '/services',
      },
      {
        id: 'work',
        label: 'Work',
        path: '/work',
      },
      {
        id: 'roots',
        label: 'Non-Profits',
        path: '/roots',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact',
      },
    ])
  })

  it('does not expose the policy page in phone navigation', () => {
    expect(PHONE_NAV_ITEMS.map((item) => item.path)).not.toContain('/policy')
  })
})
