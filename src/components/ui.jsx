import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Element that leans toward the pointer, then springs back.
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

// Section header styled like a Swift MARK comment.
export function Mark({ index, title, kicker }) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0.2, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs tracking-wider text-mute"
      >
        <span className="text-accent">// MARK: -</span> {index} {kicker}
      </motion.p>
      <h2 className="mt-3 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
        {title.split(' ').map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '40%', opacity: 0.25 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-ink-2 px-2.5 py-1 font-mono text-[11px] text-mute ${className}`}>
      {children}
    </span>
  )
}

// Simple brand marks (lucide dropped brand icons).
export function SocialGlyph({ short, className = 'h-4 w-4' }) {
  const paths = {
    gh: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
    in: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z',
    x: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z',
    as: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.9 14.9h-2a.75.75 0 0 1 0-1.5h2.87l-.87 1.5Zm8.8 0h-2.4l-.9-1.5h3.3a.75.75 0 0 1 0 1.5Zm-3-2.6-4.37-7.58a.75.75 0 0 1 1.3-.75l.4.7.4-.7a.75.75 0 0 1 1.3.75l-.84 1.46 3.11 5.4-1.3.72Zm-5.8.9-1.3-.75 2.3-4 1.3.75-2.3 4Z',
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={paths[short]} />
    </svg>
  )
}
