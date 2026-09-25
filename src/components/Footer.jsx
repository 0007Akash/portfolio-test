import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { profile } from '../data'
import { scrollToId } from '../lenis'
import { Magnetic } from './ui'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.1em', '-0.04em'])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line px-4 pt-16 sm:px-8" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 font-mono text-xs text-mute">
        <p>
          Designed and built by {profile.name} with React, Tailwind CSS and Framer Motion.
        </p>
        <Magnetic>
          <button onClick={() => scrollToId('home')} className="flex items-center gap-2 rounded-full border border-line px-4 py-2 hover:text-paper">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </Magnetic>
      </div>
      <motion.p
        style={{ y, letterSpacing: spacing }}
        className="accent-gradient mx-auto mt-10 max-w-7xl select-none whitespace-nowrap text-center font-display text-[17.5vw] font-bold leading-[0.8] lg:text-[15rem]"
        aria-hidden
      >
        {profile.first.toLowerCase()}.swift
      </motion.p>
    </footer>
  )
}
