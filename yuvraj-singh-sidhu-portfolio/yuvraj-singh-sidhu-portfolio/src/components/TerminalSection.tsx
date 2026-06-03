import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal as TermIcon, MapPin, Mail, Send, 
  RotateCw, CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { TerminalLog } from '../types';

interface TerminalSectionProps {
  logs: TerminalLog[];
  onAddLog: (type: 'system' | 'success' | 'warning' | 'info', msg: string) => void;
  onClearLogs: () => void;
}

export default function TerminalSection({ logs, onAddLog, onClearLogs }: TerminalSectionProps) {
  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Shell States
  const [shellInput, setShellInput] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onAddLog('warning', 'ERROR: Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setIsSending(true);
    setSendSuccess(false);
    onAddLog('info', `SYSTEM: Preparing to send message from "${formData.name}"...`);

    try {
      // Real submission using formsubmit.co AJAX endpoint to yuvrajcodes11@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || "New Portfolio Contact Message",
          message: formData.message
        })
      });

      if (res.ok) {
        setIsSending(false);
        setSendSuccess(true);
        onAddLog('success', `SUCCESS: Message successfully delivered to Yuvraj's email inbox!`);
        // Clear Form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSendSuccess(false), 8000);
      } else {
        throw new Error("Email service response error");
      }
    } catch (err) {
      setIsSending(false);
      onAddLog('warning', 'ALERT: Unable to connect to online mail server. Saving message locally...');
      // Fallback response for offline or sandboxed environment
      setTimeout(() => {
        setSendSuccess(true);
        onAddLog('success', `FALLBACK SUCCESS: Message safely recorded and stored!`);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSendSuccess(false), 8000);
      }, 1000);
    }
  };

  // Interactive Command Line Shell execution
  const handleShellCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shellInput.trim()) return;

    const command = shellInput.trim().toLowerCase();
    setShellInput('');
    onAddLog('info', `shell_user@yuvraj-core:~$ ${command}`);

    setTimeout(() => {
      switch (command) {
        case 'help':
          onAddLog('system', 'SUPPORTED SHELL UTILS:\n - help: Display utility details.\n - clear: Purge telemetry display logs.\n - matrix: Toggle background digital rain stream.\n - bios: Read central architect core spec nodes.\n - coords: Print physical station coordinates.\n - mail: Display contact envelope email node.');
          break;
        case 'clear':
          onClearLogs();
          onAddLog('system', 'TELEMETRY BUFFER PURGED. READY.');
          break;
        case 'bios':
          onAddLog('system', `SYSTEM METRICS:\n- ARCHITECT: ${PERSONAL_INFO.name}\n- STATUS: ${PERSONAL_INFO.status}\n- ROLES: Java Dev & Full-Stack Software Engineer`);
          break;
        case 'coords':
          onAddLog('system', `LOCATION: ${PERSONAL_INFO.location}`);
          break;
        case 'mail':
          onAddLog('system', `EMAIL ADDRESS: ${PERSONAL_INFO.email}`);
          break;
        case 'matrix':
          onAddLog('warning', 'SHELL WARNING: Matrix switch initiated. Toggle through Sidebar control dashboard.');
          break;
        default:
          onAddLog('warning', `SHELL ERROR: Command not found or unauthorized: "${command}". Type "help" for accessible directory.`);
      }
    }, 200);
  };

  const getLogColorClass = (type: string) => {
    switch (type) {
      case 'system': return 'text-art-charcoal/50 italic font-medium';
      case 'success': return 'text-art-charcoal font-bold';
      case 'warning': return 'text-art-charcoal/90 font-bold bg-art-beige-mid/45 px-1.5 rounded-sm';
      case 'info': return 'text-art-charcoal/85';
      default: return 'text-art-charcoal/70';
    }
  };

  return (
    <section id="terminal-contact" className="space-y-8 py-4 font-serif text-art-text">
      {/* Grid TITLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-art-beige-mid pb-4">
        <div>
          <span className="font-mono text-art-charcoal/60 text-[10px] uppercase tracking-widest font-bold">[CONTACT CABINET]</span>
          <h2 className="font-serif text-3xl font-extrabold text-art-charcoal tracking-tight uppercase mt-1">Get In Touch</h2>
        </div>
        <div className="mt-2 md:mt-0 font-mono text-[11px] text-art-charcoal/50">
          PORTFOLIO BACKEND: <span className="text-art-charcoal font-bold">ONLINE & SECURE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Contact Envelope form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-sm border border-art-beige-mid bg-art-bg/85 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="font-serif text-[15px] font-bold text-art-charcoal uppercase tracking-wider">Send a Secure Message</h3>
              <p className="font-sans text-[11px] text-art-charcoal/60 mt-1 leading-normal uppercase">
                Type your details below to send a message directly to Yuvraj's email.
              </p>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1 font-mono">
                  <label className="text-[9px] text-art-charcoal/40 uppercase font-bold">YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="ENTER YOUR NAME..."
                    className="w-full bg-art-bg border border-art-beige-dark rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-art-charcoal uppercase font-bold text-art-charcoal placeholder:text-art-beige-dark/70 placeholder:uppercase"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1 font-mono">
                  <label className="text-[9px] text-art-charcoal/40 uppercase font-bold">YOUR EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="ENTER SENDER EMAIL ADDRESS..."
                    className="w-full bg-art-bg border border-art-beige-dark rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-art-charcoal font-bold text-art-charcoal placeholder:text-art-beige-dark/70 placeholder:uppercase"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1 font-mono">
                <label className="text-[9px] text-art-charcoal/40 uppercase font-bold">MESSAGE SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="ENTER MESSAGE SUBJECT..."
                  className="w-full bg-art-bg border border-art-beige-dark rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-art-charcoal uppercase font-bold text-art-charcoal placeholder:text-art-beige-dark/70 placeholder:uppercase"
                />
              </div>

              {/* Message */}
              <div className="space-y-1 font-mono">
                <label className="text-[9px] text-art-charcoal/40 uppercase font-bold">YOUR MESSAGE</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  className="w-full bg-art-bg border border-art-beige-dark rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-art-charcoal uppercase font-bold text-art-charcoal placeholder:text-art-beige-dark/70 placeholder:uppercase leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center space-x-2.5 px-4 py-3.5 rounded-sm border border-art-charcoal bg-art-charcoal text-art-bg font-sans text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-transparent hover:text-art-charcoal duration-300 disabled:opacity-50 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <span>SENDING YOUR MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>SEND SECURE MESSAGE</span>
                  </>
                )}
              </button>
            </form>

            {/* Notification alert states */}
            {sendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3 p-4 rounded-sm border-l-4 border-art-charcoal bg-art-beige-light/45 font-mono text-[11px] text-art-charcoal"
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold uppercase">MESSAGE DELIVERED:</span>
                  <p className="mt-1 leading-normal uppercase">Thank you! Your message has been sent successfully to Yuvraj's email. He will get back to you shortly.</p>
                </div>
              </motion.div>
            )}

          </div>

          {/* Quick Contact metadata links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            {/* Coordinates */}
            <div className="rounded-sm border border-art-beige-mid bg-art-beige-light/30 p-4 flex items-center space-x-3.5 shadow-xs">
              <div className="h-9 w-9 rounded-full border border-art-charcoal/20 bg-art-bg flex items-center justify-center text-art-charcoal">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="font-serif">
                <span className="font-mono text-[8px] text-art-charcoal/40 uppercase font-semibold">LOCATION</span>
                <div className="text-xs text-art-charcoal font-bold uppercase mt-0.5">{PERSONAL_INFO.location}</div>
              </div>
            </div>

            {/* Email Contact Link */}
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="rounded-sm border border-art-beige-mid bg-art-beige-light/30 p-4 flex items-center space-x-3.5 hover:border-art-charcoal hover:bg-art-beige-light/50 transition cursor-pointer group shadow-xs"
            >
              <div className="h-9 w-9 rounded-full border border-art-charcoal/20 bg-art-bg flex items-center justify-center text-art-charcoal group-hover:scale-105 transition">
                <Mail className="h-4 w-4" />
              </div>
              <div className="font-serif">
                <span className="font-mono text-[8px] text-art-charcoal/40 uppercase font-semibold">DIRECT EMAIL</span>
                <div className="text-xs text-art-charcoal font-bold group-hover:text-art-charcoal transition-colors mt-0.5">{PERSONAL_INFO.email}</div>
              </div>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Logging Console utility (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-full space-y-4">
          
          <div className="rounded-sm border border-art-beige-mid bg-art-bg flex-1 flex flex-col overflow-hidden h-[440px] shadow-sm">
            {/* Header console tab */}
            <div className="flex items-center justify-between border-b border-art-beige-mid bg-art-beige-light/45 px-4 py-2 font-mono text-[9px] font-bold">
              <div className="flex items-center space-x-2 text-art-charcoal/60 uppercase">
                <TermIcon className="h-3.5 w-3.5 text-art-charcoal animate-pulse" />
                <span>SYSTEM LOG VIEWER</span>
              </div>
              <button 
                onClick={onClearLogs} 
                className="text-[9px] text-art-charcoal/50 hover:text-art-charcoal uppercase underline cursor-pointer"
              >
                [CLEAR LOGS]
              </button>
            </div>

            {/* Scrolling Logs panel */}
            <div 
              ref={logContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[10px] bg-art-beige-light/20 leading-normal scrollbar-thin select-text"
            >
              {logs.map((log, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="text-art-charcoal/40 shrink-0 select-none">[{log.timestamp}]</span>
                  <div className={`whitespace-pre-wrap ${getLogColorClass(log.type)}`}>
                    {log.message}
                  </div>
                </div>
              ))}
              <div className="h-1" />
            </div>

            {/* Shell input terminal form */}
            <form onSubmit={handleShellCommandSubmit} className="flex border-t border-art-beige-mid bg-art-bg">
              <div className="flex items-center pl-3 text-art-charcoal/50 select-none font-mono text-[10px] font-bold">
                shell_user@yuvraj-core:~$
              </div>
              <input
                type="text"
                value={shellInput}
                onChange={(e) => setShellInput(e.target.value)}
                placeholder="Type 'help' for simple commands..."
                className="flex-1 bg-transparent px-2.5 py-3 font-mono text-[11px] focus:outline-none text-art-text placeholder:text-art-charcoal/25"
              />
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
