import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * 120FPS GPU-friendly glassmorphism card.
 * Border + inner glow follow the cursor on desktop using requestAnimationFrame.
 * Touch screens skip pointer tracking to preserve native momentum and battery.
 */
export function SpotlightCard({ children, className, onPointerMove, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e)
    if (e.pointerType === 'touch') return

    const el = ref.current
    if (!el) return
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${clientX - r.left}px`)
      el.style.setProperty('--my', `${clientY - r.top}px`)
    })
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className={cn('glass', className)} {...rest}>
      {children}
    </div>
  )
}
