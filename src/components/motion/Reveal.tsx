import { m, type HTMLMotionProps } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'transition'> {
  delay?: number
  y?: number
}

/** Scroll-triggered fade + rise. Transform/opacity only, runs once. */
export function Reveal({ delay = 0, y = 22, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
