// All portfolio content lives here. Edit this file to make the site yours.

export const profile = {
  name: 'Aarav Kapoor',
  first: 'Aarav',
  handle: 'aarav.dev',
  role: 'iOS Engineer & Full-Stack Developer',
  location: 'Bengaluru, IN',
  timezone: 'Asia/Kolkata',
  email: 'hello@aarav.dev',
  resume: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/', short: 'gh' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', short: 'in' },
    { label: 'X', href: 'https://x.com/', short: 'x' },
    { label: 'App Store', href: 'https://apps.apple.com/', short: 'as' },
  ],
  status: 'Open to iOS & full-stack roles',
}

export const about =
  'I build native iOS apps in Swift and SwiftUI that feel at home on the device: smooth at 120Hz, kind to the battery, and usable with one thumb on a crowded train. When those apps need a backend, I write it too, with MongoDB, Express, React and Node, so the API, the admin dashboard and the phone in your pocket are designed by the same person.'

export const stats = [
  { value: 14, suffix: '', label: 'apps shipped to the App Store' },
  { value: 4.8, suffix: '★', label: 'average App Store rating', decimals: 1 },
  { value: 1.2, suffix: 'M', label: 'monthly active users served', decimals: 1 },
  { value: 99.9, suffix: '%', label: 'crash-free sessions', decimals: 1 },
]

// Springboard icons. `level` is 0–100. `group` drives the colour tint.
export const skills = [
  { name: 'Swift', group: 'ios', glyph: 'Sw', level: 95, years: 5, note: 'Concurrency with async/await and actors, generics, protocol-oriented design, Swift Package Manager.' },
  { name: 'SwiftUI', group: 'ios', glyph: 'UI', level: 92, years: 4, note: 'Custom layouts, matchedGeometryEffect, Observation framework, widgets and Live Activities.' },
  { name: 'UIKit', group: 'ios', glyph: 'Ui', level: 88, years: 5, note: 'Compositional layouts, diffable data sources, custom transitions and bridging into SwiftUI.' },
  { name: 'Combine', group: 'ios', glyph: 'Cb', level: 80, years: 3, note: 'Reactive pipelines for search, form validation and networking.' },
  { name: 'Core Data', group: 'ios', glyph: 'CD', level: 84, years: 4, note: 'Offline-first sync, background contexts, migrations. SwiftData for new projects.' },
  { name: 'XCTest', group: 'ios', glyph: 'XT', level: 82, years: 4, note: 'Unit, snapshot and UI tests running on every pull request through Xcode Cloud.' },
  { name: 'ARKit', group: 'ios', glyph: 'AR', level: 65, years: 2, note: 'Plane detection and RealityKit scenes for product previews.' },
  { name: 'Core ML', group: 'ios', glyph: 'ML', level: 62, years: 2, note: 'On-device image classification and Vision text recognition.' },
  { name: 'MongoDB', group: 'web', glyph: 'Mg', level: 85, years: 4, note: 'Schema design, aggregation pipelines, indexes and Atlas Search.' },
  { name: 'Express', group: 'web', glyph: 'Ex', level: 88, years: 4, note: 'REST and GraphQL APIs, auth middleware, rate limiting, OpenAPI docs.' },
  { name: 'React', group: 'web', glyph: 'Re', level: 87, years: 4, note: 'Hooks, React Query, Framer Motion, accessible component libraries.' },
  { name: 'Node.js', group: 'web', glyph: 'No', level: 86, years: 4, note: 'Streams, queues with BullMQ, WebSockets and push notification services.' },
  { name: 'TypeScript', group: 'web', glyph: 'TS', level: 84, years: 3, note: 'Strict mode everywhere; shared types between API and dashboard.' },
  { name: 'Tailwind', group: 'web', glyph: 'Tw', level: 90, years: 3, note: 'Design tokens, dark mode, and this very website.' },
  { name: 'Firebase', group: 'tool', glyph: 'Fb', level: 80, years: 4, note: 'Auth, Firestore, Remote Config and Crashlytics.' },
  { name: 'Docker', group: 'tool', glyph: 'Dk', level: 72, years: 3, note: 'Containerised Node services deployed to AWS ECS.' },
  { name: 'Git', group: 'tool', glyph: 'Gt', level: 90, years: 6, note: 'Trunk-based development, clean history, code review.' },
  { name: 'Figma', group: 'tool', glyph: 'Fg', level: 75, years: 4, note: 'I prototype interactions before I write them.' },
  { name: 'Fastlane', group: 'tool', glyph: 'FL', level: 78, years: 3, note: 'Automated builds, screenshots and TestFlight uploads.' },
  { name: 'AWS', group: 'tool', glyph: 'AW', level: 68, years: 2, note: 'S3, CloudFront, Lambda and ECS.' },
]

export const dock = ['Swift', 'SwiftUI', 'React', 'Node.js']

