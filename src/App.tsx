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
            'High-agency full-stack software engineer & web architect specializing in scalable SaaS, custom CRM/ERP platforms, high-throughput APIs, and modern cloud web applications.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chandigarh',
            addressRegion: 'Punjab',
            addressCountry: 'IN',
          },
          knowsAbout: techStack,
          sameAs: [
            'https://github.com/YuvrajCodes11',
            'https://github.com/yuvrajcodes',
            profile.x,
            'https://x.com/yuvrajcodes',
            profile.linkedin,
          ],
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${profile.canonicalUrl}/#service`,
          name: 'Yuvraj Sidhu — Full-Stack Software Engineering, SaaS & IT Consulting',
          url: profile.canonicalUrl,
          image: `${profile.canonicalUrl}/og.png`,
          email: profile.email,
          priceRange: '$$$',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chandigarh',
            addressRegion: 'Punjab',
            addressCountry: 'IN',
          },
          areaServed: ['US', 'GB', 'CA', 'AU', 'EU', 'IN', 'Worldwide'],
          provider: { '@id': `${profile.canonicalUrl}/#person` },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Software Engineering & Architecture Services',
            itemListElement: services.map((s) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
              },
            })),
          },
        },
        {
          '@type': 'ItemList',
          '@id': `${profile.canonicalUrl}/#projects`,
          name: 'Featured Production Projects & Case Studies by Yuvraj Sidhu',
          itemListElement: [
            {
              '@type': 'CreativeWork',
              position: 1,
              name: 'AC Management App',
              headline: 'Air Conditioning Services ERP & Operations System',
              url: 'https://ac-management-webapp.onrender.com',
              description: 'Enterprise operations ERP system with role-based portals for CEOs, managers, and service technicians to manage bookings, inventory, and AMC renewals.',
            },
            {
              '@type': 'CreativeWork',
              position: 2,
              name: 'BLUE',
              headline: 'Ocean Intelligence & Livelihood Ecosystem',
              url: 'https://blue-black-gamma.vercel.app/',
              description: 'Unified marine intelligence portal for fisheries, Beach Management Units (BMUs), and ocean conservation agencies.',
            },
            {
              '@type': 'CreativeWork',
              position: 3,
              name: 'The Tokyo Archive',
              headline: 'Marc Jacobs Tokyo Capsule Collection & Interactive Experience',
              url: 'https://the-tokyo-archive.vercel.app/',
              description: 'Interactive graphic-novel narrative experience showcasing 300 limited capsule release pieces with custom typography and GSAP animations.',
            },
            {
              '@type': 'CreativeWork',
              position: 4,
              name: 'A King & A Queen',
              headline: 'Premium Fashion E-Commerce Platform',
              url: 'https://e-commerce-iota-smoky.vercel.app/',
              description: 'Full-scale luxury fashion e-commerce storefront with dynamic catalogs, cart/checkout flows, and order management.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${profile.canonicalUrl}/#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I hire Yuvraj Sidhu for a freelance project, MVP build, or contract role?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can reach out directly via email at yuvrajcodes11@gmail.com or via X (@Yuvraj_S11). We start with a scoping discovery call or async review to define your project architecture, milestone schedule, and delivery timeline.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the typical timeline and process for an MVP or SaaS build?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most MVP platforms and custom business systems are delivered in fast 2 to 4-week sprint cycles. The process spans Discovery, Architecture Planning, Modular Full-Stack Development, Rigorous Testing, and Production Deployment.',
              },
            },
            {
              '@type': 'Question',
              name: 'Which technical stacks and backend frameworks does Yuvraj Sidhu specialize in?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yuvraj specializes in modern frontend web technologies (Next.js, React, TypeScript, Tailwind CSS), enterprise backends (Java, Spring Boot, Python, Django, Node.js), native mobile (Swift, SwiftUI), and production databases (PostgreSQL, Supabase, MySQL).',
              },
            },
            {
              '@type': 'Question',
              name: 'Does Yuvraj Sidhu collaborate with international clients across different time zones?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Yuvraj partners with startup founders, product leaders, and enterprises across the US, UK, Europe, Australia, and Canada, utilizing structured async progress updates and scheduled coordination syncs.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can Yuvraj Sidhu build custom CRM systems, ERPs, and internal admin dashboards?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Yuvraj has engineered full-scale service ERPs, role-based executive portals (CEO/Manager/Technician), inventory and dispatch tracking tools, and custom business management software from the ground up.',
              },
            },
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${profile.canonicalUrl}/#website`,
          url: profile.canonicalUrl,
          name: 'Yuvraj Sidhu - Official Portfolio & Software Engineering',
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
