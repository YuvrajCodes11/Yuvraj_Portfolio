import { metrics } from '../../lib/content'
import { Reveal } from '../motion/Reveal'
import { CountUp } from '../ui/CountUp'

export function Metrics() {
  return (
    <section aria-label="Trust indicators" className="pt-[clamp(1.25rem,0.6rem+3vw,3.5rem)]">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-4 md:grid-cols-4 md:gap-y-0">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`px-3 first:pl-0 md:px-6 ${i % 2 === 1 ? 'border-l border-[var(--line)]' : ''} ${
                  i > 0 ? 'md:border-l md:border-[var(--line)]' : ''
                } ${i === 2 ? 'md:pl-6' : ''}`}
              >
                <dd className="t-serif text-[clamp(2rem,1.3rem+3vw,4rem)] leading-none text-[var(--fg)]">
                  <CountUp to={m.value} suffix={m.suffix} />
                </dd>
                <dt className="mt-1.5 text-[length:var(--fs-body)] font-semibold leading-tight tracking-tight">
                  {m.label}
                </dt>
                <p className="t-mono mt-0.5 hidden sm:block">{m.note}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
