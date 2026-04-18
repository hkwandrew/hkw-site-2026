import ApicWashington from './ApicWashington'
import Celdf from './Celdf'
import CitizenNineTwoSix from './CitizenNineTwoSix'
import CommunityWhistle from './CommunityWhistle'
import Scar from './Scar'
import WatersMeet from './WatersMeet'
import apicWashingtonDetail from './assets/roots-slider/apic-washington-detail.png'
import celdfDetail from './assets/roots-slider/celdf-detail.png'
import citizenNine26Detail from './assets/roots-slider/citizen-nine26-detail.png'
import communityWhistleDetail from './assets/roots-slider/community-whistle-detail.png'
import racialJusticeDetail from './assets/roots-slider/racial-justice-detail.png'
import watersMeetDetail from './assets/roots-slider/waters-meet-detail.png'

const ROOTS_PORTFOLIO_ITEMS = [
  {
    id: 'celdf',
    title: 'CELDF',
    FrameComponent: Celdf,
    detailImage: celdfDetail,
    quote:
      '"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."',
    attribution: 'Emelyn Lybarger, Outreach Coordinator',
    roles: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    desktopFrame: {
      left: 300.79,
      top: 257.4,
      width: 229.8892432029752,
    },
  },
  {
    id: 'citizen-nine26',
    title: 'Citizen Nine26',
    FrameComponent: CitizenNineTwoSix,
    detailImage: citizenNine26Detail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 613.26171875,
      top: 215.31591796875,
      width: 208.51171875,
    },
  },
  {
    id: 'waters-meet',
    title: 'Waters Meet',
    FrameComponent: WatersMeet,
    detailImage: watersMeetDetail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 910.77,
      top: 232.18310546875,
      width: 265.751962289487,
    },
  },
  {
    id: 'community-whistle',
    title: 'Community Whistle',
    FrameComponent: CommunityWhistle,
    detailImage: communityWhistleDetail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 448.423828125,
      top: 473.43206787109375,
      width: 248.6328125,
    },
  },
  {
    id: 'racial-justice',
    title: 'Racial Justice and Police Misconduct Center (RJPMC)',
    FrameComponent: Scar,
    detailImage: racialJusticeDetail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 771.244140625,
      top: 505.21807861328125,
      width: 235.091796875,
    },
  },
  {
    id: 'apic-washington',
    title: 'Asian & Pacific Islander Coalition of Washington',
    FrameComponent: ApicWashington,
    detailImage: apicWashingtonDetail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 1107.330078125,
      top: 513.9927978515625,
      width: 229.8892432029752,
    },
  },
]

export default ROOTS_PORTFOLIO_ITEMS
