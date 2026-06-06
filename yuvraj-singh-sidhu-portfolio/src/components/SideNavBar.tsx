import React from 'react';
import { motion } from 'motion/react';
import { Database, Terminal as TermIcon, Binary, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface SideNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matrixActive: boolean;
  setMatrixActive: (active: boolean) => void;
  onBioLinkClick: () => void;
}

export default function SideNavBar({
  activeTab,
  setActiveTab,
  matrixActive,
  setMatrixActive,
  onBioLinkClick,
}: SideNavBarProps) {
  return (
    <aside id="side-navigation" className="hidden lg:flex w-64 flex-col border-r border-art-beige-mid bg-art-bg/40 p-6 shrink-0 h-[calc(100vh-4rem)] sticky top-16 font-serif">
      
      {/* Profile/Avatar Block */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-art-beige-mid/60">
        <div className="relative group">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-art-charcoal/25 shadow-md">
            {PERSONAL_INFO.avatarUrl ? (
              <img 
                src={PERSONAL_INFO.avatarUrl} 
                alt={PERSONAL_INFO.name} 
                className="h-full w-full object-cover object-top group-hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-art-charcoal text-art-bg font-mono text-xl font-bold select-none">
                <span>YS</span>
              </div>
            )}
          </div>
          {/* Online status badge */}
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-art-bg bg-emerald-500" />
        </div>
        
        <h2 className="mt-4 font-serif text-[15px] font-bold tracking-wide text-art-charcoal uppercase">{PERSONAL_INFO.name}</h2>
        <p className="font-mono text-[9px] text-art-charcoal/55 mt-1">{PERSONAL_INFO.title}</p>
        <span className="font-mono text-[9px] text-art-charcoal/70 font-semibold tracking-widest bg-art-beige-light border border-art-beige-dark/60 rounded px-2 py-0.5 mt-2.5">
          PORTFOLIO &middot; {PERSONAL_INFO.version}
        </span>

        {/* Social links */}
        <div className="flex items-center space-x-3 mt-3">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
            className="p-1.5 rounded-sm border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/50 hover:text-art-charcoal transition-all">
            <Github className="h-3 w-3" />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
            className="p-1.5 rounded-sm border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/50 hover:text-art-charcoal transition-all">
            <Linkedin className="h-3 w-3" />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`}
            className="p-1.5 rounded-sm border border-art-beige-mid hover:border-art-charcoal hover:bg-art-beige-light text-art-charcoal/50 hover:text-art-charcoal transition-all">
            <Mail className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex-1 py-6 space-y-2.5">
        <div className="text-[10px] font-mono font-bold text-art-charcoal/50 uppercase tracking-widest px-1 mb-3">NAVIGATION</div>
        
        {/* Matrix Toggle */}
        <button
          onClick={() => setMatrixActive(!matrixActive)}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            matrixActive 
            ? 'border-art-charcoal bg-art-charcoal text-art-bg' 
            : 'border-art-beige-mid hover:border-art-charcoal/50 hover:bg-art-beige-light text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Binary className={`h-4 w-4 ${matrixActive ? 'text-art-bg' : 'text-art-charcoal/60'}`} />
            <span className={`font-mono text-xs font-semibold uppercase tracking-wider ${matrixActive ? 'text-art-bg' : 'text-art-charcoal/80'}`}>MATRIX DRIFT</span>
          </div>
          <span className={`font-mono text-[9px] font-bold ${matrixActive ? 'text-art-bg/70 animate-pulse' : 'text-art-charcoal/40'}`}>
            [{matrixActive ? 'ACTIVE' : 'STBY'}]
          </span>
        </button>

        {/* Projects */}
        <button
          onClick={() => setActiveTab('chronicles')}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            activeTab === 'chronicles'
            ? 'border-art-charcoal bg-art-charcoal text-art-bg'
            : 'border-art-beige-mid hover:border-art-charcoal/50 hover:bg-art-beige-light text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Database className={`h-4 w-4 ${activeTab === 'chronicles' ? 'text-art-bg' : 'text-art-charcoal/60'}`} />
            <span className={`font-mono text-xs font-semibold uppercase tracking-wider ${activeTab === 'chronicles' ? 'text-art-bg' : 'text-art-charcoal/80'}`}>PROJECTS</span>
          </div>
          <span className={`font-mono text-[9px] ${activeTab === 'chronicles' ? 'text-art-bg/70' : 'text-art-charcoal/40'}`}>[2]</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => setActiveTab('terminal')}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            activeTab === 'terminal'
            ? 'border-art-charcoal bg-art-charcoal text-art-bg'
            : 'border-art-beige-mid hover:border-art-charcoal/50 hover:bg-art-beige-light text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <TermIcon className={`h-4 w-4 ${activeTab === 'terminal' ? 'text-art-bg' : 'text-art-charcoal/60'}`} />
            <span className={`font-mono text-xs font-semibold uppercase tracking-wider ${activeTab === 'terminal' ? 'text-art-bg' : 'text-art-charcoal/80'}`}>CONTACT</span>
          </div>
          <span className={`font-mono text-[9px] ${activeTab === 'terminal' ? 'text-art-bg/70' : 'text-art-charcoal/40'}`}>[SEND]</span>
        </button>
      </div>

      {/* Footer log */}
      <div className="space-y-2 pt-4 border-t border-art-beige-mid/60 font-mono">
        <div className="text-[9px] text-art-charcoal/45 font-bold tracking-wider uppercase">CONSOLE LOG</div>
        <div className="rounded-sm border border-art-beige-mid bg-art-beige-light/40 px-3 py-2">
          <div className="text-[10px] text-art-charcoal/70 leading-normal">
            <span className="text-art-charcoal font-bold">&gt;</span> All systems nominal. Portfolio v{PERSONAL_INFO.version} active.
          </div>
        </div>
      </div>
    </aside>
  );
}
