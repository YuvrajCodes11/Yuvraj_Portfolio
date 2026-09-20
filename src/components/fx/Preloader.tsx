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

/**
 * Counter + curtain-lift intro. Plays once per session and is skipped for
 * reduced-motion users. SSR-safe: all browser APIs are touched inside effects.
 */
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)
  const reveal = useRef(onReveal)

  useEffect(() => {
    reveal.current = onReveal
  }, [onReveal])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (alreadySeen() || reduced) {
      setVisible(false)
      reveal.current()
      return
    }
    const controls = animate(0, 100, {
      duration: 1.15,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        markSeen()
        setVisible(false)
        reveal.current()
      },
    })
    return () => controls.stop()
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-end justify-between bg-[var(--bg)] p-[var(--gutter)]"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: EASE } }}
        >
          <span className="t-mono">Yuvraj Singh Sidhu</span>
          <span className="t-serif text-[clamp(4rem,18vw,12rem)] leading-none text-[var(--fg)] tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
