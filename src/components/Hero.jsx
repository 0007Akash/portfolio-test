import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Command } from 'lucide-react'
import Phone from './Phone'
import { Magnetic } from './ui'
import { useMode } from '../mode'
import { profile } from '../data'
import { scrollToId } from '../lenis'

const snippets = {
  swift: [
    ['kw', 'struct '], ['ty', 'Portfolio'], ['p', ': '], ['ty', 'View'], ['p', ' {\n'],
    ['p', '  '], ['kw', 'var '], ['p', 'body: '], ['kw', 'some '], ['ty', 'View'], ['p', ' {\n'],
    ['p', '    '], ['ty', 'ActivityRings'], ['p', '(year: .'], ['fn', 'now'], ['p', ')\n'],
    ['p', '      .'], ['fn', 'springy'], ['p', '(response: '], ['num', '0.4'], ['p', ')\n'],
    ['p', '  }\n}'],
  ],
  stack: [
    ['kw', 'app'], ['p', '.'], ['fn', 'get'], ['p', '('], ['str', "'/api/projects'"], ['p', ', '], ['kw', 'async'], ['p', ' (req, res) => {\n'],
    ['p', '  '], ['kw', 'const '], ['p', 'docs = '], ['kw', 'await '], ['ty', 'Project'], ['p', '\n'],
    ['p', '    .'], ['fn', 'find'], ['p', '({ live: '], ['num', 'true'], ['p', ' })\n'],
    ['p', '  res.'], ['fn', 'json'], ['p', '(docs)\n'],
    ['p', '})'],
  ],
}
const colors = { kw: '#ff7ab2', ty: '#dabaff', fn: '#67b7a4', num: '#d9c97c', str: '#ff8170', p: '#e8ebf2' }

function TypedCode() {
  const { mode } = useMode()
  const tokens = snippets[mode]
  const total = tokens.reduce((n, [, t]) => n + t.length, 0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(0)
    const t = setInterval(() => setCount((c) => (c >= total ? c : c + 2)), 22)
    return () => clearInterval(t)
  }, [mode, total])
  let left = count
  return (
    <pre className="caret whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed">
      {tokens.map(([k, t], i) => {
        if (left <= 0) return null
        const part = t.slice(0, left)
        left -= t.length
        return (
          <span key={i} style={{ color: colors[k] }}>
            {part}
          </span>
        )
      })}
    </pre>
  )
}

function Segmented() {
  const { mode, setMode } = useMode()
  const opts = [
    ['swift', 'iOS · Swift'],
    ['stack', 'Web · MERN'],
  ]
  return (
    <div role="tablist" aria-label="Choose a side" className="relative inline-flex rounded-full border border-line bg-ink-2 p-1">
      {opts.map(([k, label]) => (
        <button
          key={k}
          role="tab"
          aria-selected={mode === k}
          onClick={() => setMode(k)}
          className={`relative z-10 rounded-full px-4 py-2 font-mono text-xs transition-colors sm:px-5 ${mode === k ? 'text-white' : 'text-mute hover:text-paper'}`}
        >
          {mode === k && (
            <motion.span
              layoutId="seg"
              className="absolute inset-0 -z-10 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  )
}

const letter = {
  hidden: { y: '110%' },
  show: (i) => ({ y: 0, transition: { delay: 0.15 + i * 0.03, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
}

function SplitLine({ text, className = '' }) {
  let n = 0
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      {text.split(' ').map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((ch, i) => (
            <motion.span key={i} custom={n++} variants={letter} initial="hidden" animate="show" className="inline-block">
              {ch}
            </motion.span>
          ))}
          {'\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { mode } = useMode()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 160])
  const fade = useTransform(scrollY, [0, 500], [1, 0.2])

  return (
    <section id="home" className="blueprint relative overflow-hidden px-4 pb-20 pt-28 sm:px-8 md:pt-32 lg:pb-28">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-[120px] transition-colors duration-700"
        style={{ background: 'var(--accent)', opacity: 0.22 }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ y, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-mute"
          >
            <span className="rounded-full border border-line px-3 py-1">
              <span className="text-[#28c840]">●</span> {profile.status}
            </span>
            <span>{profile.location}</span>
          </motion.div>

          <h1 className="font-display text-[clamp(3rem,9.5vw,7.4rem)] font-bold leading-[0.86] tracking-[-0.045em]">
            <SplitLine text="Native feel." />
            <span className="block overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mode}
                  initial={{ y: '100%', rotateX: -60 }}
                  animate={{ y: 0, rotateX: 0 }}
                  exit={{ y: '-100%', rotateX: 60 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="accent-gradient block pb-[0.06em] font-light italic"
                >
                  {mode === 'swift' ? 'Pocket sized.' : 'Full stack.'}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70"
          >
            I'm <span className="text-paper">{profile.name}</span>, an iOS engineer who also works across the MERN stack. I design and ship
            SwiftUI apps, then build the MongoDB, Express, React and Node services they talk to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Segmented />
            <Magnetic>
              <button
                onClick={() => scrollToId('work')}
                data-cursor="view"
                className="group flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
          </motion.div>
          <p className="mt-5 hidden items-center gap-1.5 font-mono text-[11px] text-mute md:flex">
            Press <kbd className="rounded border border-line bg-ink-2 px-1.5 py-0.5"><Command className="inline h-3 w-3" /> K</kbd> to jump
            anywhere, or <kbd className="rounded border border-line bg-ink-2 px-1.5 py-0.5">M</kbd> to switch modes.
          </p>
        </motion.div>

        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Phone />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            drag
            dragSnapToOrigin
            data-cursor="drag"
            className="absolute -bottom-10 left-0 w-[290px] max-w-[85vw] rounded-2xl border border-white/10 bg-ink-2/85 p-4 shadow-2xl backdrop-blur-xl sm:-left-6 lg:-left-16 lg:bottom-6"
          >
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-mute">
              <span>{mode === 'swift' ? 'Portfolio.swift' : 'routes/projects.js'}</span>
              <span className="text-accent">{mode === 'swift' ? 'Swift 6' : 'Node 22'}</span>
            </div>
            <TypedCode />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
