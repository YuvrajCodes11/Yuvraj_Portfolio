import { useEffect, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, profile } from '../../lib/content'
import { lockScroll, scrollToHash } from '../../lib/scroll'
import { cn } from '../../lib/utils'
import { Magnetic } from '../motion/Magnetic'
import { ButtonLink } from '../ui/ButtonLink'

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 240)
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const l of navLinks) {
      const el = document.getElementById(l.href.slice(1))
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => {
    lockScroll(false)
    setOpen(false)
    scrollToHash(href)
  }

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50 pt-[max(0.6rem,env(safe-area-inset-top))]"
        animate={{ y: hidden && !open ? '-120%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-x flex items-center justify-between gap-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              go('#top')
            }}
            aria-label="Yuvraj Singh Sidhu, back to top"
            className="glass flex h-10 items-center gap-2 px-3.5 glass-pill"
          >
            <span className="size-2 rounded-full bg-[var(--accent)]" />
            <span className="text-[length:var(--fs-body)] font-semibold tracking-tight">Yuvraj</span>
          </a>

          <nav
            aria-label="Primary"
            className={cn(
              'glass hidden h-10 items-center gap-1 px-1.5 glass-pill transition-shadow duration-500 md:flex',
              scrolled && 'shadow-[0_10px_40px_-12px_rgb(0_0_0/0.8)]',
            )}
          >
            {navLinks.map((l) => {
              const on = active === l.href.slice(1)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(l.href)
                  }}
                  className={cn(
                    'relative rounded-full px-4 py-1.5 text-[length:var(--fs-body)] transition-colors',
                    on ? 'text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-0 -z-10 rounded-full bg-[var(--accent)] transition-opacity duration-300',
                      on ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {l.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Magnetic strength={0.25}>
              <ButtonLink href={`mailto:${profile.email}?subject=Free consultation request`} cursorLabel="Talk">
                Book a Call
              </ButtonLink>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="glass flex h-10 w-10 items-center justify-center glass-pill md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 h-px w-4 bg-[var(--fg)] transition-all duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-4 bg-[var(--fg)] transition-all duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-[var(--bg)]/95 px-[var(--gutter)] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 1.9rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.2rem) 1.9rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 1.9rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="mb-6 space-y-1">
              {navLinks.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.href)
                    }}
                    className="flex items-baseline gap-3 border-b border-[var(--line)] py-3 text-[clamp(1.8rem,9vw,2.6rem)] font-semibold leading-none tracking-tight"
                  >
                    <span className="t-mono w-5">{String(i + 1).padStart(2, '0')}</span>
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <ButtonLink
              href={`mailto:${profile.email}?subject=Free consultation request`}
              className="w-full justify-center"
            >
              Book a Call
            </ButtonLink>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
