import { memo } from 'react'

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
import WomenOfColorCandidates from './WomenOfColorCandidates'
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
import womenOfColorCandidatesDetail from './assets/roots-slider/women-of-color-candidates-detail.png'

const memoFrame = (FrameComponent, displayName) => {
  const MemoizedFrame = memo(FrameComponent)
  MemoizedFrame.displayName = displayName
  return MemoizedFrame
}

const ApicWashingtonFrame = memoFrame(ApicWashington, 'ApicWashington')
const CeldfFrame = memoFrame(Celdf, 'Celdf')
const CitizenNineTwoSixFrame = memoFrame(CitizenNineTwoSix, 'CitizenNineTwoSix')
const CommunityWhistleFrame = memoFrame(CommunityWhistle, 'CommunityWhistle')
const ScarFrame = memoFrame(Scar, 'Scar')
const WatersMeetFrame = memoFrame(WatersMeet, 'WatersMeet')
const EwiFrame = memoFrame(Ewi, 'Ewi')
const TerrainFrame = memoFrame(Terrain, 'Terrain')
const RjpmcFrame = memoFrame(Rjpmc, 'Rjpmc')
const AclFrame = memoFrame(Acl, 'Acl')
const MarthasKitchenFrame = memoFrame(MarthasKitchen, 'MarthasKitchen')
const JusticeNotJailsFrame = memoFrame(JusticeNotJails, 'JusticeNotJails')
const CommunityDevelopmentInitiativeFrame = memoFrame(
  CommunityDevelopmentInitiative,
  'CommunityDevelopmentInitiative',
)
const PjalsFrame = memoFrame(Pjals, 'Pjals')
const CommunityBuildingFrame = memoFrame(CommunityBuilding, 'CommunityBuilding')
const FyreFrame = memoFrame(Fyre, 'Fyre')
const WomenOfColorCandidatesFrame = memoFrame(
  WomenOfColorCandidates,
  'WomenOfColorCandidates',
)
const SpokaneArtsFrame = memoFrame(SpokaneArts, 'SpokaneArts')
const MealsOnWheelsFrame = memoFrame(MealsOnWheels, 'MealsOnWheels')

const PLACEHOLDER_COPY = 'TBD'
const PLACEHOLDER_ROLES = ['TBD']

