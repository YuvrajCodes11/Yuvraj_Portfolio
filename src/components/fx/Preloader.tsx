import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, m } from 'framer-motion'

const KEY = 'yuvraj-portfolio-intro-seen'
const EASE = [0.76, 0, 0.24, 1] as const

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

function markSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* storage unavailable (private mode): the intro simply replays next visit */
  }
}

function shouldSkip(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const navWithConn = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    const conn = navWithConn.connection
    const isSlow = Boolean(conn && (conn.saveData || (conn.effectiveType && conn.effectiveType.includes('2g'))))
    return alreadySeen() || reduced || isTouch || isSlow
  } catch {
    return false
  }
}

/**
 * Stylish counter + curtain-lift intro.
 * Smooth 0-100 count, silky curtain exit, and cleanly unmounts from the DOM.
 * Plays once per session; skipped for reduced-motion or repeat visits.
 */
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [skip] = useState(() => shouldSkip())
  const [visible, setVisible] = useState(() => !shouldSkip())
  const [count, setCount] = useState(0)
  const reveal = useRef(onReveal)

  useEffect(() => {
    reveal.current = onReveal
  }, [onReveal])

  useEffect(() => {
    if (skip || !visible) {
      reveal.current()
      return
    }

    const controls = animate(0, 100, {
      duration: 0.85,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        markSeen()
        setVisible(false)
        reveal.current()
      },
    })
    return () => controls.stop()
  }, [skip, visible])

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-end justify-between bg-[var(--bg)] p-[var(--gutter)] pointer-events-none"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.75, ease: EASE } }}
        >
          <span className="t-mono font-medium tracking-wider">Yuvraj Singh Sidhu</span>
          <span className="t-serif text-[clamp(4rem,18vw,12rem)] leading-none text-[var(--fg)] tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
