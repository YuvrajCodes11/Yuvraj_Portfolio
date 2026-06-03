import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, ExternalLink, ShieldCheck, Cpu, Send, Zap, 
  RotateCw, Lock, CheckCircle2
} from 'lucide-react';
import { PROJECTS } from '../data';

interface ChroniclesSectionProps {
  onAddLog: (type: 'system' | 'success' | 'warning' | 'info', msg: string) => void;
}

export default function ChroniclesSection({ onAddLog }: ChroniclesSectionProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('mintynex');
  
  // MintyNex Demo interactive state
  const [mintyInput, setMintyInput] = useState('');
  const [mintyLogs, setMintyLogs] = useState<string[]>([
    'System standby. Awaiting mesh payload input...',
  ]);
  const [meshNodesCount, setMeshNodesCount] = useState(8);
  const [throughputVal, setThroughputVal] = useState(24210);

  // A King & A Queen Demo interactive material selectors
  const [ringMetal, setRingMetal] = useState<'gold' | 'emerald' | 'platinum'>('gold');
  const [ringSize, setRingSize] = useState('09');
  const [conversionsCount, setConversionsCount] = useState(1420);
  const [isSecureTransacting, setIsSecureTransacting] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  // Fluctuations for demo stats
  useEffect(() => {
    const timer = setInterval(() => {
      setThroughputVal(prev => prev + Math.floor(Math.random() * 200) - 100);
      setConversionsCount(prev => prev + Math.floor(Math.random() * 6) - 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // MintyNex send payload function
  const handleMintySend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintyInput.trim()) return;

    const payloadText = mintyInput;
    setMintyInput('');
    onAddLog('info', `MINTYNEX INFO: Sending message: "${payloadText}"`);
    
    setMintyLogs(prev => [
      ...prev,
      `> Encrypting message safely...`,
    ]);

    setTimeout(() => {
      setMintyLogs(prev => [
        ...prev,
        `> Connecting to network router: [SUCCESS]`,
      ]);
    }, 400);

    setTimeout(() => {
      setMintyLogs(prev => [
        ...prev,
        `> Message successfully delivered to recipient.`,
        `[SUCCESS] Message received. Latency: 4.8ms. Security: verified.`
      ]);
      onAddLog('success', `MINTYNEX SUCCESS: Message successfully delivered to the destination.`);
    }, 1000);
  };

  const handleCheckoutSim = () => {
    setIsSecureTransacting(true);
    setTransactionSuccess(false);
    onAddLog('info', 'COMMERCE GATEWAY: Initiating secure checkout process...');

    setTimeout(() => {
      onAddLog('info', 'COMMERCE GATEWAY: Verifying secure payment signatures...');
    }, 400);

    setTimeout(() => {
      setIsSecureTransacting(false);
      setTransactionSuccess(true);
      onAddLog('success', 'COMMERCE SUCCESS: Payment mock transaction completed successfully!');
    }, 1500);
  };

  const getRingColorStyle = () => {
    switch (ringMetal) {
      case 'gold': return 'from-amber-500 via-yellow-200 to-amber-600 shadow-yellow-500/10';
      case 'emerald': return 'from-emerald-600 via-emerald-100 to-teal-800 shadow-emerald-500/10';
      case 'platinum': return 'from-slate-500 via-slate-100 to-slate-700 shadow-slate-300/10';
    }
  };

  return (
    <section id="chronicles-portfolio" className="space-y-8 py-4 font-serif text-art-text">
      {/* Grid title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-art-beige-mid pb-4">
        <div>
          <span className="font-mono text-art-charcoal/60 text-[10px] uppercase tracking-widest font-bold">[PORTFOLIO_CHRONICLES]</span>
          <h2 className="font-serif text-3xl font-extrabold text-art-charcoal tracking-tight uppercase mt-1">Chronicles of Code</h2>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2 font-mono text-[10px]">
          {PROJECTS.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3 py-1.5 transition-all cursor-pointer rounded-sm ${
                selectedProjectId === proj.id
                ? 'border border-art-charcoal bg-art-charcoal text-art-bg font-bold'
                : 'border border-art-beige-mid bg-art-beige-light/35 text-art-charcoal/50 hover:text-art-charcoal'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT (7 COLS): Project visual, details, tech stack */}
        <div className="lg:col-span-7 space-y-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Project Image Frame */}
              <div className="aspect-video w-full rounded-sm border border-art-beige-mid bg-art-bg overflow-hidden relative shadow-sm group">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103 filter grayscale contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-art-charcoal uppercase tracking-widest bg-art-beige-light border border-art-beige-dark/50 px-2 py-0.5 rounded-sm font-bold">
                      {selectedProject.metaText}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-art-charcoal uppercase mt-1.5">{selectedProject.title}</h3>
                  </div>
                  <div className="flex space-x-2 font-mono">
                    <a href={selectedProject.githubUrl} className="p-2 rounded-sm border border-art-beige-mid bg-art-bg/90 text-art-charcoal/70 hover:text-art-charcoal transition-all">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href={selectedProject.liveUrl} className="p-2 rounded-sm border border-art-beige-mid bg-art-bg/90 text-art-charcoal/70 hover:text-art-charcoal transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="font-serif text-[15px] italic text-art-charcoal/85 leading-relaxed">
                  &ldquo;{selectedProject.description}&rdquo;
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] text-art-charcoal bg-art-beige-light border border-art-beige-dark/50 px-2 py-0.5 rounded-sm font-bold">
                      #{tag}
                    </span>
                  ))}
                  {selectedProject.techStack.map(stack => (
                    <span key={stack} className="font-mono text-[9px] text-art-charcoal/65 bg-art-beige-mid/20 border border-art-beige-mid/45 px-2 py-0.5 rounded-sm">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics Panel */}
              <div className="grid grid-cols-3 gap-4 font-mono">
                {selectedProject.stats.map(stat => (
                  <div key={stat.label} className="border border-art-beige-mid bg-art-beige-light/35 p-3 rounded-sm shadow-xs">
                    <span className="text-[9px] text-art-charcoal/40 uppercase font-bold">{stat.label}</span>
                    <div className="text-[14px] font-bold text-art-charcoal mt-0.5 font-serif">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Feature bullet list */}
              <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-5 space-y-3 font-serif">
                <div className="font-bold text-art-charcoal/50 uppercase tracking-widest font-mono text-[9px]">[SYSTEM_CAPABILITIES_SHEET]</div>
                <ul className="space-y-2 text-art-charcoal/80 pl-4 list-disc marker:text-art-charcoal">
                  {selectedProject.features.map(feat => (
                    <li key={feat} className="leading-relaxed text-[13px]">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* RIGHT COLUMN (5 COLS): Interactive Demo sandbox */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-sm border border-art-beige-mid bg-art-bg shadow-sm overflow-hidden">
            <div className="flex items-center px-4 py-2 border-b border-art-beige-mid bg-art-beige-light/45 font-mono text-[9px] text-art-charcoal/50 uppercase font-bold">
              <Zap className="h-3.5 w-3.5 text-art-charcoal mr-2 animate-pulse" />
              <span>LIVE INTERACTIVE SHOWCASE TERMINAL</span>
            </div>
            
            <div className="p-5 font-mono text-xs min-h-[440px] flex flex-col justify-between">
              
              {/* INTERACTIVE DEMO 1: MINTYNEX */}
              {selectedProjectId === 'mintynex' && (
                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-art-charcoal font-serif">Real-Time Messaging Demo</h4>
                      <p className="text-[11px] text-art-charcoal/60 mt-1 leading-normal font-sans">
                        Test how messages are privately encrypted and sent over a simulated network router.
                      </p>
                    </div>

                    {/* Nodes Status indicators */}
                    <div className="border border-art-beige-mid bg-art-beige-light/20 p-3 rounded-sm space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-art-charcoal/65">
                        <span>ROUTER NODES ONLINE</span>
                        <span className="text-art-charcoal font-bold">{meshNodesCount}/12 NODES</span>
                      </div>
                      <div className="flex space-x-1.5 justify-center">
                        {Array(12).fill(0).map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-2.5 w-2 flex-grow rounded-sm transition ${
                              i < meshNodesCount ? 'bg-art-charcoal animate-pulse' : 'bg-art-beige-mid/70'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[8px] text-art-charcoal/45 uppercase font-bold">
                        <span>LOAD: {throughputVal} MSG/S</span>
                        <button 
                          onClick={() => {
                            setMeshNodesCount(prev => prev === 12 ? 3 : prev + 1);
                            onAddLog('info', 'ROUTING CONTROL: Adjusting network capacity simulation.');
                          }} 
                          className="hover:text-art-charcoal underline cursor-pointer"
                        >
                          DIAL LOAD
                        </button>
                      </div>
                    </div>

                    {/* Output logs screen */}
                    <div className="h-36 overflow-y-auto px-3 py-2 border border-art-beige-mid bg-art-beige-light/40 rounded-sm text-[10px] text-art-charcoal/70 leading-normal space-y-1.5 scrollbar-thin">
                      {mintyLogs.map((log, index) => (
                        <div key={index} className="whitespace-pre-line">
                          {log.startsWith('[SUCCESS]') ? (
                            <span className="text-art-charcoal font-bold">{log}</span>
                          ) : log.startsWith('>') ? (
                            <span className="text-art-charcoal/45 font-bold">{log}</span>
                          ) : (
                            <span>{log}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleMintySend} className="flex space-x-2 pt-2">
                    <input
                      type="text"
                      value={mintyInput}
                      onChange={(e) => setMintyInput(e.target.value)}
                      placeholder="TYPE A TEST CHAT MESSAGE..."
                      className="flex-1 bg-art-bg border border-art-beige-dark rounded-sm px-2.5 py-1.5 text-[10px] focus:outline-none focus:border-art-charcoal uppercase font-bold text-art-charcoal"
                    />
                    <button
                      type="submit"
                      className="px-3 rounded-sm border border-art-charcoal bg-art-charcoal text-art-bg hover:bg-transparent hover:text-art-charcoal transition-all cursor-pointer"
                    >
                      <Send className="h-3 w-3" />
                    </button>
                  </form>
                </div>
              )}

              {/* INTERACTIVE DEMO 2: A KING & A QUEEN */}
              {selectedProjectId === 'king-queen' && (
                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4 font-serif">
                    <div>
                      <h4 className="text-sm font-bold text-art-charcoal">Interactive Product Customizer</h4>
                      <p className="text-[11px] text-art-charcoal/60 mt-1 leading-normal font-sans">
                        Choose a product color and sizing below to see a live preview of the interactive item customizer.
                      </p>
                    </div>

                    {/* Outer Ring visual */}
                    <div className="h-32 flex items-center justify-center relative bg-art-beige-light/20 border border-art-beige-mid rounded-sm overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#BFBCB3_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-20" />
                      
                      {/* Emulated Luxury Ring Graphic */}
                      <div className="relative group">
                        {/* Outer Glow */}
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-r blur-xl opacity-35 transition-all duration-500 ${getRingColorStyle()}`} />
                        
                        {/* Dimensional Metallic Bands */}
                        <div className={`relative h-20 w-20 rounded-full border-8 bg-art-bg flex items-center justify-center transition-all duration-700 ${
                          ringMetal === 'gold' 
                          ? 'border-amber-500 shadow-sm' 
                          : ringMetal === 'emerald'
                          ? 'border-emerald-600 shadow-sm'
                          : 'border-slate-400 shadow-sm'
                        }`}>
                          {/* Diamond / Crown setting inside */}
                          <div className={`h-6 w-6 transform rotate-45 border transition duration-500 ${
                            ringMetal === 'gold' ? 'border-amber-400 bg-amber-100' : ringMetal === 'emerald' ? 'border-emerald-400 bg-emerald-50 animation-pulse' : 'border-slate-400 bg-slate-100'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-art-charcoal/45 font-bold">
                        RING DIMENSIONS: {ringSize}mm // METALLIC FINISH
                      </div>
                    </div>

                    {/* Controls Panel */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Material selector */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-art-charcoal/40 uppercase font-bold">RING_MATERIAL</span>
                        <div className="flex flex-col space-y-1.5">
                          {(['gold', 'emerald', 'platinum'] as const).map(metal => (
                            <button
                              key={metal}
                              onClick={() => {
                                setRingMetal(metal);
                                onAddLog('info', `COMMERCE CONFIG: Material updated to ${metal}.`);
                              }}
                              className={`text-left px-2.5 py-1 text-[10px] uppercase font-mono font-bold border transition rounded-sm cursor-pointer ${
                                ringMetal === metal
                                ? 'border-art-charcoal bg-art-charcoal text-art-bg'
                                : 'border-art-beige-mid bg-art-bg text-art-charcoal/65 hover:bg-art-beige-light/45'
                              }`}
                            >
                              {metal}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dimensions selector */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-art-charcoal/40 uppercase font-bold">SIZE</span>
                        <div className="grid grid-cols-2 gap-1.5 font-mono">
                          {['07', '08', '09', '10'].map(size => (
                            <button
                              key={size}
                              onClick={() => {
                                setRingSize(size);
                                onAddLog('info', `COMMERCE CONFIG: Size calibrated to ${size}mm.`);
                              }}
                              className={`px-1 py-1 text-[10px] border text-center transition font-bold rounded-sm cursor-pointer ${
                                ringSize === size
                                ? 'border-art-charcoal bg-art-charcoal text-art-bg'
                                : 'border-art-beige-mid bg-art-bg text-art-charcoal/65 hover:bg-art-beige-light/45'
                              }`}
                            >
                              {size}mm
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Simulate Secure Order submission */}
                  <div className="pt-2 font-mono">
                    <button
                      onClick={handleCheckoutSim}
                      disabled={isSecureTransacting}
                      className="w-full flex items-center justify-center space-x-2.5 px-4 py-3 rounded-sm border border-art-charcoal bg-art-charcoal text-art-bg font-bold tracking-widest uppercase transition duration-300 hover:bg-transparent hover:text-art-charcoal disabled:opacity-50 cursor-pointer text-xs"
                    >
                      {isSecureTransacting ? (
                        <>
                          <RotateCw className="h-3.5 w-3.5 animate-spin" />
                          <span>PROCESSING SECURE CHECKOUT...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5" />
                          <span>SIMULATE SECURE CHECKOUT</span>
                        </>
                      )}
                    </button>
                    {transactionSuccess && (
                      <div className="flex items-center space-x-2 text-art-charcoal text-[9px] justify-center mt-2.5 font-mono font-bold tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-art-charcoal" />
                        <span>SECURE PAYMENT COMPLETED successfully!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