export const projects = [
  {
    id: 'pulse',
    name: 'Pulse Health',
    kind: 'ios',
    year: '2025',
    tagline: 'A HealthKit companion that turns heart-rate data into weekly stories.',
    description:
      'Reads HealthKit samples in the background, summarises them on device with Core ML, and shows the result in a widget and a Live Activity during workouts. No health data leaves the phone.',
    stack: ['SwiftUI', 'HealthKit', 'Core ML', 'WidgetKit', 'SwiftData'],
    metrics: [['4.9★', 'rating'], ['120k', 'downloads'], ['0.02%', 'crash rate']],
    hue: '#F05138',
    link: '#',
  },
  {
    id: 'ledger',
    name: 'Ledger',
    kind: 'full',
    year: '2025',
    tagline: 'Expense splitting for flatmates, on iOS and the web.',
    description:
      'A native iOS client and a React web app sharing one Express + MongoDB API. Real-time balances over WebSockets, UPI deep links for settling up, and a nightly job that nudges whoever owes the most.',
    stack: ['Swift', 'React', 'Express', 'MongoDB', 'Socket.io'],
    metrics: [['38k', 'users'], ['₹2.1Cr', 'split'], ['<80ms', 'p95 API']],
    hue: '#47A248',
    link: '#',
  },
  {
    id: 'transit',
    name: 'Transit Live',
    kind: 'ios',
    year: '2024',
    tagline: 'Bus arrivals on your lock screen before you ask.',
    description:
      'Uses region monitoring to detect the stop you are standing at and starts a Live Activity with the next arrivals. Built with UIKit for the map and SwiftUI for everything else.',
    stack: ['UIKit', 'MapKit', 'ActivityKit', 'Combine'],
    metrics: [['Featured', 'App Store'], ['9 cities', 'coverage'], ['2.3s', 'cold start']],
    hue: '#0A84FF',
    link: '#',
  },
  {
    id: 'forge',
    name: 'Forge CMS',
    kind: 'web',
    year: '2024',
    tagline: 'A headless CMS that ships content to iOS apps without a release.',
    description:
      'Editors compose screens from blocks in a React dashboard; the Node API serves them as typed JSON that a SwiftUI renderer draws natively. Cut the release cycle for marketing screens from two weeks to minutes.',
    stack: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'SwiftUI'],
    metrics: [['6 apps', 'powered'], ['-90%', 'release time'], ['240', 'blocks']],
    hue: '#61DAFB',
    link: '#',
  },
  {
    id: 'lens',
    name: 'Lens Notes',
    kind: 'ios',
    year: '2023',
    tagline: 'Point the camera at a whiteboard, get clean editable notes.',
    description:
      'Vision text recognition plus a custom perspective-correction pipeline in Metal. Notes sync through CloudKit and export to Markdown.',
    stack: ['Vision', 'Metal', 'CloudKit', 'SwiftUI'],
    metrics: [['60k', 'downloads'], ['98%', 'OCR accuracy'], ['4.7★', 'rating']],
    hue: '#BF5AF2',
    link: '#',
  },
  {
    id: 'kitchen',
    name: 'Kitchen OS',
    kind: 'full',
    year: '2023',
    tagline: 'Order routing for cloud kitchens, from tablet to rider.',
    description:
      'An iPad app for kitchen staff, a React ops console, and a Node service that assigns orders to stations. Handles lunch rush at 40 orders a minute per kitchen.',
    stack: ['SwiftUI', 'React', 'Express', 'MongoDB', 'Redis'],
    metrics: [['22', 'kitchens'], ['40/min', 'peak orders'], ['-31%', 'prep time']],
    hue: '#FF9F0A',
    link: '#',
  },
]

// Shown as a git log. Newest first.
export const experience = [
  {
    hash: 'a1f9c2e',
    branch: 'HEAD -> main',
    role: 'Senior iOS Engineer',
    company: 'Nimbus Fintech',
    period: '2024 — now',
    points: [
      'Lead a team of 4 on the flagship iOS app (1M+ MAU); moved it from UIKit to SwiftUI screen by screen.',
      'Cut cold-start time from 3.1s to 1.2s by deferring SDK setup and trimming the dependency graph.',
      'Built the Express + MongoDB service behind in-app notifications and the React admin console for it.',
    ],
  },
  {
    hash: '7be0d41',
    branch: 'release/2.0',
    role: 'Full-Stack Developer',
    company: 'Parcel Labs',
    period: '2022 — 2024',
    points: [
      'Shipped a MERN logistics dashboard used by 300+ warehouse operators daily.',
      'Wrote the Swift driver app that scans parcels and syncs offline with Core Data.',
      'Introduced end-to-end tests and a CI pipeline that halved regressions.',
    ],
  },
  {
    hash: '3c52a88',
    branch: 'feature/first-job',
    role: 'iOS Developer',
    company: 'Studio Koi',
    period: '2021 — 2022',
    points: [
      'Built 6 client apps from Figma to App Store, including two featured in "Apps We Love".',
      'Created a reusable networking and design-system package shared across projects.',
    ],
  },
  {
    hash: '0e1d7f3',
    branch: 'init',
    role: 'B.Tech, Computer Science',
    company: 'VIT Vellore',
    period: '2017 — 2021',
    points: ['Won Smart India Hackathon with an AR app for teaching anatomy.', 'Ran the campus iOS club.'],
  },
]
