import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import type { Project } from '../../lib/content'
import { lockScroll } from '../../lib/scroll'
import { ButtonLink } from './ButtonLink'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="t-mono mb-1.5 text-[var(--accent)]">{title}</h4>
      {children}
    </section>
  )
}

function Panel({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    lockScroll(true)
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <m.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        data-lenis-prevent
        className="glass relative flex max-h-[88svh] w-full max-w-3xl flex-col rounded-b-none md:rounded-b-[var(--radius)]"
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] p-[var(--card-pad)] pb-3">
          <div className="min-w-0">
            <p className="t-mono flex flex-wrap items-center gap-x-2">
              <span className="text-[var(--accent)]">{project.index}</span>
              {project.category}
              {project.status ? <span className="chip ml-1">{project.status}</span> : null}
            </p>
            <h3 id="project-dialog-title" className="t-h2 mt-1.5 text-[length:clamp(1.5rem,1.1rem+1.8vw,2.6rem)]">
              {project.title}
            </h3>
            <p className="t-body mt-1">{project.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="glass glass-pill flex size-9 shrink-0 items-center justify-center text-[var(--fg)]"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="m3 3 10 10M13 3 3 13" />
            </svg>
          </button>
        </div>

        <div className="space-y-[clamp(0.85rem,0.6rem+1vw,1.5rem)] overflow-y-auto overscroll-contain p-[var(--card-pad)]">
          {project.overview ? <p className="t-lead text-[var(--fg)]">{project.overview}</p> : null}

          {project.problem || project.solution ? (
            <div className="grid gap-[clamp(0.85rem,0.6rem+1vw,1.5rem)] md:grid-cols-2">
              {project.problem ? (
                <Block title="Business problem">
                  <p className="t-body">{project.problem}</p>
                </Block>
              ) : null}
              {project.solution ? (
                <Block title="Solution">
                  <p className="t-body">{project.solution}</p>
                </Block>
              ) : null}
            </div>
          ) : null}

          {project.features?.length ? (
            <Block title="Key features">
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li key={f} className="t-body flex gap-2 leading-snug">
                    <span aria-hidden className="mt-[0.5em] size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {project.results?.length ? (
            <Block title="Results">
              <ul className="space-y-1.5">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="rounded-lg border border-[var(--line)] bg-white/[0.03] px-3 py-1.5 text-[length:var(--fs-body)] leading-snug text-[var(--fg)]"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {project.liveUrl || project.githubUrl ? (
          <div className="flex flex-wrap gap-2 border-t border-[var(--line)] p-[var(--card-pad)] pt-3 pb-[max(var(--card-pad),env(safe-area-inset-bottom))]">
            {project.liveUrl ? <ButtonLink href={project.liveUrl}>Live demo</ButtonLink> : null}
            {project.githubUrl ? (
              <ButtonLink href={project.githubUrl} variant="ghost">
                GitHub
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </m.div>
    </div>
  )
}

/** Case-study sheet: bottom sheet on mobile, centred dialog from md up. Rendered in a portal so transformed ancestors cannot break `fixed`. */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>{project ? <Panel key={project.id} project={project} onClose={onClose} /> : null}</AnimatePresence>,
    document.body,
  )
}
