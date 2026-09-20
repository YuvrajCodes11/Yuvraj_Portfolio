import { processSteps } from '../../lib/content'
import { Reveal } from '../motion/Reveal'
import { SectionHead } from '../ui/SectionHead'

export function Process() {
  return (
    <section id="process" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="04"
          label="Process"
          title={
            <>
              From idea to <span className="t-serif text-gradient">shipped product</span>
            </>
          }
        />

        <ol className="grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 3) * 0.06} y={14}>
              <li className="flex gap-3 border-b border-[var(--line)] py-[clamp(0.75rem,0.5rem+1vw,1.5rem)] sm:pr-6">
                <span className="t-serif w-8 shrink-0 text-[clamp(1.4rem,1.1rem+1vw,2.2rem)] leading-none text-[var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="t-body mt-0.5">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
