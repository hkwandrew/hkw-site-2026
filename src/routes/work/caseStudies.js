import celdfImg from './assets/work/celdf.png'
import voxusImg from './assets/work/voxus-pr.png'
import lumiereImg from './assets/work/lumierework.png'
import rogueHeartImg from './assets/work/rogue-heart-media.png'
import convivaImg from './assets/work/conviva.png'
import scarImg from './assets/work/scar.png'
import computerCareImg from './assets/work/computer-care.png'
import inclusivelyImg from './assets/work/inclusively.png'
import reltioImg from './assets/work/reltio.png'
// import optableImg from './assets/work/optable.png'
import celdfNavDefault from './assets/work-nav/celdf-default.png'
import voxusNavDefault from './assets/work-nav/voxus-pr-default.png'
import lumiereNavDefault from './assets/work-nav/lumiere-default.png'
import rogueHeartNavDefault from './assets/work-nav/rogue-heart-default.png'
import convivaNavDefault from './assets/work-nav/conviva-default.svg'
import scarNavDefault from './assets/work-nav/scar-default.png'
import computerCareDefault from './assets/work-nav/computer-care-default.png'
import reltioNavDefault from './assets/work-nav/reltio-default.png'
import inclusivelyNavDefault from './assets/work-nav/inclusively-default.png'
// import optableNavDefault from './assets/work-nav/optable-default.svg'

