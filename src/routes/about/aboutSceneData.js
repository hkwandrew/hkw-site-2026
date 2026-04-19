import DarkCloudCenter from './assets/about-clouds/about-dark-cloud.svg'
import OutroCloud from './assets/about-clouds/about-layer-outro.svg'
import DarkCloudLeft from './assets/about-clouds/cloud-dark.svg'
import DarkCloudRight from './assets/about-clouds/cloud-dk-right.svg'
import LightCloudCenter from './assets/about-clouds/cloud-light-center.svg'
import LightCloudLeft from './assets/about-clouds/cloud-light-left.svg'
import LightCloudRight from './assets/about-clouds/cloud-light-right.svg'
import MidCloudCenter from './assets/about-clouds/cloud-mid-center.svg'
import MidCloudLeft from './assets/about-clouds/cloud-mid-left.svg'
import MidCloudRight from './assets/about-clouds/cloud-mid-right.svg'

export const ABOUT_DESIGN_FRAME = { width: 1440, height: 1024 }

export const ABOUT_INTRO_COPY = [
  {
    text:
      "Great design isn't just about looking good\u2014it's about creating connection. At HKW, we bring curiosity, strategy, and care to every project, whether we're amplifying nonprofit missions or shaping distinctive brand voices.",
  },
  {
    text: "But don't just take our word for it\u2014",
    emphasis: "here's what our clients have to say.",
  },
]

export const ABOUT_FRAME_VISIBILITY = [
  { hero: 1, intro: 1, dark: 1, mid: 1, light: 0, outro: 0, mascot: 0 },
  { hero: 1, intro: 0, dark: 1, mid: 1, light: 1, outro: 0, mascot: 0 },
  { hero: 0, intro: 0, dark: 1, mid: 1, light: 1, outro: 1, mascot: 0 },
  { hero: 0, intro: 0, dark: 1, mid: 1, light: 1, outro: 1, mascot: 1 },
]

export const ABOUT_QUOTE_FRAME_VISIBILITY = [
  { dark: 1, mid: 1, light: 0, outro: 0 },
  { dark: 1, mid: 1, light: 1, outro: 0 },
  { dark: 0, mid: 1, light: 1, outro: 1 },
  { dark: 0, mid: 0, light: 1, outro: 1 },
]

export const ABOUT_HERO_CLOUD = {
  states: [
    { x: 2.89, y: 170.59, width: 1449.07 },
    { x: 209, y: 161, width: 947.065 },
    { x: 209, y: 161, width: 947.065 },
    { x: 209, y: 161, width: 947.065 },
  ],
  viewBoxes: {
    stageZero: '0 0 1450 622',
    stageOne: '0 0 947 515',
  },
  paths: {
    stageZero:
      'M142.027 201.869C142.027 135.956 276.101 -0.14735 440.513 78.7032C545.602 -40.1468 678.402 2.87734 721.64 33.1379C763.457 4.81365 891.543 -38.0437 997.553 74.3869C1180.04 -12.0437 1285.49 121.862 1300.01 185.629C1578.54 282.956 1415.54 541.956 1220.1 482.918C1084.64 683.456 822.043 612.956 749.36 443.276C724.543 441.197 715.888 441.983 700.985 439.027C626.126 654.879 276.215 582.484 231.639 494.734C234.324 494.068 228.762 495.448 231.639 494.734C-62.9572 541.456 -57.9571 246.456 142.027 201.869Z',
    stageOne:
      'M173.622 97.081C271.621 -38.4191 417.523 18.9585 460.761 49.2191C507.121 13.581 665.121 -58.9191 766.621 90.5812C925.634 72.5928 1053.63 311.093 750.634 368.093C750.634 368.093 718.634 459.357 654.134 483.593C598.636 522.6 486.634 510.815 486.634 510.815C461.816 508.736 444.539 503.556 429.636 500.6C429.636 500.6 342.636 494.1 311.136 416.6C222.636 431.1 199.136 416.6 132.636 383.6C100.693 356.608 74.6343 293.581 74.6343 293.581C-67.3656 211.581 8.63448 58.081 173.622 97.081Z',
  },
}

