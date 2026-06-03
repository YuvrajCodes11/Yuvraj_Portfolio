import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, Layers, Database, Cpu, Settings, 
  Fingerprint, Activity, ArrowRight 
} from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  setActiveTab: (tab: string) => void;
  onAddLog: (type: 'system' | 'success' | 'warning' | 'info', msg: string) => void;
}

export default function ServicesSection({ setActiveTab, onAddLog }: ServicesSectionProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'fullstack': return <Layers className="h-4 w-4 text-art-charcoal" />;
      case 'apis': return <Server className="h-4 w-4 text-art-charcoal" />;
      case 'databases': return <Database className="h-4 w-4 text-art-charcoal" />;
      case 'machinement': return <Cpu className="h-4 w-4 text-art-charcoal" />;
      default: return <Settings className="h-4 w-4 text-art-charcoal" />;
    }
  };

  const handleRequestService = (srv: ServiceItem) => {
    onAddLog('info', `SERVICE HANDLER: Mapping project parameters for: "${srv.title}"`);
    setActiveTab('terminal'); // Route to contact form
  };

  return (
    <section id="services-bento" className="space-y-8 py-4 font-serif text-art-text">
      {/* Grid TITLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-art-beige-mid pb-4">
        <div>
          <span className="font-mono text-art-charcoal/60 text-[10px] uppercase tracking-widest font-bold">[ENGINEERED_SOLUTIONS]</span>
          <h2 className="font-serif text-3xl font-extrabold text-art-charcoal tracking-tight uppercase mt-1">Solutions for Digital Dominance</h2>
        </div>
        <div className="mt-2 md:mt-0 font-mono text-[11px] text-art-charcoal/50">
          SYSTEM THRESHOLD: <span className="text-art-charcoal font-bold font-mono">OPTIMAL</span>
        </div>
      </div>

      {/* Responsive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((srv, idx) => {
          const isHovered = hoveredNode === srv.id;
          
          return (
            <motion.div
              key={srv.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode(srv.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`rounded-sm border p-6 flex flex-col justify-between min-h-[290px] relative overflow-hidden transition-all duration-300 ${
                isHovered 
                ? 'border-art-charcoal bg-art-beige-light/35 shadow-xs' 
                : 'border-art-beige-mid bg-art-bg/85'
              }`}
            >
              {/* Subtle visual canvas grid pattern */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#BFBCB3_0.6px,transparent_0.6px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              <div className="space-y-4 relative z-10 w-full">
                {/* Header indicators */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-art-charcoal bg-art-beige-light border border-art-beige-dark/50 px-2.5 py-0.5 rounded-sm uppercase font-bold">
                    {srv.code}
                  </span>
                  <div className="flex items-center space-x-1 font-mono text-[8px] text-art-charcoal/55">
                    <Activity className={`h-3 w-3 ${isHovered ? 'text-art-charcoal' : 'text-art-charcoal/45'}`} />
                    <span>LOAD INDEX: {srv.loadIndex}%</span>
                  </div>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-sm border border-art-charcoal/20 bg-art-beige-light flex items-center justify-center">
                    {getServiceIcon(srv.id)}
                  </div>
                  <h3 className="font-serif text-[15px] font-bold text-art-charcoal uppercase tracking-wider">
                    {srv.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-[11px] leading-relaxed text-art-charcoal/75">
                  {srv.description}
                </p>

                {/* Tech Sub list */}
                <div className="flex flex-wrap gap-1.5 w-full pt-1">
                  {srv.techStack.map(stack => (
                    <span key={stack} className="font-mono text-[9px] text-art-charcoal/70 bg-art-beige-mid/20 border border-art-beige-mid/45 px-2 py-0.5 rounded-sm">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lower Section (Features + Request Handshake) */}
              <div className="border-t border-art-beige-mid/45 pt-4 mt-4 flex items-center justify-between font-mono relative z-10">
                <div className="space-y-1">
                  <span className="text-[8px] text-art-charcoal/40 uppercase font-bold">CORE INTEGRATIONS</span>
                  <div className="flex space-x-2 text-[10px] text-art-charcoal/70">
                    {srv.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="flex items-center space-x-1 font-sans font-medium">
                        <span className="h-1 w-1 rounded-full bg-art-charcoal/65" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleRequestService(srv)}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm border border-art-charcoal bg-art-charcoal text-[10px] text-art-bg font-bold tracking-wider transition-colors hover:bg-transparent hover:text-art-charcoal duration-300 uppercase cursor-pointer"
                >
                  <span>REQUEST LINK</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Cybernetic telemetry banner alert */}
      <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-art-charcoal/70 space-y-2 sm:space-y-0 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <Fingerprint className="h-4 w-4 text-art-charcoal" />
          <span>CRYPTOGRAPHIC SYSTEM VERIFIED BY AES_256_GCM HANDSHAKE ROUTING.</span>
        </div>
        <button 
          onClick={() => {
            onAddLog('info', 'DIAGNOSTIC CORE: Requesting full network dump...');
            setActiveTab('terminal');
          }}
          className="text-[10px] text-art-charcoal hover:text-art-charcoal/80 underline uppercase text-left font-bold cursor-pointer"
        >
          INITIATE GRID SECURITY AUDIT
        </button>
      </div>

    </section>
  );
}
