import { useRef, type ReactNode } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'
import { cn } from '../../lib/utils'

interface MagneticProps {
  children: ReactNode
  /** 0 – 1. How strongly the element chases the cursor. */
  strength?: number
  className?: string
}

/**
 * Spring-physics magnetic wrapper. Hit-area stays static (outer div) while the
 * inner element moves, so there is no pointer jitter at the edges.
 */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn('inline-block p-1 -m-1', className)}
    >
      <m.div style={{ x: sx, y: sy }}>{children}</m.div>
    </div>
  )
}
