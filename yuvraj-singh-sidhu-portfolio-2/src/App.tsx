import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import HeroSection from './components/HeroSection';
import NexusSection from './components/NexusSection';
import ChroniclesSection from './components/ChroniclesSection';
import ServicesSection from './components/ServicesSection';
import TerminalSection from './components/TerminalSection';
import ParticleCanvas from './components/ParticleCanvas';
import MatrixCanvas from './components/MatrixCanvas';
import BioLinkModal from './components/BioLinkModal';
import { TerminalLog } from './types';
import { INITIAL_LOGS_DATA, PERSONAL_INFO } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [matrixActive, setMatrixActive] = useState<boolean>(false);
  const [bioModalOpen, setBioModalOpen] = useState<boolean>(false);
  
  // Coordinated Telemetry Log state
  const [logs, setLogs] = useState<TerminalLog[]>(() => {
    return INITIAL_LOGS_DATA.map(tag => ({
      timestamp: tag.timestamp,
      type: tag.type as any,
      message: tag.message
    }));
  });

  const handleAddLog = useCallback((type: 'system' | 'success' | 'warning' | 'info', message: string) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { timestamp: timeStr, type, message }]);
  }, []);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Log navigation actions
  useEffect(() => {
    const uppercaseTab = activeTab.toUpperCase();
    handleAddLog('info', `NAVIGATING: Client routing node updated to routing hash: [${uppercaseTab}]`);
  }, [activeTab, handleAddLog]);

  // Connect Button handler (switches to terminal & logs progress)
  const handleConnectClick = useCallback(() => {
    setActiveTab('terminal');
    handleAddLog('info', 'TRIGGERED CONNECT: Action received from navigation header. Booting message socket.');
  }, [handleAddLog]);

  // Download manifest CV simulator
  const handleDownloadManifest = useCallback(() => {
    handleAddLog('info', 'PREPARING CV: Compiling professional developer profile details...');
    
    setTimeout(() => {
      const manifestContent = `
======================================================================
                     YUVRAJ SINGH SIDHU
======================================================================
  Location: Chandigarh, India
  Email:    yuvrajcodes11@gmail.com
  LinkedIn: www.linkedin.com/in/yuvraj-singh-sidhu-86b961385
----------------------------------------------------------------------

PROFESSIONAL SUMMARY:
  Full-Stack Developer with 1.5 years of hands-on experience building
  scalable web applications, social networking platforms, e-commerce
  solutions, REST APIs, and database-driven systems. Experienced in
  Java Spring Boot development, MERN Stack technologies, secure authentication
  architectures, and Postgres/MySQL backend frameworks. Skilled at
  designing, developing, and deploying complete software solutions from
  concept to production.

TECHNICAL SKILLS:
  - Frontend:  HTML5, CSS3, JavaScript (ES6+), React.js, Next.js,
               Tailwind CSS, Responsive Web Design
  - Backend:   Java, Spring Boot, Core Java, REST API Development,
               Node.js, Express.js
  - Databases: Supabase, PostgreSQL, MySQL, MongoDB
  - Developer Tools: Git, GitHub, Postman, Railway, Netlify, Vercel,
               VS Code, IntelliJ IDEA

PROJECTS:
  1. MintyNex (Social Networking, Marketplace & Trading Ecosystem)
     - Core Pokemon TCG platform integrating advanced social feed layers,
       grid collection binders, geographic discovery, and secure trading.
     - Crafted multi-tiered authentication schemas via Supabase and Spring Boot.
     - Implemented real-time interactive notification systems and 1-to-1 chat corridors.
     - Engineered trade escrow workflow rules with strict step transitions.
     - Stack: React, Java, Spring Boot, Supabase, PostgreSQL, Railway

  2. A King & A Queen (Premium Fashion E-Commerce Platform)
     - Luxury fashion store featuring elegant custom lookbooks, fluid carts,
       secure customer gateway workflows, and live store analytics.
     - Stack: React.js, JavaScript, Java, Spring Boot, MySQL, Supabase, CSS3

EXPERIENCE:
  Freelance Full-Stack Developer | 2024 - Present
  - Designed scalable backend rest architectures using Java & Spring Boot.
  - Linked fast frontend interfaces to secure transactional database frameworks.
  - Implemented secure authorization policies (Supabase Auth / Session logs).
  - Managed smooth deploy integrations across Railway, Netlify, and Vercel.

CORE COMPETENCIES:
  - Full-Stack Development & Clean Architecture
  - Relational & Non-relational Database Design
  - Secured Microservices & Authentication Systems
  - Performance Optimization & Code modularization

LANGUAGES:
  - English, Punjabi, Hindi
======================================================================
                    PORTFOLIO DOCUMENT GENERATION COMPLETE
======================================================================
      `;
      
      const element = document.createElement("a");
      const file = new Blob([manifestContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "YUVRAJ_SINGH_SIDHU_RESUME.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      handleAddLog('success', 'PROFILE DOWNLOAD COMPLETE: Professional text resume downloaded successfully.');
    }, 1200);
  }, [handleAddLog]);

  return (
    <div id="application-root-container" className="min-h-screen bg-art-bg font-serif text-art-text flex flex-col relative overflow-hidden">
      
      {/* Background Ambience canvas switcher */}
      {matrixActive ? (
        <MatrixCanvas />
      ) : (
        <ParticleCanvas />
      )}

      {/* Decorative light artistic haze overlay */}
      <div className="absolute inset-0 z-0 bg-art-bg/40 pointer-events-none h-full w-full" />

      {/* Navigation Header */}
      <TopNavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onConnectClick={handleConnectClick} 
      />

      {/* Main Structural dashboard Wrapper */}
      <div id="dashboard-wrapper" className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row relative z-10">
        
        {/* Core Side Navigation rail */}
        <SideNavBar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          matrixActive={matrixActive}
          setMatrixActive={setMatrixActive}
          onBioLinkClick={() => setBioModalOpen(true)}
        />

        {/* Primary view content display slot */}
        <main id="primary-viewport" className="flex-1 px-4 py-6 sm:px-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-8rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'hero' && (
                <HeroSection 
                  setActiveTab={setActiveTab} 
                  onBioLinkClick={() => setBioModalOpen(true)} 
                />
              )}
              {activeTab === 'nexus' && (
                <NexusSection 
                  onAddLog={handleAddLog} 
                />
              )}
              {activeTab === 'chronicles' && (
                <ChroniclesSection 
                  onAddLog={handleAddLog} 
                />
              )}
              {activeTab === 'services' && (
                <ServicesSection 
                  setActiveTab={setActiveTab}
                  onAddLog={handleAddLog} 
                />
              )}
              {activeTab === 'terminal' && (
                <TerminalSection 
                  logs={logs}
                  onAddLog={handleAddLog} 
                  onClearLogs={handleClearLogs}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Bio Links tree floating modal drawer */}
      <BioLinkModal 
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        onDownloadManifest={handleDownloadManifest}
      />
    </div>
  );
}
