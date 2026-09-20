import { useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Glassmorphism card whose border + inner glow follow the pointer.
 * Writes two CSS variables directly (no React state), so it never re-renders.
 */
export function SpotlightCard({ children, className, onPointerMove, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (el) {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    onPointerMove?.(e)
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className={cn('glass', className)} {...rest}>
      {children}
    </div>
  )
}
