import { describe, it, expect } from 'vitest'
import {
  SCENE_TRANSITION_DURATION_MS,
  SCENE_PAGE_STATES,
  resolveSceneStateForPath,
  resolveSceneTransition,
  validateSharedSceneConfig,
} from '@/sharedSceneConfig'

const REQUIRED_LAYERS = [
  'blueMountain',
  'goldMountain',
  'sun',
  'dkBlueMountain',
  'treeMountain',
  'upperField',
  'whiteSand',
]

describe('SCENE_TRANSITION_DURATION_MS', () => {
  it('is a positive number', () => {
    expect(SCENE_TRANSITION_DURATION_MS).toBeGreaterThan(0)
  })
})

describe('SCENE_PAGE_STATES', () => {
  it('has entries for all 5 pages', () => {
    expect(Object.keys(SCENE_PAGE_STATES)).toHaveLength(5)
    expect(SCENE_PAGE_STATES).toHaveProperty('home-page')
    expect(SCENE_PAGE_STATES).toHaveProperty('about-page')
    expect(SCENE_PAGE_STATES).toHaveProperty('services-page')
    expect(SCENE_PAGE_STATES).toHaveProperty('work-page')
    expect(SCENE_PAGE_STATES).toHaveProperty('contact-page')
  })

  it('each page state has all 7 required layers', () => {
    Object.entries(SCENE_PAGE_STATES).forEach(([pageKey, state]) => {
      REQUIRED_LAYERS.forEach((layerKey) => {
        expect(state, `${pageKey} missing layer ${layerKey}`).toHaveProperty(layerKey)
      })
    })
  })

  it('each layer has container and wrapper properties', () => {
    Object.entries(SCENE_PAGE_STATES).forEach(([pageKey, state]) => {
      REQUIRED_LAYERS.forEach((layerKey) => {
        const layer = state[layerKey]
        expect(layer.container, `${pageKey}.${layerKey} missing container`).toBeDefined()
        expect(layer.container).toHaveProperty('x')
        expect(layer.container).toHaveProperty('y')
        expect(layer.wrapper, `${pageKey}.${layerKey} missing wrapper`).toBeDefined()
        expect(layer.wrapper).toHaveProperty('scaleX')
        expect(layer.wrapper).toHaveProperty('scaleY')
      })
    })
  })
})

describe('resolveSceneStateForPath', () => {
  it('returns scene state for valid paths', () => {
    const homeState = resolveSceneStateForPath('/')
    expect(homeState).not.toBeNull()
    expect(homeState).toHaveProperty('blueMountain')
    expect(homeState).toHaveProperty('sun')
  })

  it('returns correct state for each page', () => {
    expect(resolveSceneStateForPath('/')).toBe(SCENE_PAGE_STATES['home-page'])
    expect(resolveSceneStateForPath('/about')).toBe(SCENE_PAGE_STATES['about-page'])
    expect(resolveSceneStateForPath('/services')).toBe(SCENE_PAGE_STATES['services-page'])
    expect(resolveSceneStateForPath('/work')).toBe(SCENE_PAGE_STATES['work-page'])
    expect(resolveSceneStateForPath('/contact')).toBe(SCENE_PAGE_STATES['contact-page'])
  })

  it('returns null for unknown paths', () => {
    expect(resolveSceneStateForPath('/unknown')).toBeNull()
    expect(resolveSceneStateForPath('')).toBeNull()
  })
})

describe('resolveSceneTransition', () => {
  it('returns transition config for valid path pairs', () => {
    const transition = resolveSceneTransition('/', '/about')
    expect(transition).not.toBeNull()
    expect(transition.transitionKey).toBe('home-to-about')
    expect(transition.durationMs).toBe(SCENE_TRANSITION_DURATION_MS)
    expect(transition.targetState).toBe(SCENE_PAGE_STATES['about-page'])
    expect(transition.pathMorphByLayer).toBeDefined()
  })

  it('returns null for same-path transitions', () => {
    expect(resolveSceneTransition('/', '/')).toBeNull()
    expect(resolveSceneTransition('/about', '/about')).toBeNull()
  })

  it('returns null when either path is unknown', () => {
    expect(resolveSceneTransition('/unknown', '/about')).toBeNull()
    expect(resolveSceneTransition('/', '/unknown')).toBeNull()
  })
})

describe('validateSharedSceneConfig', () => {
  it('returns empty array when config is valid', () => {
    const errors = validateSharedSceneConfig()
    expect(errors).toEqual([])
  })
})
