import { useMemo, useState } from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import { CursorFX } from './components/fx/CursorFX'
import { Preloader } from './components/fx/Preloader'
import { ScrollProgress } from './components/fx/ScrollProgress'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Metrics } from './components/sections/Metrics'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Stack } from './components/sections/Stack'
import { useLenis } from './hooks/useLenis'
import { profile, services, techStack } from './lib/content'
import { IntroContext } from './lib/intro'

/** Animation features are fetched as a separate chunk, after first paint. */
const loadFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Person', 'SoftwareApplication'],
          '@id': `${profile.canonicalUrl}/#person`,
          name: profile.name,
          alternateName: ['Yuvraj', 'YuvrajCodes', 'YuvrajCodes11', 'Yuvraj Singh Sidhu'],
          url: profile.canonicalUrl,
          image: `${profile.canonicalUrl}/og.png`,
          jobTitle: profile.role,
          description:
            'Full-Stack Software Engineer specializing in modern web applications, distributed backend systems, and SaaS architecture.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chandigarh',
            addressRegion: 'Punjab',
            addressCountry: 'IN',
          },
          knowsAbout: techStack,
          sameAs: [
            'https://github.com/yuvrajcodes',
            profile.github,
            'https://x.com/yuvrajcodes',
            profile.x,
            profile.linkedin,
          ],
          offers: services.map((s) => ({ '@type': 'Service', name: s.title, description: s.description })),
        },
        {
          '@type': 'WebSite',
          '@id': `${profile.canonicalUrl}/#website`,
          url: profile.canonicalUrl,
          name: 'Yuvraj Sidhu - Official Portfolio',
          publisher: { '@id': `${profile.canonicalUrl}/#person` },
        },
      ],
    }),
    [],
  )

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <IntroContext.Provider value={ready}>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
          <Preloader onReveal={() => setReady(true)} />
          <ScrollProgress />
          <CursorFX />
          <Nav />
          <main>
            <Hero />
            <Metrics />
            <Services />
            <Projects />
            <About />
            <Process />
            <Stack />
            <Contact />
          </main>
          <Footer />
        </IntroContext.Provider>
      </MotionConfig>
    </LazyMotion>
  )
}
