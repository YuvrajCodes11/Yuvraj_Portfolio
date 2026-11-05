import { useEffect, useRef } from 'react'

interface ParticleGridProps {
  /** Distance between dots in CSS px. Auto-scales up on big screens. */
  spacing?: number
  /** Pointer influence radius in CSS px. */
  radius?: number
  className?: string
}

/**
 * 120FPS GPU-Optimized interactive dot grid.
 * - Mobile: 65%+ particle reduction, DPR capped at 1.25, ignores vertical address bar resizes.
 * - Desktop: Full mouse repulsion, 150ms debounced resize, rAF-throttled pointer math.
 * - Both: Automatically pauses via IntersectionObserver & document.hidden when offscreen/inactive.
 */
export function ParticleGrid({ spacing = 30, radius = 130, className }: ParticleGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    // On touch screens, reduce particle density by ~65-70%
    const effectiveSpacing = isTouch ? Math.round(spacing * 1.85) : spacing
    let step = effectiveSpacing
    let ox = new Float32Array(0)
    let oy = new Float32Array(0)
    const pointer = { x: -9999, y: -9999, active: false }
    let raf = 0
    let running = false
    let visible = true
    let lastWidth = window.innerWidth
    let resizeTimer = 0

    const resize = () => {
      // Ignore mobile address bar collapsing/expanding (vertical-only resize)
      if (isTouch && width > 0 && Math.abs(window.innerWidth - lastWidth) < 10) {
        return
      }
      lastWidth = window.innerWidth

      const rect = canvas.getBoundingClientRect()
      const maxDpr = isTouch ? 1.25 : 2
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      step = width > 1100 ? effectiveSpacing + 8 : width < 520 ? effectiveSpacing - 4 : effectiveSpacing
      cols = Math.ceil(width / step) + 1
      rows = Math.ceil(height / step) + 1
      ox = new Float32Array(cols * rows)
      oy = new Float32Array(cols * rows)
      draw(performance.now())
    }

    const debouncedResize = () => {
      if (isTouch) {
        resize()
        return
      }
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const time = t * 0.0004
      const r2 = radius * radius
      let needsMore = false

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          const bx = col * step
          const by = row * step

          let tx = 0
          let ty = 0
          let glow = 0
          if (pointer.active && !isTouch) {
            const dx = bx - pointer.x
            const dy = by - pointer.y
            const d2 = dx * dx + dy * dy
            if (d2 < r2) {
              const d = Math.sqrt(d2) || 1
              const f = 1 - d / radius
              tx = (dx / d) * f * f * 22
              ty = (dy / d) * f * f * 22
              glow = f
            }
          }

          ox[idx] += (tx - ox[idx]) * 0.14
          oy[idx] += (ty - oy[idx]) * 0.14
          if (Math.abs(tx - ox[idx]) > 0.05 || Math.abs(ty - oy[idx]) > 0.05) needsMore = true

          const wave = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(time + col * 0.35 + row * 0.28)
          const base = 0.09 + wave * 0.12
          const a = Math.min(1, base + glow * 0.85)
          const size = 1.2 + glow * 1.8

          ctx.fillStyle =
            glow > 0.02
              ? `rgba(200,255,61,${a.toFixed(3)})`
              : `rgba(242,240,234,${a.toFixed(3)})`
          ctx.fillRect(bx + ox[idx] - size / 2, by + oy[idx] - size / 2, size, size)
        }
      }
      return needsMore
    }

    const loop = (t: number) => {
      if (!running) return
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      if (isTouch) return
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') pointer.active = false
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const ro = new ResizeObserver(debouncedResize)
    ro.observe(canvas)

    if (!isTouch) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerup', onUp, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)
    resize()
    start()

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      io.disconnect()
      ro.disconnect()
      if (!isTouch) {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        document.documentElement.removeEventListener('mouseleave', onLeave)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [spacing, radius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        willChange: 'transform',
        transform: 'translateZ(0)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)',
      }}
    />
  )
}
