import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Wrench,
  Cpu,
  Building2,
  Calendar,
  ShieldCheck,
  Target,
  Clock,
  Compass,
  FileCheck2,
  Activity,
  Zap,
  Radio,
  Eye,
} from 'lucide-react';
import { useDetail } from '../lib/useCms';
import { fetchPortfolioItem } from '../lib/api';

export interface PortfolioDetailData {
  id: string;
  year: string;
  category: string;
  title: string;
  client: string;
  timeline: string;
  tagline: string;
  overview: string;
  icon: 'iot' | 'wearable' | 'energy' | 'ai';
  challenge: string;
  solution: string;
  architecturePoints: { title: string; desc: string }[];
  technicalSpecs: { label: string; value: string }[];
  keyMetrics: { metric: string; label: string }[];
  toolsAndTech: string[];
  deliverables: string[];
}

export const PORTFOLIO_DETAILS: Record<string, PortfolioDetailData> = {
  'smart-connected-mesh': {
    id: 'smart-connected-mesh',
    year: '2026',
    category: 'IoT & HARDWARE',
    title: 'Industrial Mesh Sensor Node',
    client: 'Global Logistics Corp',
    timeline: '4.5 Months (Concept to Pilot Rollout)',
    tagline: 'Self-Healing Sub-GHz LoRa Mesh Telemetry with 5+ Year Battery Endurance',
    overview:
      'Engineered an ultra-ruggedized, low-power industrial sensor node cluster designed for harsh enterprise environments, multi-acre logistics yards, and container shipping hubs. Nodes autonomously organize into a resilient, self-healing Sub-GHz mesh network that continuously monitors temperature, 3-axis shock, humidity, and atmospheric pressure without requiring external line power or dedicated cellular modems on each unit.',
    icon: 'iot',
    challenge:
      'Massive metal shipping containers and steel warehouse superstructures caused frequent RF multipath reflections and signal dead zones, while nodes were required to run on a single lithium thionyl chloride battery cell for over 5 years.',
    solution:
      'Hanxcel designed a custom dual-antenna diversity frontend with an optimized LoRa mesh routing protocol. We engineered deep-sleep power gating circuits with sub-1.8µA sleep currents and dynamic transmit power scaling based on RSSI packet acknowledgments.',
    architecturePoints: [
      {
        title: 'Sub-GHz LoRa Mesh Protocol Engine',
        desc: 'Dynamic multi-hop routing protocol with automatic route failover in under 200ms when paths become obstructed.',
      },
      {
        title: 'Ultra-Low Quiescent Power Management',
        desc: 'Sub-1.8µA sleep state with intelligent periodic wakeups and hardware threshold interrupt wake pins.',
      },
      {
        title: 'IP67 Weatherproof Polycarbonate Enclosure',
        desc: 'Overmolded silicone gaskets and breathable ePTFE acoustic/pressure equalization membranes.',
      },
      {
        title: 'Encrypted Cryptographic Element (ATECC608A)',
        desc: 'AES-128 payload encryption ensuring end-to-end data integrity from physical edge nodes to cloud brokers.',
      },
    ],
    technicalSpecs: [
      { label: 'Microcontroller', value: 'STM32WL55 Dual-Core ARM Cortex-M4/M0+' },
      { label: 'RF Frequency', value: '868 MHz / 915 MHz Sub-GHz LoRa' },
      { label: 'Transmission Range', value: 'Up to 3.2 km Line-of-Sight per hop' },
      { label: 'Battery Power', value: '3.6V LiSOCl2 8500mAh Industrial Cell' },
      { label: 'Enclosure Rating', value: 'IP67 Waterproof & UV-Stabilized' },
      { label: 'Sensors Integrated', value: 'Sensirion Temp/RH + Bosch 3-Axis Shock' },
    ],
    keyMetrics: [
      { metric: '99.98%', label: 'Packet Delivery Reliability' },
      { metric: '5.4 Yrs', label: 'Calculated Battery Life' },
      { metric: '<1.8 µA', label: 'Deep Sleep Quiescent' },
      { metric: '10,000+', label: 'Deployed Node Fleet' },
    ],
    toolsAndTech: [
      'STM32CubeIDE',
      'Altium Designer 24',
      'Ansys HFSS Antenna Sim',
      'Nordic Power Profiler Kit II',
      'AWS IoT Core',
      'LoRa Alliance Mesh Stack',
    ],
    deliverables: [
      'Complete Schematics & 4-Layer Controlled-Impedance PCB Gerbers',
      'Zephyr RTOS C/C++ Firmware Repository with Automated CI/CD',
      'Production In-Circuit Testing (ICT) Fixture Design',
      'FCC Part 15 & CE-RED Regulatory Compliance Dossier',
    ],
  },
  'nextgen-wearable': {
    id: 'nextgen-wearable',
    year: '2025',
    category: 'CONSUMER ELECTRONICS',
    title: 'Haptic Vitality Smart Tracker',
    client: 'Aura Healthtech',
    timeline: '5 Months (Architecture to DFM)',
    tagline: 'Continuous Clinical-Grade Optical PPG, GSR Biometrics & Flex-Rigid Circuitry',
    overview:
      'A sleek, ultra-ergonomic vitality wristband combining clinical-grade optical photoplethysmography (PPG), galvanic skin response (GSR), skin temperature sensing, and linear resonant haptic feedback. Designed with a flexible circuit architecture that wraps smoothly inside hypoallergenic medical silicone bands.',
    icon: 'wearable',
    challenge:
      'Integrating a high-density 6-layer flex-rigid PCB, dual green/red/IR LEDs, sensitive photodiodes, battery management, and a linear resonant actuator (LRA) into a water-submersible band under 8.5mm total thickness.',
    solution:
      'Engineered an ultra-dense flex-rigid substrate with blind and buried microvias, isolating analog optical sensor signals from high-current haptic motor drive lines. Optimized firmware with adaptive optical LED driving that reduces power consumption by 45% during quiet sleep phases.',
    architecturePoints: [
      {
        title: 'Flex-Rigid Multi-Zone Substrate',
        desc: '6-layer polyimide flex circuit enabling seamless contouring around the wrist without trace strain.',
      },
      {
        title: 'Multi-Wavelength Optical Biometric AFE',
        desc: 'Triple LED optical emitter array with 24-bit high dynamic range ADC capturing microvolt PPG waveforms.',
      },
      {
        title: 'Linear Resonant Haptic Feedback (LRA)',
        desc: 'Sub-millisecond tactile haptic transients for discreet vitality alerts and wellness pacing reminders.',
      },
      {
        title: 'IP68 Waterproof Magnetic Pogo Dock',
        desc: 'Hermetically sealed charging contacts preventing corrosion from sweat, saltwater, and daily wear.',
      },
    ],
    technicalSpecs: [
      { label: 'SoC Platform', value: 'Nordic nRF5340 Dual-Core BLE 5.3' },
      { label: 'Sensors', value: 'Multi-Wavelength PPG, GSR, Temp, 6-Axis IMU' },
      { label: 'PCB Technology', value: '6-Layer Flex-Rigid with 0.4mm BGA' },
      { label: 'Battery Capacity', value: '140mAh Curved Li-Po Polymer' },
      { label: 'Battery Runtime', value: '14 Days Continuous Tracking' },
      { label: 'Water Ingress', value: '5 ATM / IP68 Submersible (50m)' },
    ],
    keyMetrics: [
      { metric: '14 Days', label: 'Battery Runtime per Charge' },
      { metric: '8.2 mm', label: 'Ultra-Slim Profile' },
      { metric: '98.6%', label: 'HR Correlation vs Medical ECG' },
      { metric: '<35 min', label: 'Fast Magnetic Charge (80%)' },
    ],
    toolsAndTech: [
      'Altium Designer 24 (Rigid-Flex)',
      'Cadence Sigrity SI/PI',
      'Nordic nRF Connect SDK',
      'MATLAB PPG Filter Modeling',
      'SolidWorks Medical Tooling',
      'Keysight Scope Spectrum Analyzer',
    ],
    deliverables: [
      'Fabrication Gerbers, ODB++ and Flex Stiffener Specifications',
      'Embedded Firmware with On-Device Motion Artifact Cancellation',
      'Bluetooth LE Custom GATT Service Profile Documentation',
      'ISO 10993 Biocompatibility Test Validation Protocols',
    ],
  },
  'smart-energy-controller': {
    id: 'smart-energy-controller',
    year: '2025',
    category: 'ENERGY & AUTOMATION',
    title: 'Smart Microgrid Power Inverter',
    client: 'Solaris Energy Systems',
    timeline: '6 Months (Topology Simulation to Factory Trial)',
    tagline: 'Bidirectional GaN Power Stage with Sub-Cycle Islanding & Grid-Tie Synchronization',
    overview:
      'High-efficiency, bidirectional microgrid inverter controller engineered for residential and commercial energy storage systems. Features Gallium Nitride (GaN) high-frequency switching stages, real-time Maximum Power Point Tracking (MPPT), and autonomous sub-cycle grid islanding protection during blackout events.',
    icon: 'energy',
    challenge:
      'Achieving greater than 98.8% conversion efficiency while maintaining sub-millisecond islanding detection without false trips from fluctuating inductive industrial loads.',
    solution:
      'Designed a dual-core DSP control architecture executing 100kHz digital current loops with advanced phase-locked loop (PLL) algorithms. Integrated galvanically isolated gate drivers and low-inductance planar magnetics for minimal thermal dissipation.',
    architecturePoints: [
      {
        title: 'High-Frequency GaN Power Stage',
        desc: 'Wide-bandgap transistors operating at 100kHz reducing inductor size by 60% with 98.9% peak efficiency.',
      },
      {
        title: 'Sub-Cycle Islanding Transition',
        desc: 'Autonomous microgrid disconnection in under 8ms during grid collapse, protecting downstream electronics.',
      },
      {
        title: 'Bidirectional Four-Quadrant Inversion',
        desc: 'Seamless transition between solar battery charging, grid export, and peak-shaving domestic support.',
      },
      {
        title: 'Dual Isolated RS-485 / Modbus & Wi-Fi Gateway',
        desc: 'Sub-second real-time telemetry streaming to cloud energy management platforms and utility SCADA.',
      },
    ],
    technicalSpecs: [
      { label: 'DSP Controller', value: 'TI C2000 TMS320F28379D Dual Core' },
      { label: 'Power Rating', value: '15 kW Continuous / 22 kW Peak' },
      { label: 'Switching Frequency', value: '100 kHz GaN Semiconductor' },
      { label: 'Peak Efficiency', value: '98.9% CEC Weighted Efficiency' },
      { label: 'Grid Standard', value: 'IEEE 1547-2018 / UL 1741 SB' },
      { label: 'Cooling Method', value: 'Fanless Convection Aluminum Heatsink' },
    ],
    keyMetrics: [
      { metric: '32% Faster', label: 'Grid Fault Response Time' },
      { metric: '98.9%', label: 'Peak Conversion Efficiency' },
      { metric: '<8 ms', label: 'Seamless Islanding Transfer' },
      { metric: '15 kW', label: 'Continuous Output Power' },
    ],
    toolsAndTech: [
      'PLECS Power Electronics Simulation',
      'TI Code Composer Studio',
      'Altium Designer (High-Current 4oz Cu)',
      'Yokogawa WT5000 Power Analyzer',
      'Modbus TCP / SunSpec Protocol',
      'EMC Pre-Compliance Chamber',
    ],
    deliverables: [
      'Complete High-Voltage Schematic & 4oz Heavy Copper PCB Layout',
      'Real-Time C Firmware for DSP Inverter Control & MPPT Loops',
      'UL 1741 & IEEE 1547 Test Verification Documentation',
      'Factory Automated Test System (ATE) Calibration Guidelines',
    ],
  },
  'edge-vision-module': {
    id: 'edge-vision-module',
    year: '2024',
    category: 'AI & EMBEDDED',
    title: 'Edge AI Computer Vision Controller',
    client: 'Kinetix Robotics',
    timeline: '4 Months (Hardware & Neural Model Optimization)',
    tagline: '120 FPS Real-Time Defect Classification with Automotive CAN & Gigabit Ethernet',
    overview:
      'High-throughput optical inspection compute engine engineered for automated assembly lines, high-speed pick-and-place sorting, and precision robotic packaging. Integrates hardware neural processing accelerators with deterministic machine vision camera interfaces to detect micro-defects at line speeds.',
    icon: 'ai',
    challenge:
      'Processing multi-megapixel global shutter camera frames with sub-8ms inference latency while operating fanless inside hot factory control cabinets (+65°C ambient).',
    solution:
      'Engineered an edge compute board combining an NXP i.MX 8M Plus NPU with a dedicated FPGA image pre-processor. Quantized custom convolutional defect detection models to INT8, achieving 120 FPS classification throughput with zero dropped frames.',
    architecturePoints: [
      {
        title: 'Dedicated 2.3 TOPS Neural Processing Unit (NPU)',
        desc: 'Accelerated INT8 tensor operations performing defect classification in 5.8 milliseconds per frame.',
      },
      {
        title: 'Global Shutter MIPI-CSI2 Interface',
        desc: 'Zero-blur image acquisition of fast-moving products on conveyor belts traveling up to 4.5 m/s.',
      },
      {
        title: 'Automotive CAN-FD & Industrial Isolated Digital I/O',
        desc: 'Immediate optical reject trigger outputs with sub-microsecond deterministic response times.',
      },
      {
        title: 'Fanless Conduction Thermal Solution',
        desc: 'Direct die-to-chassis heat pipe routing keeping compute core temperatures under 72°C in hot enclosures.',
      },
    ],
    technicalSpecs: [
      { label: 'Compute Core', value: 'NXP i.MX 8M Plus Quad Cortex-A53 + NPU' },
      { label: 'NPU Throughput', value: '2.3 TOPS Dedicated Neural Accelerator' },
      { label: 'Camera Interface', value: 'Dual 4-Lane MIPI CSI-2 with Hardware ISP' },
      { label: 'Industrial Interfaces', value: 'CAN-FD, Gigabit Ethernet, 24V Opto-I/O' },
      { label: 'System Memory', value: '8GB LPDDR4 + 32GB eMMC Industrial' },
      { label: 'Operating Temp', value: '-40°C to +85°C Fanless Industrial' },
    ],
    keyMetrics: [
      { metric: '<8 ms', label: 'Inference Latency' },
      { metric: '120 FPS', label: 'Inspection Throughput' },
      { metric: '99.94%', label: 'Defect Detection Accuracy' },
      { metric: '0 dB', label: 'Silent Fanless Operation' },
    ],
    toolsAndTech: [
      'TensorFlow Lite / ONNX Runtime',
      'Yocto Linux Board Support Package',
      'Cadence Allegro High-Speed Design',
      'OpenCV Machine Vision Pipeline',
      'Ansys Icepak Thermal Simulation',
      'Keysight Signal Integrity Scope',
    ],
    deliverables: [
      'High-Speed 8-Layer HDI PCB Design & Manufacturing Package',
      'Custom Yocto Linux BSP with Hardware Accelerated ISP Drivers',
      'Quantized INT8 Deep Learning Inspection Model Pipelines',
      'Industrial CE & EN 61000-6-2 Electromagnetic Immunity Certification',
    ],
  },
};

