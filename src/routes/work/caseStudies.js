import celdfImg from './assets/work/celdf.png'
import voxusImg from './assets/work/voxus-pr.png'
import lumiereImg from './assets/work/lumierework.png'
import rogueHeartImg from './assets/work/rogue-heart-media.png'
import convivaImg from './assets/work/conviva.png'
import scarImg from './assets/work/scar.png'
import computerCareImg from './assets/work/computer-care.png'
import inclusivelyImg from './assets/work/inclusively.png'
import reltioImg from './assets/work/reltio.png'
import optableImg from './assets/work/optable.png'
import maChImg from './assets/work/ma-ch.png'
import celdfNavDefault from './assets/work-nav/celdf-default.png'
import voxusNavDefault from './assets/work-nav/voxus-pr-default.png'
import lumiereNavDefault from './assets/work-nav/lumiere-default.png'
import rogueHeartNavDefault from './assets/work-nav/rogue-heart-default.png'
import convivaNavDefault from './assets/work-nav/conviva-default.svg'
import scarNavDefault from './assets/work-nav/scar-default.png'
import computerCareDefault from './assets/work-nav/computer-care-default.png'
import reltioNavDefault from './assets/work-nav/reltio-default.png'
import inclusivelyNavDefault from './assets/work-nav/inclusively-default.png'
import optableNavDefault from './assets/work-nav/optable-default.svg'
import maChNavDefault from './assets/work-nav/ma-ch-default.png'

// Layout values are offsets inside the shared desktop hero stage.
const caseStudies = [
  {
    id: 'celdf',
    name: 'CELDF',
    isCompact: true,
    quote:
      '"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."',
    attribution: 'Emelyn Lybarger, Outreach Coordinator',
    services: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    image: celdfImg,
    navIcon: celdfNavDefault,
    heroImage: {
      width: 800.18,
      height: 617.28,
      aspectRatio: '800.18 / 617.28',
      maxWidth: 'none',
      rotation: -0.491,
      x: -45,
      y: -55,
    },
    navButton: {
      desktop: {
        width: 112,
        height: 127,
        x: 0,
        y: 43,
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
    name: 'Voxus PR',
    quote:
      '“We communicate for a living, but HKW helped us crystalize our brand message.”',
    attribution: 'Kevin Pedraja, Partner at Voxus PR',
    services: ['Website Design', 'Web Development', 'Branding'],
    image: voxusImg,
    navIcon: voxusNavDefault,
    heroImage: {
      width: 641.456,
      height: 677.632,
      aspectRatio: '641.456 / 677.632',
      maxWidth: 'none',
      x: 40,
      y: -135,
    },
    navButton: {
      desktop: {
        width: 132,
        height: 162,
        x: 0,
        y: 36,
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
    name: 'Lumiere Work',
    isCompact: true,
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
      aspectRatio: '1276.895 / 841.004',
      rotation: 26,
      x: -10,
      y: 140,
    },
    navButton: {
      desktop: {
        width: 162,
        height: 162,
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
    id: 'rogue-heart',
    name: 'Rogue Heart Media',
    quote:
      '“It has been our joy to work with HKW - on as many occasions as we can foster, really! Trust is well-placed with them, to create sites of lasting value, as well as the characteristic flair & function that you need.”',
    attribution: 'Megan Kennedy, Founder & Creative Director',
    services: ['Website Design', 'Website Development'],
    image: rogueHeartImg,
    navIcon: rogueHeartNavDefault,
    heroImage: {
      width: 640,
      height: 432,
      aspectRatio: '715 / 483',
      maxWidth: 'none',
      x: 0,
      y: 26,
    },
    navButton: {
      desktop: {
        width: 146.136,
        height: 176.207,
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
    id: 'conviva',
    name: 'Conviva',
    quote: '"HKW felt like full-fledged members of my team."',
    attribution: 'Paula Mantle, Marketing Director at Conviva',
    services: [
      'Web Design',
      'Illustration',
      'Collateral Design',
      'Branding',
      'Physical Spaces',
      'Email Marketing',
      'SEO',
      'SEM',
      'Content Creation',
    ],
    image: convivaImg,
    navIcon: convivaNavDefault,
    heroImage: {
      width: 500,
      height: 420,
      aspectRatio: '537 / 451',
      maxWidth: 'none',
      x: 20,
      y: 20,
    },
    navButton: {
      desktop: {
        width: 125,
        height: 125,
        x: 0,
        y: 50,
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
    name: 'SCAR',
    quote: 'TBD',
    attribution: 'TBD',
    services: [
      'Logo Design',
      'Web Design',
      'Collateral Design',
      'Branding',
      'Web Development',
    ],
    image: scarImg,
    navIcon: scarNavDefault,
    heroImage: {
      width: 620,
      height: 346,
      aspectRatio: '337 / 188',
      maxWidth: 'none',
      x: 0,
      y: 54,
    },
    navButton: {
      desktop: {
        width: 114.086,
        height: 204.45,
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
    id: 'reltio',
    name: 'Reltio',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design', 'Web Development'],
    image: reltioImg,
    navIcon: reltioNavDefault,
    heroImage: {
      width: 110,
      height: 357,
      aspectRatio: '49 / 159',
      maxWidth: 'none',
      x: 120,
      y: 8,
    },
    navButton: {
      desktop: {
        width: 162,
        height: 162,
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
    id: 'inclusively',
    name: 'Inclusively',
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
      width: 500,
      height: 382,
      aspectRatio: '531 / 406',
      maxWidth: 'none',
      x: 20,
      y: 42,
    },
    navButton: {
      desktop: {
        width: 74,
        height: 125,
        x: 0,
        y: 35,
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
    id: 'optable',
    name: 'Optable',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design', 'Illustration'],
    image: optableImg,
    navIcon: optableNavDefault,
    heroImage: {
      width: 453,
      height: 380,
      aspectRatio: '537 / 451',
      maxWidth: 'none',
      x: 0,
      y: 16,
    },
    navButton: {
      desktop: {
        width: 115,
        height: 115,
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
  {
    id: 'ma-ch',
    name: 'MA-CH',
    quote: 'TBD',
    attribution: 'TBD',
    services: ['Web Design'],
    image: maChImg,
    navIcon: maChNavDefault,
    heroImage: {
      width: 600,
      height: 329,
      aspectRatio: '325 / 178',
      maxWidth: 'none',
      x: 0,
      y: 78,
    },
    navButton: {
      desktop: {
        width: 120,
        height: 120,
        x: 0,
        y: 35,
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
    id: 'computercare',
    name: 'ComputerCare',
    isCompact: true,
    quote:
      '“HKW has done many wonderful projects for us over the years. Most recently they helped us implement a new and modern looking website, as well as a huge integration project for our website to connect to our internal systems, which has automated so much of our manual processes. They built a user friendly interface for our customers, and keep our site well maintained.”',
    attribution:
      'Melissa Marsh, Senior Business Systems Analyst at ComputerCare',
    services: ['Web Design', 'Web Development'],
    image: computerCareImg,
    navIcon: computerCareDefault,
    heroImage: {
      width: 620,
      height: 313,
      aspectRatio: '350 / 177',
      maxWidth: 'none',
      x: 0,
      y: 70,
    },
    navButton: {
      desktop: {
        width: 155.89,
        height: 94.18,
        x: 0,
        y: 65,
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
