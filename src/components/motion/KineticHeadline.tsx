import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface MaskLineProps {
  text: string
  delay?: number
  /** Gate the animation (e.g. until the preloader has lifted). */
  play?: boolean
  className?: string
}

/**
 * Kinetic staggered line — each word slides up from below.
 * Uses word-level overflow clip instead of char-level to keep GPU layer count low.
 */
export function MaskLine({ text, delay = 0, play = true, className }: MaskLineProps) {
  const words = text.split(' ')
  let charIndex = 0
  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block whitespace-nowrap overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
        >
          {[...word].map((ch) => {
            const i = charIndex++
            return (
              <m.span
                key={i}
                className="inline-block"
                initial={{ y: '110%' }}
                animate={play ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.72, delay: delay + i * 0.022, ease: EASE }}
              >
                {ch}
              </m.span>
            )
          })}
          {wi < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </span>
  )
}

interface RotatingWordProps {
  words: readonly string[]
  intervalMs?: number
  className?: string
  /** Applied to each visible word */
  wordClassName?: string
}

/**
 * Rolling word swap using AnimatePresence mode="wait".
 * Words slide in from below, out upward — clean, no flicker.
 * Container is clamped to viewport width to prevent mobile overflow.
 */
export function RotatingWord({ words, intervalMs = 2800, className, wordClassName }: RotatingWordProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), intervalMs)
    return () => window.clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span
      className={`relative inline-grid overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] ${className ?? ''}`}
      style={{
        display: 'inline-grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        maxWidth: 'calc(100vw - 2 * var(--gutter, 1rem))',
      }}
    >
      {/* Screen-reader live region */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {words[i]}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[i]}
          aria-hidden
          className={`col-start-1 row-start-1 whitespace-nowrap ${wordClassName ?? ''}`}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.52, ease: EASE }}
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
