import ApicWashington from './ApicWashington'
import Celdf from './Celdf'
import CitizenNineTwoSix from './CitizenNineTwoSix'
import CommunityWhistle from './CommunityWhistle'
import Scar from './Scar'
import WatersMeet from './WatersMeet'
import Ewi from './Ewi'
import Terrain from './Terrain'
import Rjpmc from './Rjpmc'
import Acl from './Acl'
import MarthasKitchen from './MarthasKitchen'
import JusticeNotJails from './JusticeNotJails'
import CommunityDevelopmentInitiative from './CommunityDevelopmentInitiative'
import Pjals from './Pjals'
import CommunityBuilding from './CommunityBuilding'
import Fyre from './Fyre'
import SpokaneArts from './SpokaneArts'
import MealsOnWheels from './MealsOnWheels'

import ewiDetail from './assets/roots-slider/ewi-detail.png'
import apicWashingtonDetail from './assets/roots-slider/apic-washington-detail.png'
import celdfDetail from './assets/roots-slider/celdf-detail.png'
import citizenNine26Detail from './assets/roots-slider/citizen-nine26-detail.png'
import communityWhistleDetail from './assets/roots-slider/community-whistle-detail.png'
import racialJusticeDetail from './assets/roots-slider/racial-justice-detail.png'
import watersMeetDetail from './assets/roots-slider/waters-meet-detail.png'

const PLACEHOLDER_COPY = 'TBD'
const PLACEHOLDER_ROLES = ['TBD']

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
      left: 245.97,
      top: 156.6,
      width: 195.145,
    },
  },
  {
    id: 'ewi',
    title: 'EWI',
    FrameComponent: Ewi,
    detailImage: ewiDetail,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 62.5,
      top: 233.6,
      width: 152.482,
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
      left: 476.03,
      top: 172.27,
      width: 158.933,
    },
  },
  {
    id: 'racial-justice',
    title: 'Racial Justice and Police Misconduct Center (RJPMC)',
    FrameComponent: Rjpmc,
    detailImage: racialJusticeDetail,
    quote: 'TBD',
    attribution: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 281.95,
      top: 326.69,
      width: 156.042,
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
      left: 881.1,
      top: 144.21,
      width: 206,
    },
  },
  {
    id: 'community-development-initiative',
    title: 'Community Development Initiative',
    FrameComponent: CommunityDevelopmentInitiative,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 1133.42,
      top: 99.26,
      width: 150.266,
    },
  },
  {
    id: 'spokane-community-against-racism',
    title: 'Spokane Community Against Racism',
    FrameComponent: Scar,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 61.08,
      top: 436.54,
      width: 183.207,
    },
  },
  {
    id: 'asians-for-collective-liberation',
    title: 'Asians for Collective Liberation',
    FrameComponent: Acl,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 297,
      top: 515,
      width: 168,
    },
  },
  {
    id: 'justice-not-jails',
    title: 'Justice Not Jails',
    FrameComponent: JusticeNotJails,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 917.18,
      top: 351.59,
      width: 181.894,
    },
  },
  {
    id: 'meals-on-wheels',
    title: 'Meals on Wheels',
    FrameComponent: MealsOnWheels,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 1132,
      top: 304,
      width: 224,
    },
  },
  {
    id: 'community-building',
    title: 'Community Building',
    FrameComponent: CommunityBuilding,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 876.96,
      top: 567.63,
      width: 225.713,
    },
  },
  {
    id: 'fyre',
    title: 'FYRE',
    FrameComponent: Fyre,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 1177.98,
      top: 483.6,
      width: 168.953,
    },
  },
  {
    id: 'terrain',
    title: 'Terrain',
    FrameComponent: Terrain,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 24,
      top: 696,
      width: 196,
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
      left: 501.92,
      top: 752.01,
      width: 139.814,
    },
  },
  {
    id: 'spokane-arts',
    title: 'Spokane Arts',
    FrameComponent: SpokaneArts,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 272,
      top: 730,
      width: 176,
    },
  },
  {
    id: 'marthas-kitchen',
    title: "Martha's Kitchen",
    FrameComponent: MarthasKitchen,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 693.95,
      top: 735.61,
      width: 227.826,
    },
  },
  {
    id: 'pjals',
    title: 'PJALS',
    FrameComponent: Pjals,
    quote: PLACEHOLDER_COPY,
    attribution: PLACEHOLDER_COPY,
    roles: PLACEHOLDER_ROLES,
    desktopFrame: {
      left: 992.92,
      top: 730.61,
      width: 166.613,
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
      left: 672.77,
      top: 221.55,
      width: 170.89,
    },
  },
]

export default ROOTS_PORTFOLIO_ITEMS
