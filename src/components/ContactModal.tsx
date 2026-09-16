import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, CheckCircle2, Copy, Sparkles, Building2, Phone, MapPin, Cpu, ArrowRight } from 'lucide-react';
import { HanxcelLogo } from './HanxcelLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState('Turnkey IoT Device');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '$10k - $50k',
    message: '',
  });

  const email = 'hanxcelaitech14@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setForm({ name: '', email: '', company: '', phone: '', budget: '$10k - $50k', message: '' });
    }, 2800);
  };

  const projectOptions = [
    'Turnkey IoT Device',
    'High-Speed PCB Design',
    'Embedded Firmware / RTOS',
    'Edge AI & Computer Vision',
    'Turnkey Prototyping',
    'Mass Production SMT',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-3xl bg-[#0C0C0C] border-2 border-white/15 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,102,255,0.25)] text-[#D7E2EA] z-10 my-auto overflow-hidden font-['Kanit',sans-serif]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#0066FF]/20 to-transparent blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-[#00D4FF]/15 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Top Close Button */}
            <button
              id="close-contact-modal"
              type="button"
              onClick={onClose}
              aria-label="Close message dialog"
              className="absolute top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Brand */}
            <div className="flex items-center gap-3 mb-6">
              <HanxcelLogo className="w-9 h-9 drop-shadow-[0_0_12px_rgba(0,176,255,0.6)]" />
              <div>
                <span className="font-extrabold tracking-wider text-base text-white uppercase leading-none font-sans block">
                  HANXCEL AI
                </span>
                <span className="text-[9px] font-bold tracking-[0.24em] text-[#00A3FF] uppercase leading-none mt-1 font-sans block">
                  TECHNOLOGIES
                </span>
              </div>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 sm:py-16 flex flex-col items-center text-center max-w-md mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-[#0066FF]/20 border-2 border-[#00D4FF] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                  <CheckCircle2 className="w-10 h-10 text-[#00D4FF]" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                  Message Transmitted!
                </h3>
                <p className="text-base text-[#94A3B8] font-light leading-relaxed mb-6">
                  Thank you for reaching out to Hanxcel AI Technologies. Our engineering team in Silicon Valley & Bengaluru will review your project requirements and respond within 2 hours.
                </p>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 w-full flex items-center justify-center gap-2 text-xs font-mono text-[#00D4FF]">
                  <Cpu className="w-4 h-4 text-[#0066FF]" />
                  <span>Ticket Reference: #HX-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-2">
                    START A PROJECT
                  </h2>
                  <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
                    Connect with our engineering specialists for high-speed hardware, embedded systems, and edge intelligence solutions.
                  </p>
                </div>

                {/* Direct quick copy bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center text-[#00D4FF]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-white">
                      {email}
                    </span>
                  </div>
                  <button
                    id="copy-email-btn"
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#0066FF] text-white transition-all ml-auto"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Email'}
                  </button>
                </div>

                {/* Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Project Type selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-2">
                      Select Project Domain
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setProjectType(opt)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                            projectType === opt
                              ? 'bg-[#0066FF] border-[#00D4FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                              : 'bg-white/5 border-white/10 text-[#94A3B8] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full bg-[#14181F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full bg-[#14181F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="NextGen Robotics"
                        className="w-full bg-[#14181F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full bg-[#14181F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all cursor-pointer"
                      >
                        <option value="<$10k">&lt; $10,000</option>
                        <option value="$10k - $50k">$10,000 - $50,000</option>
                        <option value="$50k - $200k">$50,000 - $200,000</option>
                        <option value="$200k+">$200,000+ (Turnkey / Scale)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-1.5">
                      Project Scope & Requirements *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Outline your hardware architecture, target volume, timelines, or specifications..."
                      className="w-full bg-[#14181F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Send Message Button matching the image style */}
                  <button
                    id="submit-contact"
                    type="submit"
                    style={{
                      background: 'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
                      boxShadow:
                        '0px 8px 25px rgba(0, 180, 216, 0.45), 0px 0px 20px rgba(0, 102, 255, 0.4), 4px 4px 12px #0052CC inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                    className="w-full mt-3 py-4 rounded-full text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <span>TRANSMIT MESSAGE</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

