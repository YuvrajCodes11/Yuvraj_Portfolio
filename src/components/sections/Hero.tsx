import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { profile, rotatingWords, techStack } from '../../lib/content'
import { useIntroReady } from '../../lib/intro'
import { ParticleGrid } from '../fx/ParticleGrid'
import { MaskLine, RotatingWord } from '../motion/KineticHeadline'
import { Magnetic } from '../motion/Magnetic'
import { ButtonLink } from '../ui/ButtonLink'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ready = useIntroReady()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient layers: transform-only animation, GPU friendly */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[-12%] top-[8%] h-[46vmax] w-[46vmax] bg-[var(--accent)]/40"
          style={{ animation: 'drift-a 16s ease-in-out infinite alternate' }}
        />
        <div
          className="blob bottom-[-10%] right-[-14%] h-[52vmax] w-[52vmax] bg-[var(--accent-2)]/30"
          style={{ animation: 'drift-b 20s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0">
          <ParticleGrid />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      <m.div
        style={{ y, opacity }}
        className="container-x relative flex flex-1 flex-col justify-center pb-[clamp(1.25rem,3vw,2.5rem)] pt-[clamp(5.25rem,13vw,9rem)]"
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

        <h1 className="t-display [text-wrap:wrap]">
          <MaskLine text="I build" play={ready} delay={0.05} />
          <br />
          <RotatingWord words={rotatingWords} className="t-serif" wordClassName="text-gradient" />
          <br />
          <MaskLine text="for growing businesses." play={ready} delay={0.3} />
        </h1>

        <m.p {...fade(0.75)} className="t-lead mt-[clamp(0.9rem,0.5rem+1.6vw,2rem)] max-w-[42ch]">
          {profile.pitch}
        </m.p>

        <m.div
          {...fade(0.9)}
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
          {...fade(1.05)}
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

      {/* Tech ticker */}
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
