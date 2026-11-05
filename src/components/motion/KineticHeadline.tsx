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

/** One line whose characters rise smoothly with a spring-like stagger. */
export function MaskLine({ text, delay = 0, play = true, className }: MaskLineProps) {
  const words = text.split(' ')
  let charIndex = 0
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block whitespace-nowrap align-bottom"
        >
          {[...word].map((ch) => {
            const i = charIndex++
            return (
              <m.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 12 }}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: delay + i * 0.02, ease: EASE }}
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
 * WebKit-safe 2D word rotator.
 * Single element swap with AnimatePresence mode="wait" and subtle 2D translateY(6px),
 * completely avoiding 3D transforms, overflow clipping, or GPU tile tearing.
 */
export function RotatingWord({ words, intervalMs = 2600, className, wordClassName }: RotatingWordProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), intervalMs)
    return () => window.clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span className={`inline-block align-baseline ${className ?? ''}`}>
      <span className="sr-only" aria-live="polite">
        {words[i]}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[i]}
          aria-hidden
          className={`inline-block whitespace-nowrap ${wordClassName ?? ''}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
