import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data'
import { Mark } from './ui'

export default function GitLog() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="log" className="px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Mark index="04" kicker="experience" title="git log --career" />
        <div className="mb-8 rounded-2xl border border-line bg-ink-2 px-4 py-3 font-mono text-xs text-mute">
          <span className="text-accent">~/career</span> $ git log --graph --oneline --decorate
        </div>
        <ol ref={ref} className="relative">
          <div className="absolute bottom-2 left-[11px] top-2 w-[2px] bg-line" aria-hidden />
          <motion.div
            className="absolute bottom-2 left-[11px] top-2 w-[2px] origin-top"
            style={{ scaleY, background: 'linear-gradient(var(--accent), var(--accent-2))' }}
            aria-hidden
          />
          {experience.map((e, i) => (
            <motion.li
              key={e.hash}
              initial={{ opacity: 0.25, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-14 pl-12 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0.4 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-accent bg-ink"
              >
                <span className={`h-2 w-2 rounded-full ${i === 0 ? 'animate-pulse bg-accent' : 'bg-paper/50'}`} />
              </motion.span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                <span className="text-[#febc2e]">{e.hash}</span>
                <span className="rounded-full border border-accent/60 px-2 py-0.5 text-accent" style={{ borderColor: 'color-mix(in oklab, var(--accent) 60%, transparent)' }}>
                  {e.branch}
                </span>
                <span className="text-mute">{e.period}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {e.role} <span className="font-light text-mute">@</span> {e.company}
              </h3>
              <ul className="mt-4 space-y-1.5 overflow-x-auto rounded-xl bg-ink-2/70 p-3 font-mono text-[12.5px] leading-relaxed">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 rounded px-1 text-paper/80 hover:bg-[#28c840]/10">
                    <span className="select-none text-[#28c840]">+</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
