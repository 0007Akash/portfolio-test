import { motion, useScroll, useTransform } from 'framer-motion'

const rowA = ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Core Data', 'ARKit', 'WidgetKit', 'Xcode Cloud', 'TestFlight']
const rowB = ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'Tailwind', 'Socket.io', 'Docker', 'AWS']

function Row({ items, reverse, dur }) {
  const list = [...items, ...items]
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div className="marquee flex shrink-0 gap-10 pr-10" style={{ '--dur': dur, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1px_var(--color-mute)]' : ''}>{t}</span>
            <span className="text-accent text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  const { scrollYProgress } = useScroll()
  const skew = useTransform(scrollYProgress, [0, 0.3], [-4, 2])
  return (
    <motion.div style={{ rotate: skew }} className="relative z-10 -mx-4 my-10 space-y-3 border-y border-line bg-ink-2 py-6">
      <Row items={rowA} dur="38s" />
      <Row items={rowB} dur="44s" reverse />
    </motion.div>
  )
}
