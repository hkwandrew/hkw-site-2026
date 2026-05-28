export const WORK_SCENE_STATE = {
  blueMountain: {
    container: { x: -2954.808069, y: -845.237842 },
    wrapper: { scaleX: 2.2, scaleY: 2.2 },
    pathD:
      'M886 1114.66C1146 821.5 1558 460 1818.25 337.25C1997.71 238.45 2066.63 230.22 2189.3 304.16C2378 454.5 3410 465 3979.5 1114.66H886Z',
  },
  goldMountain: {
    container: { x: 1570.5, y: 1230 },
    wrapper: { scaleX: 2.15652778, scaleY: 2.251165 },
    pathD:
      'M1331.141905,247.787758C1562.934831,192.634037,1694.602994,118.123634,1880.349905,231.480615C2015.428242,232.372918,2130.406074,278.734949,2168.805905,300.752043C2230.548063,333.37591,2294.241905,259.385329,2337.261905,258.516329C2383.651905,257.580329,2427.123073,288.669674,2483.141905,292.302043C3233.141905,378.879043,3497.010625,542.361465,3609.541905,850.673472L433.141905,850.673472C433.141905,850.673472,763.653419,389.672656,1331.141905,247.787758Z',
    viewPorts: {
      mobile: {
        container: { x: 1570.5, y: 1230 },
        // wrapper: { scaleX: 1, scaleY: 1 },
      },
    },
  },
  sun: {
    container: { x: 1689.827022, y: -160.209423 },
    wrapper: { scaleX: 1.2, scaleY: 1.2 },
  },
  dkBlueMountain: {
    container: { x: 2566.013348, y: 1287.966795 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  treeMountain: {
    container: { x: 155.680149, y: '100%' },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  upperField: {
    container: { x: 2101.532525, y: 1283.708382 },
    wrapper: { scaleX: 0.8, scaleY: 0.8 },
  },
  whiteSand: {
    container: { x: -90, y: 190 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: -90, y: 390 },
      },
    },
  },
  dirtLayer: {
    container: { x: 1181, y: 2000 },
    wrapper: { scaleX: 1, scaleY: 1 },
    viewports: {
      mobile: {
        container: { x: 0, y: '260%' },
      },
    },
  },
}

export const workSceneSpec = {
  state: WORK_SCENE_STATE,
  transitionsTo: {},
}
