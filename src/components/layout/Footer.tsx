import { profile } from '../../lib/content'
import { scrollToHash } from '../../lib/scroll'

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-[clamp(1rem,0.6rem+1.4vw,2rem)] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="t-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="t-mono hidden sm:block">{profile.location}</p>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToHash('#top')
          }}
          className="t-mono transition-colors hover:text-[var(--accent)]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
