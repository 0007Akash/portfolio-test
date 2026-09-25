import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects } from '../data'
import { Chip, Mark } from './ui'
import { pauseScroll } from '../lenis'

const kinds = { ios: 'iOS app', web: 'Web platform', full: 'iOS + MERN' }

function MiniPhone({ hue, className = '' }) {
  return (
    <div className={`w-[92px] rounded-[18px] bg-[#0b0d12] p-[4px] ring-1 ring-white/15 ${className}`}>
      <div className="relative h-[180px] overflow-hidden rounded-[14px]" style={{ background: `linear-gradient(170deg, ${hue}55, #0b0d12 70%)` }}>
        <div className="mx-auto mt-1.5 h-2 w-8 rounded-full bg-black" />
        <div className="space-y-1.5 p-2">
          <div className="h-2 w-10 rounded bg-white/70" />
          <div className="h-10 rounded-lg" style={{ background: hue }} />
          {[70, 50, 60, 40].map((w, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-1.5 rounded bg-white/25" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MiniBrowser({ hue, className = '' }) {
  return (
    <div className={`w-[230px] overflow-hidden rounded-xl bg-[#0b0d12] ring-1 ring-white/15 ${className}`}>
      <div className="flex gap-1 border-b border-white/10 px-2 py-1.5">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="grid grid-cols-[40px_1fr] gap-2 p-2">
        <div className="space-y-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1.5 rounded bg-white/20" />
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="flex h-12 items-end gap-1">
            {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
              <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: hue, opacity: 0.5 + i * 0.07 }} />
            ))}
          </div>
          <div className="h-1.5 w-3/4 rounded bg-white/25" />
          <div className="h-1.5 w-1/2 rounded bg-white/15" />
        </div>
      </div>
    </div>
  )
}

function Visual({ p }) {
  return (
    <div className="relative flex h-44 sm:h-56 items-center justify-center overflow-hidden rounded-2xl" style={{ background: `radial-gradient(80% 90% at 50% 100%, ${p.hue}40, transparent 70%), #0e1119` }}>
      <div className="blueprint absolute inset-0 opacity-60" />
      {p.kind === 'ios' && <MiniPhone hue={p.hue} className="relative rotate-[-6deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105" />}
      {p.kind === 'web' && <MiniBrowser hue={p.hue} className="relative transition-transform duration-500 group-hover:scale-105" />}
      {p.kind === 'full' && (
        <div className="relative flex items-center">
          <MiniBrowser hue={p.hue} className="transition-transform duration-500 group-hover:-translate-x-3" />
          <MiniPhone hue={p.hue} className="-ml-12 mt-10 rotate-[6deg] transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-0" />
        </div>
      )}
    </div>
  )
}

function Card({ p, i, onOpen }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  return (
    <motion.article
      layoutId={`project-${p.id}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      onClick={() => onOpen(p.id)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      data-cursor="open"
      className="group relative w-[min(86vw,440px)] shrink-0 cursor-pointer rounded-[28px] border border-line bg-ink-2 p-3 transition-colors hover:border-white/20"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(p.id)}
    >
      <Visual p={p} />
      <div className="px-3 pb-3 pt-5">
        <div className="flex items-center justify-between font-mono text-[11px] text-mute">
          <span>
            <span style={{ color: p.hue }}>●</span> {kinds[p.kind]}
          </span>
          <span className="tabular-nums">
            {String(i + 1).padStart(2, '0')} / {p.year}
          </span>
        </div>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-paper/65">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
      <span className="absolute right-6 top-6 grid h-10 w-10 scale-75 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </motion.article>
  )
}

// iOS-style bottom sheet; drag it down to dismiss.
function Sheet({ p, onClose }) {
  useEffect(() => {
    pauseScroll(true)
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => {
      pauseScroll(false)
      window.removeEventListener('keydown', k)
    }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        layoutId={`project-${p.id}`}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[32px] border border-line bg-ink-2 p-3 sm:rounded-[32px]"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        data-lenis-prevent
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/20" />
        <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 z-10 rounded-full bg-black/50 p-2 hover:bg-black/70">
          <X className="h-4 w-4" />
        </button>
        <Visual p={p} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-4 sm:p-6">
          <p className="font-mono text-[11px] text-mute">
            <span style={{ color: p.hue }}>●</span> {kinds[p.kind]} · {p.year}
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{p.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-paper/80">{p.tagline}</p>
          <p className="mt-3 leading-relaxed text-paper/60">{p.description}</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {p.metrics.map(([v, k], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="rounded-2xl bg-ink-3 p-3 sm:p-4"
              >
                <p className="font-display text-xl font-semibold sm:text-2xl" style={{ color: p.hue }}>
                  {v}
                </p>
                <p className="mt-1 font-mono text-[10px] text-mute sm:text-[11px]">{k}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <a href={p.link} className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink">
            View case study <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const list = projects.filter((p) => filter === 'all' || p.kind === filter || (filter === 'ios' && p.kind === 'full'))
  const section = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 32))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [list.length])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), { stiffness: 120, damping: 30, mass: 0.3 })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const open = projects.find((p) => p.id === openId)

  return (
    <section id="work" ref={section} className="relative" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="[&>div]:mb-6">
              <Mark index="03" kicker="selected work" title="Things I shipped." />
            </div>
            <div className="mb-6 flex gap-2">
              {[
                ['all', 'All'],
                ['ios', 'iOS'],
                ['web', 'Web'],
                ['full', 'Both'],
              ].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${filter === k ? 'border-accent bg-accent text-white' : 'border-line text-mute hover:text-paper'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-5 pl-4 sm:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Card p={p} i={i} onOpen={setOpenId} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="w-4 shrink-0" />
        </motion.div>
        <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-4 font-mono text-[11px] text-mute">
            <span>scroll</span>
            <div className="h-px flex-1 bg-line">
              <motion.div className="h-px bg-accent" style={{ width: bar }} />
            </div>
            <span className="tabular-nums">{String(list.length).padStart(2, '0')} projects</span>
          </div>
        </div>
      </div>
      <AnimatePresence>{open && <Sheet key={open.id} p={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
    </section>
  )
}