export const ABOUT_DESKTOP_CLOUDS = [
  {
    id: 'dark-left',
    layer: 'dark',
    width: 666.631,
    src: DarkCloudLeft,
    states: [
      { x: -107, y: 448 },
      { x: -54, y: 276.463 },
      { x: -54, y: 160.463 },
      { x: -54, y: 160.463 },
    ],
  },
  {
    id: 'dark-center',
    layer: 'dark',
    width: 669.981,
    src: DarkCloudCenter,
    states: [
      { x: 384.986, y: 568.916 },
      { x: 384.986, y: 180.916 },
      { x: 384.986, y: 64.916 },
      { x: 384.986, y: 64.916 },
    ],
  },
  {
    id: 'dark-right',
    layer: 'dark',
    width: 610.799,
    src: DarkCloudRight,
    states: [
      { x: 919, y: 445 },
      { x: 902.223, y: 262.979 },
      { x: 902.222, y: 146.979 },
      { x: 902.222, y: 146.979 },
    ],
  },
  {
    id: 'mid-left',
    layer: 'mid',
    width: 769.773,
    src: MidCloudLeft,
    states: [
      { x: -187, y: 843 },
      { x: -142, y: 602.823 },
      { x: -142, y: 238.823 },
      { x: -142, y: 239.823 },
    ],
  },
  {
    id: 'mid-center',
    layer: 'mid',
    width: 807.988,
    src: MidCloudCenter,
    states: [
      { x: 326, y: 898 },
      { x: 305.977, y: 495 },
      { x: 305.978, y: 131 },
      { x: 305.978, y: 132 },
    ],
  },
  {
    id: 'mid-right',
    layer: 'mid',
    width: 737.016,
    src: MidCloudRight,
    states: [
      { x: 842, y: 876 },
      { x: 828.565, y: 612.836 },
      { x: 827.564, y: 248.836 },
      { x: 828.187, y: 252.836 },
    ],
  },
  {
    id: 'light-left',
    layer: 'light',
    width: 698.345,
    src: LightCloudLeft,
    states: [
      { x: -138, y: 1357 },
      { x: -138, y: 994 },
      { x: -138, y: 621 },
      { x: -66, y: 316 },
    ],
  },
  {
    id: 'light-center',
    layer: 'light',
    width: 754.332,
    src: LightCloudCenter,
    states: [
      { x: 309, y: 1241 },
      { x: 309, y: 878 },
      { x: 309, y: 514 },
      { x: 322, y: 240 },
    ],
  },
  {
    id: 'light-right',
    layer: 'light',
    width: 760.344,
    src: LightCloudRight,
    states: [
      { x: 872, y: 1331 },
      { x: 872, y: 968 },
      { x: 872, y: 604 },
      { x: 872, y: 333 },
    ],
  },
  {
    id: 'outro-cloud',
    layer: 'outro',
    width: 1510,
    src: OutroCloud,
    states: [
      { x: -30, y: 1568 },
      { x: -30, y: 1205 },
      { x: -30, y: 841 },
      { x: -16, y: 596 },
    ],
  },
]

export const ABOUT_DESKTOP_FILLS = [
  {
    id: 'dark-fill',
    layer: 'dark',
    width: ABOUT_DESIGN_FRAME.width,
    states: [
      { x: 0, y: 632 },
      { x: 0, y: 411 },
      { x: 0, y: 315 },
      { x: 0, y: 1024 },
    ],
  },
  {
    id: 'mid-fill',
    layer: 'mid',
    width: ABOUT_DESIGN_FRAME.width,
    states: [
      { x: 0, y: 1159 },
      { x: 0, y: 745 },
      { x: 0, y: 367 },
      { x: 0, y: 367 },
    ],
  },
  {
    id: 'light-fill',
    layer: 'light',
    width: ABOUT_DESIGN_FRAME.width,
    states: [
      { x: 0, y: 1680 },
      { x: 0, y: 1680 },
      { x: 0, y: 680 },
      { x: 0, y: 462 },
    ],
  },
  {
    id: 'outro-fill',
    layer: 'outro',
    width: ABOUT_DESIGN_FRAME.width,
    states: [
      { x: 0, y: 2200 },
      { x: 0, y: 2200 },
      { x: 0, y: 2200 },
      { x: 0, y: 1900 },
    ],
  },
]

