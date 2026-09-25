import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMode } from '../mode'

function Ring({ r, value, color, delay }) {
  const c = 2 * Math.PI * r
  return (
    <>
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeOpacity=".2" strokeWidth="11" />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 60 60)"
      />
    </>
  )
}

function SwiftScreen() {
  const rows = [
    ['Commits', '2,184', '#f05138'],
    ['TestFlight builds', '312', '#a3e635'],
    ['Coffees', '∞', '#22d3ee'],
  ]
  return (
    <motion.div
      key="swift"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col px-4 pb-4 pt-12 text-white"
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Thursday</p>
      <p className="font-display text-[22px] font-bold leading-tight">This year</p>
      <div className="my-3 flex justify-center">
        <svg viewBox="0 0 120 120" className="h-32 w-32">
          <Ring r={50} value={0.86} color="#f05138" delay={0.2} />
          <Ring r={37} value={0.7} color="#a3e635" delay={0.35} />
          <Ring r={24} value={0.95} color="#22d3ee" delay={0.5} />
        </svg>
      </div>
      <div className="space-y-2">
        {rows.map(([k, v, c], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center justify-between rounded-xl bg-white/[.07] px-3 py-2"
          >
            <span className="text-[11px] text-white/70">{k}</span>
            <span className="font-display text-sm font-semibold" style={{ color: c }}>
              {v}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-auto flex justify-around pt-3 text-[9px] text-white/40">
        <span className="text-[#f05138]">● Summary</span>
        <span>Apps</span>
        <span>Profile</span>
      </div>
    </motion.div>
  )
}

const requests = [
  ['GET', '/api/projects', 200, 12],
  ['POST', '/api/auth/login', 200, 48],
  ['GET', '/api/users/me', 200, 9],
  ['PATCH', '/api/ledger/42', 204, 21],
  ['GET', '/api/feed?page=2', 200, 17],
  ['POST', '/api/push/send', 202, 33],
  ['GET', '/api/health', 200, 2],
]

function StackScreen() {
  const [n, setN] = useState(3)
  useEffect(() => {
    const t = setInterval(() => setN((x) => x + 1), 900)
    return () => clearInterval(t)
  }, [])
  const visible = Array.from({ length: Math.min(n, 7) }, (_, i) => {
    const idx = n - 1 - i
    return { key: idx, r: requests[idx % requests.length] }
  })
  return (
    <motion.div
      key="stack"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col px-3.5 pb-4 pt-12 font-mono text-white"
    >
      <p className="text-[10px] uppercase tracking-wider text-white/50">api.ledger.app</p>
      <p className="font-display text-[22px] font-bold leading-tight">Live traffic</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
        {[['req/s', 482 + (n % 7) * 3], ['p95', '78ms'], ['err', '0.01%']].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/[.07] py-1.5">
            <p className="text-[12px] font-medium text-[#47a248]">{v}</p>
            <p className="text-[8px] text-white/40">{k}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex-1 space-y-1 overflow-hidden text-[9.5px]">
        <AnimatePresence initial={false}>
          {visible.map(({ key, r }) => (
            <motion.li
              key={key}
              layout
              initial={{ opacity: 0, x: -14, backgroundColor: 'rgba(97,218,251,.25)' }}
              animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(255,255,255,.04)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
            >
              <span className="w-9 text-[#61dafb]">{r[0]}</span>
              <span className="flex-1 truncate text-white/80">{r[1]}</span>
              <span className="text-[#47a248]">{r[2]}</span>
              <span className="w-7 text-right text-white/40">{r[3]}ms</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="pt-2 text-[9px] text-white/40">
        <span className="text-[#47a248]">●</span> mongodb connected · node v22
      </p>
    </motion.div>
  )
}

// CSS iPhone that tilts toward the pointer.
export default function Phone() {
  const { mode } = useMode()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 14 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  return (
    <div style={{ perspective: 1200 }} className="relative">
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-[540px] w-[264px] rounded-[48px] bg-gradient-to-b from-[#3a3f4b] via-[#1c1f27] to-[#2c313c] p-[9px] shadow-[0_50px_100px_-30px_rgba(0,0,0,.9),inset_0_0_0_1px_rgba(255,255,255,.15)] max-[380px]:h-[480px] max-[380px]:w-[236px]"
        data-cursor="tilt"
      >
        {/* side buttons */}
        <span className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-[#2c313c]" />
        <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-[#2c313c]" />
        <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#2c313c]" />
        <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-[#05060a]">
          <div
            className="absolute inset-0 opacity-70 transition-[background] duration-700"
            style={{
              background:
                mode === 'swift'
                  ? 'radial-gradient(120% 60% at 20% 0%, #3b1a14 0%, transparent 60%), radial-gradient(90% 50% at 100% 100%, #102a33 0%, transparent 60%)'
                  : 'radial-gradient(120% 60% at 80% 0%, #10301a 0%, transparent 60%), radial-gradient(90% 50% at 0% 100%, #0e2a38 0%, transparent 60%)',
            }}
          />
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <span className="tracking-tight">5G ▮▮▮</span>
          </div>
          {/* dynamic island */}
          <motion.div
            layout
            className="absolute left-1/2 top-2 z-20 flex h-[26px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-2"
            animate={{ width: mode === 'swift' ? 88 : 150 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <AnimatePresence mode="wait">
              {mode === 'stack' && (
                <motion.span
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full items-center justify-between font-mono text-[9px] text-[#47a248]"
                >
                  <span>● deploy</span>
                  <span className="text-white/60">v2.4.1</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence mode="wait">{mode === 'swift' ? <SwiftScreen key="s" /> : <StackScreen key="m" />}</AnimatePresence>
          {/* glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,.25) 45%, transparent 60%)',
              backgroundSize: '250% 100%',
              backgroundPositionX: glareX,
            }}
          />
          <div className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
        </div>
      </motion.div>
    </div>
  )
}
