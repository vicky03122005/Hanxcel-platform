import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Wrench,
  Cpu,
  BarChart3,
  Calendar,
  Building2,
  Share2,
  ShieldCheck,
  Target,
  Clock,
} from 'lucide-react';
import SmartConnectedDeviceImage from '../assets/images/SmartConnectedDevice.png';
import IntelligentControlSystemImage from '../assets/images/IntelligentControlSystem.png';
import IndustrialIoTPlatformImage from '../assets/images/IndustrialIoTPlatform.png';

export interface ProjectCaseStudy {
  id: string;
  number: string;
  category: string;
  title: string;
  client: string;
  timeline: string;
  tagline: string;
  overview: string;
  heroImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  architecturePoints: { title: string; desc: string }[];
  technicalSpecs: { label: string; value: string }[];
  keyMetrics: { metric: string; label: string }[];
  toolsAndTech: string[];
}

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  'nextlevel-studio': {
    id: 'nextlevel-studio',
    number: '01',
    category: 'CONSUMER ELECTRONICS',
    title: 'Next-Gen Smart Connected Wearable & Audio Ecosystem',
    client: 'NextLevel Audio & Wearables Inc.',
    timeline: '4 Months (Architecture to DFM)',
    tagline: 'Ultra-Compact HDI Architecture, Bluetooth 5.4 LE Audio & Sub-Microamp Power Management',
    overview:
      'A groundbreaking connected consumer wearable and audio product that combines sub-millimeter electronic miniaturization, custom active noise-cancellation (ANC) DSP filters, and ultra-low quiescent current management. Engineered to deliver studio-grade acoustics and multi-day battery endurance in a featherweight ergonomic housing.',
    heroImage:
      SmartConnectedDeviceImage,
    galleryImages: [
      SmartConnectedDeviceImage,
    ],
    challenge:
      'The client required an exceptionally compact form factor capable of housing a high-performance Bluetooth 5.4 chipset, 24-bit audio DAC, optical PPG biometric sensors, and touch controls while maintaining IP68 water resistance and exceeding 30 hours of continuous playback.',
    solution:
      'Hanxcel designed a 10-layer any-layer HDI flex-rigid PCB architecture coupled with an ultra-efficient Nordic nRF5340 dual-core SoC. We implemented bespoke dynamic voltage scaling in firmware and tuned custom LDS (Laser Direct Structuring) antennas for robust RF propagation even near the human body.',
    architecturePoints: [
      {
        title: 'Any-Layer HDI & Flex-Rigid Stackup',
        desc: 'Reduced internal electronics volume by 42% utilizing microvias and blind/buried vias.',
      },
      {
        title: 'Dual-Core ARM Cortex-M33 Processing',
        desc: 'Dedicated core for audio DSP & ANC filters; secondary core managing BLE connectivity and biometrics.',
      },
      {
        title: 'Sub-3.2µA Sleep Current Engine',
        desc: 'Dynamic peripheral power gating delivering over 14 days of standby battery retention.',
      },
      {
        title: 'Qi Fast Wireless Charging Receiver',
        desc: 'Integrated miniature wireless coil with 5W rapid charge receiving 80% capacity in under 25 minutes.',
      },
    ],
    technicalSpecs: [
      { label: 'Processor', value: 'Dual ARM Cortex-M33 @ 128MHz' },
      { label: 'Wireless Protocol', value: 'Bluetooth 5.4, LE Audio, Auracast' },
      { label: 'PCB Technology', value: '10-Layer Any-Layer HDI Rigid-Flex' },
      { label: 'Ingress Protection', value: 'IP68 Submersible (1.5m / 30min)' },
      { label: 'Battery Capacity', value: '75mAh Micro-LiPo + 520mAh Case' },
      { label: 'Firmware OS', value: 'Zephyr RTOS with Secure Bootloader' },
    ],
    keyMetrics: [
      { metric: '38 hrs', label: 'Total Playback Time' },
      { metric: '<18 ms', label: 'Ultra-Low Latency' },
      { metric: '99.8%', label: 'First-Pass SMT Yield' },
      { metric: 'IP68', label: 'Water & Dust Rating' },
    ],
    toolsAndTech: [
      'Altium Designer',
      'Nordic nRF Connect SDK',
      'Zephyr RTOS',
      'Ansys HFSS Antenna Sim',
      'SolidWorks CAD',
      'Audio Precision APx555',
    ],
  },
  'aura-brand-identity': {
    id: 'aura-brand-identity',
    number: '02',
    category: 'IoT & CONNECTED SYSTEMS',
    title: 'Enterprise Industrial IoT Platform & Edge Telemetry Hub',
    client: 'Aura Logistics & Global Sensor Network',
    timeline: '5.5 Months (Pilot to Mass Rollout)',
    tagline: 'Multi-Protocol Wireless Gateway, Real-Time Edge Analytics & Enterprise Cloud Pipeline',
    overview:
      'An industrial-grade IoT gateway and sensor fleet designed for real-time asset tracking, predictive machine maintenance, and mission-critical telemetry. Engineered with dual-SIM cellular failover, local edge caching, and plug-and-play mutual TLS cloud connectivity.',
    heroImage:
      IndustrialIoTPlatformImage,
    galleryImages: [
      IndustrialIoTPlatformImage,
    ],
    challenge:
      'Manufacturing facilities and remote logistics fleets suffered from lost data packets, high cellular data consumption costs, and frequent network dropouts across harsh electromagnetic environments.',
    solution:
      'Hanxcel built an intelligent multi-radio edge hub combining LTE-M/NB-IoT, LoRaWAN Class C, and RS-485 Modbus. Firmware runs local edge compression and TinyML anomaly detection, buffering data in non-volatile flash during disconnects and securely flushing via encrypted MQTT when reconnected.',
    architecturePoints: [
      {
        title: 'Dual SIM Global Cellular Roaming',
        desc: 'Automatic network failover supporting over 140 carriers globally without operator lock-in.',
      },
      {
        title: 'Hardware Cryptographic Enclave (ATECC608B)',
        desc: 'Protected private keys ensuring tamper-proof zero-touch authentication to AWS IoT Core.',
      },
      {
        title: 'Edge Time-Series Compression',
        desc: 'Reduces cellular bandwidth by 76% while retaining sub-millisecond peak vibration samples.',
      },
      {
        title: 'Industrial Wide-Voltage Input (9-36V DC)',
        desc: 'Built-in 4kV surge suppression, reverse polarity protection, and supercapacitor brownout backup.',
      },
    ],
    technicalSpecs: [
      { label: 'Compute Core', value: 'NXP i.MX 8M Mini Quad Cortex-A53' },
      { label: 'Cellular Modem', value: 'Quectel BG95-M3 Cat M1/NB-IoT/EGPRS' },
      { label: 'LoRa Concentrator', value: 'Semtech SX1302 8-Channel Base Station' },
      { label: 'Local Storage', value: '8GB eMMC + MicroSD Crash Dump Buffer' },
      { label: 'Operating Temp', value: '-40°C to +85°C Industrial Grade' },
      { label: 'Cloud Protocol', value: 'Mutual TLS MQTT / HTTPS / WebSockets' },
    ],
    keyMetrics: [
      { metric: '50k+', label: 'Connected Edge Nodes' },
      { metric: '99.99%', label: 'Uptime Reliability' },
      { metric: '-76%', label: 'Cellular Data Costs' },
      { metric: '<8 ms', label: 'Telemetry Latency' },
    ],
    toolsAndTech: [
      'Yocto Linux',
      'AWS IoT Core',
      'Semtech LoRaWAN',
      'KiCad Pro / Cadence Allegro',
      'Docker on Edge',
      'Grafana Enterprise',
    ],
  },
  'solaris-digital': {
    id: 'solaris-digital',
    number: '03',
    category: 'INDUSTRIAL AUTOMATION',
    title: 'Intelligent High-Precision Control & Automation System',
    client: 'Solaris Industrial Automation Group',
    timeline: '6 Months (Concept to Production Line Deployment)',
    tagline: 'Deterministic Multi-Axis Motor Control, EtherCAT Fieldbus & Edge TinyML Diagnostics',
    overview:
      'A mission-critical PLC and multi-axis servo drive automation solution designed for high-speed assembly robotics and smart factories. Delivers sub-microsecond deterministic motion synchronization, real-time current loop closures, and automated vibration wear forecasting.',
    heroImage:
      IntelligentControlSystemImage,
    galleryImages: [
      IntelligentControlSystemImage,
    ],
    challenge:
      'The client needed to synchronize 6 robotic servo axes with sub-50 nanosecond clock jitter while operating next to high-EMC noise sources (20kW induction heaters and pulsed laser welders) without experiencing signal corruption.',
    solution:
      'Hanxcel engineered an STM32H7 dual-core + FPGA co-processing architecture with isolated EtherCAT slave controllers, galvanically isolated gate drivers, and 4-layer shielding planes. We integrated TinyML vibration anomaly detection directly onto the microcontroller DSP pipeline.',
    architecturePoints: [
      {
        title: 'Dual-Core STM32H7 + Xilinx Artix-7 FPGA',
        desc: 'FPGA calculates hardware FOC current loops in 1.2 microseconds with zero CPU overhead.',
      },
      {
        title: 'EtherCAT Real-Time Industrial Bus',
        desc: 'Deterministic cycle times of 250 microseconds with sub-20ns distributed clock synchronization.',
      },
      {
        title: 'Complete Galvanic Optical Isolation',
        desc: '5000Vrms isolation between digital logic control planes and high-current 48V/60A power stages.',
      },
      {
        title: 'Predictive Vibration FFT Anomaly Sensor',
        desc: 'Onboard 3-axis MEMS accelerometer monitoring bearing wear and alerting before mechanical binding.',
      },
    ],
    technicalSpecs: [
      { label: 'Motion Controller', value: 'STM32H747XI Dual Core + Artix-7 FPGA' },
      { label: 'Fieldbus Support', value: 'EtherCAT, CANopen, PROFINET, Modbus TCP' },
      { label: 'Drive Rating', value: '24V - 60V DC, 50A Continuous / 120A Peak' },
      { label: 'Current Loop Rate', value: '20kHz FOC Field-Oriented Control' },
      { label: 'Feedback Encoders', value: 'BiSS-C, EnDat 2.2, Incremental ABZ' },
      { label: 'Safety Standards', value: 'SIL3 / PLe Safe Torque Off (STO)' },
    ],
    keyMetrics: [
      { metric: '250 µs', label: 'EtherCAT Cycle Time' },
      { metric: '<20 ns', label: 'Clock Sync Jitter' },
      { metric: '100%', label: 'EMC Noise Immunity' },
      { metric: '4.8x', label: 'Factory Throughput Boost' },
    ],
    toolsAndTech: [
      'Xilinx Vivado',
      'STM32CubeIDE',
      'TwinCAT 3 EtherCAT',
      'Cadence Allegro PCB',
      'TensorFlow Lite for Microcontrollers',
      'Rohde & Schwarz EMI Receiver',
    ],
  },
};

