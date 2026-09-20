import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'

/**
 * Cursor tracking layer (fine pointers only; the native cursor is kept for accessibility):
 *  - a soft ambient glow that lags behind the pointer
 *  - a ring that swells over interactive elements and can show a label via data-cursor="View"
 */
export function CursorFX() {
  const fine = useFinePointer()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const ringX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 })
  const ringY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 })
  const glowX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.8 })
  const glowY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.8 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      setHover(Boolean(el))
      setLabel(el?.dataset.cursor ?? '')
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] h-[520px] w-[520px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgb(200 255 61 / 0.075) 0%, rgb(110 231 255 / 0.03) 40%, transparent 70%)',
        }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full border border-[var(--accent)]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hover ? (label ? 84 : 46) : 28,
          height: hover ? (label ? 84 : 46) : 28,
          scale: pressed ? 0.85 : 1,
          backgroundColor: hover && label ? 'rgb(200 255 61 / 1)' : 'rgb(200 255 61 / 0)',
          opacity: hover ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        {label ? (
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--bg)]">
            {label}
          </span>
        ) : null}
      </m.div>
    </>
  )
}
