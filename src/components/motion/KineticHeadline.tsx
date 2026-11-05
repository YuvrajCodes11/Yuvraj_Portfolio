import { useEffect, useState } from 'react'
import { m } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface MaskLineProps {
  text: string
  delay?: number
  /** Gate the animation (e.g. until the preloader has lifted). */
  play?: boolean
  className?: string
}

/**
 * Dynamic kinetic staggered line where each character springs smoothly into view.
 * Zero negative margins and no clipping overflow masks, preserving full ascender/descender clearance.
 */
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
          className="inline-block whitespace-nowrap align-baseline py-[0.1em]"
        >
          {[...word].map((ch) => {
            const i = charIndex++
            return (
              <m.span
                key={i}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: '75%', rotate: 5 }}
                animate={play ? { opacity: 1, y: '0%', rotate: 0 } : { opacity: 0, y: '75%', rotate: 5 }}
                transition={{ duration: 0.65, delay: delay + i * 0.025, ease: EASE }}
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
 * Kinetic CSS Grid stacked word rotator.
 * Every word occupies grid-area: 1 / 1 with locked min-height and line-height,
 * preventing layout shift while animating active words with dynamic 3D transitions.
 */
export function RotatingWord({ words, intervalMs = 2600, className, wordClassName }: RotatingWordProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), intervalMs)
    return () => window.clearInterval(id)
  }, [words.length, intervalMs])

  const longestWord = words.reduce((longest, w) => (w.length > longest.length ? w : longest), '')

  return (
    <span
      className={`relative inline-grid align-baseline py-[0.15em] ${className ?? ''}`}
      style={{
        display: 'inline-grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        minHeight: '1.25em',
        lineHeight: 1.15,
        verticalAlign: 'baseline',
      }}
    >
      {/* Invisible sizer guarantees rock-solid layout bounding box */}
      <span
        aria-hidden
        className="invisible pointer-events-none select-none whitespace-nowrap"
        style={{ gridArea: '1 / 1', lineHeight: 'inherit' }}
      >
        {longestWord}
      </span>
      <span className="sr-only" aria-live="polite">
        {words[i]}
      </span>
      {words.map((w, index) => {
        const isActive = index === i
        return (
          <span
            key={w}
            aria-hidden={!isActive}
            className={`whitespace-nowrap will-change-transform ${wordClassName ?? ''}`}
            style={{
              gridArea: '1 / 1',
              lineHeight: 'inherit',
              transform: isActive ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 105%, 0)',
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
              transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
            }}
          >
            {w}
          </span>
        )
      })}
    </span>
  )
}
