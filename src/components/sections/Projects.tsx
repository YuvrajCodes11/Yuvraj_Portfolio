import { useCallback, useState } from 'react'
import { m } from 'framer-motion'
import { projects, type Project } from '../../lib/content'
import { cn } from '../../lib/utils'
import { SpotlightCard } from '../fx/SpotlightCard'
import { Reveal } from '../motion/Reveal'
import { ProjectDialog } from '../ui/ProjectDialog'
import { SectionHead } from '../ui/SectionHead'

function ProjectVisual({ project, tall }: { project: Project; tall: boolean }) {
  const hue = Number(project.index) % 2 === 1 ? 'var(--accent)' : 'var(--accent-2)'
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-[calc(var(--radius)-8px)] border border-[var(--line)]',
        tall ? 'h-[clamp(6rem,12vw,14rem)]' : 'h-[clamp(4.75rem,7vw,8.5rem)]',
      )}
      style={{
        background: `radial-gradient(120% 140% at 85% 0%, color-mix(in srgb, ${hue} 38%, transparent), transparent 60%), radial-gradient(90% 100% at 0% 100%, color-mix(in srgb, ${hue} 14%, transparent), transparent 70%), rgb(255 255 255 / 0.02)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(180deg, #000, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000, transparent 90%)',
        }}
      />
      <span
        className="t-serif absolute -bottom-[0.18em] right-3 select-none text-[clamp(4rem,8vw,8.5rem)] leading-none text-transparent"
        style={{ WebkitTextStroke: '1px rgb(242 240 234 / 0.35)' }}
      >
        {project.index}
      </span>
    </div>
  )
}

/** Bento spans: two lead cards, then rows of three; a short last row stretches to fill the width. */
function spanFor(i: number, total: number): string {
  if (i === 0) return 'md:col-span-7'
  if (i === 1) return 'md:col-span-5'
  const rest = total - 2
  const lastRow = rest % 3
  const inLastRow = lastRow !== 0 && i >= total - lastRow
  if (inLastRow) return lastRow === 1 ? 'md:col-span-12' : 'md:col-span-6'
  return 'md:col-span-4'
}

function ProjectCard({
  project,
  i,
  total,
  onOpen,
}: {
  project: Project
  i: number
  total: number
  onOpen: (p: Project) => void
}) {
  const lead = i === 0
  return (
    <m.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'w-[80vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none',
        spanFor(i, total),
      )}
    >
      <SpotlightCard
        className="flex h-full cursor-pointer flex-col gap-[clamp(0.6rem,0.4rem+0.7vw,1.15rem)] p-[var(--card-pad)]"
        onClick={() => onOpen(project)}
        data-cursor="Open"
      >
        <ProjectVisual project={project} tall={lead} />

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="t-mono">{project.category}</span>
          {project.status ? (
            <span className="chip">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              {project.status}
            </span>
          ) : null}
        </div>

        <div>
          <h3 className={cn('t-h3', lead && 'md:text-[length:var(--fs-h2)] md:leading-none')}>{project.title}</h3>
          <p className="t-body mt-1 max-w-[52ch] leading-snug">{project.subtitle}</p>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, lead ? 6 : 4).map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
          {project.stack.length > (lead ? 6 : 4) ? (
            <li className="chip">+{project.stack.length - (lead ? 6 : 4)}</li>
          ) : null}
        </ul>

        <button
          type="button"
          className="t-mono mt-auto flex items-center justify-between gap-2 border-t border-[var(--line)] pt-2.5 text-left text-[var(--accent)]"
          aria-label={`Open ${project.title} case study`}
        >
          <span>Case study</span>
          <span aria-hidden>+</span>
        </button>
      </SpotlightCard>
    </m.article>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="work" className="section-y relative">
      <div className="container-x">
        <SectionHead
          index="02"
          label="Featured case studies"
          title={
            <>
              Built like <span className="t-serif text-gradient">products</span>, not code samples
            </>
          }
          aside={<p className="t-mono">{String(projects.length).padStart(2, '0')} projects</p>}
        />
      </div>

      {/* Mobile: swipeable snap rail (saves vertical scroll). md+: bento grid. Full details open in a sheet. */}
      <div className="container-x">
        <div className="snap-rail -mx-[var(--gutter)] flex scroll-px-[var(--gutter)] snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-12 md:overflow-visible md:px-0 md:pb-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} total={projects.length} onOpen={setOpen} />
          ))}
        </div>
        <Reveal className="mt-3 md:hidden">
          <p className="t-mono text-center">Swipe · tap a card for the full case study</p>
        </Reveal>
      </div>

      <ProjectDialog project={open} onClose={close} />
    </section>
  )
}
