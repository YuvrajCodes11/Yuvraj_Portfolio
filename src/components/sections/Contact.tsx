import { channels, profile } from '../../lib/content'
import { SpotlightCard } from '../fx/SpotlightCard'
import { Magnetic } from '../motion/Magnetic'
import { Reveal } from '../motion/Reveal'
import { ButtonLink } from '../ui/ButtonLink'
import { SectionHead } from '../ui/SectionHead'

export function Contact() {
  const [primary, ...rest] = channels

  return (
    <section id="contact" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="06"
          label="Ready to build?"
          title={
            <>
              Let&apos;s build your <span className="t-serif text-gradient">next product</span>
            </>
          }
        />

        <Reveal>
          <SpotlightCard className="p-[clamp(1rem,0.6rem+2.4vw,3.5rem)]" data-active="true">
            <div className="grid gap-[clamp(1.1rem,0.9rem+2vw,3rem)] md:grid-cols-[1.15fr_1fr] md:items-end">
              <div>
                <p className="t-lead max-w-[38ch] text-[var(--fg)]">
                  Send the idea, current problem, or product brief. I will reply with a clear next step, practical
                  scope suggestions, and the fastest route to a usable launch.
                </p>
                <div className="mt-[clamp(0.9rem,0.6rem+1.4vw,1.75rem)] flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Magnetic>
                    <ButtonLink href={primary.href} cursorLabel="Email">
                      Email me
                    </ButtonLink>
                  </Magnetic>
                  <span className="t-mono normal-case tracking-normal">{profile.email}</span>
                </div>
              </div>

              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {rest.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      download={c.download}
                      {...(c.download ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group/row flex items-center justify-between gap-3 py-2.5 transition-[padding] duration-300 hover:pl-2 sm:py-3"
                    >
                      <span className="t-mono">{c.label}</span>
                      <span className="flex items-center gap-2 text-[length:var(--fs-body)] font-medium tracking-tight">
                        {c.handle}
                        <span
                          aria-hidden
                          className="text-[var(--accent)] transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                        >
                          {c.download ? '↓' : '↗'}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
