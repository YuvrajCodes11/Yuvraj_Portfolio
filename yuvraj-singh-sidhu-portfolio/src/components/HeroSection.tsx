import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowRight, CornerDownRight, Database, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onBioLinkClick: () => void;
}

export default function HeroSection({ setActiveTab, onBioLinkClick }: HeroSectionProps) {
  const [typedTitle, setTypedTitle] = useState('');
  const roles = [
    'FULL-STACK DEVELOPER',
    'JAVA DEVELOPER',
    'APPLICATION ARCHITECT'
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
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, roleIndex]);

  return (
    <section id="hero-display" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-art-text overflow-hidden px-4 font-serif">
      {/* Decorative Fine Art Grid background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#BFBCB3_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16 text-center lg:text-left">

        {/* Profile Photo Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-shrink-0 flex flex-col items-center"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-art-charcoal/8 blur-xl scale-110 pointer-events-none" />
            {/* Frame border */}
            <div className="relative h-52 w-44 sm:h-64 sm:w-52 rounded-2xl overflow-hidden border-2 border-art-charcoal/20 shadow-2xl shadow-art-charcoal/10">
              {PERSONAL_INFO.avatarUrl ? (
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt="Yuvraj Singh Sidhu"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-art-charcoal text-art-bg font-mono text-4xl font-bold">
                  YS
                </div>
              )}
              {/* Subtle overlay for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-art-charcoal/10 to-transparent pointer-events-none" />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-art-bg border border-art-beige-mid rounded-full px-3 py-1 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] text-art-charcoal/70 uppercase font-semibold tracking-widest">Available for Work</span>
            </div>
          </div>

          {/* Social links below photo */}
          <div className="flex items-center space-x-3 mt-6">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
              className="p-2 border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/60 hover:text-art-charcoal rounded-sm transition-all">
              <Github className="h-4 w-4" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
              className="p-2 border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/60 hover:text-art-charcoal rounded-sm transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/60 hover:text-art-charcoal rounded-sm transition-all">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Content Column */}
        <div className="flex flex-col items-center lg:items-start space-y-7">

          {/* Status indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 border border-art-charcoal/25 bg-art-beige-light px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-art-charcoal font-bold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PORTFOLIO STATUS // {PERSONAL_INFO.status}</span>
          </motion.div>

          {/* Name & Title */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-art-charcoal/60 text-xs tracking-[0.25em] uppercase font-semibold"
            >
              Chandigarh, India &bull; Full-Stack Developer
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-art-charcoal uppercase font-serif leading-none"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            {/* Typing Role */}
            <div className="h-8 flex items-center justify-center lg:justify-start font-mono">
              <span className="text-[11px] text-art-charcoal/55 font-bold uppercase tracking-wider">FOCUS:</span>
              <span className="text-[12px] text-art-charcoal font-bold tracking-widest ml-2 bg-art-beige-light border border-art-charcoal/20 px-2.5 py-0.5 rounded-sm">
                {typedTitle}
              </span>
              <span className="w-1.5 h-4 bg-art-charcoal opacity-80 ml-1.5 animate-pulse" />
            </div>
          </div>

          {/* Bio excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-xl text-art-charcoal/75 text-base sm:text-[17px] leading-relaxed font-sans"
          >
            Freelance Full-Stack Developer specializing in <strong className="text-art-charcoal font-semibold">Java Spring Boot</strong>, <strong className="text-art-charcoal font-semibold">React/Next.js</strong>, and scalable platform architecture. 1.5 years of hands-on experience shipping production-grade applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto"
          >
            <button
              onClick={() => setActiveTab('terminal')}
              className="flex items-center justify-center space-x-2 px-7 py-3.5 border-2 border-art-charcoal bg-art-charcoal text-art-bg font-sans text-xs tracking-widest uppercase font-bold transition-all hover:bg-transparent hover:text-art-charcoal duration-300 cursor-pointer group rounded-sm shadow-md"
            >
              <Terminal className="h-4 w-4" />
              <span>GET IN TOUCH</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('chronicles')}
              className="flex items-center justify-center space-x-2 px-7 py-3.5 border-2 border-art-charcoal/40 bg-art-beige-light text-art-charcoal font-sans text-xs tracking-widest uppercase font-bold transition-all hover:border-art-charcoal hover:bg-art-beige-mid duration-300 cursor-pointer rounded-sm"
            >
              <Database className="h-4 w-4" />
              <span>VIEW PROJECTS</span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center space-x-6 pt-2"
          >
            {[
              { val: '1.5+', label: 'Years Exp.' },
              { val: '2', label: 'Major Projects' },
              { val: '6+', label: 'Tech Stacks' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="font-serif text-2xl font-bold text-art-charcoal">{stat.val}</div>
                <div className="font-mono text-[9px] text-art-charcoal/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
        className="absolute bottom-8 flex flex-col items-center space-y-2 cursor-pointer"
        onClick={() => setActiveTab('nexus')}
      >
        <span className="font-mono text-[9px] text-art-charcoal/40 tracking-[0.2em] uppercase">SCROLL TO EXPLORE SKILLS</span>
        <CornerDownRight className="h-3.5 w-3.5 text-art-charcoal/40 transform rotate-45 animate-bounce" />
      </motion.div>
    </section>
  );
}
