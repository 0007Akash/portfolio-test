import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { about, profile, stats } from '../data'
import { Mark } from './ui'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

function Counter({ value, decimals = 0, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [v, setV] = useState(value)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString('en-GB', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = about.split(' ')

  return (
    <section id="about" className="px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Mark index="01" kicker="about" title="Two toolchains, one engineer." />
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <p ref={ref} className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-medium leading-[1.2] tracking-tight">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-ink-2 p-6 font-mono text-sm">
              <p className="mb-4 text-xs text-mute">$ whoami --verbose</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[13px]">
                <dt className="text-mute">name</dt>
                <dd>{profile.name}</dd>
                <dt className="text-mute">based</dt>
                <dd>{profile.location}</dd>
                <dt className="text-mute">local</dt>
                <dd>
                  <LocalTime /> IST
                </dd>
                <dt className="text-mute">ships</dt>
                <dd>iOS 16+ · Node 22 · React 18</dd>
                <dt className="text-mute">editor</dt>
                <dd>Xcode + VS Code (vim keys)</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0.3, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`border-line py-8 pr-4 ${i % 2 ? 'pl-4 border-l' : ''} lg:pl-6 lg:[&:not(:first-child)]:border-l ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <p className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-none tracking-tight">
                <Counter {...s} />
              </p>
              <p className="mt-3 text-sm text-mute">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
