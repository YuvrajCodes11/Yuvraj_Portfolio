import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null): void {
  instance = lenis
}

/** Smooth-scroll to an in-page anchor (e.g. "#work"), Lenis-aware. */
export function scrollToHash(hash: string, offset = -72): void {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  history.replaceState(null, '', hash)
}

/** Freeze / release page scroll (used by the mobile menu sheet). */
export function lockScroll(lock: boolean): void {
  if (lock) instance?.stop()
  else instance?.start()
  document.body.style.overflow = lock ? 'hidden' : ''
}