export const ABOUT_DESKTOP_QUOTE_LAYOUTS = [
  {
    id: 'jonathan',
    layer: 'dark',
    width: 278.042,
    quote: 'The whole HKW team was fantastic.',
    name: 'Jonathan Birnhaum',
    roleLines: ['Executive Director at ISL'],
    states: [
      { x: 59.294, y: 587.579 },
      { x: 125.294, y: 416.042 },
      { x: 140.294, y: 300.042 },
      { x: 140.294, y: 300.042 },
    ],
  },
  {
    id: 'julia',
    layer: 'dark',
    width: 345.04,
    quote: 'HKW has been an incredibly thoughtful partner.',
    name: 'Julia Cohen Sebastien',
    roleLines: ['Co-founder and CEO at Grayce'],
    states: [
      { x: 546.898, y: 705.146 },
      { x: 546.898, y: 317.146 },
      { x: 546.898, y: 201.146 },
      { x: 546.898, y: 201.146 },
    ],
  },
  {
    id: 'melissa',
    layer: 'dark',
    width: 322.707,
    quote: "We can't recommend HKW highly enough.",
    name: 'Melissa Huggins',
    roleLines: ['Executive Director at Spokane Arts'],
    states: [
      { x: 1059.929, y: 611.063 },
      { x: 1035.151, y: 429.042 },
      { x: 993.15, y: 324.042 },
      { x: 993.15, y: 324.042 },
    ],
  },
  {
    id: 'kevin',
    layer: 'mid',
    width: 623.734,
    quote: [
      'We communicate for a living,',
      'but HKW helped us crystalize',
      'our brand message.',
    ],
    name: 'Kevin Pedraja',
    roleLines: ['Partner at VOXUS PR'],
    states: [
      { x: -111.934, y: 1020.43 },
      { x: -32.934, y: 780.252 },
      { x: -32.934, y: 412.252 },
      { x: -66.934, y: 417.252 },
    ],
  },
  {
    id: 'blaise',
    layer: 'mid',
    width: 623.734,
    quote: ['HKW team understood our', 'needs better than we did.'],
    name: 'Blaise Yen',
    roleLines: ['Digital Marketing Manager', 'at Thermo Fisher'],
    states: [
      { x: 411.986, y: 1060.416 },
      { x: 407.962, y: 657.416 },
      { x: 408.963, y: 285.416 },
      { x: 391.963, y: 294.416 },
    ],
  },
  {
    id: 'shomya',
    layer: 'mid',
    width: 666.044,
    quote: ['Working with HKW was', 'an incredible experience.'],
    name: 'Shomya Tripathy',
    roleLines: [
      'Director of Policy and Civic',
      'Engagement at Asian Counseling',
      'and Referral Service',
    ],
    states: [
      { x: 852.378, y: 1016.687 },
      { x: 828.565, y: 753.523 },
      { x: 827.564, y: 389.523 },
      { x: 844.564, y: 412.523 },
    ],
  },
  {
    id: 'paul',
    layer: 'light',
    width: 640.851,
    quote: ['HKW was a real pleasure', 'to work with.'],
    name: 'Paul Sebastin',
    roleLines: ['CEO at Sqord'],
    states: [
      { x: -116.965, y: 1533.69 },
      { x: -116.965, y: 1170.69 },
      { x: -103.966, y: 780.69 },
      { x: -95.966, y: 491.69 },
    ],
  },
  {
    id: 'eben',
    layer: 'light',
    width: 616.69,
    quote: ['HKW has done wonders', 'for my business.'],
    name: 'Eben Cole',
    roleLines: ['Cole Music Co.'],
    states: [
      { x: 392.665, y: 1402.932 },
      { x: 392.665, y: 1039.932 },
      { x: 411.665, y: 675.932 },
      { x: 411.665, y: 401.932 },
    ],
  },
  {
    id: 'paula',
    layer: 'light',
    width: 663.125,
    quote: ['HKW felt like full-fledged', 'members of my team.'],
    name: 'Paula Mantel',
    roleLines: ['Marketing Director at Conviva'],
    states: [
      { x: 902.472, y: 1492.065 },
      { x: 902.472, y: 1129.065 },
      { x: 886.472, y: 744.065 },
      { x: 902.472, y: 494.065 },
    ],
  },
  {
    id: 'nancy',
    layer: 'outro',
    width: 457,
    quote: 'We are grateful we selected HKW...',
    name: 'Nancy Janzen',
    roleLines: ['CEO at Maplewood'],
    states: [
      { x: 477, y: 1765 },
      { x: 477, y: 1402 },
      { x: 477, y: 1038 },
      { x: 491, y: 767 },
    ],
  },
]

