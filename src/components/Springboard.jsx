import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { dock, skills } from '../data'
import { Mark } from './ui'

const tints = {
  ios: 'linear-gradient(145deg,#ff8a5c,#f05138 55%,#b8321f)',
  web: 'linear-gradient(145deg,#6fe3a0,#2f8f5b 60%,#1b5a3a)',
  tool: 'linear-gradient(145deg,#a5b0ff,#5d62d6 60%,#3a3b8f)',
}
const groupNames = { all: 'All apps', ios: 'iOS', web: 'Web · MERN', tool: 'Tooling' }

function Icon({ skill, size = 'md', layoutPrefix = '' }) {
  const s = size === 'sm' ? 'h-12 w-12 text-base rounded-[14px]' : 'h-14 w-14 text-lg rounded-[16px] sm:h-16 sm:w-16 sm:rounded-[18px]'
  return (
    <motion.div
      layoutId={`${layoutPrefix}icon-${skill.name}`}
      className={`relative grid place-items-center font-display font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_20px_-8px_rgba(0,0,0,.8)] ${s}`}
      style={{ background: tints[skill.group] }}
    >
      {skill.glyph}
    </motion.div>
  )
}

function AppSheet({ skill, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  const ticks = 20
  const on = Math.round((skill.level / 100) * ticks)
  return (
    <motion.div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      <motion.div
        layoutId={`card-${skill.name}`}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-ink-3 p-6 sm:p-8"
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 hover:bg-white/20">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-4">
          <Icon skill={skill} />
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight">{skill.name}</h3>
            <p className="font-mono text-xs text-mute">
              {groupNames[skill.group]} · {skill.years} {skill.years === 1 ? 'year' : 'years'} in production
            </p>
          </div>
        </div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 leading-relaxed text-paper/80">
          {skill.note}
        </motion.p>
        <div className="mt-6">
          <div className="mb-2 flex justify-between font-mono text-[11px] text-mute">
            <span>proficiency</span>
            <span className="tabular-nums text-paper">{skill.level}%</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: ticks }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0.2, opacity: 0.2 }}
                animate={{ scaleY: 1, opacity: i < on ? 1 : 0.15 }}
                transition={{ delay: 0.2 + i * 0.025 }}
                className="h-6 flex-1 rounded-sm"
                style={{ background: i < on ? tints[skill.group] : 'white' }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Springboard() {
  const [filter, setFilter] = useState('all')
  const [order, setOrder] = useState(() => skills.filter((s) => !dock.includes(s.name)).map((s) => s.name))
  const [editing, setEditing] = useState(false)
  const [openName, setOpenName] = useState(null)
  const byName = Object.fromEntries(skills.map((s) => [s.name, s]))
  const visible = order.filter((n) => filter === 'all' || byName[n].group === filter)
  const open = openName ? byName[openName] : null

  // Drop an icon onto another to swap places, like rearranging a home screen.
  const onDragEnd = (name, info) => {
    const hit = document
      .elementsFromPoint(info.point.x - window.scrollX, info.point.y - window.scrollY)
      .map((el) => el.closest?.('[data-app]'))
      .find((el) => el && el.dataset.app !== name)
    if (!hit) return
    const target = hit.dataset.app
    setOrder((o) => {
      const next = [...o]
      const a = next.indexOf(name)
      const b = next.indexOf(target)
      ;[next[a], next[b]] = [next[b], next[a]]
      return next
    })
  }

  return (
    <section id="skills" className="px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Mark index="02" kicker="skills" title="My home screen." />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(groupNames).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`relative rounded-full px-4 py-2 font-mono text-xs transition-colors ${filter === k ? 'text-ink' : 'text-mute hover:text-paper'}`}
              >
                {filter === k && <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-paper" />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-mute">
            Tap an app to open it.{' '}
            <button onClick={() => setEditing((e) => !e)} className="text-accent underline-offset-4 hover:underline">
              {editing ? 'Done' : 'Edit home screen'}
            </button>
          </p>
        </div>

        <LayoutGroup>
          <div
            className="relative overflow-hidden rounded-[36px] border border-line p-5 sm:p-10"
            style={{
              background:
                'radial-gradient(80% 60% at 10% 0%, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%), radial-gradient(70% 70% at 100% 100%, #1b2350, transparent 70%), #0d1017',
            }}
          >
            <motion.ul layout className="grid min-h-[260px] grid-cols-4 content-start gap-x-2 gap-y-6 sm:grid-cols-6 lg:grid-cols-8">
              <AnimatePresence mode="popLayout">
                {visible.map((name, i) => {
                  const s = byName[name]
                  return (
                    <motion.li
                      key={name}
                      layout
                      data-app={name}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25, delay: i * 0.015 }}
                      drag={editing}
                      dragSnapToOrigin
                      dragElastic={0.6}
                      onDragEnd={(_, info) => onDragEnd(name, info)}
                      whileDrag={{ scale: 1.15, zIndex: 10 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        layoutId={`card-${name}`}
                        onClick={() => !editing && setOpenName(name)}
                        whileHover={editing ? undefined : { y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        data-cursor={editing ? 'drag' : 'open'}
                        className={`flex flex-col items-center gap-1.5 bg-transparent ${editing ? 'jiggle' : ''}`}
                        style={{ animationDelay: `${(i % 3) * -0.09}s` }}
                      >
                        <Icon skill={s} />
                        <span className="max-w-[4.5rem] truncate text-[11px] text-white/85">{s.name}</span>
                      </motion.button>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </motion.ul>

            <div className="mt-8 flex justify-center gap-1.5">
              {Object.keys(groupNames).map((k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${filter === k ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`} />
              ))}
            </div>

            <div className="mx-auto mt-5 flex w-fit gap-4 rounded-[28px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl sm:gap-6 sm:px-6">
              {dock.map((n) => (
                <motion.button
                  key={n}
                  layoutId={`card-${n}`}
                  onClick={() => setOpenName(n)}
                  whileHover={{ scale: 1.25, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  data-cursor="open"
                  aria-label={`Open ${n}`}
                >
                  <Icon skill={byName[n]} size="sm" layoutPrefix="dock-" />
                </motion.button>
              ))}
            </div>

            <AnimatePresence>{open && <AppSheet key={open.name} skill={open} onClose={() => setOpenName(null)} />}</AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
