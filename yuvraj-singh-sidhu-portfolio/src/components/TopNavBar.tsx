import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu, Radio } from 'lucide-react';
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
    <header id="top-header" className="sticky top-0 z-50 w-full border-b border-art-beige-mid bg-art-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <div id="brand-logo" className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-art-charcoal/20 bg-art-beige-light text-art-charcoal">
            <Cpu className="h-4 w-4" />
            <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-art-charcoal animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-wider text-art-charcoal uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <div className="flex items-center space-x-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-art-charcoal/65" />
              <span className="font-mono text-[9px] text-art-charcoal/60 uppercase tracking-widest">{PERSONAL_INFO.status} &middot; STUDIO</span>
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
                className={`relative px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-art-charcoal' : 'text-art-charcoal/50 hover:text-art-charcoal'
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
            className="group flex items-center space-x-1.5 border border-art-charcoal bg-art-charcoal px-4 py-1.5 font-sans text-[11px] font-medium tracking-wider text-art-bg transition-all hover:bg-transparent hover:text-art-charcoal duration-300 cursor-pointer"
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
            className="rounded border border-art-beige-mid bg-art-beige-light p-1.5 text-art-text hover:text-art-charcoal"
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
                  className={`w-full text-left rounded-sm px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeTab === item.id 
                    ? 'border border-art-charcoal/20 bg-art-beige-light text-art-charcoal font-semibold' 
                    : 'text-art-charcoal/60 hover:bg-art-beige-light hover:text-art-charcoal'
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
                  className="flex w-full items-center justify-center space-x-2 border border-art-charcoal bg-art-charcoal py-2 font-mono text-xs font-semibold text-art-bg uppercase tracking-widest hover:bg-transparent hover:text-art-charcoal transition-colors duration-300"
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
