import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface TopNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onConnectClick: () => void;
}

export default function TopNavBar({ activeTab, setActiveTab, onConnectClick }: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', name: 'Home' },
    { id: 'nexus', name: 'Nexus' },
    { id: 'chronicles', name: 'Chronicles' },
    { id: 'services', name: 'Services' },
    { id: 'terminal', name: 'Terminal' },
  ];

  const handleMobileNav = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="top-header" className="sticky top-0 z-50 w-full border-b border-art-beige-mid bg-art-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <div id="brand-logo" className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
          {PERSONAL_INFO.avatarUrl ? (
            <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-art-charcoal/20 shadow-sm flex-shrink-0">
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt="Yuvraj Singh Sidhu"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-art-bg" />
            </div>
          ) : (
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-art-charcoal/20 bg-art-beige-light text-art-charcoal">
              <span className="font-serif text-sm font-bold">YS</span>
              <div className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-art-bg" />
            </div>
          )}
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-wider text-art-charcoal uppercase">
              Yuvraj Singh Sidhu
            </h1>
            <div className="flex items-center space-x-1.5">
              <Radio className="h-2.5 w-2.5 text-emerald-600" />
              <span className="font-mono text-[9px] text-art-charcoal/60 uppercase tracking-widest">Full-Stack Developer &middot; Available</span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-art-charcoal' : 'text-art-charcoal/50 hover:text-art-charcoal/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute inset-x-2 bottom-1 h-0.5 bg-art-charcoal"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            id="connect-btn"
            onClick={onConnectClick}
            className="group flex items-center space-x-1.5 border-2 border-art-charcoal bg-art-charcoal px-5 py-2 font-sans text-[11px] font-bold tracking-wider text-art-bg transition-all hover:bg-transparent hover:text-art-charcoal duration-300 cursor-pointer rounded-sm"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded border border-art-beige-mid bg-art-beige-light p-1.5 text-art-charcoal"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-art-beige-mid bg-art-bg px-4 py-4 md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNav(item.id)}
                  className={`w-full text-left rounded-sm px-3 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === item.id 
                    ? 'border border-art-charcoal/30 bg-art-charcoal text-art-bg' 
                    : 'border border-transparent text-art-charcoal/70 hover:bg-art-beige-light hover:text-art-charcoal'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onConnectClick();
                  }}
                  className="flex w-full items-center justify-center space-x-2 border-2 border-art-charcoal bg-art-charcoal py-2.5 font-mono text-xs font-bold text-art-bg uppercase tracking-widest hover:bg-transparent hover:text-art-charcoal transition-colors duration-300 rounded-sm"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
