import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Download,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  TECH_STACK,
  TESTIMONIAL_PLACEHOLDERS,
  TRUST_METRICS,
} from './data';

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));
    const counter = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setValue(Math.round(target * Math.min(progress, 1)));
      if (frame >= totalFrames) window.clearInterval(counter);
    }, 16);

    return () => window.clearInterval(counter);
  }, [duration, target]);

  return value;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function MetricCard({ metric }: { metric: (typeof TRUST_METRICS)[number] }) {
  const value = useCountUp(metric.value);

  return (
    <div className="metric-card">
      <span className="metric-value">
        {value}
        {metric.suffix}
      </span>
      <span className="metric-label">{metric.label}</span>
      <span className="metric-note">{metric.note}</span>
    </div>
  );
}

function ProjectScreen({ projectId }: { projectId: string }) {
  const isCommerce = projectId === 'king-queen';
  const rows = isCommerce
    ? ['Order #1084', 'Payment verified', 'Inventory synced', 'Admin notified']
    : ['New community post', 'Trade request accepted', 'Marketplace item saved', 'Message delivered'];

  return (
    <div className="screen-shot" aria-label={`${projectId} product screenshot mockup`}>
      <div className="screen-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="screen-body">
        <div className="screen-sidebar">
          <span className="active" />
          <span />
          <span />
          <span />
        </div>
        <div className="screen-main">
          <div className="screen-kpis">
            <div>
              <strong>{isCommerce ? '₹2.4L' : '12.8K'}</strong>
              <small>{isCommerce ? 'Monthly sales' : 'Platform events'}</small>
            </div>
            <div>
              <strong>{isCommerce ? '94%' : '4.8ms'}</strong>
              <small>{isCommerce ? 'Checkout health' : 'API response'}</small>
            </div>
          </div>
          <div className="screen-chart">
            <i style={{ height: '45%' }} />
            <i style={{ height: '70%' }} />
            <i style={{ height: '58%' }} />
            <i style={{ height: '86%' }} />
            <i style={{ height: '64%' }} />
          </div>
          <div className="screen-list">
            {rows.map((row) => (
              <span key={row}>
                <CheckCircle2 size={14} />
                {row}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      email: PERSONAL_INFO.email,
      jobTitle: PERSONAL_INFO.title,
      url: 'https://yuvrajcodes11.vercel.app',
      sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
      knowsAbout: TECH_STACK,
      offers: SERVICES.map((service) => ({
        '@type': 'Service',
        name: service.title,
        description: service.description,
      })),
    }),
    [],
  );

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection('hero')} aria-label="Go to top">
          <img src={PERSONAL_INFO.avatarUrl} alt="" />
          <span>
            <strong>{PERSONAL_INFO.name}</strong>
            <small>Freelance product developer</small>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => scrollToSection('services')}>Services</button>
          <button onClick={() => scrollToSection('case-studies')}>Case Studies</button>
          <button onClick={() => scrollToSection('process')}>Process</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
        </nav>
        <a className="nav-cta" href={`mailto:${PERSONAL_INFO.email}?subject=Free consultation request`}>
          Book a Call
          <ArrowRight size={16} />
        </a>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-copy">
            <div className="availability-pill">
              <span />
              {PERSONAL_INFO.status}
            </div>
            <h1>Building Scalable SaaS Platforms, Dashboards & Custom Business Applications</h1>
            <p>
              I help businesses replace messy manual work with reliable web products: customer portals,
              admin dashboards, e-commerce systems, API backends, and automation workflows built to launch
              fast and scale cleanly.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToSection('case-studies')}>
                View Case Studies
                <ArrowRight size={18} />
              </button>
              <a className="secondary-btn" href={`mailto:${PERSONAL_INFO.email}?subject=Free consultation request`}>
                Book a Free Consultation
                <Mail size={18} />
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <ShieldCheck size={18} />
                Clean architecture
              </span>
              <span>
                <Clock3 size={18} />
                Clear communication
              </span>
              <span>
                <Rocket size={18} />
                Launch-focused delivery
              </span>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Freelance profile summary">
            <img src={PERSONAL_INFO.avatarUrl} alt={PERSONAL_INFO.name} />
            <div>
              <span className="panel-eyebrow">Available from Chandigarh, India</span>
              <h2>Reliable full-stack build partner for founders and business teams.</h2>
              <p>{PERSONAL_INFO.bio}</p>
            </div>
            <div className="panel-links">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email Yuvraj">
                <Mail size={18} />
              </a>
            </div>
          </aside>
        </section>

        <section className="trust-section" aria-label="Trust indicators">
          {TRUST_METRICS.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
          <div className="availability-card">
            <span />
            <strong>Available for Freelance</strong>
            <small>Taking product builds, dashboards, APIs, and automation projects.</small>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="section-heading">
            <span>Services</span>
            <h2>Business applications that solve operational problems.</h2>
            <p>Each service is scoped around outcomes: launch faster, reduce manual work, improve visibility, and build software your team can trust.</p>
          </div>
          <div className="service-grid">
            {SERVICES.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">
                  {index % 4 === 0 ? <Layers3 /> : index % 4 === 1 ? <BriefcaseBusiness /> : index % 4 === 2 ? <Code2 /> : <Sparkles />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="case-studies" className="section-block">
          <div className="section-heading">
            <span>Featured Case Studies</span>
            <h2>Premium builds presented like products, not code samples.</h2>
            <p>These projects show the kind of business systems I can plan, build, connect, and support.</p>
          </div>
          <div className="case-study-stack">
            {PROJECTS.map((project) => (
              <article className="case-study-card" key={project.id}>
                <div className="case-visual">
                  <ProjectScreen projectId={project.id} />
                </div>
                <div className="case-content">
                  <span className="case-status">{project.status}</span>
                  <h3>{project.title}</h3>
                  <p className="case-subtitle">{project.subtitle}</p>
                  <div className="case-grid">
                    <div>
                      <h4>Business Problem</h4>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <h4>Solution</h4>
                      <p>{project.solution}</p>
                    </div>
                  </div>
                  <div>
                    <h4>Key Features</h4>
                    <ul className="feature-list">
                      {project.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Results</h4>
                    <div className="result-list">
                      {project.results.map((result) => (
                        <span key={result}>{result}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tech-pills">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="case-actions">
                    <a href={project.liveUrl} aria-disabled={project.liveUrl === '#'} onClick={(event) => project.liveUrl === '#' && event.preventDefault()}>
                      Live Demo
                      <ExternalLink size={16} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block split-section">
          <div className="about-card">
            <span>About</span>
            <h2>A dependable build partner for long-term products.</h2>
            <p>
              I focus on reliability, clear communication, clean architecture, and maintainable delivery.
              My goal is to understand the business process first, then build software that is easy to use,
              easy to extend, and stable enough to support real customers or internal teams.
            </p>
            <p>
              You get structured updates, thoughtful technical decisions, scalable foundations, and support
              after launch so your product can keep improving instead of becoming expensive to change.
            </p>
          </div>
          <div className="testimonial-grid" aria-label="Testimonials ready for future client reviews">
            {TESTIMONIAL_PLACEHOLDERS.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.role}>
                <div>
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <strong>{testimonial.name}</strong>
                <small>{testimonial.role}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section-block">
          <div className="section-heading">
            <span>Process</span>
            <h2>A clear path from idea to shipped product.</h2>
          </div>
          <div className="process-grid">
            {PROCESS_STEPS.map(([title, description], index) => (
              <article className="process-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block tech-section">
          <div>
            <span>Tech Stack</span>
            <h2>Modern tools, kept in service of the business goal.</h2>
          </div>
          <div className="tech-pills large">
            {TECH_STACK.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <span>Ready to build?</span>
          <h2>Let's Build Your Next Product</h2>
          <p>
            Send the idea, current problem, or product brief. I will reply with a clear next step,
            practical scope suggestions, and the fastest route to a usable launch.
          </p>
          <div className="contact-actions">
            <a className="primary-btn" href={`mailto:${PERSONAL_INFO.email}?subject=Let's build my next product`}>
              <Mail size={18} />
              {PERSONAL_INFO.email}
            </a>
            <a className="secondary-btn" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a className="secondary-btn" href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a className="secondary-btn" href={PERSONAL_INFO.resumeUrl} download>
              <Download size={18} />
              Resume Download
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