// Hero image desktop/mobile offsets tune art placement inside the shared stage.
// Optional flexBasis/maxWidth values tune the desktop copy stage per study.
const caseStudies = [
  {
    id: 'celdf',
    slug: 'celdf',
    type: 'Non-Profit',
    name: 'CELDF',
    isCompact: true,
    flexBasis: 'calc(35.5% - 64px)',
    quote:
      '"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."',
    attribution: 'Emelyn Lybarger, Outreach Coordinator',
    services: [
      'Website Design',
      'Graphic Design',
      'Branding',
      'Logo Design',
      'Collateral Design',
      'Website Development',
    ],
    image: celdfImg,
    navIcon: celdfNavDefault,
    heroImage: {
      width: 800.18,
      height: 617.28,
      aspectRatio: '800.18 / 617.28',
      maxWidth: 'none',
      rotation: -0.491,
      desktop: {
        x: -65,
        y: -55,
      },
      mobile: {
        x: 75,
        y: -150,
      },
    },
    navButton: {
      desktop: {
        width: 112,
        height: 127,
        x: 0,
        y: 10,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'voxus',
    slug: 'voxus-pr',
    name: 'Voxus PR',
    flexBasis: 'calc(35.5% - 64px)',
    isWide: true,
    letterSpacing: '-0.24px',
    quote:
      '“We communicate for a living, but HKW helped us crystalize our brand message.”',
    attribution: 'Kevin Pedraja, Partner at Voxus PR',
    services: ['Website Design', 'Web Development'],
    image: voxusImg,
    navIcon: voxusNavDefault,
    heroImage: {
      width: 641.456,
      height: 677.632,
      aspectRatio: '641.456 / 677.632',
      maxWidth: 'none',
      desktop: {
        x: 140,
        y: -135,
      },
      mobile: {
        x: 70,
        y: -105,
      },
    },
    navButton: {
      desktop: {
        width: 132,
        height: 132,
        x: 0,
        y: 10,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'lumiere',
    slug: 'lumiere-work',
    name: 'Lumiere Work',
    isCompact: true,
    flexBasis: 'calc(38.5% - 64px)',
    maxWidth: '395px',
    letterSpacing: '-0.48px',
    quote:
      '“HKW took something as abstract as consciousness-based leadership and translated it into a site that actually feels like the work: structured, luminous, and alive. Professional, thoughtful, and a pleasure to collaborate with from start to finish.”',
    attribution: 'Kathi Joy, Founder at Lumiere Work',
    services: [
      'Logo Design',
      'Website Design',
      'Collateral Design',
      'Website Development',
      'Branding',
    ],
    image: lumiereImg,
    navIcon: lumiereNavDefault,
    heroImage: {
      width: 1276.895,
      height: 841.004,
      aspectRatio: '249 / 164',
      rotation: 26,
      desktop: {
        x: 0,
        y: 140,
      },
      mobile: {
        x: 150,
        y: -200,
      },
    },
    navButton: {
      desktop: {
        width: 132,
        height: 132,
        x: 0,
        y: 30,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'rogue-heart',
    slug: 'rogue-heart',
    name: 'Rogue Heart Media',
    flexBasis: 'calc(41.5% - 64px)',
    letterSpacing: '-0.4px',
    quote:
      '“It has been our joy to work with HKW - on as many occasions as we can foster, really! Trust is well-placed with them, to create sites of lasting value, as well as the characteristic flair & function that you need.”',
    attribution: 'Megan Kennedy, Founder & Creative Director',
    services: ['Website Design', 'Website Development'],
    image: rogueHeartImg,
    navIcon: rogueHeartNavDefault,
    heroImage: {
      width: 715,
      height: 483,
      aspectRatio: '715 / 483',
      maxWidth: 'none',
      desktop: {
        x: -36,
        y: 26,
      },
      mobile: {
        x: 86,
        y: -116,
      },
    },
    navButton: {
      desktop: {
        width: 132,
        height: 132,
        x: 0,
        y: 20,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'conviva',
    slug: 'conviva',
    name: 'Conviva',
    flexBasis: 'calc(34.63% - 64px)',
    quote: '"HKW felt like full-fledged members of my team."',
    attribution: 'Paula Mantle, Marketing Director at Conviva',
    services: [
      'Web Design',
      'Illustration',
      'Collateral Design',
      'Branding',
      'Physical Spaces',
      'Email Marketing',
      'SEO, SEM, Content',
      'Creation',
    ],
    image: convivaImg,
    navIcon: convivaNavDefault,
    heroImage: {
      width: 1252.371,
      height: 835.02,
      aspectRatio: '1252.37 / 835.02',
      desktop: {
        x: -270,
        y: -220,
      },
      mobile: {
        x: 80,
        y: -260,
      },
    },
    navButton: {
      desktop: {
        width: 88,
        height: 94,
        x: 0,
        y: 40,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'scar',
    slug: 'scar',
    type: 'Non-Profit',
    name: 'SCAR',
    flexBasis: 'calc(46.5% - 64px)',
    letterSpacing: '-0.4px',
    maxWidth: 472,
    isWide: true,
    quote:
      "Working with HKW's web design team has been one of the easiest experiences for our organization — they understood our vision right away and have continued to turn it into a site we’re proud to share with our community.",
    attribution: 'Evee Polanski, Director of Operations',
    services: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
      'Logo Design',
      'Marketing Support',
    ],
    image: scarImg,
    navIcon: scarNavDefault,
    heroImage: {
      width: 603.41,
      // height: 956.21,
      // aspectRatio: '623.41 / 956.21',
      desktop: {
        x: 20,
        y: -55,
      },
      mobile: {
        x: 65,
        y: -55,
      },
    },
    navButton: {
      desktop: {
        width: 84.086,
        height: 174.45,
        x: 0,
        y: -10,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'reltio',
    slug: 'reltio',
    name: 'Reltio',
    flexBasis: 'calc(42.5% - 64px)',
    quote:
      "From strategy to launch, HKW is the rare agency that combines rock-solid reliability, outstanding design & UI/UX, and genuine partnership — all wrapped up in a team you'll actually love working with.",
    attribution: 'Karim, Azar, Sr. Director, Global Digital & Web Marketing',
    services: ['Web Design', 'Web Development', 'Marketing Support'],
    image: reltioImg,
    navIcon: reltioNavDefault,
    heroImage: {
      width: 685.556,
      // height: 605.655,
      aspectRatio: '297 / 262',
      desktop: {
        x: -60,
        y: -110,
      },
      mobile: {
        x: 80,
        y: -130,
      },
    },
    navButton: {
      desktop: {
        width: 103,
        height: 123,
        x: 0,
        y: 20,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 'inclusively',
    slug: 'inclusively',
    name: 'Inclusively',
    flexBasis: 'calc(51.5% - 64px)',
    isWide: true,
    maxWidth: 483,
    quote:
      '"The expertise and attention to detail by the entire team was evident throughout the project..."',
    attribution: 'Tiffany Meehan, VP of Marketing at Inclusively',
    services: [
      'Logo Redesign',
      'Web Design',
      'Illustration System',
      'Web Development',
      'Animation',
    ],
    image: inclusivelyImg,
    navIcon: inclusivelyNavDefault,
    heroImage: {
      width: 739.35,
      height: 580.98,
      aspectRatio: '127 / 103',
      maxWidth: 'none',
      desktop: {
        x: -80,
        y: -75,
      },
      mobile: {
        x: 5,
        y: -75,
      },
    },
    navButton: {
      desktop: {
        width: 44,
        height: 95,
        x: 0,
        y: 25,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
  // {
  //   id: 'optable',
  //   name: 'Optable',
  //   quote: 'TBD',
  //   attribution: 'TBD',
  //   services: ['Web Design', 'Illustration'],
  //   image: optableImg,
  //   navIcon: optableNavDefault,
  //   heroImage: {
  //     width: 537,
  //     height: 451,
  //     aspectRatio: '537 / 451',

  //     desktop: {
  //       x: 330,
  //       y: 100,
  //     },
  //     mobile: {
  //       x: 0,
  //       y: 0,
  //     },
  //   },
  //   navButton: {
  //     desktop: {
  //       width: 115,
  //       height: 115,
  //       x: 0,
  //       y: 45,
  //     },
  //     mobile: {
  //       width: 56,
  //       height: 56,
  //       x: 0,
  //       y: 0,
  //     },
  //   },
  // },
  {
    id: 'computercare',
    slug: 'computer-care',
    name: 'ComputerCare',
    isCompact: true,
    letterSpacing: '-0.4px',
    quote:
      '“HKW has done many wonderful projects for us over the years. Most recently they helped us implement a new and modern looking website, as well as a huge integration project for our website to connect to our internal systems, which has automated so much of our manual processes. They built a user friendly interface for our customers, and keep our site well maintained.”',
    attribution:
      'Melissa Marsh, Senior Business Systems Analyst at ComputerCare',
    services: [
      'Web Design',
      'Web Development',
      'Backend Customer Portal Design and Development',
    ],
    image: computerCareImg,
    navIcon: computerCareDefault,
    heroImage: {
      width: 567.471,
      height: 569.456,
      aspectRatio: '285 / 286',
      maxWidth: 'none',
      desktop: {
        x: 40,
        y: -50,
      },
      mobile: {
        x: 75,
        y: -130,
      },
    },
    navButton: {
      desktop: {
        width: 122,
        height: 74.18,
        x: 0,
        y: 45,
      },
      mobile: {
        width: 56,
        height: 56,
        x: 0,
        y: 0,
      },
    },
  },
]

export default caseStudies
