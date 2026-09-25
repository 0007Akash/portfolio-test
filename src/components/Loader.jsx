import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  'Resolving package graph',
  'Compiling Swift sources (48/48)',
  'Bundling React client',
  'Linking MongoDB schemas',
  'Signing "Portfolio.app"',
]

// Xcode-style build log shown for ~1.6s on first load.
export default function Loader({ onDone }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i >= steps.length) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setI((n) => n + 1), 240)
    return () => clearTimeout(t)
  }, [i, onDone])

  const done = i >= steps.length
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink px-6"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onClick={onDone}
    >
      <div className="w-full max-w-md font-mono text-[13px]">
        <div className="mb-4 flex items-center gap-2 text-mute">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2">Portfolio — Build</span>
        </div>
        <ul className="space-y-1.5">
          {steps.slice(0, i).map((s) => (
            <motion.li key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2 text-paper/80">
              <span className="text-[#28c840]">✓</span>
              {s}
            </motion.li>
          ))}
        </ul>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-ink-3">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${(i / steps.length) * 100}%` }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
          />
        </div>
        <p className="mt-3 h-5 text-paper">
          {done ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-[#28c840]">Build Succeeded</span> <span className="text-mute">| 0 warnings</span>
            </motion.span>
          ) : (
            <span className="text-mute">Building… (click to skip)</span>
          )}
        </p>
      </div>
    </motion.div>
  )
}
