import type { ReactNode } from 'react'
import { scrollToHash } from '../../lib/scroll'
import { cn } from '../../lib/utils'

interface ButtonLinkProps {
  href: string
  variant?: 'primary' | 'ghost'
  cursorLabel?: string
  children: ReactNode
  className?: string
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-[0.95em] shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  )
}

export function ButtonLink({ href, variant = 'primary', cursorLabel, children, className }: ButtonLinkProps) {
  const isHash = href.startsWith('#')
  const isMail = href.startsWith('mailto:')

  return (
    <a
      href={href}
      data-cursor={cursorLabel}
      onClick={
        isHash
          ? (e) => {
              e.preventDefault()
              scrollToHash(href)
            }
          : undefined
      }
      {...(isHash || isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn(
        'group/btn inline-flex items-center gap-2 rounded-full px-[clamp(1rem,0.8rem+0.8vw,1.6rem)] py-[clamp(0.6rem,0.5rem+0.4vw,0.95rem)] text-[length:var(--fs-body)] font-semibold tracking-tight transition-colors duration-300',
        variant === 'primary'
          ? 'bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--fg)]'
          : 'border border-[var(--line)] bg-white/[0.04] text-[var(--fg)] backdrop-blur hover:border-[var(--accent)]/60 hover:bg-white/[0.08]',
        className,
      )}
    >
      {children}
      <Arrow />
    </a>
  )
}
