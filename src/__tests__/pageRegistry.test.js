import { describe, it, expect } from 'vitest'
import {
  getPageKeyForPath,
  getPageLabelForPath,
  getPageDefinitionForPath,
  getTransitionKey,
  PAGE_DEFINITIONS,
  NAV_ITEMS,
  PHONE_NAV_ITEMS,
} from '@/app/router/routeRegistry'

describe('getPageKeyForPath', () => {
  it('returns correct page key for each route', () => {
    expect(getPageKeyForPath('/')).toBe('home-page')
    expect(getPageKeyForPath('/about')).toBe('about-page')
    expect(getPageKeyForPath('/services')).toBe('services-page')
    expect(getPageKeyForPath('/work')).toBe('work-page')
    expect(getPageKeyForPath('/contact')).toBe('contact-page')
    expect(getPageKeyForPath('/roots')).toBe('roots-page')
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

  it('returns the hidden Non-profit Roots page definition', () => {
    const rootsPage = getPageDefinitionForPath('/roots')

    expect(rootsPage).not.toBeNull()
    expect(rootsPage.id).toBe('roots')
    expect(rootsPage.pageKey).toBe('roots-page')
    expect(rootsPage.routePath).toBe('/roots')
    expect(rootsPage.sceneStateKey).toBe('roots-page')
    expect(rootsPage.showInNav).toBe(false)
    expect(rootsPage.showInPhoneNav).toBe(false)
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
  })

  it('returns empty string for same-page transitions', () => {
    expect(getTransitionKey('/', '/')).toBe('')
    expect(getTransitionKey('/about', '/about')).toBe('')
  })

  it('returns empty string when either path is unknown', () => {
    expect(getTransitionKey('/unknown', '/about')).toBe('')
    expect(getTransitionKey('/', '/unknown')).toBe('')
  })
})

describe('PAGE_DEFINITIONS', () => {
  it('contains exactly 6 page definitions', () => {
    expect(PAGE_DEFINITIONS).toHaveLength(6)
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

  it('includes contact page (phone nav only)', () => {
    const contactItem = PHONE_NAV_ITEMS.find((item) => item.id === 'contact')
    expect(contactItem).toBeDefined()
  })
})
