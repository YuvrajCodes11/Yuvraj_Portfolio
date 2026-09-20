import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'

interface SectionHeadProps {
  index: string
  label: string
  title: ReactNode
  aside?: ReactNode
}

export function SectionHead({ index, label, title, aside }: SectionHeadProps) {
  return (
    <Reveal className="mb-[clamp(1.1rem,0.6rem+2.6vw,3.25rem)] flex items-end justify-between gap-4">
      <div>
        <p className="t-mono mb-[0.6em] flex items-center gap-2">
          <span className="text-[var(--accent)]">{index}</span>
          <span aria-hidden className="h-px w-6 bg-[var(--line)]" />
          {label}
        </p>
        <h2 className="t-h2">{title}</h2>
      </div>
      {aside ? <div className="hidden shrink-0 sm:block">{aside}</div> : null}
    </Reveal>
  )
}
