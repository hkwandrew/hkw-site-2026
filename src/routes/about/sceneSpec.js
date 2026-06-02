export const ABOUT_SCENE_STATE = {
  blueMountain: {
    container: { x: -2490, y: -627 },
    wrapper: { scaleX: 2.36, scaleY: 2.63 },
    pathD:
      'M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z',
    viewports: {
      mobile: {
        container: { x: -2490, y: -470 },
      },
    },
  },
  goldMountain: {
    container: { x: 1868.83048, y: 1398.094682 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
    pathD:
      'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z',
    viewports: {
      mobile: {
        container: { x: 1868.83048, y: '400%' },
      },
    },
  },
  sun: {
    container: { x: 1556.062193, y: 27.022843 },
    wrapper: { scaleX: 1.98, scaleY: 1.98 },
    viewports: {
      mobile: {
        container: { x: 1706.062193, y: 115.022843 },
        wrapper: { scaleX: 1.805, scaleY: 1.84 },
      },
    },
  },
  dkBlueMountain: {
    container: { x: 2566.013348, y: 1317.966795 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  treeMountain: {
    container: { x: 55.680149, y: '100%' },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
    viewports: {
      mobile: {
        container: { x: 55.680149, y: '400%' },
      },
    },
  },
  upperField: {
    container: { x: 0, y: '200%' },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
    viewports: {
      mobile: {
        container: { x: 0, y: '300%' }
      }
    }
  },
  whiteSand: {
    container: { x: 2005, y: 1800 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 2005, y: '400%' },
      },
    },
  },
  dirtLayer: {
    container: { x: 1308, y: '210%' },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 0, y: '360%' },
      },
    },
  },
}

export const aboutSceneSpec = {
  state: ABOUT_SCENE_STATE,
  transitionsTo: {},
}
