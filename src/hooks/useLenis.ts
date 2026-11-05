import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/scroll'

/**
 * Responsive scrolling physics:
 * - Desktop (pointer: fine): Lenis smooth inertia scrolling (lerp: 0.1, smoothWheel: true).
 * - Mobile / Touch (pointer: coarse): Disabled completely so iOS Safari & Android
 *   use native 120Hz hardware-accelerated momentum scrolling.
 */
export function useLenis(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches

    // On mobile, touch screens, or reduced motion, never hijack native momentum scrolling
    if (reduced || isTouch || !hasFinePointer) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    })
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
