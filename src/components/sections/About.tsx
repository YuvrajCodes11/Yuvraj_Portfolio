import { profile } from '../../lib/content'
import { HoloCard } from '../fx/HoloCard'
import { Reveal } from '../motion/Reveal'
import { SectionHead } from '../ui/SectionHead'

const FACTS: Array<{ k: string; v: string; href?: string; download?: boolean }> = [
  { k: 'Based in', v: profile.location },
  { k: 'Focus', v: 'SaaS, dashboards, APIs' },
  { k: 'Status', v: 'Open to freelance' },
  { k: 'Resume', v: 'Download PDF', href: profile.resumeUrl, download: true },
]

export function About() {
  return (
    <section id="about" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="03"
          label="About"
          title={
            <>
              A dependable build partner for{' '}
              <span className="t-serif text-gradient">long-term products</span>
            </>
          }
        />

        <div className="grid items-start gap-[clamp(1.5rem,1rem+3vw,4.5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Reveal>
              <p className="t-lead max-w-[46ch] text-[var(--fg)]">{profile.bio}</p>
            </Reveal>
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <p className="t-body mt-2.5 max-w-[56ch] sm:mt-3.5">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <dl className="mt-[clamp(1rem,0.7rem+1.6vw,2.25rem)] grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--line)] pt-3 sm:gap-y-4 sm:pt-4">
                {FACTS.map((f) => (
                  <div key={f.k}>
                    <dt className="t-mono">{f.k}</dt>
                    <dd className="mt-0.5 text-[length:var(--fs-body)] font-medium leading-snug tracking-tight">
                      {f.href ? (
                        <a
                          href={f.href}
                          download={f.download}
                          className="text-[var(--accent)] underline-offset-4 hover:underline"
                        >
                          {f.v} ↓
                        </a>
                      ) : (
                        f.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={30}>
            <HoloCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
