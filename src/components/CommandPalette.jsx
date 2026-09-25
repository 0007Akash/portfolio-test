import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, CornerDownLeft, ExternalLink, Repeat, Search } from 'lucide-react'
import { sections } from './Island'
import { scrollToId, pauseScroll } from '../lenis'
import { profile } from '../data'
import { useMode } from '../mode'

export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const input = useRef(null)
  const { toggle, mode } = useMode()

  const commands = useMemo(
    () => [
      ...sections.map((s) => ({ group: 'Go to', label: s.label, icon: ArrowRight, run: () => scrollToId(s.id) })),
      { group: 'Actions', label: `Switch to ${mode === 'swift' ? 'Stack' : 'Swift'} mode`, icon: Repeat, run: toggle, hint: 'M' },
      { group: 'Actions', label: 'Copy email address', icon: Copy, run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}) },
      ...profile.socials.map((s) => ({ group: 'Links', label: `Open ${s.label}`, icon: ExternalLink, href: s.href })),
    ],
    [mode, toggle],
  )
  const results = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    pauseScroll(open)
    if (open) {
      setQ('')
      setIdx(0)
      setTimeout(() => input.current?.focus(), 30)
    }
  }, [open])

  const exec = (c) => {
    if (!c) return
    setOpen(false)
    if (c.href) window.open(c.href, '_blank', 'noopener')
    else setTimeout(c.run, 120)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') exec(results[idx])
    else if (e.key === 'Escape') setOpen(false)
  }

  let lastGroup = null
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-ink-2/95 shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 transition-colors focus-within:border-[var(--accent)]">
              <Search className="h-4 w-4 text-mute" />
              <input
                id="palette-search"
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setIdx(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-mute"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute">esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">No commands match "{q}".</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup
                lastGroup = c.group
                const Icon = c.icon
                return (
                  <li key={c.label}>
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-mute">{c.group}</p>}
                    <button
                      onMouseMove={() => setIdx(i)}
                      onClick={() => exec(c)}
                      className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm"
                    >
                      {idx === i && <motion.span layoutId="palette-hl" className="absolute inset-0 rounded-lg bg-white/[.07]" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                      <Icon className={`relative h-4 w-4 ${idx === i ? 'text-accent' : 'text-mute'}`} />
                      <span className="relative flex-1">{c.label}</span>
                      {c.hint && <kbd className="relative rounded border border-line px-1.5 font-mono text-[10px] text-mute">{c.hint}</kbd>}
                      {idx === i && <CornerDownLeft className="relative h-3.5 w-3.5 text-mute" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
