import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { profile, rotatingWords, techStack } from '../../lib/content'
import { useIntroReady } from '../../lib/intro'
import { MaskLine, RotatingWord } from '../motion/KineticHeadline'
import { Magnetic } from '../motion/Magnetic'
import { ButtonLink } from '../ui/ButtonLink'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ready = useIntroReady()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col"
    >
      {/*
        The inner m.div uses parallax y + opacity. We give it explicit top padding
        to clear the fixed nav (h-16 ≈ 64px → 5rem is safe across all breakpoints).
        justify-center distributes remaining height vertically.
      */}
      <m.div
        style={{ y, opacity }}
        className="container-x relative flex flex-1 flex-col justify-center pt-[max(5.5rem,env(safe-area-inset-top)+5.5rem)] pb-[clamp(1.25rem,3vw,2.5rem)]"
      >
        <m.p
          {...fade(0.05)}
          className="chip mb-[clamp(0.9rem,0.5rem+1.6vw,1.9rem)] self-start"
        >
          <span className="relative flex size-2">
            <span
              className="absolute inset-0 rounded-full bg-[var(--accent)]"
              style={{ animation: 'pulse-ring 2s ease-out infinite' }}
            />
            <span className="relative size-2 rounded-full bg-[var(--accent)]" />
          </span>
          {profile.status}
        </m.p>

        {/*
          h1 uses t-display (line-height: 0.94). We override to 1.05 so descenders
          on 'g','p','y' in the RotatingWord are not clipped by the tight leading.
          z-index: 20 keeps it above blob/canvas layers.
        */}
        <h1
          className="t-display relative z-20 max-w-full [text-wrap:balance]"
          style={{ lineHeight: 1.08, overflowWrap: 'break-word' }}
        >
          <span className="block leading-[1.08]">
            <MaskLine text="I build" play={ready} delay={0.05} />
          </span>
          <span className="block leading-[1.08]" style={{ paddingBlock: '0.12em' }}>
            <RotatingWord words={rotatingWords} className="t-serif" wordClassName="text-gradient" />
          </span>
          <span className="block leading-[1.08]">
            <MaskLine text="for growing businesses." play={ready} delay={0.28} />
          </span>
        </h1>

        <m.p {...fade(0.52)} className="t-lead mt-[clamp(1rem,0.6rem+1.8vw,2.2rem)] max-w-[44ch]">
          {profile.pitch}
        </m.p>

        <m.div
          {...fade(0.68)}
          className="mt-[clamp(1rem,0.6rem+1.6vw,2rem)] flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <Magnetic>
            <ButtonLink href="#work" cursorLabel="View">
              Case studies
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink
              href={`mailto:${profile.email}?subject=Free consultation request`}
              variant="ghost"
            >
              Free consultation
            </ButtonLink>
          </Magnetic>
        </m.div>

        <m.ul
          {...fade(0.84)}
          className="mt-[clamp(1rem,0.7rem+1.6vw,2.25rem)] flex flex-wrap gap-1.5 sm:gap-2"
        >
          {profile.proof.map((p) => (
            <li key={p} className="chip">
              <span aria-hidden className="size-1 rounded-full bg-[var(--accent)]" />
              {p}
            </li>
          ))}
        </m.ul>
      </m.div>

      {/* Tech ticker — sits at the natural bottom of the section */}
      <div
        aria-hidden
        className="ticker relative border-y border-[var(--line)] bg-[var(--bg)]/60 py-2.5 backdrop-blur sm:py-3.5"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {techStack.map((t) => (
                <span key={`${dup}-${t}`} className="flex items-center">
                  <span className="px-5 text-[length:var(--fs-lead)] font-medium tracking-tight text-[var(--muted)] sm:px-8">
                    {t}
                  </span>
                  <span className="size-1 rounded-full bg-[var(--accent)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
