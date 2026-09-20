import { useRef, useState } from 'react'
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { profile } from '../../lib/content'
import { useFinePointer } from '../../hooks/useFinePointer'

const FLOATING_CHIPS = [
  { label: 'Spring Boot', className: 'left-[-6%] top-[14%]', depth: 60 },
  { label: 'SwiftUI', className: 'right-[-7%] top-[42%]', depth: 80 },
  { label: 'Next.js', className: 'left-[-4%] bottom-[34%]', depth: 50 },
] as const

/**
 * Holographic identity card: spring-driven 3D tilt, a pointer-tracked
 * iridescent sheen, and chips floating at different depths.
 * Touch / reduced-motion users get a calm static card with a slow idle float.
 */
export function HoloCard() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [imgOk, setImgOk] = useState(true)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 170, damping: 18, mass: 0.6 })
  const sry = useSpring(ry, { stiffness: 170, damping: 18, mass: 0.6 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(30)
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.55), rgb(200 255 61 / 0.22) 22%, rgb(110 231 255 / 0.2) 42%, transparent 66%)`

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 18)
    rx.set(-(py - 0.5) * 18)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const onLeave = () => {
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
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div className="glass aspect-[4/5] w-full" data-active="true">
          {imgOk ? (
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              onError={() => setImgOk(false)}
              className="absolute inset-0 h-full w-full object-cover saturate-[0.9] contrast-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="t-serif text-[clamp(5rem,20vw,9rem)] leading-none text-gradient">YS</span>
            </div>
          )}

          {/* holographic sheen + faint iridescent conic wash */}
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-color-dodge"
            style={{ backgroundImage: sheen }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{
              background:
                'conic-gradient(from 200deg at 50% 50%, #c8ff3d, #6ee7ff, #b58cff, #ff8fb1, #c8ff3d)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent p-[clamp(0.75rem,0.5rem+1vw,1.25rem)] pt-16">
            <p className="text-[length:var(--fs-h3)] font-semibold leading-tight tracking-tight">{profile.name}</p>
            <p className="t-mono mt-1">{profile.role}</p>
          </div>
        </div>

        {FLOATING_CHIPS.map((c) => (
          <span
            key={c.label}
            className={`chip absolute bg-[var(--bg)]/80 backdrop-blur ${c.className}`}
            style={{ transform: `translateZ(${c.depth}px)` }}
          >
            {c.label}
          </span>
        ))}
      </m.div>
    </div>
  )
}
