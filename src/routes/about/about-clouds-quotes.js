import DarkCloudCenter from './assets/about-clouds/about-dark-cloud.svg?react'
import OutroCloud from './assets/about-clouds/about-layer-outro.svg?react'
import DarkCloudLeft from './assets/about-clouds/cloud-dark.svg?react'
import DarkCloudRight from './assets/about-clouds/cloud-dk-right.svg?react'
import LightCloudCenter from './assets/about-clouds/cloud-light-center.svg?react'
import LightCloudLeft from './assets/about-clouds/cloud-light-left.svg?react'
import LightCloudRight from './assets/about-clouds/cloud-light-right.svg?react'
import MidCloudCenter from './assets/about-clouds/cloud-mid-center.svg?react'
import MidCloudLeft from './assets/about-clouds/cloud-mid-left.svg?react'
import MidCloudRight from './assets/about-clouds/cloud-mid-right.svg?react'

export const DESIGN_FRAME = { width: 1440, height: 1024 }

export const CLOUDS = [
    {
        id: 'dark-left',
        layer: 'dark',
        width: 666.631,
        component: DarkCloudLeft,
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
        component: DarkCloudCenter,
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
        component: DarkCloudRight,
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
        component: MidCloudLeft,
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
        component: MidCloudCenter,
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
        component: MidCloudRight,
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
        component: LightCloudLeft,
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
        component: LightCloudCenter,
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
        component: LightCloudRight,
        states: [
            { x: 872, y: 1331 },
            { x: 872, y: 968 },
            { x: 872, y: 604 },
            { x: 872, y: 333 },
        ],
    },
    {
        id: 'outro',
        layer: 'outro',
        width: 1510,
        component: OutroCloud,
        states: [
            { x: -30, y: 1568 },
            { x: -30, y: 1205 },
            { x: -30, y: 841 },
            { x: -16, y: 596 },
        ],
    },
]

export const QUOTES = [
    {
        id: 'dark-left',
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
        id: 'dark-center',
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
        id: 'dark-right',
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
        id: 'mid-left',
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
        id: 'mid-center',
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
        id: 'mid-right',
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
        id: 'light-left',
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
        id: 'light-center',
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
        id: 'light-right',
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
]

export const OUTRO_COPY = {
    width: 457,
    states: [
        { x: 477, y: 1765 },
        { x: 477, y: 1402 },
        { x: 477, y: 1038 },
        { x: 491, y: 767 },
    ],
}

export const MASCOT = {
    width: 390.22,
    states: [
        { x: 828, y: 1290, opacity: 0 },
        { x: 828, y: 1200, opacity: 0 },
        { x: 828, y: 1040, opacity: 1 },
        { x: 865, y: 796, opacity: 1 },
    ],
}

export const HERO_CLOUD_CONTAINER_STATES = [
    { x: -22, y: 152, width: 1457.75 },
    { x: 209, y: 161, width: 947.065 },
]
