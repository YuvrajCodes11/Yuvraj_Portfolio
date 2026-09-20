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

/** One line whose characters rise out of an overflow mask with a spring-like stagger. */
export function MaskLine({ text, delay = 0, play = true, className }: MaskLineProps) {
  const words = text.split(' ')
  let charIndex = 0
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          {[...word].map((ch) => {
            const i = charIndex++
            return (
              <m.span
                key={i}
                className="inline-block will-change-transform"
                initial={{ y: '115%', rotate: 6 }}
                animate={play ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 6 }}
                transition={{ duration: 0.9, delay: delay + i * 0.028, ease: EASE }}
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
  /** Applied to each visible word (put gradient text styles here, not on the container). */
  wordClassName?: string
}

/**
 * Rolling word swap. All words are stacked in one grid cell so the container
 * always reserves the widest word's width (zero layout shift).
 */
export function RotatingWord({ words, intervalMs = 2600, className, wordClassName }: RotatingWordProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), intervalMs)
    return () => window.clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${className ?? ''}`}>
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span className="sr-only" aria-live="polite">{words[i]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={words[i]}
          aria-hidden
          className={`col-start-1 row-start-1 whitespace-nowrap ${wordClassName ?? ''}`}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
