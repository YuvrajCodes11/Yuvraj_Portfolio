import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowRight, CornerDownRight, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onBioLinkClick: () => void;
}

export default function HeroSection({ setActiveTab, onBioLinkClick }: HeroSectionProps) {
  const [typedTitle, setTypedTitle] = useState('');
  const roles = [
    'SYSTEM ARCHITECT',
    'JAVA ENTERPRISE DEVELOPER',
    'MESH WORK INTEGRATOR',
    'FULL-STACK ENGINEER'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullTitle = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.slice(0, typedTitle.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.slice(0, typedTitle.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && typedTitle === currentFullTitle) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(500); // pause before starting next
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, roleIndex]);

  return (
    <section id="hero-display" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-art-text overflow-hidden px-4 font-serif">
      {/* Decorative Fine Art Grid background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#BFBCB3_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        
        {/* Status indicator line */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 border border-art-charcoal/20 bg-art-beige-light/50 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-art-charcoal font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-art-charcoal animate-pulse" />
          <span>ESTABLISHING SECURE PROTOCOLS // {PERSONAL_INFO.status}</span>
        </motion.div>

        {/* Hero Headline and Typography */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-art-charcoal/60 text-xs sm:text-xs tracking-[0.25em] uppercase"
          >
            SYSTEM ARCHITECT // CLOUD PLATFORMS
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-art-charcoal uppercase font-serif"
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Typing Role Engine */}
          <div className="h-8 flex items-center justify-center font-mono">
            <span className="text-[11px] text-art-charcoal/50 font-bold uppercase tracking-wider">
              ROLE:
            </span>
            <span className="text-[12px] text-art-charcoal font-semibold tracking-widest ml-2 bg-art-beige-light/70 border-b border-art-charcoal px-2.5 py-0.5 rounded-sm">
              {typedTitle}
            </span>
            <span className="w-1.5 h-4 bg-art-charcoal opacity-70 ml-1.5 animate-pulse" />
          </div>
        </div>

        {/* Short Concept description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-xl text-art-charcoal/80 text-[16px] sm:text-[18px] leading-relaxed italic font-serif"
        >
          &ldquo;Engineering robust backends, clustering fault-tolerant databases, and creating immersive fluid UI frameworks with structural security.&rdquo;
        </motion.p>

        {/* Cyber Interactive Terminal Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center"
        >
          {/* Initiate Protocol */}
          <button
            onClick={() => setActiveTab('terminal')}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-art-charcoal bg-art-charcoal text-art-bg font-sans text-xs tracking-widest uppercase font-semibold transition-all hover:bg-transparent hover:text-art-charcoal duration-300 cursor-pointer group"
          >
            <Terminal className="h-4 w-4" />
            <span>INITIATE PROTOCOLS</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Access Archives */}
          <button
            onClick={() => setActiveTab('chronicles')}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-art-beige-dark bg-art-beige-light/30 text-art-charcoal font-sans text-xs tracking-widest uppercase font-semibold transition-all hover:bg-art-beige-light/70 duration-300 cursor-pointer"
          >
            <Database className="h-4 w-4 text-art-charcoal/70" />
            <span>ACCESS PAYLOADS</span>
          </button>
        </motion.div>

        {/* Downward Telemetry Scroller indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          className="pt-6 flex flex-col items-center space-y-2 cursor-pointer"
          onClick={() => setActiveTab('nexus')}
        >
          <span className="font-mono text-[9px] text-art-charcoal/40 tracking-[0.2em] uppercase">SCROLL TO UNLOCK CHRONICLES</span>
          <CornerDownRight className="h-3.5 w-3.5 text-art-charcoal/40 transform rotate-45 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