interface ProjectCaseStudyModalProps {
  isOpen: boolean;
  projectId: string | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  isOpen,
  projectId,
  onClose,
  onOpenContact,
}) => {
  const project = projectId ? PROJECT_CASE_STUDIES[projectId] : null;

  if (!project) return null;

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
              id="close-casestudy-modal"
              type="button"
              onClick={onClose}
              aria-label="Close project case study"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Number / Category */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <span className="font-mono text-sm sm:text-base font-extrabold text-[#00D4FF] tracking-wider uppercase px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30">
                PROJECT {project.number} • {project.category}
              </span>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] font-light">
                <Building2 className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] font-light">
                <Clock className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>{project.timeline}</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.08] mb-3">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-[#00A3FF] font-semibold tracking-wide uppercase">
                {project.tagline}
              </p>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative w-full h-[240px] sm:h-[340px] md:h-[400px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/15 mb-8 sm:mb-10 bg-[#161616]">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-60" />
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {project.keyMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00D4FF] tracking-tight mb-1">
                    {item.metric}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Overview & Narrative */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 sm:mb-10">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#94A3B8] mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#0066FF]" />
                Executive Summary &amp; Scope
              </h3>
              <p className="text-sm sm:text-base text-[#D7E2EA] font-light leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Challenge & Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 sm:mb-10">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-2.5 flex items-center gap-2 text-rose-400">
                  <Target className="w-4 h-4 text-rose-400" />
                  Engineering Challenge
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-2.5 flex items-center gap-2 text-[#00D4FF]">
                  <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                  Engineered Solution
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white mb-5 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0066FF]" />
                Hardware &amp; Firmware Subsystem Innovations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.architecturePoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/40 transition-colors"
                  >
                    <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D4FF] shrink-0" />
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed pl-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications Table & Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
              {/* Specs */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00D4FF]" />
                  Technical Specifications
                </h4>
                <div className="divide-y divide-white/10">
                  {project.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#94A3B8] font-light">{spec.label}</span>
                      <span className="text-white font-mono font-medium text-right ml-3">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & EDA Stack */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-5">
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#00D4FF]" />
                    EDA, Simulation &amp; Test Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.toolsAndTech.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-xs font-mono text-[#00D4FF]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                    Certified Production Handover
                  </div>
                  <p className="text-xs text-[#94A3B8] font-light">
                    Full Gerbers, ODB++, Altium Schematics, BOM, C/C++ firmware repository, and Automated Test Procedure (ATP) documentation delivered to the client.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Case Study {project.number}
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
                  style={{
                    background: 'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
                    boxShadow:
                      '0px 8px 25px rgba(0, 180, 216, 0.45), 0px 0px 20px rgba(0, 102, 255, 0.4)',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
                >
                  <span>BUILD A SIMILAR SYSTEM</span>
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

export default ProjectCaseStudyModal;
