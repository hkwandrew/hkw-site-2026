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

import apicWashingtonDetail from './assets/roots-slider/apic-washington-detail.png'
import asiansForCollectiveLiberationDetail from './assets/roots-slider/asians-for-collective-liberation-detail.png'
import celdfDetail from './assets/roots-slider/celdf-detail.png'
import citizenNine26Detail from './assets/roots-slider/citizen-nine26-detail.png'
import communityBuildingDetail from './assets/roots-slider/community-building-detail.png'
import communityDevelopmentInitiativeDetail from './assets/roots-slider/community-development-initiative-detail.png'
import communityWhistleDetail from './assets/roots-slider/community-whistle-detail.png'
import ewiDetail from './assets/roots-slider/ewi-detail.png'
import fyreDetail from './assets/roots-slider/fyre-detail.png'
import justiceNotJailsDetail from './assets/roots-slider/justice-not-jails-detail.png'
import marthasKitchenDetail from './assets/roots-slider/marthas-kitchen-detail.png'
import mealsOnWheelsDetail from './assets/roots-slider/meals-on-wheels-detail.png'
import pjalsDetail from './assets/roots-slider/pjals-detail.png'
import racialJusticeDetail from './assets/roots-slider/racial-justice-detail.png'
import spokaneArtsDetail from './assets/roots-slider/spokane-arts-detail.png'
import spokaneCommunityAgainstRacismDetail from './assets/roots-slider/spokane-community-against-racism-detail.png'
import terrainDetail from './assets/roots-slider/terrain-detail.png'
import watersMeetDetail from './assets/roots-slider/waters-meet-detail.png'

const PLACEHOLDER_COPY = 'TBD'
const PLACEHOLDER_ROLES = ['TBD']

const ROOTS_PORTFOLIO_ITEMS = [
  {
    id: 'celdf',
    title: 'CELDF',
    FrameComponent: Celdf,
    detailImage: celdfDetail,
    bio: '"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."',
    roles: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    desktopFrame: {
      left: 245.97,
      top: 156.6,
      width: 195.145,
    },
  },
  {
    id: 'ewi',
    title: 'Executive Women International of Spokane',
    FrameComponent: Ewi,
    detailImage: ewiDetail,
    maxWidth: 343,
    bio: 'EWI brings together leaders from diverse businesses to give back and make a meaningful impact. Through philanthropy, community service, and educational initiatives, their members are committed to strengthening the communities they work and live in.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 62.5,
      top: 233.6,
      width: 152.482,
    },
    artworkWidth: 579.059,
    artworkHeight: 822.19,
  },
  {
    id: 'citizen-nine26',
    title: 'Citizen Nine26',
    FrameComponent: CitizenNineTwoSix,
    detailImage: citizenNine26Detail,
    maxWidth: 372,
    bio: 'Citizen Nine26 helps everyday people navigate complex legal and civil rights challenges with confidence. Whether accessing public records or understanding their rights, they make sure community members have the tools and support they need to advocate for themselves.',
    roles: ['Website Design', 'Logo Design'],
    desktopFrame: {
      left: 476.03,
      top: 172.27,
      width: 158.933,
    },
    artworkWidth: 717.463,
    artworkHeight: 471.771,
    artworkTop: 130.109,
    artworkLeft: 73.531,
  },
  {
    id: 'racial-justice',
    title: 'Racial Justice and Police Misconduct Center (RJPMC)',
    FrameComponent: Rjpmc,
    detailImage: racialJusticeDetail,
    maxWidth: 358,
    bio: 'Dedicated to investigating law enforcement misconduct and addressing systemic racism in the criminal legal system, RJPMC provides families impacted by police violence with support, legal resources, and a path forward.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 281.95,
      top: 326.69,
      width: 156.042,
    },
    artworkWidth: 877.764,
    artworkHeight: 585.908,
  },
  {
    id: 'waters-meet',
    title: 'Waters Meet',
    FrameComponent: WatersMeet,
    detailImage: watersMeetDetail,
    bio: 'TBD',
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
    detailImage: communityDevelopmentInitiativeDetail,
    maxWidth: 318,
    bio: 'A civic initiative dedicated to strengthening communities from the ground up, they fund a wide range of local needs, from public services and affordable housing to small business support and neighborhood improvements, ensuring resources reach the people and places that need them most.',
    roles: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    desktopFrame: {
      left: 1133.42,
      top: 99.26,
      width: 150.266,
    },
    artworkTop: -80,
  },
  {
    id: 'spokane-community-against-racism',
    title: 'SCAR Spokane',
    FrameComponent: Scar,
    detailImage: spokaneCommunityAgainstRacismDetail,
    maxWidth: 372,
    bio: 'SCAR is a 501c4 and led by a steering committee of six people; four of whom are people of color. They have a multitude of affiliations with local, state, and national organizations. SCAR uses the Hub and Spoke model of organizing with the Steering Committee in the center.',
    roles: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
      'Logo Design',
      'Marketing Support',
    ],
    desktopFrame: {
      left: 61.08,
      top: 436.54,
      width: 183.207,
    },
    artworkWidth: 967.93,
    artworkHeight: 1166.299,
    artworkTop: 80,
  },
  {
    id: 'asians-for-collective-liberation',
    title: 'Asians for Collective Liberation',
    FrameComponent: Acl,
    detailImage: asiansForCollectiveLiberationDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: justiceNotJailsDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: mealsOnWheelsDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: communityBuildingDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: fyreDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: terrainDetail,
    bio: PLACEHOLDER_COPY,
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
    bio: 'TBD',
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
    detailImage: spokaneArtsDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: marthasKitchenDetail,
    bio: PLACEHOLDER_COPY,
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
    detailImage: pjalsDetail,
    bio: PLACEHOLDER_COPY,
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
    bio: 'TBD',
    roles: ['TBD'],
    desktopFrame: {
      left: 672.77,
      top: 221.55,
      width: 170.89,
    },
  },
]

export default ROOTS_PORTFOLIO_ITEMS
