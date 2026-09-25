import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { ModeProvider, useMode } from './mode'
import { startLenis } from './lenis'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Island from './components/Island'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Springboard from './components/Springboard'
import Projects from './components/Projects'
import GitLog from './components/GitLog'
import Messages from './components/Messages'
import Footer from './components/Footer'

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent" style={{ scaleX }} />
}

function Shell() {
  const [loading, setLoading] = useState(true)
  const [palette, setPalette] = useState(false)
  const { toggle } = useMode()
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => startLenis(), [])

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName)
      if (!typing && !e.metaKey && !e.ctrlKey && e.key.toLowerCase() === 'm') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <div className="grain" aria-hidden />
      <Cursor />
      <ProgressBar />
      <Island onOpenPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Springboard />
        <Projects />
        <GitLog />
        <Messages />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ModeProvider>
        <Shell />
      </ModeProvider>
    </MotionConfig>
  )
}
