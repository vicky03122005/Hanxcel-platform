import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { useFaq } from '../lib/useCms';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const FAQ_FALLBACK: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What stages of hardware & product development do you handle?',
    answer:
      'We provide full-lifecycle turnkey capabilities: initial schematic capture, high-density multi-layer PCB layout, firmware architecture, rapid 3D prototyping, mechanical enclosure design, DFM (Design for Manufacturability), pre-compliance testing (FCC, CE, RoHS), and mass production scaling.',
  },
  {
    id: 'faq-2',
    question: 'Who owns the Intellectual Property (IP) and design files?',
    answer:
      'You retain 100% ownership of all intellectual property, source code, Gerber files, schematics, Bill of Materials (BOM), and mechanical CAD assets upon milestone completion. We execute strict bilateral Non-Disclosure Agreements (NDAs) prior to any engineering discussions.',
  },
  {
    id: 'faq-3',
    question: 'How fast can you deliver working hardware prototypes?',
    answer:
      'For rapid proof-of-concept and engineering validation (EVT), we leverage fast-turn localized SMT assembly and quick-turn PCB fabrication to deliver fully functional prototypes within 2 to 4 weeks, depending on component availability and complexity.',
  },
  {
    id: 'faq-4',
    question: 'Which wireless protocols and embedded platforms do you support?',
    answer:
      'Our team routinely designs for BLE, Wi-Fi 6, LoRa / LoRaWAN, Cellular IoT (LTE-M, NB-IoT, 5G), Sub-GHz, Zigbee, CAN-bus, RS-485, and Ethernet across ARM Cortex-M, ESP32, STM32, Nordic nRF, RISC-V, and Linux-based edge compute microprocessors.',
  },
  {
    id: 'faq-5',
    question: 'Can you redesign existing hardware to lower BOM costs or extend battery life?',
    answer:
      'Yes. Value engineering is one of our core specialties. We optimize component selection to bypass supply chain bottlenecks, redesign power rails to minimize sleep current consumption, and consolidate multi-board systems to drastically reduce per-unit manufacturing costs.',
  },
  {
    id: 'faq-6',
    question: 'How do you ensure hardware reliability and pass regulatory certifications?',
    answer:
      'Every design is subjected to thermal dissipation modeling, signal integrity simulation, environmental stress testing, and pre-compliance EMC/EMI scans to ensure smooth, first-pass certification at accredited test laboratories worldwide.',
  },
];

interface FaqSectionProps {
  onContactClick?: () => void;
  onConsultationClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onContactClick,
  onConsultationClick,
}) => {
  const { data } = useFaq<FaqItem>();
  const FAQ_DATA = data ?? FAQ_FALLBACK;

  const [openId, setOpenId] = useState<string | null>('faq-1');

  const handleConsultation = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else if (onContactClick) {
      onContactClick();
    }
  };

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-[#0C0C0C] text-[#D7E2EA] z-20 relative px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 md:pt-16 pb-28 sm:pb-36 select-none"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <HelpCircle className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </span>

          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-5"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            FAQ
          </h2>

          <p className="text-[#A5B5C1] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            Key insights on our engineering process, prototyping speed, intellectual property protection, and production scaling.
          </p>
        </FadeIn>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <FadeIn
                key={item.id}
                delay={index * 0.05}
                y={20}
                className={`w-full rounded-[20px] sm:rounded-[24px] transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#161616] border border-white shadow-2xl'
                    : 'bg-[#141414] border border-white/20 hover:border-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                >
                  <span
                    className={`font-semibold text-base sm:text-lg tracking-wide transition-colors ${
                      isOpen ? 'text-white' : 'text-[#D7E2EA] hover:text-white'
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white text-white transition-all duration-300 shadow-[0_0_12px_rgba(0,195,255,0.45)] ${
                      isOpen ? 'rotate-180 shadow-[0_0_18px_rgba(0,210,255,0.75)]' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, #0050FF 0%, #0075FF 50%, #00D5FF 100%)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-[#A5B5C1] font-light text-sm sm:text-base leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <FadeIn delay={0.2} y={30} className="mt-12 sm:mt-16 text-center">
          <div
            id="faq-consultation-callout"
            role="button"
            tabIndex={0}
            onClick={handleConsultation}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleConsultation();
              }
            }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6 rounded-[22px] bg-[#161616] border border-white max-w-xl mx-auto shadow-2xl hover:border-[#00D4FF] hover:shadow-[0_0_35px_rgba(0,102,255,0.4)] transition-all duration-300 cursor-pointer group/consult"
          >
            <div className="w-10 h-10 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center shrink-0 group-hover/consult:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-white font-bold text-sm sm:text-base group-hover/consult:text-[#00D4FF] transition-colors">
                Have a unique technical query?
              </h3>
              <p className="text-[#9BAEC0] text-xs sm:text-sm font-light">
                Speak directly with our hardware and firmware engineering leads.
              </p>
            </div>
            <button
              id="faq-consultation-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleConsultation();
              }}
              className="px-7 sm:px-8 py-3 rounded-full border-2 border-white text-white font-extrabold text-xs sm:text-sm tracking-[0.14em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 shadow-[0_0_20px_rgba(0,195,255,0.65),0_0_40px_rgba(0,102,255,0.35)] hover:shadow-[0_0_28px_rgba(0,210,255,0.85),0_0_55px_rgba(0,120,255,0.5)] cursor-pointer"
              style={{
                background: 'linear-gradient(90deg, #0050FF 0%, #0075FF 45%, #00D5FF 100%)',
              }}
            >
              TECHNICAL ADVISORY
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