export const ABOUT_MASCOT = {
  width: 349.01,
  states: [
    { x: 828, y: 1290, opacity: 0 },
    { x: 828, y: 1200, opacity: 0 },
    { x: 914, y: 1200, opacity: 1 },
    { x: 914, y: 825, opacity: 1 },
  ],
}

export const ABOUT_MOBILE_QUOTE_CLOUD = {
  src: DarkCloudCenter,
}

export const ABOUT_MOBILE_PANELS = [
  {
    id: 'jonathan',
    quote: 'The whole HKW team was fantastic.',
    name: 'Jonathan Birnhaum',
    roleLines: ['Executive Director at ISL'],
  },
  {
    id: 'julia',
    quote: 'HKW has been an incredibly thoughtful partner.',
    name: 'Julia Cohen Sebastien',
    roleLines: ['Co-founder and CEO at Grayce'],
  },
  {
    id: 'melissa',
    quote: "We can't recommend HKW highly enough.",
    name: 'Melissa Huggins',
    roleLines: ['Executive Director at Spokane Arts'],
  },
  {
    id: 'kevin',
    quote: [
      'We communicate for a living,',
      'but HKW helped us crystalize',
      'our brand message.',
    ],
    name: 'Kevin Pedraja',
    roleLines: ['Partner at VOXUS PR'],
  },
  {
    id: 'blaise',
    quote: ['HKW team understood our', 'needs better than we did.'],
    name: 'Blaise Yen',
    roleLines: ['Digital Marketing Manager', 'at Thermo Fisher'],
  },
  {
    id: 'shomya',
    quote: ['Working with HKW was', 'an incredible experience.'],
    name: 'Shomya Tripathy',
    roleLines: [
      'Director of Policy and Civic',
      'Engagement at Asian Counseling',
      'and Referral Service',
    ],
  },
  {
    id: 'paul',
    quote: ['HKW was a real pleasure', 'to work with.'],
    name: 'Paul Sebastin',
    roleLines: ['CEO at Sqord'],
  },
  {
    id: 'eben',
    quote: ['HKW has done wonders', 'for my business.'],
    name: 'Eben Cole',
    roleLines: ['Cole Music Co.'],
  },
  {
    id: 'paula',
    quote: ['HKW felt like full-fledged', 'members of my team.'],
    name: 'Paula Mantel',
    roleLines: ['Marketing Director at Conviva'],
  },
  {
    id: 'nancy',
    quote: 'We are grateful we selected HKW...',
    name: 'Nancy Janzen',
    roleLines: ['CEO at Maplewood'],
    isFinal: true,
  },
]
