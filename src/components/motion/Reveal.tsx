import { m, type HTMLMotionProps } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'transition'> {
  delay?: number
  y?: number
}

/**
 * High-performance viewport reveal.
 * Triggers 220px ahead of time so fast scrolling never reveals blank voids.
 * Crisp 350ms duration with subtle 14px rise.
 */
export function Reveal({ delay = 0, y = 14, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 220px 0px', amount: 0.01 }}
      transition={{ duration: 0.35, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
