import { useSyncExternalStore } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

function subscribe(cb: () => void): () => void {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** True on devices with a real hover-capable pointer (mouse / trackpad). */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
