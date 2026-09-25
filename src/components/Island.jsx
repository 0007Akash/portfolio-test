import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command } from 'lucide-react'
import { scrollToId } from '../lenis'
import { useMode } from '../mode'
import { profile } from '../data'

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'log', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

// Navigation styled as a Dynamic Island: a small pill that expands on hover or tap.
export default function Island({ onOpenPalette }) {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const { mode, toggle } = useMode()
  const current = sections.find((s) => s.id === active)

  // Animate the pill's real width/height instead of a scale-based layout
  // animation, so the corner radius and ring never get stretched.
  const content = useRef(null)
  const [size, setSize] = useState(null)
  useLayoutEffect(() => {
    const el = content.current
    const measure = () => setSize({ width: el.offsetWidth, height: el.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}
    >
      <motion.nav
        initial={false}
        animate={size ?? undefined}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        style={{ borderRadius: 28 }}
        className="overflow-hidden bg-black shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] ring-1 ring-white/10"
      >
        <div ref={content} className="w-max max-w-[calc(100vw-2rem)]">
        <div className="flex items-center justify-between gap-3 py-2 pl-2 pr-3">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="flex items-center gap-3"
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-accent font-display text-[11px] font-bold text-white transition-colors duration-500">
              {profile.initials}
            </span>
            <span className="min-w-[4.5rem] text-left font-mono text-xs text-paper/90">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current?.id}
                  initial={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -8, opacity: 0, filter: 'blur(4px)' }}
                  className="inline-block"
                >
                  {current?.label}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
          <span className="relative flex h-2 w-2" title="Available for work">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.05 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="px-2 pb-2"
            >
              <ul className="grid grid-cols-3 gap-1 sm:flex">
                {sections.map((s, i) => (
                  <motion.li key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}>
                    <button
                      onClick={() => {
                        scrollToId(s.id)
                        setOpen(false)
                      }}
                      className={`relative w-full rounded-full px-3 py-1.5 text-xs transition-colors ${
                        active === s.id ? 'text-white' : 'text-paper/60 hover:text-paper'
                      }`}
                    >
                      {active === s.id && (
                        <motion.span layoutId="island-active" className="absolute inset-0 rounded-full bg-white/10" />
                      )}
                      <span className="relative">{s.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2">
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 rounded-full px-2 py-1 font-mono text-[11px] text-paper/70 hover:text-paper"
                >
                  <span className="relative h-4 w-7 rounded-full bg-white/15">
                    <motion.span
                      layout
                      className="absolute top-0.5 h-3 w-3 rounded-full bg-accent"
                      style={{ left: mode === 'swift' ? 2 : 14 }}
                    />
                  </span>
                  {mode === 'swift' ? 'Swift mode' : 'Stack mode'}
                </button>
                <button
                  onClick={() => {
                    onOpenPalette()
                    setOpen(false)
                  }}
                  className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-paper/80 hover:bg-white/15"
                >
                  <Command className="h-3 w-3" /> K
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  )
}
