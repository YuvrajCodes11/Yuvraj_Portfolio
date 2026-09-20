import { createContext, useContext } from 'react'

/** True once the preloader curtain has started lifting (or was skipped). Hero animations wait for this. */
export const IntroContext = createContext<boolean>(false)

export function useIntroReady(): boolean {
  return useContext(IntroContext)
}
