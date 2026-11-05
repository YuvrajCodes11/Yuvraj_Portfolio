import { metrics } from '../../lib/content'
import { Reveal } from '../motion/Reveal'
import { CountUp } from '../ui/CountUp'

export function Metrics() {
  return (
    <section aria-label="Trust indicators" className="pt-[clamp(1.25rem,0.6rem+3vw,3.5rem)] pb-[clamp(1rem,0.5rem+2vw,2.5rem)]">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={[
                  'relative px-4 first:pl-0 last:pr-0 md:px-8',
                  // right border between items (mobile: every other, desktop: all except last)
                  i % 2 === 0 && i !== metrics.length - 1 ? 'border-r border-[var(--line)] md:border-r-0' : '',
                  i > 0 && i < metrics.length ? 'md:border-l md:border-[var(--line)]' : '',
                ].join(' ')}
              >
                <dd className="t-serif text-[clamp(2.4rem,1.5rem+3.5vw,4.5rem)] leading-none tracking-tight text-[var(--fg)]">
                  <CountUp to={m.value} suffix={m.suffix} />
                </dd>
                <dt className="mt-2 text-[length:var(--fs-body)] font-semibold leading-tight tracking-tight text-[var(--fg)]">
                  {m.label}
                </dt>
                <p className="t-mono mt-1 hidden sm:block text-[var(--accent)]/70">{m.note}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
