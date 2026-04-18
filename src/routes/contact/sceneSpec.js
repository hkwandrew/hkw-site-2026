const BLUE_MOUNTAIN_SMOOTH_MORPH = {
  smooth: {
    points: 80,
    redraw: false,
    persist: false,
  },
}

export const CONTACT_SCENE_STATE = {
  blueMountain: {
    container: { x: 3175.697877, y: 644.21 },
    wrapper: { scaleX: 1, scaleY: 1 },
    pathD:
      'M1404 926.001C1200.5 793.5 1154.5 926.001 1066.5 926.001C996.5 926 814.5 739.501 539.5 825C241.501 722 -1235.5 1152 1051 1280.5C2186 629.001 1530.5 1028 1404 926.001Z',
  },
  goldMountain: {
    container: { x: 2023.544812, y: 1798 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
    pathD:
      'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z',
  },
  sun: {
    container: { x: 1893.827022, y: 512 },
    wrapper: { scaleX: 8.4483, scaleY: 8.4483 },
  },
  dkBlueMountain: {
    container: { x: 3489.129945, y: 1798 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  treeMountain: {
    container: { x: 1412.639424, y: 1798 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  upperField: {
    container: { x: 2041.826439, y: 1798 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  whiteSand: {
    container: { x: 2005, y: 1800 },
    wrapper: { scaleX: 1, scaleY: 1 },
  },
  dirtLayer: {
    container: { x: 1181, y: 1100 },
    wrapper: { scaleX: 1, scaleY: 1 },
  },
}

export const contactSceneSpec = {
  state: CONTACT_SCENE_STATE,
  transitionsTo: {
    'about-page': {
      blueMountain: BLUE_MOUNTAIN_SMOOTH_MORPH,
    },
    'home-page': {
      blueMountain: BLUE_MOUNTAIN_SMOOTH_MORPH,
    },
    'work-page': {
      blueMountain: BLUE_MOUNTAIN_SMOOTH_MORPH,
    },
  },
}
