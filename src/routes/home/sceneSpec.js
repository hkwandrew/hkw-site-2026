export const HOME_SCENE_STATE = {
  blueMountain: {
    container: { x: 18, y: 10 }, 
    wrapper: { scaleX: 1, scaleY: 1 },
    pathD:
      'M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z',
    viewports: {
      mobile: {
        container: { x: -1010, y: -110 },
        wrapper: { scaleX: 1.83, scaleY: 1.84 },
      },
    },
  },
  goldMountain: {
    container: { x: 2009.636203, y: 742.708225 },
    wrapper: { scaleX: 1, scaleY: 1 },
    pathD:
      'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z',
    viewports: {
      mobile: {
        container: { x: 2675, y: 1200 },
        wrapper: { scaleX: 1.8, scaleY: 1.8 },
      },
    },
  },
  sun: {
    container: { x: 1723.899505, y: 235.827656 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 2106, y: 325 },
        wrapper: { scaleX: 1.76, scaleY: 1.76 },
      },
    },
  },
  dkBlueMountain: {
    container: { x: 40.5, y: 7.000031 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 2685, y: '100%' },
        wrapper: { scaleX: 1, scaleY: 1 },
      },
    },
  },
  treeMountain: {
    container: { x: 50.680149, y: -5 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: -932.680149, y: -80 },
        wrapper: { scaleX: 1.84, scaleY: 1.82 },
      },
    },
  },
  upperField: {
    container: { x: 0, y: '46%' },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: -700, y: 675 },
        wrapper: { scaleX: 1.58, scaleY: 1.59 },
      },
    },
  },
  whiteSand: {
    container: { x: 2005, y: 1800 },
    wrapper: { scaleX: 1, scaleY: 1 },
  },
  dirtLayer: {
    container: { x: 1308, y: '110%' },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 0, y: '260%' },
      },
    },
  },
}

export const homeSceneSpec = {
  state: HOME_SCENE_STATE,
  transitionsTo: {
    'contact-page': {
      blueMountain: {
        type: 'rotational',
        map: 'position',
        curveMode: true,
        smooth: {
          points: 5,
          redraw: false,
          persist: false,
        },
      },
    },
  },
}
