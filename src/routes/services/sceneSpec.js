export const SERVICES_SCENE_STATE = {
  blueMountain: {
    container: { x: -170, y: -198 },
    wrapper: { scaleX: 1.1, scaleY: 1.1 },
    pathD:
      'M886 1114.66C1146 821.5 1558 460 1818.25 337.25C1997.71 238.45 2066.63 230.22 2189.3 304.16C2378 454.5 3410 465 3979.5 1114.66H886Z',
    viewports: {
      mobile: {
        pathD:
          'M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z',
        container: { x: 580, y: -238 },
      },
    },
  },
  goldMountain: {
    container: { x: 2023.544812, y: 863.249504 },
    wrapper: { scaleX: 1.25, scaleY: 1.4 },
    pathD:
      'M1331.141905,247.787758C1562.934831,192.634037,1694.602994,118.123634,1880.349905,231.480615C2015.428242,232.372918,2130.406074,278.734949,2168.805905,300.752043C2230.548063,333.37591,2294.241905,259.385329,2337.261905,258.516329C2383.651905,257.580329,2427.123073,288.669674,2483.141905,292.302043C3233.141905,378.879043,3497.010625,542.361465,3609.541905,850.673472L433.141905,850.673472C433.141905,850.673472,763.653419,389.672656,1331.141905,247.787758Z',
    viewports: {
      mobile: {
        pathD:
          'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z',
        container: { x: 2881.141905, y: 950 },
        wrapper: { scaleX: 1.85, scaleY: 1.9 },
      },
    },
  },
  sun: {
    container: { x: 1689.827022, y: -160.209423 },
    wrapper: { scaleX: 1.2, scaleY: 1.2 },
  },
  dkBlueMountain: {
    container: { x: 3489.129945, y: 1530.308658 },
    wrapper: { scaleX: 2, scaleY: 2 },
  },
  treeMountain: {
    container: { x: -2680, y: -523 },
    wrapper: { scaleX: 2.93, scaleY: 2.34 },
    viewports: {
      mobile: {
        container: { x: -2280, y: -523 },
        wrapper: { scaleX: 2.73, scaleY: 2.34 },
      },
    },
  },
  upperField: {
    container: { x: 0, y: '200%' },
    wrapper: { scaleX: 1.8, scaleY: 1.8 },
    viewports: {
      mobile: {
        container: { x: 2041.826439, y: '260%' },
      },
    },
  },
  whiteSand: {
    container: { x: 2005, y: 1800 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 2005, y: '260%' },
      },
    },
  },
  dirtLayer: {
    container: { x: 1181, y: 1100 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 0, y: '260%' },
      },
    },
  },
}

export const servicesSceneSpec = {
  state: SERVICES_SCENE_STATE,
  transitionsTo: {},
}