const ROOTS_PORTFOLIO_ITEMS = [
  {
    id: 'celdf',
    title: 'CELDF',
    type: 'Non-Profit',
    FrameComponent: CeldfFrame,
    detailImage: celdfDetail,
    maxWidth: 355,
    bio: 'CELDF are at the forefront of the global “Rights of Nature” movement, working to redefine how communities and the environment are protected under the law. Through legal advocacy and systemic change, they help ensure that people and nature have a stronger voice than corporate interests.',
    roles: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
      'Logo Design',
      'Retainer Support',
    ],
    desktopFrame: {
      left: 245.97,
      top: 156.6,
      width: 195.145,
    },
    artworkWidth: 950.121,
    artworkHeight: 732.95,
    artworkTop: 40,
    artworkLeft: -40,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 330,
    },
  },
  {
    id: 'ewi',
    title: 'Executive Women International of Spokane',
    type: 'Non-Profit',
    FrameComponent: EwiFrame,
    detailImage: ewiDetail,
    maxWidth: 343,
    bio: 'EWI brings together leaders from diverse businesses to give back and make a meaningful impact. Through philanthropy, community service, and educational initiatives, their members are committed to strengthening the communities they work and live in.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 61.54,
      top: 233.6,
      width: 158.482,
    },
    artworkWidth: 579.059,
    artworkHeight: 822.19,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 210,
    },
  },
  {
    id: 'racial-justice',
    title: 'Racial Justice and Police Misconduct Center (RJPMC)',
    type: 'Non-Profit',
    FrameComponent: RjpmcFrame,
    detailImage: racialJusticeDetail,
    maxWidth: 358,
    bio: '"HKW came to the Racial Justice and Police Misconduct Project through a referral and truly knocked it out of the park with our web design. They stepped up and supported us when very few others would, ensuring our community could see the important work we are doing. I can’t thank you enough for the belief you had in our organization."\n\n- Nickeia Hunter, Co-Founder and Executive Director of RJPMC',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 707.91,
      top: 187.02,
      width: 143.189,
    },
    artworkWidth: 877.764,
    artworkHeight: 585.908,
    artworkTop: 60,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 330,
    },
  },
  {
    id: 'waters-meet',
    title: 'Waters Meet C3 & C4',
    type: 'Non-Profit',
    FrameComponent: WatersMeetFrame,
    detailImage: watersMeetDetail,
    maxWidth: 355,
    bio: 'Deeply rooted in Spokane, Waters Meet works toward a region where health, opportunity, and justice are accessible to everyone. Their focus is on lifting up historically marginalized communities, including BIPOC, rural low-income, 2SLGBTQIA+, and disability communities, ensuring their voices are centered in the work.',
    roles: [
      'Website Design',
      'Graphic Design',
      'Marketing Support',
      'Retainer Work',
    ],
    desktopFrame: {
      left: 907.05,
      top: 208.78,
      width: 206,
    },
    artworkWidth: 1343.84,
    artworkHeight: 1007.876,
    artworkTop: 20,
    artworkLeft: -290,
    mobileArtwork: {
      top: 0,
      left: '46%',
      width: 360,
    },
  },
  {
    id: 'community-development-initiative',
    title: 'Community Development Initiative',
    type: 'Non-Profit',
    FrameComponent: CommunityDevelopmentInitiativeFrame,
    detailImage: communityDevelopmentInitiativeDetail,
    maxWidth: 318,
    bio: 'A civic initiative dedicated to strengthening communities from the ground up, they fund a wide range of local needs, from public services and affordable housing to small business support and neighborhood improvements, ensuring resources reach the people and places that need them most.',
    roles: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    desktopFrame: {
      left: 74.61,
      top: 835.17,
      width: 150.266,
    },
    artworkTop: -80,
    mobileArtwork: {
      top: '-210%',
      left: '50%',
      width: 220,
    },
  },
  {
    id: 'spokane-community-against-racism',
    title: 'SCAR Spokane',
    type: 'Non-Profit',
    FrameComponent: ScarFrame,
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
      left: 288.98,
      top: 537.6,
      width: 183.207,
    },
    artworkWidth: 967.93,
    artworkHeight: 1166.299,
    artworkTop: 80,
    mobileArtwork: {
      top: 20,
      left: '50%',
      width: 295,
    },
  },
  {
    id: 'asians-for-collective-liberation',
    title: 'Asians for Collective Liberation',
    type: 'Non-Profit',
    FrameComponent: AclFrame,
    detailImage: asiansForCollectiveLiberationDetail,
    maxWidth: 358,
    bio: "ACL supports Asian and Asian American communities through civic engagement, cultural celebration, and community wellness. From legislative advocacy to mental health resources and vibrant cultural events, they foster a sense of belonging and ensure their community's voices are heard and represented.",
    roles: ['Website Development'],
    desktopFrame: {
      left: 73.72,
      top: 443.76,
      width: 167.643,
    },
    artworkWidth: 1062.307,
    artworkHeight: 835.876,
    artworkTop: -70,
    artworkLeft: -100,
    mobileArtwork: {
      top: 0,
      left: '49%',
      width: 330,
    },
  },
  {
    id: 'justice-not-jails',
    title: 'Justice Not Jails',
    type: 'Non-Profit',
    FrameComponent: JusticeNotJailsFrame,
    detailImage: justiceNotJailsDetail,
    maxWidth: 358,
    bio: 'Rooted in Spokane, Justice Not Jails works to build a safer, more equitable community by investing in real solutions like mental health care, housing, and substance abuse support. They advocate for approaches that address the root causes of crime and create pathways toward healing and stability for everyone.',
    roles: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
      'Logo Design',
    ],
    desktopFrame: {
      left: 854.94,
      top: 404,
      width: 138.443,
    },
    artworkWidth: 825.651,
    artworkHeight: 526.339,
    artworkTop: 180,
    artworkLeft: 10,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 320,
    },
  },
  {
    id: 'citizen-nine26',
    title: 'Citizen Nine26',
    type: 'Non-Profit',
    FrameComponent: CitizenNineTwoSixFrame,
    detailImage: citizenNine26Detail,
    maxWidth: 372,
    bio: 'Citizen Nine26 helps everyday people navigate complex legal and civil rights challenges with confidence. Whether accessing public records or understanding their rights, they make sure community members have the tools and support they need to advocate for themselves.',
    roles: [
      'Logo Design',
      'Branding',
      'Collateral Design',
      'Website Design',
      'Website Development',
    ],
    desktopFrame: {
      left: 495.54,
      top: 177.8,
      width: 158.933,
    },
    artworkWidth: 717.463,
    artworkHeight: 471.771,
    artworkTop: 160.109,
    artworkLeft: 73.531,
    mobileArtwork: {
      top: 30,
      left: '50%',
      width: 310,
    },
  },
  {
    id: 'meals-on-wheels',
    title: 'Meals on Wheels',
    type: 'Non-Profit',
    FrameComponent: MealsOnWheelsFrame,
    detailImage: mealsOnWheelsDetail,
    maxWidth: 343,
    bio: 'Meals on Wheels nourishes and supports homebound seniors and disabled adults by delivering nutritious meals, daily well-being checks, and a friendly face at the door. Each visit is a small but meaningful moment of connection for those who need it most.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 1152.03,
      top: 327.33,
      width: 223.859,
    },
    artworkWidth: 735.535,
    artworkHeight: 687.379,
    artworkTop: 100,
    artworkLeft: 40,
    mobileArtwork: {
      top: 48,
      left: '50%',
      width: 280,
    },
  },
  {
    id: 'community-building',
    title: 'Community Building',
    type: 'Non-Profit',
    FrameComponent: CommunityBuildingFrame,
    detailImage: communityBuildingDetail,
    maxWidth: 343,
    bio: "The Community Building Foundation supports the Spokane region through grant-making, women's retreat programs, and the Community Building Campus, a downtown hub offering affordable space for local organizations to grow and do their work.",
    roles: ['Website Development', 'Retainer Support'],
    desktopFrame: {
      left: 835.02,
      top: 590.02,
      width: 183.638,
    },
    artworkWidth: 686.044,
    artworkHeight: 770.911,
    artworkTop: 40,
    artworkLeft: 70,
    mobileArtwork: {
      top: 0,
      left: '52%',
      width: 245,
    },
  },
  {
    id: 'fyre',
    title: 'FYRE',
    type: 'Non-Profit',
    FrameComponent: FyreFrame,
    detailImage: fyreDetail,
    maxWidth: 354,
    bio: 'FYRE provides a safe and welcoming space where underserved youth and young adults ages 12 to 24 can socialize, get homework done, and access the resources they need to thrive in Okanogan County.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 1061.44,
      top: 515.51,
      width: 168.953,
    },
    artworkWidth: 807.827,
    artworkHeight: 751.094,
    artworkTop: -20,
    artworkLeft: 40,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 285,
    },
  },
  {
    id: 'women-of-color-candidates',
    title: 'Women of Color Candidates',
    type: 'Non-Profit',
    FrameComponent: WomenOfColorCandidatesFrame,
    detailImage: womenOfColorCandidatesDetail,
    maxWidth: 354,
    bio: '"Working with Scott Mueller was an incredible experience. He intentionally prioritizes supporting candidates of color, and his generosity, creativity, and patience made a huge difference in my campaign. He created a kick-ass logo, helped design a website I was truly proud of, supported social media outreach, and even helped produce hundreds of campaign buttons. As someone without established political connections or resources, his support helped me show up professionally and confidently. His work goes far beyond design — he helps elevate voices and candidates who might otherwise not have access to this level of support."\n\n- Nikki Lockwood',
    roles: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
    ],
    desktopFrame: {
      left: 1275.9,
      top: 601.03,
      width: 143.189,
    },
    artworkWidth: 1075,
    artworkHeight: 717,
    artworkTop: 68.7,
    artworkLeft: -64,
    mobileArtwork: {
      top: -24,
      left: '54%',
      width: 335,
    },
  },
  {
    id: 'terrain',
    title: 'Terrain',
    type: 'Non-Profit',
    FrameComponent: TerrainFrame,
    detailImage: terrainDetail,
    maxWidth: 331,
    bio: "COMING SOON: Terrain are a driving force behind Spokane's creative economy, championing local artists and making art accessible to everyone in the Inland Northwest. Through large-scale events, a retail storefront, and year-round artist development, they create real opportunities for creatives to grow and thrive.",
    roles: ['Website Development', 'Marketing Support'],
    desktopFrame: {
      left: 23.01,
      top: 661.02,
      width: 195.541,
    },
    artworkWidth: 1080.837,
    artworkHeight: 941.495,
    artworkTop: -50,
    artworkLeft: -140,
    mobileArtwork: {
      top: 0,
      left: '47%',
      width: 310,
    },
  },
  {
    id: 'spokane-arts',
    title: 'Spokane Arts',
    type: 'Non-Profit',
    FrameComponent: SpokaneArtsFrame,
    detailImage: spokaneArtsDetail,
    maxWidth: 355,
    bio: 'Through grant-making, programming, and advocacy, Spokane Arts works to ensure creativity has the space and support it needs to flourish in Spokane.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 270.02,
      top: 787.63,
      width: 175.853,
    },
    artworkWidth: 459.782,
    artworkHeight: 613.237,
    artworkTop: 70,
    artworkLeft: 130,
    mobileArtwork: {
      top: 20,
      left: '50%',
      width: 210,
    },
  },
  {
    id: 'marthas-kitchen',
    title: "Martha's Kitchen",
    type: 'Non-Profit',
    FrameComponent: MarthasKitchenFrame,
    detailImage: marthasKitchenDetail,
    maxWidth: 343,
    bio: 'Martha’s Kitchen delivers over 2.4 million meals annually to vulnerable community members, from families in need to seniors, veterans, and those experiencing homelessness. Through hot meal programs, grocery distribution, and food rescue efforts, they have spent over four decades making sure no one in their community goes without.',
    roles: ['Website Design', 'Website Development'],
    desktopFrame: {
      left: 679.08,
      top: 815.7,
      width: 227.826,
    },
    artworkWidth: 884.329,
    artworkHeight: 678.551,
    artworkTop: 100,
    artworkLeft: -20,
    mobileArtwork: {
      top: 20,
      left: '50%',
      width: 320,
    },
  },
  {
    id: 'pjals',
    title: 'Peace and Justice Action League of Spokane (PJALS)',
    type: 'Non-Profit',
    FrameComponent: PjalsFrame,
    detailImage: pjalsDetail,
    maxWidth: 343,
    bio: 'For nearly 50 years, PJALS has been a cornerstone of community organizing in Spokane, bringing people together around racial equity, economic justice, human rights, and nonviolence. Through grassroots advocacy and community building, they work toward a more just and peaceful region for all.',
    roles: [
      'Website Design',
      'Website Development',
      'Graphic Design',
      'Branding',
      'Logo Design',
      'Marketing Support',
    ],
    desktopFrame: {
      left: 949.04,
      top: 747.12,
      width: 166.613,
    },
    artworkWidth: 750.523,
    artworkHeight: 895.457,
    artworkTop: 0,
    artworkLeft: 20,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 230,
    },
  },
  {
    id: 'apic-washington',
    title: 'Asian & Pacific Islander Coalition \nof Washington',
    type: 'Non-Profit',
    FrameComponent: ApicWashingtonFrame,
    detailImage: apicWashingtonDetail,
    maxWidth: 358,
    bio: 'For nearly three decades, APICW has been a steady voice for Asian American, Native Hawaiian, and Pacific Islander communities across Washington state, working to close gaps in access and opportunity through advocacy, community building, and meaningful policy change.',
    roles: ['Website Design', 'Graphic Design', 'Branding', 'Logo Design'],
    desktopFrame: {
      left: 280.99,
      top: 326.69,
      width: 156.042,
    },
    artworkWidth: 730.119,
    artworkHeight: 730.119,
    artworkTop: 40,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 245,
    },
  },
  {
    id: 'community-whistle',
    title: 'Community Whistle',
    type: 'Non-Profit',
    FrameComponent: CommunityWhistleFrame,
    detailImage: communityWhistleDetail,
    maxWidth: 318,
    bio: 'As a grassroots rapid-response system, Community Whistle shares whistle codes, safety guidance, and immigration hotline resources to help neighbors alert each other and respond to raids.',
    roles: ['Website Design', 'Logo Design'],
    desktopFrame: {
      left: 500.16,
      top: 752.01,
      width: 139.814,
    },
    artworkWidth: 1091.189,
    artworkHeight: 727.548,
    artworkTop: 0,
    mobileArtwork: {
      top: 0,
      left: '50%',
      width: 335,
    },
  },
]

export default ROOTS_PORTFOLIO_ITEMS
