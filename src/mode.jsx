import { createContext, useContext, useEffect, useState } from 'react'

// "swift" = iOS personality, "stack" = MERN personality. Re-themes the accent.
const ModeContext = createContext({ mode: 'swift', setMode: () => {}, toggle: () => {} })

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('swift')
  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])
  const toggle = () => setMode((m) => (m === 'swift' ? 'stack' : 'swift'))
  return <ModeContext.Provider value={{ mode, setMode, toggle }}>{children}</ModeContext.Provider>
}

export const useMode = () => useContext(ModeContext)