interface PortfolioDetailModalProps {
  isOpen: boolean;
  portfolioId: string | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({
  isOpen,
  portfolioId,
  onClose,
  onOpenContact,
}) => {
  const cmsItem = useDetail<PortfolioDetailData>(portfolioId, fetchPortfolioItem);
  const item = cmsItem ?? (portfolioId ? PORTFOLIO_DETAILS[portfolioId] : null);

  if (!item) return null;

  const renderIcon = () => {
    switch (item.icon) {
      case 'iot':
        return <Radio className="w-6 h-6 text-[#0066FF]" />;
      case 'wearable':
        return <Activity className="w-6 h-6 text-[#0066FF]" />;
      case 'energy':
        return <Zap className="w-6 h-6 text-[#0066FF]" />;
      case 'ai':
        return <Eye className="w-6 h-6 text-[#0066FF]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#0066FF]" />;
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
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFFFF] border border-[#E2E8F0] rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.35)] text-[#0C0C0C] z-10 my-auto overflow-y-auto font-['Kanit',sans-serif]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#0066FF]/10 to-transparent blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Close Button */}
            <button
              id="close-portfolio-modal"
              type="button"
              onClick={onClose}
              aria-label="Close portfolio details"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-slate-200 bg-slate-100/90 flex items-center justify-center text-[#0C0C0C] hover:text-black hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all duration-200 z-20 cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Badge & Metadata */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/25 flex items-center justify-center shrink-0">
                {renderIcon()}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0066FF] tracking-wider uppercase px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20">
                {item.category} • {item.year}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#64748B]">
                <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-medium text-[#1E293B]">Client: {item.client}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#64748B]">
                <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{item.timeline}</span>
              </div>
            </div>

            {/* Main Heading & Tagline */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0C0C0C] leading-[1.08] mb-3">
                {item.title}
              </h2>
              <p className="text-base sm:text-lg text-[#0066FF] font-semibold tracking-wide uppercase">
                {item.tagline}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {item.keyMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0066FF] tracking-tight mb-1">
                    {m.metric}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#64748B] uppercase tracking-wider font-semibold">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Comprehensive Overview Paragraphs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-8 sm:mb-10 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#64748B] mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066FF]" />
                Project Engineering Overview
              </h3>
              <p className="text-sm sm:text-base text-[#1E293B] font-light leading-relaxed">
                {item.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 sm:mb-10">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF1F2] border border-rose-200">
                <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-tight mb-2.5 flex items-center gap-2 text-rose-700">
                  <Target className="w-4 h-4 text-rose-600" />
                  Engineering Challenge
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                  {item.challenge}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200">
                <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-tight mb-2.5 flex items-center gap-2 text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Delivered Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[#0C0C0C] mb-5 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0066FF]" />
                Hardware &amp; System Innovations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.architecturePoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0066FF]/50 hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    <h4 className="text-sm sm:text-base font-bold text-[#0C0C0C] uppercase tracking-tight mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                      {pt.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed pl-6">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs & Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
              {/* Specs Table */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
                <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#0066FF]" />
                  Technical Specifications
                </h4>
                <div className="divide-y divide-[#E2E8F0]">
                  {item.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#64748B] font-light">{spec.label}</span>
                      <span className="text-[#0C0C0C] font-mono font-medium text-right ml-3">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Tooling */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between gap-5 shadow-sm">
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-3 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#0066FF]" />
                    Project Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {item.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#334155] font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#0066FF]" />
                    Tools &amp; Simulation
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.toolsAndTech.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0066FF] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Portfolio Case Reference ({item.year})
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#CBD5E1] hover:bg-slate-100 text-[#0C0C0C] font-bold text-xs uppercase tracking-widest transition-all text-center cursor-pointer"
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
                      '0px 8px 25px rgba(0, 180, 216, 0.35), 0px 0px 20px rgba(0, 102, 255, 0.3)',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
                >
                  <span>INQUIRE ABOUT THIS SOLUTION</span>
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

export default PortfolioDetailModal;
