import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  animateSharedSceneTransition,
  applySharedSceneState,
  getSceneViewportKey,
} from '@/app/landscape/runtime/sharedSceneRuntime'
import { HOME_SCENE_STATE } from '@/routes/home/sceneSpec'

const originalMatchMedia = window.matchMedia
const originalInnerHeight = window.innerHeight
const originalInnerWidth = window.innerWidth

const createSceneRoot = ({
  dirtLayerTransform = 'translate(1308,1100)',
  sceneTransform = 'translate(-10,-20)',
  viewBox = '0 0 100 200',
} = {}) => {
  const root = document.createElement('div')

  root.innerHTML = `
    <svg viewBox="${viewBox}">
      <g id="scene" transform="${sceneTransform}">
        <g id="tree-mountain__container" transform="translate(0,0)">
          <g id="tree-mountain__wrapper" transform="scale(1,1)">
            <g class="trees">
              <path d="M0 0L1 1"></path>
              <path d="M9 9L10 10"></path>
            </g>
          </g>
        </g>
        <g id="dirt-layer__container" transform="${dirtLayerTransform}">
          <g id="dirt-layer__wrapper" transform="scale(1,1)"></g>
        </g>
      </g>
    </svg>
  `

  return root
}

const setViewport = ({
  height,
  hover = 'hover',
  pointer = 'fine',
  width,
}) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height,
  })
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches:
      query === `(pointer: ${pointer})` || query === `(hover: ${hover})`,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

const getTreeMountainPaths = (root) => root.querySelectorAll('g.trees > path')

const createPercentageCoordinateSceneState = (
  container = { x: 0, y: '100%' },
) => ({
  ...HOME_SCENE_STATE,
  dirtLayer: {
    ...HOME_SCENE_STATE.dirtLayer,
    viewports: {
      mobile: {
        container,
      },
    },
  },
})

const createNumericDirtLayerSceneState = () => ({
  ...HOME_SCENE_STATE,
  dirtLayer: {
    ...HOME_SCENE_STATE.dirtLayer,
    container: { x: 1308, y: 1100 },
  },
})

const createTreeMountainPathSceneState = () => ({
  ...HOME_SCENE_STATE,
  treeMountain: {
    ...HOME_SCENE_STATE.treeMountain,
    viewports: {
      mobile: {
        ...HOME_SCENE_STATE.treeMountain.viewports.mobile,
        pathD: 'M2 2L3 3',
      },
    },
  },
})

const createViewportPrioritySceneState = () => ({
  ...HOME_SCENE_STATE,
  treeMountain: {
    ...HOME_SCENE_STATE.treeMountain,
    viewports: {
      mobile: {
        wrapper: { scaleX: 1.84, scaleY: 1.82 },
      },
      phonePortrait: {
        wrapper: { scaleX: 2.2, scaleY: 2.1 },
      },
      phoneLandscape: {
        wrapper: { scaleX: 1.4, scaleY: 1.3 },
      },
      shortDesktop: {
        wrapper: { scaleX: 1.2, scaleY: 1.1 },
      },
      tablet: {
        wrapper: { scaleX: 1.6, scaleY: 1.5 },
      },
    },
  },
})

describe('shared scene runtime viewport state', () => {
  afterEach(() => {
    window.matchMedia = originalMatchMedia
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: originalInnerWidth,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    })
  })

  it('uses base wrapper state for base viewport composition', () => {
    setViewport({ height: 1024, width: 1440 })

    const root = createSceneRoot()

    applySharedSceneState(root, HOME_SCENE_STATE)

    expect(getSceneViewportKey()).toBe('base')
    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1,1)',
    )
  })

  it('uses legacy mobile overrides only as the phonePortrait fallback', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()

    applySharedSceneState(root, HOME_SCENE_STATE)

    expect(getSceneViewportKey()).toBe('phonePortrait')
    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1.84,1.82)',
    )
  })

  it('prefers exact phonePortrait overrides over legacy mobile overrides', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()

    applySharedSceneState(root, createViewportPrioritySceneState())

    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(2.2,2.1)',
    )
  })

  it('does not fall into legacy mobile overrides for phoneLandscape', () => {
    setViewport({ height: 375, width: 667 })

    const root = createSceneRoot()

    applySharedSceneState(root, HOME_SCENE_STATE)

    expect(getSceneViewportKey()).toBe('phoneLandscape')
    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1,1)',
    )
  })

  it.each([
    [{ height: 375, width: 667 }, 'phoneLandscape', 'scale(1.4,1.3)'],
    [{ height: 768, width: 1366 }, 'shortDesktop', 'scale(1.2,1.1)'],
    [{ height: 1024, width: 768 }, 'tablet', 'scale(1.6,1.5)'],
  ])('resolves exact %s scene overrides', (viewport, key, transform) => {
    setViewport(viewport)

    const root = createSceneRoot()

    applySharedSceneState(root, createViewportPrioritySceneState())

    expect(getSceneViewportKey()).toBe(key)
    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      transform,
    )
  })

  it('applies phonePortrait fallback TreeMountain path data', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()

    applySharedSceneState(root, createTreeMountainPathSceneState())

    const paths = getTreeMountainPaths(root)

    expect(paths[0]).toHaveAttribute('d', 'M2 2L3 3')
    expect(paths[1]).toHaveAttribute('d', 'M9 9L10 10')
  })

  it('animates toward phonePortrait fallback TreeMountain path data', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()
    const timeline = animateSharedSceneTransition({
      durationMs: 100,
      pathMorphByLayer: {},
      rootElement: root,
      targetState: createTreeMountainPathSceneState(),
    })

    timeline.progress(1)

    const paths = getTreeMountainPaths(root)

    expect(paths[0]).toHaveAttribute('d', 'M2 2L3 3')
    expect(paths[1]).toHaveAttribute('d', 'M9 9L10 10')

    timeline.kill()
  })

  it('applies percentage y coordinate values from scene state', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()

    applySharedSceneState(root, createPercentageCoordinateSceneState())

    expect(root.querySelector('#dirt-layer__container')).toHaveAttribute(
      'transform',
      'translate(0,220)',
    )
  })

  it('applies negative percentage coordinate values from scene state', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()

    applySharedSceneState(
      root,
      createPercentageCoordinateSceneState({ x: '50%', y: '-100%' }),
    )

    expect(root.querySelector('#dirt-layer__container')).toHaveAttribute(
      'transform',
      'translate(60,-180)',
    )
  })

  it('animates toward phonePortrait fallback wrapper overrides', () => {
    setViewport({ height: 667, width: 375 })

    const root = createSceneRoot()
    const timeline = animateSharedSceneTransition({
      durationMs: 100,
      pathMorphByLayer: {},
      rootElement: root,
      targetState: createNumericDirtLayerSceneState(),
    })

    timeline.progress(1)

    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1.84,1.82)',
    )

    timeline.kill()
  })

  it('uses existing percentage translate values as animation start values', () => {
    setViewport({ height: 1024, width: 1440 })

    const root = createSceneRoot({
      dirtLayerTransform: 'translate(0,100%)',
    })
    const timeline = animateSharedSceneTransition({
      durationMs: 100,
      pathMorphByLayer: {},
      rootElement: root,
      targetState: HOME_SCENE_STATE,
    })

    timeline.progress(0.5)

    expect(root.querySelector('#dirt-layer__container')).toHaveAttribute(
      'transform',
      'translate(654,330)',
    )

    timeline.kill()
  })
})
