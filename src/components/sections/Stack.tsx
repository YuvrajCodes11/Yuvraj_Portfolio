import { stackGroups } from '../../lib/content'
import { SpotlightCard } from '../fx/SpotlightCard'
import { Reveal } from '../motion/Reveal'
import { SectionHead } from '../ui/SectionHead'

export function Stack() {
  return (
    <section id="stack" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="05"
          label="Toolbox"
          title={
            <>
              Modern tools, kept in service of the{' '}
              <span className="t-serif text-gradient">business goal</span>
            </>
          }
        />

        <div className="grid grid-cols-2 gap-[var(--gap)] md:grid-cols-3 lg:grid-cols-5">
          {stackGroups.map((g, i) => (
            <Reveal
              key={g.label}
              delay={i * 0.06}
              className={i === stackGroups.length - 1 && stackGroups.length % 2 === 1 ? 'col-span-2 md:col-span-1' : undefined}
            >
              <SpotlightCard className="h-full p-[var(--card-pad)]">
                <p className="t-mono mb-[0.7em] flex items-center gap-2">
                  <span className="text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                  {g.label}
                </p>
                <ul className="space-y-1 sm:space-y-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[length:var(--fs-body)] font-medium leading-snug tracking-tight"
                    >
                      <span aria-hidden className="size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
