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
    <Reveal className="mb-[clamp(1.4rem,0.8rem+2.6vw,3.5rem)] flex items-end justify-between gap-4">
      <div>
        <p className="t-mono mb-[0.75em] flex items-center gap-2.5">
          <span
            className="text-[var(--accent)] font-bold"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {index}
          </span>
          <span aria-hidden className="h-px w-8 bg-[var(--line)]" />
          <span className="uppercase tracking-widest">{label}</span>
        </p>
        <h2 className="t-h2">{title}</h2>
      </div>
      {aside ? <div className="hidden shrink-0 sm:block">{aside}</div> : null}
    </Reveal>
  )
}
