import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Github, Linkedin, Mail, FileText, ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface BioLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadManifest: () => void;
}

export default function BioLinkModal({ isOpen, onClose, onDownloadManifest }: BioLinkModalProps) {
  
  const linkTreeNodes = [
    {
      title: 'SECURE_HUB: CLIENT GITHUB REPOS',
      desc: 'Architectural repositories, custom microservices and reactive setups.',
      url: PERSONAL_INFO.github,
      icon: <Github className="h-5 w-5 text-art-charcoal" />
    },
    {
      title: 'PROFESSIONAL MESH: LINKEDIN SYNDICATE',
      desc: 'Industry connections, systems validation articles, engineering networks.',
      url: PERSONAL_INFO.linkedin,
      icon: <Linkedin className="h-5 w-5 text-art-charcoal" />
    },
    {
      title: 'DIRECT TUBE: SECURE SMTP EMAIL',
      desc: 'Formal inquiries, strategic partnerships, systems consulting handshakes.',
      url: `mailto:${PERSONAL_INFO.email}`,
      icon: <Mail className="h-5 w-5 text-art-charcoal" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-art-bg/75 backdrop-blur-md"
          />

          {/* Modal Content Drawer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative z-10 w-full max-w-lg rounded-sm border border-art-beige-mid bg-art-bg p-6 shadow-2xl overflow-hidden font-serif text-[11px] text-art-text"
          >
            {/* Background grid texture */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(#BFBCB3_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-art-beige-mid pb-4">
                <div>
                  <span className="text-[9px] text-art-charcoal/50 font-bold uppercase tracking-widest font-mono">[SYSTEM_LINK_TREE]</span>
                  <h3 className="font-serif text-lg font-bold text-art-charcoal uppercase mt-0.5">Bio Link Registry</h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-sm border border-art-beige-mid bg-art-beige-light p-1.5 text-art-charcoal hover:text-art-charcoal/80 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Avatar display inline */}
              <div className="flex items-center space-x-4 p-3 rounded-sm border border-art-beige-mid bg-art-beige-light/20">
                <img 
                  src={PERSONAL_INFO.avatarUrl} 
                  alt={PERSONAL_INFO.name} 
                  className="h-10 w-10 rounded-full object-cover grayscale contrast-110 border border-art-charcoal/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-art-charcoal uppercase font-serif">{PERSONAL_INFO.name}</h4>
                  <span className="text-[9px] font-mono text-art-charcoal/60 font-semibold uppercase tracking-wider">CONNECT_NODE_OK &middot; STABLE</span>
                </div>
              </div>

              {/* Link List */}
              <div className="space-y-3">
                {linkTreeNodes.map((node, i) => (
                  <a
                    key={i}
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-sm border border-art-beige-mid bg-art-bg hover:border-art-charcoal hover:bg-art-beige-light/40 transition duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2 rounded-sm bg-art-beige-light border border-art-beige-mid/70 group-hover:scale-103 transition">
                        {node.icon}
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-art-charcoal uppercase text-[10px] font-mono tracking-wider">{node.title}</span>
                        <p className="font-sans text-[10px] text-art-charcoal/55 mt-0.5 leading-normal">{node.desc}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-art-charcoal/50 group-hover:text-art-charcoal transition" />
                  </a>
                ))}
              </div>

              {/* Download Manifest Action */}
              <div className="pt-2 font-mono">
                <button
                  onClick={() => {
                    onClose();
                    onDownloadManifest();
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-art-charcoal bg-art-charcoal text-art-bg font-sans text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-transparent hover:text-art-charcoal duration-300 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>EXPORT PERSONAL ARCHIVES MANIFEST (.TXT)</span>
                </button>
              </div>

              {/* Integrity footer */}
              <div className="flex items-center justify-between text-[8px] text-art-charcoal/40 uppercase font-mono">
                <span>INDEX_NODE_HASH: v4.0.2_SYNDA</span>
                <span>SIGNATURE: VERIFIED</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
