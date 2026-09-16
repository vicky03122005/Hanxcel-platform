import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Code2,
  Globe2,
  Smartphone,
  Sparkles,
  Server,
  Layers,
  ShieldCheck,
  ArrowRight,
  Database,
  Workflow,
  Palette,
} from 'lucide-react';
import { HanxcelLogo } from './HanxcelLogo';

interface AboutCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const AboutCompanyModal: React.FC<AboutCompanyModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0C0C] border-2 border-white/15 rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(0,102,255,0.3)] text-[#D7E2EA] z-10 my-auto overflow-y-auto font-['Kanit',sans-serif]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#0066FF]/20 to-transparent blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />

            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#00D4FF]/15 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Close Button */}
            <button
              id="close-about-modal"
              type="button"
              onClick={onClose}
              aria-label="Close company information"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand Header */}
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <HanxcelLogo className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_15px_rgba(0,176,255,0.6)]" />

              <div>
                <span className="font-black tracking-wider text-base sm:text-lg text-white uppercase leading-none font-sans block">
                  HANXCEL AI
                </span>

                <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.24em] text-[#00A3FF] uppercase leading-none mt-1 font-sans block">
                  TECHNOLOGIES
                </span>
              </div>
            </div>

            {/* Main Title & Lead */}
            <div className="mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />

                <span>
                  Software • AI • Cloud • Digital Products
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4">
                ENGINEERING IDEAS INTO{' '}
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#3B82F6] bg-clip-text text-transparent">
                  DIGITAL PRODUCTS
                </span>
              </h2>

              <div className="space-y-4 max-w-3xl">
                <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-light leading-relaxed">
                  Hanxcel AI Technologies is a technology company focused on
                  building intelligent digital products and software solutions.
                  We combine software engineering, artificial intelligence,
                  cloud technologies, web and mobile application development,
                  UI/UX, and connected systems to transform complex ideas into
                  meaningful digital experiences.
                </p>

                <p className="text-sm sm:text-base text-[#94A3B8]/90 font-light leading-relaxed">
                  From product strategy and user experience to application
                  development, backend systems, AI integration, testing, and
                  deployment, we help businesses turn ideas into reliable,
                  scalable, and future-ready technology.
                </p>
              </div>
            </div>

            {/* Technology Capabilities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 sm:mb-12">
              {/* Software */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                <div className="flex justify-center mb-2">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                </div>

                <p className="text-sm sm:text-base font-black text-white mb-1">
                  SOFTWARE
                </p>

                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#00D4FF]">
                  Development
                </p>
              </div>

              {/* AI */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                <div className="flex justify-center mb-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                </div>

                <p className="text-sm sm:text-base font-black text-white mb-1">
                  AI
                </p>

                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#00D4FF]">
                  Intelligence
                </p>
              </div>

              {/* Cloud */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                <div className="flex justify-center mb-2">
                  <Server className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                </div>

                <p className="text-sm sm:text-base font-black text-white mb-1">
                  CLOUD
                </p>

                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#00D4FF]">
                  Infrastructure
                </p>
              </div>

              {/* Digital Products */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                <div className="flex justify-center mb-2">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                </div>

                <p className="text-sm sm:text-base font-black text-white mb-1">
                  PRODUCTS
                </p>

                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#00D4FF]">
                  Digital Experiences
                </p>
              </div>
            </div>

            {/* Core Technology Disciplines */}
            <div className="mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-6 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0066FF]" />
                Our Core Technology Disciplines
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Software Engineering */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Code2 className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Software Engineering
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    Scalable software architectures, modern frontend and
                    backend development, APIs, databases, application
                    integrations, testing, and deployment for reliable digital
                    products.
                  </p>
                </div>

                {/* Web Applications */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Globe2 className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Web Applications
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    Responsive and high-performance web applications with
                    intuitive interfaces, reusable component systems, secure
                    authentication, API integrations, and scalable
                    architectures.
                  </p>
                </div>

                {/* Mobile Applications */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Mobile Applications
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    Cross-platform mobile experiences combining modern
                    interfaces, reliable application logic, backend
                    integration, authentication, and connected product
                    capabilities.
                  </p>
                </div>

                {/* AI & Machine Learning */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    AI &amp; Machine Learning
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    AI-powered application features, machine learning
                    workflows, intelligent automation, predictive systems,
                    data processing, and AI API integrations for digital
                    products.
                  </p>
                </div>

                {/* Cloud & Backend */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Server className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Cloud &amp; Backend Systems
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    Secure backend architectures, REST APIs, databases,
                    authentication, authorization, real-time services, cloud
                    integrations, and infrastructure supporting connected
                    applications.
                  </p>
                </div>

                {/* UI/UX */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-4">
                    <Palette className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    UI/UX &amp; Digital Products
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    Human-centered product experiences built through user
                    flows, information architecture, interface design, design
                    systems, prototyping, and developer-ready product
                    specifications.
                  </p>
                </div>

              </div>
            </div>

            {/* Product Development Approach */}
            <div className="mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-6 flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-[#0066FF]" />
                From Idea to Digital Product
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

                {/* Idea */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-9 h-9 mx-auto rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    Ideation
                  </h4>

                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Understand the idea, problem, users, and product goals.
                  </p>
                </div>

                {/* Design */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-9 h-9 mx-auto rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                    <Palette className="w-4 h-4" />
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    Design
                  </h4>

                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Shape the user experience, interfaces, and product flow.
                  </p>
                </div>

                {/* Development */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-9 h-9 mx-auto rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                    <Code2 className="w-4 h-4" />
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    Development
                  </h4>

                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Build frontend, backend, mobile, AI, and cloud systems.
                  </p>
                </div>

                {/* Testing */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-9 h-9 mx-auto rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    Testing
                  </h4>

                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Validate functionality, performance, reliability, and
                    usability.
                  </p>
                </div>

                {/* Deployment */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#0066FF]/40 transition-colors">
                  <div className="w-9 h-9 mx-auto rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase mb-1">
                    Deployment
                  </h4>

                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    Release, integrate, monitor, and continuously improve the
                    product.
                  </p>
                </div>

              </div>
            </div>

            {/* Technology Stack */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 mb-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#00D4FF]" />
                    Technology-Driven Development
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed max-w-xl">
                    We bring together modern application technologies,
                    artificial intelligence, cloud platforms, databases, APIs,
                    mobile frameworks, and product design systems to build
                    connected and scalable digital experiences.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBD5E1] text-xs font-bold uppercase">
                    Web
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBD5E1] text-xs font-bold uppercase">
                    Mobile
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBD5E1] text-xs font-bold uppercase">
                    AI
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBD5E1] text-xs font-bold uppercase">
                    Cloud
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBD5E1] text-xs font-bold uppercase">
                    IoT
                  </span>
                </div>

              </div>
            </div>

            {/* Digital Product Focus */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0066FF]/10 via-white/5 to-[#00D4FF]/5 border border-[#0066FF]/20 mb-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5">

                <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] shrink-0">
                  <Layers className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight mb-2">
                    Building Technology That Creates Real-World Impact
                  </h4>

                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed max-w-3xl">
                    Whether it is a business platform, mobile application,
                    AI-powered product, cloud system, IoT application, or
                    connected digital experience, our goal is to turn complex
                    requirements into technology that is practical, scalable,
                    and ready for real-world use.
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">

              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Intelligent Digital Products
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all text-center"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();

                    if (onOpenContact) {
                      onOpenContact();
                    }
                  }}
                  style={{
                    background:
                      'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
                    boxShadow:
                      '0px 8px 25px rgba(0, 180, 216, 0.45), 0px 0px 20px rgba(0, 102, 255, 0.4)',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0"
                >
                  <span>START PROJECT</span>

                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutCompanyModal;