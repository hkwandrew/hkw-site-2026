import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  SCENE_VIEWPORT_MOBILE_QUERY,
  animateSharedSceneTransition,
  applySharedSceneState,
} from '@/app/landscape/runtime/sharedSceneRuntime'
import { HOME_SCENE_STATE } from '@/routes/home/sceneSpec'

const originalMatchMedia = window.matchMedia

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

const setMobileViewport = (matches) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === SCENE_VIEWPORT_MOBILE_QUERY ? matches : false,
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

describe('shared scene runtime viewport state', () => {
  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('uses base wrapper state when the viewport does not match', () => {
    setMobileViewport(false)

    const root = createSceneRoot()

    applySharedSceneState(root, HOME_SCENE_STATE)

    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1,1)',
    )
  })

  it('applies mobile wrapper overrides when the viewport matches', () => {
    setMobileViewport(true)

    const root = createSceneRoot()

    applySharedSceneState(root, HOME_SCENE_STATE)

    expect(root.querySelector('#tree-mountain__wrapper')).toHaveAttribute(
      'transform',
      'scale(1.84,1.82)',
    )
  })

  it('applies mobile TreeMountain path data when the viewport matches', () => {
    setMobileViewport(true)

    const root = createSceneRoot()

    applySharedSceneState(root, createTreeMountainPathSceneState())

    const paths = getTreeMountainPaths(root)

    expect(paths[0]).toHaveAttribute('d', 'M2 2L3 3')
    expect(paths[1]).toHaveAttribute('d', 'M9 9L10 10')
  })

  it('animates toward mobile TreeMountain path data when the viewport matches', () => {
    setMobileViewport(true)

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
    setMobileViewport(true)

    const root = createSceneRoot()

    applySharedSceneState(root, createPercentageCoordinateSceneState())

    expect(root.querySelector('#dirt-layer__container')).toHaveAttribute(
      'transform',
      'translate(0,220)',
    )
  })

  it('applies negative percentage coordinate values from scene state', () => {
    setMobileViewport(true)

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

  it('animates toward mobile wrapper overrides when the viewport matches', () => {
    setMobileViewport(true)

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
    setMobileViewport(false)

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
      'translate(654,230)',
    )

    timeline.kill()
  })
})
