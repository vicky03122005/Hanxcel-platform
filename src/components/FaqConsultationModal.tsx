import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Layers,
  HelpCircle,
  Headphones,
  Zap,
  Calendar,
  Send,
  Building2,
  UserCheck,
} from 'lucide-react';
import { submitContact } from '../lib/api';

interface FaqConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const FaqConsultationModal: React.FC<FaqConsultationModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('architecture');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Immediate (1-2 weeks)',
    topic: 'Hardware & Multi-Layer PCB Architecture',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        timeline: formData.timeline,
        topic: formData.topic,
        message: formData.notes,
        source: 'faq_consultation',
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        if (onOpenContact) onOpenContact();
      }, 1800);
    } catch {
      alert('Failed to send. Please try again.');
    }
  };

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
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#0C0C0C] border-2 border-white/15 rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 shadow-[0_0_90px_rgba(0,102,255,0.35)] text-[#D7E2EA] z-10 my-auto overflow-y-auto font-['Kanit',sans-serif]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#0066FF]/20 to-transparent blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-t from-[#00D4FF]/15 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Close Button */}
            <button
              id="close-faq-consultation-modal"
              type="button"
              onClick={onClose}
              aria-label="Close technical consultation"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Pill & Category */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00D4FF] tracking-wider uppercase px-3.5 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#00D4FF]" />
                TECHNICAL CONSULTATION &amp; ADVISORY
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#94A3B8] font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>Standard Bilateral NDA Included</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#94A3B8] font-light">
                <Clock className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>&lt;24 Hour Response Time</span>
              </div>
            </div>

            {/* Main Heading & Subtitle */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.08] mb-3">
                Hardware &amp; Firmware Advisory Portal
              </h2>
              <p className="text-base sm:text-lg text-[#00A3FF] font-semibold tracking-wide uppercase">
                Direct Technical Guidance from Principal Electronics &amp; Embedded Engineers
              </p>
            </div>

            {/* 4 Core Consultation Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1">
                    Architecture &amp; DFM Review
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Stackup optimization, high-speed routing clearance, SI/PI analysis, and component lifecycle risk assessment.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#00D4FF]">EVT / DVT Ready</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1">
                    Strict IP Protection
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    100% client IP retention. Gerbers, BOM, schematics, and firmware source code handed over cleanly upon completion.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#00D4FF]">Mutual NDA Standard</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1">
                    Fast-Turn Prototyping
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Quick-turn localized SMT assembly &amp; 3D mechanical validation delivering working boards in 2 to 4 weeks.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#00D4FF]">2 - 4 Week SMT Turns</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1">
                    Pre-Compliance Testing
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Pre-compliance EMI/EMC scans, FCC Part 15, CE-RED, RoHS, and thermal testing before certified lab submission.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#00D4FF]">First-Pass Pass Rate</div>
              </div>
            </div>

            {/* Engagement Process & Technical Consultation Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 sm:mb-10">
              {/* Left Column: 4-Step Engagement Process (5 cols) */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0066FF]" />
                    How We Engage
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00D4FF] shrink-0">
                        01
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                          Mutual NDA &amp; Scoping
                        </h5>
                        <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                          We execute bilateral confidentiality documents before reviewing your schematics, requirements, or concept decks.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00D4FF] shrink-0">
                        02
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                          Deep Technical Scoping Call
                        </h5>
                        <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                          30-45 minute video session with our Lead Hardware Architect and Firmware Director to evaluate power budgets, SoC options, and BOM target constraints.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00D4FF] shrink-0">
                        03
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                          Detailed Engineering Proposal
                        </h5>
                        <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                          Itemized milestone breakdown covering schematic design, PCB layout, firmware drivers, prototype builds, and certification schedule.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00D4FF] shrink-0">
                        04
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                          Sprint Zero Kickoff
                        </h5>
                        <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                          Dedicated Slack/Teams channel, weekly Jira sprint reviews, and synchronized Git/Altium version-controlled repositories.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-[#00D4FF] shrink-0" />
                  <p className="text-[11px] sm:text-xs text-[#94A3B8] font-light">
                    Every consultation is handled by senior engineering leads, never sales generalists.
                  </p>
                </div>
              </div>

              {/* Right Column: Direct Consultation Request (7 cols) */}
              <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#00D4FF]" />
                    Book an Engineering Scoping Call
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-light mb-5">
                    Provide a brief overview of your product goals. We will reply within 24 hours with NDA documentation and available engineering time slots.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1 font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1 font-medium">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1 font-medium">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. NextGen Robotics"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1 font-medium">
                          Target Prototype Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer"
                        >
                          <option value="Immediate (1-2 weeks)" className="bg-[#161616]">
                            Immediate (1-2 weeks)
                          </option>
                          <option value="Within 1 Month" className="bg-[#161616]">
                            Within 1 Month
                          </option>
                          <option value="1 - 3 Months" className="bg-[#161616]">
                            1 - 3 Months
                          </option>
                          <option value="Planning / Concept Stage" className="bg-[#161616]">
                            Planning / Concept Stage
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#94A3B8] mb-1 font-medium">
                        Project Overview or Technical Questions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Briefly describe your hardware targets, MCU preferences, power constraints, or required certifications..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitted}
                        style={{
                          background: 'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
                          boxShadow:
                            '0px 8px 25px rgba(0, 180, 216, 0.45), 0px 0px 20px rgba(0, 102, 255, 0.4)',
                          outline: '2px solid white',
                          outlineOffset: '-3px',
                        }}
                        className="w-full py-3 rounded-full text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
                      >
                        {submitted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                            <span>REQUEST RECEIVED — CONNECTING...</span>
                          </>
                        ) : (
                          <>
                            <span>REQUEST DIRECT CONSULTATION</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Technical Advisory &amp; Solutions
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all text-center cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenContact) onOpenContact();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 border border-white/25 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest transition-all text-center cursor-pointer"
                >
                  Open Full Contact Form
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FaqConsultationModal;
