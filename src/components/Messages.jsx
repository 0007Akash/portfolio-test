import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowUp, Check, Copy } from 'lucide-react'
import { profile } from '../data'
import { Mark, SocialGlyph } from './ui'

const intro = [
  "Hey, thanks for scrolling all the way down.",
  'Are you building an iOS app, a web product, or both?',
]
const quick = {
  'An iOS app': 'Nice. Swift and SwiftUI are home turf. Tell me about the idea and your timeline.',
  'A web platform': 'Good, I enjoy a clean MERN build. What should the first version do?',
  'Both, please': 'My favourite kind of project: one API, two clients, one person owning both.',
  'Just saying hi': 'Hi! Always happy to chat about apps, APIs, or the best mechanical keyboard.',
}

function Bubble({ from, children, last }) {
  const me = from === 'me'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      style={{ originX: me ? 1 : 0 }}
      className={`flex ${me ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-3.5 py-2 text-[15px] leading-snug ${
          me ? 'bg-[#0a84ff] text-white' : 'bg-[#26262a] text-white'
        } ${last ? (me ? 'rounded-[20px] rounded-br-md' : 'rounded-[20px] rounded-bl-md') : 'rounded-[20px]'}`}
      >
        {children}
      </div>
    </motion.div>
  )
}

function Typing() {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} style={{ originX: 0 }} className="flex">
      <div className="flex gap-1 rounded-[20px] rounded-bl-md bg-[#26262a] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-white/50"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Messages() {
  const box = useRef(null)
  const inView = useInView(box, { once: true, margin: '-20%' })
  const [msgs, setMsgs] = useState([{ from: 'them', text: intro[0] }])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [asked, setAsked] = useState(false)
  const [mailto, setMailto] = useState(null)
  const scroller = useRef(null)
  const timers = useRef([])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const reply = (lines, start = 400) => {
    let t = start
    lines.forEach((line) => {
      later(() => setTyping(true), t)
      t += 900 + line.length * 12
      later(() => {
        setTyping(false)
        setMsgs((m) => [...m, { from: 'them', text: line }])
      }, t)
      t += 250
    })
  }

  useEffect(() => {
    if (inView) reply(intro.slice(1), 300)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const pick = (q) => {
    setAsked(true)
    setMsgs((m) => [...m, { from: 'me', text: q }])
    reply([quick[q], 'Write me a message below and I will get back within a day.'])
  }

  const send = (e) => {
    e.preventDefault()
    const body = text.trim()
    if (!body) return
    setAsked(true)
    setMsgs((m) => [...m, { from: 'me', text: body }])
    setText('')
    const href = `mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(body)}`
    setMailto(href)
    reply([`Thanks! Tap "Email this" to send it to ${profile.email} from your mail app.`])
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      const r = document.createRange()
      r.selectNodeContents(document.getElementById('contact-email'))
      const s = window.getSelection()
      s.removeAllRanges()
      s.addRange(r)
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Mark index="05" kicker="contact" title="Let's ship something." />
          <p className="max-w-md text-lg leading-relaxed text-paper/70">
            Hiring for iOS, need a full-stack build, or want a second pair of eyes on your app's performance? Send a message.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span id="contact-email" className="select-all font-display text-2xl font-medium tracking-tight sm:text-3xl">
              {profile.email}
            </span>
            <button onClick={copy} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mute hover:text-paper">
              {copied ? <Check className="h-3.5 w-3.5 text-[#28c840]" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-white/25 hover:text-paper"
              >
                <SocialGlyph short={s.short} /> {s.label}
              </a>
            ))}
          </div>
        </div>

        <div ref={box} className="mx-auto w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]">
          <div className="flex flex-col items-center gap-1 border-b border-white/10 bg-[#111]/90 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-b from-[#9aa1b1] to-[#5d6372] font-display text-sm font-bold text-white">
              {profile.initials}
            </span>
            <span className="text-[11px] text-white/80">{profile.first} ›</span>
          </div>
          <div ref={scroller} data-lenis-prevent className="no-scrollbar h-[360px] space-y-1.5 overflow-y-auto px-3 py-4">
            <p className="pb-2 text-center text-[10px] text-white/40">iMessage · Today</p>
            {msgs.map((m, i) => (
              <Bubble key={i} from={m.from} last={msgs[i + 1]?.from !== m.from}>
                {m.text}
              </Bubble>
            ))}
            <AnimatePresence>{typing && <Typing key="t" />}</AnimatePresence>
            {mailto && !typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end pt-1">
                <a href={mailto} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-[#0a84ff] hover:bg-white/15">
                  Email this →
                </a>
              </motion.div>
            )}
          </div>
          <AnimatePresence>
            {!asked && msgs.length >= intro.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-2"
              >
                {Object.keys(quick).map((q) => (
                  <button key={q} onClick={() => pick(q)} className="shrink-0 rounded-full border border-[#0a84ff]/60 px-3 py-1.5 text-xs text-[#0a84ff] hover:bg-[#0a84ff]/10">
                    {q}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 p-3">
            <label htmlFor="msg" className="sr-only">
              Message
            </label>
            <input
              id="msg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="iMessage"
              autoComplete="off"
              className="h-9 flex-1 rounded-full border border-white/15 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:border-[#0a84ff] focus:outline-none"
            />
            <motion.button
              type="submit"
              aria-label="Send"
              whileTap={{ scale: 0.85 }}
              animate={{ scale: text ? 1 : 0.85, opacity: text ? 1 : 0.4 }}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#0a84ff] text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}
