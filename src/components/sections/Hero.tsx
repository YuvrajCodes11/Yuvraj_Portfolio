import { useRef } from 'react'
import { m } from 'framer-motion'
import { profile, rotatingWords, techStack } from '../../lib/content'
import { useIntroReady } from '../../lib/intro'
import { MaskLine, RotatingWord } from '../motion/KineticHeadline'
import { Magnetic } from '../motion/Magnetic'
import { ButtonLink } from '../ui/ButtonLink'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ready = useIntroReady()
  const ref = useRef<HTMLElement>(null)

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pt-32 sm:pb-16"
    >
      <div id="top" className="absolute top-0 left-0 pointer-events-none -z-50" />
      <div className="container-x relative z-20 flex flex-1 flex-col justify-center">
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

        <h1 className="relative z-20 block text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--fg)] leading-[1.12]">
          <span className="block leading-[1.12]">
            <MaskLine text="I build" play={ready} delay={0.05} />
          </span>
          <span className="block py-[0.1em] leading-[1.12]">
            <RotatingWord words={rotatingWords} className="t-serif text-gradient font-normal italic" />
          </span>
          <span className="block leading-[1.12]">
            <MaskLine text="for growing businesses." play={ready} delay={0.25} />
          </span>
        </h1>

        <m.p {...fade(0.4)} className="t-lead mt-6 sm:mt-8 max-w-[42ch]">
          {profile.pitch}
        </m.p>

        <m.div
          {...fade(0.55)}
          className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 z-10"
        >
          <Magnetic strength={0.2}>
            <ButtonLink href="#work" cursorLabel="View" className="w-full sm:w-auto justify-center">
              Case studies
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.2}>
            <ButtonLink
              href={`mailto:${profile.email}?subject=Free consultation request`}
              variant="ghost"
              className="w-full sm:w-auto justify-center"
            >
              Free consultation
            </ButtonLink>
          </Magnetic>
        </m.div>

        <m.ul
          {...fade(0.7)}
          className="mt-6 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2"
        >
          {profile.proof.map((p) => (
            <li key={p} className="chip">
              <span aria-hidden className="size-1 rounded-full bg-[var(--accent)]" />
              {p}
            </li>
          ))}
        </m.ul>
      </div>

      {/* Tech ticker */}
      <div
        aria-hidden
        className="ticker relative border-y border-[var(--line)] bg-[var(--bg)]/60 py-2.5 backdrop-blur sm:py-3.5 mt-8"
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
