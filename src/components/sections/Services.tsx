import { useState } from 'react'
import { services, type Service } from '../../lib/content'
import { cn } from '../../lib/utils'
import { SpotlightCard } from '../fx/SpotlightCard'
import { Reveal } from '../motion/Reveal'
import { SectionHead } from '../ui/SectionHead'

/** Phones: a tap-to-expand row (titles scan in one screen). sm+: always-open card. */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `service-${index}`

  return (
    <SpotlightCard className="h-full p-[var(--card-pad)] max-sm:rounded-none max-sm:border-0 max-sm:border-b max-sm:px-0 max-sm:py-2.5 max-sm:[background:none] max-sm:backdrop-blur-none">
      <h3 className="t-h3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-baseline gap-2.5 text-left sm:block sm:cursor-default"
        >
          <span className="t-mono text-[var(--accent)] sm:mb-2 sm:block">{String(index + 1).padStart(2, '0')}</span>
          <span className="flex-1">{service.title}</span>
          <span aria-hidden className="text-[var(--accent)] sm:hidden">
            {open ? '−' : '+'}
          </span>
        </button>
      </h3>
      <p id={panelId} className={cn('t-body mt-1 max-sm:pl-[1.9rem]', !open && 'max-sm:hidden')}>
        {service.description}
      </p>
    </SpotlightCard>
  )
}

export function Services() {
  return (
    <section id="services" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="01"
          label="Services"
          title={
            <>
              Business applications that solve{' '}
              <span className="t-serif text-gradient">operational problems</span>
            </>
          }
        />

        <Reveal>
          <p className="t-body mb-[clamp(0.9rem,0.6rem+1.6vw,2rem)] max-w-[60ch]">
            Each service is scoped around outcomes: launch faster, reduce manual work, improve visibility, and build
            software your team can trust.
          </p>
        </Reveal>

        <div className="grid border-t border-[var(--line)] sm:grid-cols-2 sm:gap-[var(--gap)] sm:border-t-0 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.05} y={16}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
