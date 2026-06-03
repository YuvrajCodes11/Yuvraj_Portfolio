import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Database, Layers, Code, Cloud, ShieldAlert,
  Download, Activity, Terminal as TermIcon, Server, Zap
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_NODES, TECHNICAL_GRID } from '../data';
import { SkillNode } from '../types';

interface NexusSectionProps {
  onAddLog: (type: 'system' | 'success' | 'warning' | 'info', msg: string) => void;
}

export default function NexusSection({ onAddLog }: NexusSectionProps) {
  // Constellation State
  const [angles, setAngles] = useState<number[]>(SKILL_NODES.map(n => n.angle));
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(SKILL_NODES[0]);
  
  // Latency & CPU load simulation state
  const [latencyHistory, setLatencyHistory] = useState<number[]>([12, 11, 13, 12, 12, 14, 11, 12, 12, 13, 12, 12]);
  const [cpuLoad, setCpuLoad] = useState<number>(37);
  const [activeTab, setActiveTab2] = useState<'bio' | 'stats'>('bio');

  // Animation Loop for tech galaxy orbit
  useEffect(() => {
    let frameId: number;

    const tick = () => {
      setAngles(prevAngles => 
        prevAngles.map((angle, idx) => {
          const node = SKILL_NODES[idx];
          return (angle + node.speed * 85) % 360;
        })
      );
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // CPU Load fluctuate simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 15) + 32); // fluctuating between 32% and 47%
      setLatencyHistory(prev => {
        const nextVal = (Math.random() * 4 + 10); // around 12ms
        const nextList = prev.slice(1);
        nextList.push(Number(nextVal.toFixed(1)));
        return nextList;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Icon switcher helper
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="h-4 w-4" />;
      case 'Database': return <Database className="h-4 w-4" />;
      case 'Layers': return <Layers className="h-4 w-4" />;
      case 'Code': return <Code className="h-4 w-4" />;
      case 'Cloud': return <Cloud className="h-4 w-4" />;
      default: return <ShieldAlert className="h-4 w-4" />;
    }
  };

  const handleDownloadManifest = () => {
    onAddLog('info', 'PREPARING CV: Compiling professional developer profile details...');
    
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
      onAddLog('success', 'PROFILE DOWNLOAD COMPLETE: Professional text resume downloaded successfully.');
    }, 1200);
  };

  return (
    <section id="nexus-about" className="space-y-8 py-4 font-serif text-art-text">
      {/* Dynamic Grid Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-art-beige-mid pb-4">
        <div>
          <span className="font-mono text-art-charcoal/65 text-[10px] uppercase tracking-widest font-bold">[SKILLS GALAXY]</span>
          <h2 className="font-serif text-3xl font-extrabold text-art-charcoal tracking-tight uppercase mt-1">Skills & Technical Expertise</h2>
        </div>
        <div className="mt-2 md:mt-0 font-mono text-[11px] text-art-charcoal/50">
          LOCATION: <span className="text-art-charcoal uppercase font-bold">{PERSONAL_INFO.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (7 COLS): Terminal Bio, Logs, Orbits */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Terminal Bio Tab / Grid Panel */}
          <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 overflow-hidden relative shadow-sm">
            <div className="flex items-center justify-between border-b border-art-beige-mid bg-art-beige-light/35 px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-art-charcoal/70" />
                  <span className="h-2 w-2 rounded-full bg-art-beige-dark" />
                  <span className="h-2 w-2 rounded-full bg-art-beige-mid" />
                </div>
                <span className="font-mono text-[9px] text-art-charcoal/50 uppercase tracking-widest pl-2">ABOUT_ME // PROFILE</span>
              </div>
              <div className="flex space-x-1 font-mono text-[10px]">
                <button 
                  onClick={() => setActiveTab2('bio')}
                  className={`px-3 py-1 rounded-sm text-[10px] transition-all cursor-pointer ${activeTab === 'bio' ? 'bg-art-charcoal text-art-bg font-semibold' : 'text-art-charcoal/50 hover:text-art-charcoal'}`}
                >
                  BIO
                </button>
                <button 
                  onClick={() => setActiveTab2('stats')}
                  className={`px-3 py-1 rounded-sm text-[10px] transition-all cursor-pointer ${activeTab === 'stats' ? 'bg-art-charcoal text-art-bg font-semibold' : 'text-art-charcoal/50 hover:text-art-charcoal'}`}
                >
                  SYSTEM_STATUS
                </button>
              </div>
            </div>

            <div className="p-5 font-mono text-xs text-art-charcoal/85 leading-relaxed min-h-[160px]">
              {activeTab === 'bio' ? (
                <div className="space-y-4 font-serif">
                  <p className="font-mono text-xs">&gt; <span className="text-art-charcoal font-semibold">{PERSONAL_INFO.title}</span></p>
                  <p className="text-[14px] leading-relaxed text-art-charcoal/80 select-all font-serif">{PERSONAL_INFO.bio}</p>
                  <div className="flex flex-wrap gap-3 pt-2 font-sans">
                    <button 
                      onClick={handleDownloadManifest}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold tracking-wider border border-art-charcoal bg-art-charcoal text-art-bg hover:bg-transparent hover:text-art-charcoal transition-colors duration-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>DOWNLOAD RESUME</span>
                    </button>
                    <button 
                      onClick={() => onAddLog('info', 'DIAGNOSTIC TRACE: CPU state stable. Core layers optimized.')}
                      className="flex items-center space-x-1.5 px-3 py-1.5 border border-art-beige-dark bg-art-beige-light/40 hover:bg-art-beige-light text-art-charcoal text-xs font-medium transition"
                    >
                      <TermIcon className="h-3.5 w-3.5 text-art-charcoal/70" />
                      <span>RUN_DIAGNOSTIC_CHECK</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 font-serif">
                  <div className="flex items-center space-x-3 p-3 rounded-sm border border-art-beige-mid bg-art-beige-light/20">
                    <Server className="h-7 w-7 text-art-charcoal/60" />
                    <div>
                      <div className="text-[9px] font-mono text-art-charcoal/40 uppercase">DEPLOYMENT CLOUD</div>
                      <div className="text-sm font-semibold text-art-charcoal">RAILWAY & NETLIFY</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-sm border border-art-beige-mid bg-art-beige-light/20">
                    <Zap className="h-7 w-7 text-art-charcoal/60" />
                    <div>
                      <div className="text-[9px] font-mono text-art-charcoal/40 uppercase">ENGINE GRAPHICS</div>
                      <div className="text-sm font-semibold text-art-charcoal">V8 ENGINE</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-sm border border-art-beige-mid bg-art-beige-light/20">
                    <Activity className="h-7 w-7 text-art-charcoal/60" />
                    <div>
                      <div className="text-[9px] font-mono text-art-charcoal/40 uppercase">CONCURRENCY LEVEL</div>
                      <div className="text-sm font-semibold text-art-charcoal">JAVA MULTITHREADS</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-sm border border-art-beige-mid bg-art-beige-light/20">
                    <Cpu className="h-7 w-7 text-art-charcoal/60" />
                    <div>
                      <div className="text-[9px] font-mono text-art-charcoal/40 uppercase">ARCHITECTURE TYPE</div>
                      <div className="text-sm font-semibold text-art-charcoal">MODULAR APPS</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orbit Constellation Galaxy Map */}
          <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <div className="absolute top-4 left-4 font-mono text-[9px] text-art-charcoal/50 uppercase tracking-widest">[INTERACTIVE_SKILLS_GRAPH]</div>
            
            {/* Center Node + Orbital Paths Display */}
            <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center my-6">
              
              {/* Central Core */}
              <div 
                onClick={() => setSelectedSkill(null)}
                className="absolute z-20 h-16 w-16 rounded-full border border-art-charcoal bg-art-beige-light flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-art-charcoal hover:border-art-charcoal hover:text-art-bg transition-colors duration-300"
              >
                <Cpu className="h-5 w-5 text-art-charcoal group-hover:text-art-bg group-hover:scale-110 transition duration-300" />
                <span className="font-mono text-[8px] text-art-charcoal/80 group-hover:text-art-bg font-bold uppercase mt-1 tracking-wider">CORE</span>
              </div>

              {/* Orbit SVG Ring lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {SKILL_NODES.map((node, idx) => {
                  const radius = node.radius * 0.95;
                  return (
                    <g key={node.id}>
                      <circle 
                        cx="200" 
                        cy="200" 
                        r={radius} 
                        fill="none" 
                        stroke="rgba(191, 188, 179, 0.65)" 
                        strokeWidth="1" 
                        strokeDasharray="3 6"
                      />
                      {/* Connection radial lines */}
                      {selectedSkill?.id === node.id && (
                        <line 
                          x1="200" 
                          y1="200" 
                          x2={(200 + radius * Math.cos((angles[idx] * Math.PI) / 180)).toString()} 
                          y2={(200 + radius * Math.sin((angles[idx] * Math.PI) / 180)).toString()} 
                          stroke="rgba(42, 42, 42, 0.45)" 
                          strokeWidth="1.2"
                          strokeDasharray="2 2"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Orbiting Tech Nodes */}
              {SKILL_NODES.map((node, idx) => {
                const radius = node.radius * 0.95;
                const angleRad = (angles[idx] * Math.PI) / 180;
                const x = 200 + radius * Math.cos(angleRad);
                const y = 200 + radius * Math.sin(angleRad);
                const isSelected = selectedSkill?.id === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedSkill(node);
                      onAddLog('info', `TECH TRACK: Selected ${node.name} constellation coordinate.`);
                    }}
                    style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}
                    className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                      ? 'border-art-charcoal bg-art-charcoal text-art-bg shadow-sm' 
                      : 'border-art-beige-mid bg-art-bg/90 text-art-charcoal/70 hover:text-art-charcoal hover:border-art-charcoal'
                    } cursor-pointer group`}
                  >
                    {renderSkillIcon(node.iconName)}
                    
                    {/* Tooltip floating names */}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 font-mono text-[9px] text-art-bg bg-art-charcoal border border-art-charcoal rounded-sm px-2 py-0.5 whitespace-nowrap transition-all">
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Orbit Helper Tip */}
            <p className="font-mono text-[9px] text-art-charcoal/40 uppercase mt-2">
              &gt; CLICK ANY SKILL NODE TO REVEAL DETAILS
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN (5 COLS): Selected spec, Telemetry graph */}
        <div className="lg:col-span-5 space-y-6 md:space-y-6">
          
          {/* Constellation Orbit Skill Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-sm border border-art-beige-mid bg-art-beige-light/35 p-5 space-y-4 relative shadow-sm font-serif"
              >
                <div className="absolute top-4 right-4 bg-art-charcoal border border-art-charcoal px-2.5 py-0.5 rounded-sm text-[9px] font-mono text-art-bg">
                  EXPERTISE: {selectedSkill.level}%
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full border border-art-charcoal bg-art-beige-light text-art-charcoal">
                    {renderSkillIcon(selectedSkill.iconName)}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-art-charcoal/40 uppercase">SKILL DETAILED REPORT</span>
                    <h4 className="font-serif text-[15px] font-bold text-art-charcoal uppercase tracking-wide">{selectedSkill.name}</h4>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-[11px] border-t border-b border-art-beige-mid/45 py-2.5">
                  <div className="flex justify-between">
                    <span className="text-art-charcoal/50">ROTATION SPEED</span>
                    <span className="text-art-charcoal font-semibold">{Math.abs(selectedSkill.speed * 85).toFixed(2)} deg/tick</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-art-charcoal/50">SERVICE CATEGORY</span>
                    <span className="text-art-charcoal uppercase font-semibold">{selectedSkill.category} &middot; SECTOR</span>
                  </div>
                </div>

                {/* Progress bar graph */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-art-charcoal/40 uppercase">
                    <span>CAPACITY DEPTH</span>
                    <span>{selectedSkill.level}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-art-beige-mid rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-art-charcoal"
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* TELEMETRY METRICS MODULE */}
          <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-5 space-y-4 font-mono shadow-sm">
            
            <div className="flex items-center justify-between text-[11px] font-bold text-art-charcoal/70">
              <span className="flex items-center space-x-1.5">
                <Activity className="h-4 w-4 text-art-charcoal animate-pulse" />
                <span>RESPONSE TIME OVERVIEW</span>
              </span>
              <span className="text-[10px] text-art-charcoal font-bold">STABLE [12ms]</span>
            </div>

            {/* Custom Interactive SVG Latency Line Chart */}
            <div className="h-28 w-full border border-art-beige-mid bg-art-beige-light/35 p-2 rounded-sm relative overflow-hidden">
              <div className="absolute top-1.5 right-2 text-[8px] text-art-charcoal/45 uppercase tracking-wider">SCALE: 2.5s</div>
              
              <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                {/* Horizontal scale gridlines */}
                <line x1="0" y1="25" x2="200" y2="25" stroke="#EAE8E2" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#EAE8E2" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="200" y2="75" stroke="#EAE8E2" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* Drawing path based on simulated data */}
                <path
                  d={`M ${latencyHistory.map((val, idx) => {
                    const xIdx = (idx / (latencyHistory.length - 1)) * 200;
                    const yIdx = 80 - ((val - 8) / 8) * 60;
                    return `${xIdx} ${yIdx}`;
                  }).join(' L ')}`}
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="1.25"
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* Live Metrics Grid indicators */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* CPU Load Indicator Tile */}
              <div className="border border-art-beige-mid bg-art-beige-light/20 p-3 rounded-sm">
                <span className="text-[9px] text-art-charcoal/40 uppercase font-bold">CORE_LOAD</span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[15px] text-art-charcoal font-bold font-serif">{cpuLoad}%</span>
                  <div className="h-5 flex items-end space-x-1">
                    <div className="w-1.5 h-1.5 bg-art-beige-dark rounded-sm" />
                    <div className="w-1.5 h-2.5 bg-art-beige-dark rounded-sm" />
                    <div className="w-1.5 h-3.5 bg-art-charcoal rounded-sm" />
                    <div className="w-1.5 h-[16px] bg-art-charcoal rounded-sm animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Stability Node Tile */}
              <div className="border border-art-beige-mid bg-art-beige-light/20 p-3 rounded-sm">
                <span className="text-[9px] text-art-charcoal/40 uppercase font-bold">SYS_SECURITY</span>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="h-2 w-2 rounded-full bg-art-charcoal" />
                  <span className="text-[11px] text-art-charcoal font-bold uppercase">100% SECURE</span>
                </div>
              </div>

            </div>

          </div>

          {/* Skill Bento Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Computing Bento Side */}
            <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-4 space-y-3 shadow-sm font-serif">
              <div className="flex justify-between items-start">
                <div className="bg-art-beige-light border border-art-beige-dark/50 text-art-charcoal/50 font-mono text-[9px] px-2.5 py-0.5 rounded-sm">
                  STRUCTURE
                </div>
                <span className="font-serif text-xl font-bold text-art-charcoal">{TECHNICAL_GRID.computing.score}</span>
              </div>
              <h5 className="font-serif text-[13px] font-bold text-art-charcoal uppercase tracking-wider">{TECHNICAL_GRID.computing.label}</h5>
              <p className="font-sans text-[11px] leading-normal text-art-charcoal/70">
                {TECHNICAL_GRID.computing.details}
              </p>
            </div>

            {/* UX Design Bento Side */}
            <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-4 space-y-3 shadow-sm font-serif">
              <div className="flex justify-between items-start">
                <div className="bg-art-beige-light border border-art-beige-dark/50 text-art-charcoal/50 font-mono text-[9px] px-2.5 py-0.5 rounded-sm">
                  AESTHETIC
                </div>
                <span className="font-serif text-xl font-bold text-art-charcoal">{TECHNICAL_GRID.design.score}</span>
              </div>
              <h5 className="font-serif text-[13px] font-bold text-art-charcoal uppercase tracking-wider">{TECHNICAL_GRID.design.label}</h5>
              <p className="font-sans text-[11px] leading-normal text-art-charcoal/70">
                {TECHNICAL_GRID.design.details}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
