import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Database, Terminal as TermIcon, FileText, Share2, Binary, Cpu } from 'lucide-react';
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
          <div className="relative h-20 w-19 overflow-hidden rounded-md border border-art-charcoal/30 bg-art-beige-light p-1">
            {/* Displaying elegant image avatar or minimalist initials fallback */}
            {PERSONAL_INFO.avatarUrl ? (
              <img 
                src={PERSONAL_INFO.avatarUrl} 
                alt={PERSONAL_INFO.name} 
                className="h-full w-full object-cover group-hover:scale-105 transition duration-500 filter grayscale contrast-110 rounded-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-art-charcoal text-art-bg rounded-sm font-mono text-[16px] font-bold select-none group-hover:bg-art-charcoal/90 transition-colors">
                <span>YS</span>
              </div>
            )}
            {/* Status light overlay */}
            <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-art-bg bg-art-charcoal animate-pulse" />
          </div>
        </div>
        
        <h2 className="mt-3 font-serif text-[15px] font-bold tracking-wider text-art-charcoal uppercase">{PERSONAL_INFO.name}</h2>
        <span className="font-mono text-[9px] text-art-charcoal/60 font-semibold tracking-widest bg-art-beige-light/80 border border-art-beige-dark/50 rounded px-2 py-0.5 mt-2.5">
          PORTFOLIO &middot; {PERSONAL_INFO.version}
        </span>
      </div>

      {/* Futuristic Action Buttons List */}
      <div className="flex-1 py-6 space-y-3.5">
        <div className="text-[10px] font-mono font-semibold text-art-charcoal/40 uppercase tracking-widest px-2 mb-2">SYSTEM_CONTROLS</div>
        
        {/* Bio-Link Button commented out
        <button
          onClick={onBioLinkClick}
          className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border border-art-beige-mid bg-art-bg/10 hover:border-art-charcoal hover:bg-art-beige-light/50 group text-art-charcoal transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <Share2 className="h-4 w-4 text-art-charcoal/65 group-hover:text-art-charcoal" />
            <span className="font-mono text-xs uppercase tracking-wider">BIO-LINK</span>
          </div>
          <span className="font-mono text-[9px] text-art-charcoal/40 group-hover:text-art-charcoal">[TREE]</span>
        </button>
        */}

        {/* Matrix Toggle Button */}
        <button
          onClick={() => setMatrixActive(!matrixActive)}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            matrixActive 
            ? 'border-art-charcoal bg-art-beige-light text-art-charcoal font-semibold' 
            : 'border-art-beige-mid bg-art-bg/10 hover:border-art-charcoal hover:bg-art-beige-light/50 group text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Binary className={`h-4 w-4 ${matrixActive ? 'text-art-charcoal' : 'text-art-charcoal/50'}`} />
            <span className="font-mono text-xs uppercase tracking-wider">MATRIX DRIFT</span>
          </div>
          <span className={`font-mono text-[9px] ${matrixActive ? 'text-art-charcoal animate-pulse' : 'text-art-charcoal/40'}`}>
            [{matrixActive ? 'ACTIVE' : 'STBY'}]
          </span>
        </button>

        {/* Payloads Shortcut */}
        <button
          onClick={() => setActiveTab('chronicles')}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            activeTab === 'chronicles'
            ? 'border-art-charcoal bg-art-beige-light text-art-charcoal font-semibold'
            : 'border-art-beige-mid bg-art-bg/10 hover:border-art-charcoal hover:bg-art-beige-light/50 group text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Database className="h-4 w-4 text-art-charcoal/50 group-hover:text-art-charcoal" />
            <span className="font-mono text-xs uppercase tracking-wider">PAYLOADS</span>
          </div>
          <span className="font-mono text-[9px] text-art-charcoal/40 group-hover:text-art-charcoal">[DATA]</span>
        </button>

        {/* Signal Shortcut */}
        <button
          onClick={() => setActiveTab('terminal')}
          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
            activeTab === 'terminal'
            ? 'border-art-charcoal bg-art-beige-light text-art-charcoal font-semibold'
            : 'border-art-beige-mid bg-art-bg/10 hover:border-art-charcoal hover:bg-art-beige-light/50 group text-art-charcoal'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <TermIcon className="h-4 w-4 text-art-charcoal/50 group-hover:text-art-charcoal" />
            <span className="font-mono text-xs uppercase tracking-wider">SIGNAL PORT</span>
          </div>
          <span className="font-mono text-[9px] text-art-charcoal/40 group-hover:text-art-charcoal">[SEND]</span>
        </button>
      </div>

      {/* Network Node Feed / Log Feed Placeholder */}
      <div className="space-y-3 pt-6 border-t border-art-beige-mid/60 font-mono">
        <div className="flex items-center justify-between text-[10px] text-art-charcoal/40 font-bold tracking-wider">
          <span>CONSOLE LOG</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-art-charcoal" />
        </div>
        <div className="rounded-sm border border-art-beige-mid bg-art-beige-light/30 px-3 py-2 space-y-1">
          <div className="text-[10px] text-art-charcoal/70 leading-normal line-clamp-2">
            <span className="text-art-charcoal font-bold">&gt;</span> index.css applied. artistic flair engine running seamlessly.
          </div>
        </div>
      </div>
    </aside>
  );
}
