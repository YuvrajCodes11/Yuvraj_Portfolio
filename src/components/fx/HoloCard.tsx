import { useEffect, useRef, useState } from 'react'
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { profile } from '../../lib/content'
import { useFinePointer } from '../../hooks/useFinePointer'

const FLOATING_CHIPS = [
  { label: 'Spring Boot', className: 'left-[-6%] top-[14%]', depth: 60 },
  { label: 'SwiftUI', className: 'right-[-7%] top-[42%]', depth: 80 },
  { label: 'Next.js', className: 'left-[-4%] bottom-[34%]', depth: 50 },
] as const

/**
 * Holographic identity card: spring-driven 3D tilt, pointer-tracked
 * iridescent sheen, and chips floating at different depths.
 * Touch / reduced-motion users get a calm static card with a slow idle float.
 * Pointer updates are throttled inside requestAnimationFrame.
 */
export function HoloCard() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const moveRaf = useRef(0)
  const [imgOk, setImgOk] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 170, damping: 18, mass: 0.6 })
  const sry = useSpring(ry, { stiffness: 170, damping: 18, mass: 0.6 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(30)
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.4), rgb(200 255 61 / 0.18) 22%, rgb(110 231 255 / 0.15) 42%, transparent 66%)`

  useEffect(() => {
    return () => {
      if (moveRaf.current) cancelAnimationFrame(moveRaf.current)
    }
  }, [])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !fine || reduced || !ref.current) return
    if (!isHovered) setIsHovered(true)

    const clientX = e.clientX
    const clientY = e.clientY

    if (moveRaf.current) return
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = 0
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const px = (clientX - r.left) / r.width
      const py = (clientY - r.top) / r.height
      ry.set((px - 0.5) * 18)
      rx.set(-(py - 0.5) * 18)
      gx.set(px * 100)
      gy.set(py * 100)
    })
  }

  const onLeave = () => {
    if (moveRaf.current) {
      cancelAnimationFrame(moveRaf.current)
      moveRaf.current = 0
    }
    setIsHovered(false)
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(30)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-[min(100%,17rem)] [perspective:900px] sm:w-[min(100%,21rem)] lg:w-full lg:max-w-[26rem]"
      data-cursor="Hi"
    >
      <m.div
        animate={reduced || fine ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        className="relative"
      >
        <div className="glass aspect-[4/5] w-full">
          {imgOk ? (
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              onError={() => setImgOk(false)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="t-serif text-[clamp(5rem,20vw,9rem)] leading-none text-gradient">YS</span>
            </div>
          )}

          {/* holographic sheen + iridescent conic wash */}
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-300"
            style={{ backgroundImage: sheen, opacity: isHovered ? 0.38 : 0 }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background:
                'conic-gradient(from 200deg at 50% 50%, #c8ff3d, #6ee7ff, #b58cff, #ff8fb1, #c8ff3d)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent p-[clamp(0.75rem,0.5rem+1vw,1.25rem)] pt-16">
            <p className="text-[length:var(--fs-h3)] font-semibold leading-tight tracking-tight">{profile.name}</p>
            <p className="t-mono mt-0.5 text-[var(--accent)]">{profile.role}</p>
          </div>
        </div>

        {/* Floating chips at varied depths - desktop only */}
        {fine && !reduced
          ? FLOATING_CHIPS.map((c) => (
              <m.div
                key={c.label}
                aria-hidden
                style={{ transform: `translateZ(${c.depth}px)` }}
                className={`glass glass-pill pointer-events-none absolute z-20 hidden px-2.5 py-1 text-xs font-mono font-medium sm:inline-flex ${c.className}`}
              >
                {c.label}
              </m.div>
            ))
          : null}
      </m.div>
    </div>
  )
}
