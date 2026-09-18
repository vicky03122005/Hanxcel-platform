import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Smartphone,
  Zap,
  Shield,
  Radio,
  Activity,
  Cog,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Wrench,
  Globe2,
  FileCheck2,
  Cpu,
  Compass,
} from 'lucide-react';
import { HanxcelLogo } from './HanxcelLogo';
import { useDetail } from '../lib/useCms';
import { fetchSolution } from '../lib/api';

export interface SolutionDetailData {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  fullOverview: string;
  icon: 'consumer' | 'energy' | 'defense' | 'iot' | 'medical' | 'industrial';
  architecturePoints: { title: string; desc: string }[];
  keyCapabilities: string[];
  certifications: string[];
  caseStudyExample: {
    title: string;
    impact: string;
  };
}

export const SOLUTION_DETAILS: Record<string, SolutionDetailData> = {
  'consumer-electronics': {
    id: 'consumer-electronics',
    tag: 'CONSUMER ELECTRONICS',
    title: 'Smart Products & Connected Experiences',
    tagline: 'High-Fidelity Audio, Smart Wearables & Next-Gen Smart Home Ecosystems',
    description:
      'We develop smart home devices, wearable technology, and connected consumer products designed for seamless connectivity, usability, and everyday experiences.',
    fullOverview:
      'In the competitive consumer hardware landscape, user delight depends on ultra-compact miniaturization, battery longevity, and frictionless wireless connectivity. Hanxcel delivers complete product realization for consumer brands—engineering custom flex-rigid PCBs, Bluetooth 5.4 Low Energy stacks, capacitive touch interfaces, and ergonomic enclosure tooling. We bridge consumer aesthetic demands with rugged engineering that excels in daily use.',
    icon: 'consumer',
    architecturePoints: [
      {
        title: 'Ultra-Compact HDI & Flex-Rigid PCB',
        desc: 'Sub-millimeter component density allowing sleek, ergonomic form factors for wearables and handheld gadgets.',
      },
      {
        title: 'Power-Adaptive Firmware',
        desc: 'Intelligent sleep states and ultra-low quiescent current (<5µA) yielding multi-week battery longevity.',
      },
      {
        title: 'Zero-Friction Companion Apps',
        desc: 'Instant BLE pairing, seamless Wi-Fi credential onboarding, and responsive iOS/Android synchronization.',
      },
      {
        title: 'Rapid Acoustic & Ergonomic Validation',
        desc: 'Precision 3D SLA/SLS acoustic prototyping, water-resistance testing (IP67/68), and drop-impact simulation.',
      },
    ],
    keyCapabilities: [
      'Smart Home Hubs & Matter/Thread Integration',
      'Continuous Biometric Wearables & Optical PPG',
      'True Wireless Stereo (TWS) Audio & DSP Tuning',
      'Qi & MagSafe Compatible Fast Wireless Charging',
      'Over-The-Air (OTA) Dual-Bank Firmware Upgrades',
    ],
    certifications: ['CE', 'FCC Part 15', 'Bluetooth SIG', 'RoHS / WEEE', 'USB-IF'],
    caseStudyExample: {
      title: 'Smart Biometric Ring Tracker',
      impact: 'Engineered 18-day battery life on a 22mAh micro-lipo cell with sub-1% heart rate variance against medical ECG.',
    },
  },
  'energy-utilities': {
    id: 'energy-utilities',
    tag: 'ENERGY & UTILITIES',
    title: 'Smart Energy Systems & Microgrids',
    tagline: 'Grid Edge Intelligence, High-Current Power Electronics & Renewable Storage',
    description:
      'We engineer connected and energy-efficient technologies that help address modern energy challenges through smarter monitoring and intelligent systems.',
    fullOverview:
      'The transition to clean energy demands robust power conversion, bidirectional smart metering, and decentralized microgrid telemetry. Hanxcel designs high-voltage Silicon Carbide (SiC) and Gallium Nitride (GaN) power inverters, high-accuracy current-sensing frontends, and cellular-connected energy management gateways that operate reliably across extreme industrial temperatures (-40°C to +85°C).',
    icon: 'energy',
    architecturePoints: [
      {
        title: 'Wide Bandgap Power Inverters (SiC / GaN)',
        desc: 'Up to 99.2% electrical efficiency with reduced magnetics size and superior thermal dissipation.',
      },
      {
        title: 'Class 0.2S Revenue-Grade Metering',
        desc: 'High-precision polyphase metering IC integration for instantaneous RMS voltage, current, and harmonics.',
      },
      {
        title: 'Decentralized Microgrid Synchronization',
        desc: 'Sub-millisecond grid-tie phase matching, islanding protection, and demand-response load balancing.',
      },
      {
        title: 'Resilient Long-Range Telemetry',
        desc: 'Dual-path cellular NB-IoT and LoRaWAN fallback for remote substations and solar farm deployments.',
      },
    ],
    keyCapabilities: [
      'Solar Microinverters & MPPT Charge Controllers',
      'Battery Management Systems (BMS) for EV & ESS',
      'Bidirectional EV Fast Chargers (Level 3 DC)',
      'Substation Condition Monitoring Sensors',
      'Smart Grid SCADA & DNP3 / Modbus TCP Protocols',
    ],
    certifications: ['UL 1741', 'IEEE 1547', 'IEC 62053-22', 'IEC 61850', 'CE-LVD'],
    caseStudyExample: {
      title: 'Commercial Solar Energy Storage BMS',
      impact: 'Designed 800V 120kW BMS with active cell balancing, extending pack cycle life by 24% in high-heat desert environments.',
    },
  },
  'defense-aerospace': {
    id: 'defense-aerospace',
    tag: 'DEFENSE & AEROSPACE',
    title: 'High-Reliability Electronics & Rugged Compute',
    tagline: 'Mission-Critical Avionics, Radiation-Tolerant Compute & Secure Communications',
    description:
      'We develop high-reliability electronic systems and components engineered to perform under critical conditions where precision and operational reliability matter.',
    fullOverview:
      'When failure is not an option, Hanxcel engineers mission-grade electronics built to endure intense vibration, severe thermal shock, electromagnetic pulses (EMP), and radiation. Our aerospace engineering team follows strict DO-254 and DO-178C guidelines, leveraging FPGA-accelerated computing, ruggedized VPX backplanes, conformal coating, and tamper-resistant cryptographic enclaves.',
    icon: 'defense',
    architecturePoints: [
      {
        title: 'DO-254 / DO-178C Level A Compliance',
        desc: 'Deterministic avionics hardware and safety-critical RTOS software design with complete traceability.',
      },
      {
        title: 'Conformal Coating & Potting Encapsulation',
        desc: 'Military-grade polyurethanes and silicones protecting boards from moisture, salt spray, and extreme G-forces.',
      },
      {
        title: 'Hardware Anti-Tamper & Zeroization',
        desc: 'Cryptographic enclaves featuring active mesh sensors and instantaneous zeroize triggers on chassis breach.',
      },
      {
        title: 'Thermal Conduction Cooling',
        desc: 'Fanless conduction-cooled rugged enclosures dissipating over 200W through cold-plate thermal paths.',
      },
    ],
    keyCapabilities: [
      'Rugged Single Board Computers (3U / 6U OpenVPX)',
      'Software-Defined Radio (SDR) Transceivers (UHF/VHF/Ku)',
      'Inertial Navigation Systems (INS) & GPS-Denied Dead Reckoning',
      'UAV Flight Controller & Motor ESC Subsystems',
      'MIL-STD-810H & MIL-STD-461G Pre-Compliance Testing',
    ],
    certifications: ['MIL-STD-810H', 'MIL-STD-461G', 'DO-254 / DO-178C', 'IPC-A-610 Class 3', 'AS9100 Rev D Ready'],
    caseStudyExample: {
      title: 'Autonomous UAV Avionics Hub',
      impact: 'Delivered an integrated triple-redundant flight control computer that passed continuous 40G shock and vibration tests.',
    },
  },
  'iot-connected-systems': {
    id: 'iot-connected-systems',
    tag: 'IoT & CONNECTED SYSTEMS',
    title: 'End-to-End IoT Solutions & Mesh Networks',
    tagline: 'Industrial Sensor Clusters, Edge Gateways & Global Cloud Telemetry',
    description:
      'We build connected IoT ecosystems that bring together hardware, firmware, and cloud integration to enable smarter homes, industries, and environments.',
    fullOverview:
      'Hanxcel builds massive-scale IoT systems that collect, sanitize, and transmit critical telemetry from tens of thousands of edge devices to enterprise cloud warehouses. We design custom low-power multi-radio gateways (BLE 5.4, LoRaWAN, Cellular LTE-M, Thread/Matter), automated zero-touch provisioning tools, and encrypted bi-directional cloud control planes.',
    icon: 'iot',
    architecturePoints: [
      {
        title: 'Multi-Radio Mesh Architecture',
        desc: 'Self-healing mesh topology enabling reliable coverage across vast industrial factories and agricultural farms.',
      },
      {
        title: 'Zero-Touch Secure Provisioning',
        desc: 'Automated factory cryptographic key injection ensuring plug-and-play mutual TLS authentication to AWS/Azure.',
      },
      {
        title: 'Edge Pre-Processing & Compression',
        desc: 'Local edge data filtering reducing cellular bandwidth costs by over 70% while preserving anomaly alerts.',
      },
      {
        title: 'Dynamic Power Harvesting',
        desc: 'Solar and thermoelectric micro-energy harvesting for continuous 10+ year maintenance-free outdoor deployments.',
      },
    ],
    keyCapabilities: [
      'Multi-Sensor Environmental & Asset Tracking Nodes',
      'Industrial Edge Gateways with Dual SIM Failover',
      'Private LoRaWAN Base Stations & Cloud Network Servers',
      'Enterprise AWS IoT Core / Azure IoT Hub Connectors',
      'Micro-Power Energy Harvesting Circuit Design',
    ],
    certifications: ['FCC / IC / CE-RED', 'PTCRB & AT&T/Verizon Carrier Certified', 'LoRa Alliance', 'RoHS / REACH'],
    caseStudyExample: {
      title: 'Global Cold-Chain Logistics Tracker',
      impact: 'Deployed 60,000+ real-time temperature & vibration tracking beacons with 5-year battery life and global satellite roaming.',
    },
  },
  'medical-devices': {
    id: 'medical-devices',
    tag: 'MEDICAL DEVICES',
    title: 'Precision Medical Technology & Diagnostics',
    tagline: 'ISO 13485 Compliant Patient Monitoring, Diagnostic Electronics & MedTech',
    description:
      'We design advanced electronic solutions for medical applications with a focus on precision, reliability, compliance, and innovation.',
    fullOverview:
      'In medical instrumentation, precision and patient safety are paramount. Hanxcel engineers clinical-grade analog frontends (AFE), galvanic patient isolation barriers, wearable biometric patches, and optical diagnostic analyzers. We strictly adhere to ISO 13485 quality systems, IEC 60601-1 electrical safety standards, and FDA 21 CFR 820 Design Controls throughout every phase.',
    icon: 'medical',
    architecturePoints: [
      {
        title: 'IEC 60601-1 3rd Ed. & 2xMOPP Isolation',
        desc: '4000V reinforced galvanic patient isolation protecting both patients and sensitive measurement amplifiers.',
      },
      {
        title: 'Ultra-Low Noise Clinical Bio-Frontends',
        desc: 'Sub-microvolt ECG, EEG, EMG, and multi-wavelength SpO2 analog signal capture with 24-bit delta-sigma ADCs.',
      },
      {
        title: 'FDA Design History File (DHF) Documentation',
        desc: 'Complete ISO 14971 risk management files, verification matrices, and biocompatibility documentation.',
      },
      {
        title: 'Sterilizable & Biocompatible Enclosures',
        desc: 'Medical-grade polymer enclosures resistant to autoclave sterilization, chemical disinfectants, and ingress.',
      },
    ],
    keyCapabilities: [
      'Multiparameter Vital Signs Patient Monitors',
      'Wearable Continuous Cardiac ECG Holter Patches',
      'In-Vitro Diagnostic (IVD) Optical Spectrometers',
      'Insulin Pumps & Smart Drug Delivery Controllers',
      'Medical Ultrasonic Transducer Drive Electronics',
    ],
    certifications: ['ISO 13485:2016', 'IEC 60601-1 (Electrical Safety)', 'IEC 60601-1-2 (EMC)', 'FDA 510(k) Ready'],
    caseStudyExample: {
      title: 'Continuous ICU-Grade ECG/SpO2 Patch',
      impact: 'Engineered a wireless 7-day disposable patch with medical clinical validation and direct HL7 EHR hospital integration.',
    },
  },
  'industrial-automation': {
    id: 'industrial-automation',
    tag: 'INDUSTRIAL AUTOMATION',
    title: 'Intelligent Industrial Systems & Industry 4.0',
    tagline: 'Rugged PLCs, Motor Controllers, Vibration Analytics & Predictive AI',
    description:
      'We create intelligent control and automation technologies that improve industrial efficiency, productivity, and operational reliability.',
    fullOverview:
      'We empower smart factories with deterministic control electronics, fieldbus communication modules, and real-time edge AI diagnostics. From high-power brushless DC (BLDC) motor drivers and PLC controllers to wireless vibration sensors for predictive maintenance, Hanxcel engineers rugged industrial hardware that eliminates unplanned plant downtime.',
    icon: 'industrial',
    architecturePoints: [
      {
        title: 'Real-Time Industrial Fieldbus Networks',
        desc: 'Sub-microsecond synchronization supporting EtherCAT, PROFINET, Modbus TCP, CANopen, and IO-Link.',
      },
      {
        title: 'Vibration Anomaly Detection with Edge TinyML',
        desc: 'High-frequency 3-axis MEMS accelerometer FFT analysis predicting bearing failure weeks in advance.',
      },
      {
        title: 'High-Power BLDC / PMSM Motor Control',
        desc: 'Field-Oriented Control (FOC) algorithms driving multi-kilowatt robotic joints with smooth torque delivery.',
      },
      {
        title: 'Severe Surge & Transient Protection',
        desc: 'TVS diodes, optocouplers, and gas discharge tubes rated for harsh IEC 61000-4-5 4kV industrial surges.',
      },
    ],
    keyCapabilities: [
      'Modular Programmable Logic Controllers (PLCs)',
      'Multi-Axis Servo & Stepper Motor Drive Controllers',
      'Predictive Maintenance 4.0 Vibration Sensors',
      'Industrial Human-Machine Interfaces (HMI)',
      'Isolated Analog I/O & RTD/Thermocouple Modules',
    ],
    certifications: ['IEC 61131-2', 'IEC 61000-6-2 (Immunity)', 'IEC 61000-6-4 (Emissions)', 'UL 508A', 'CE'],
    caseStudyExample: {
      title: 'High-Speed CNC Vibration Telemetry Node',
      impact: 'Detected motor spindle degradation 14 days before failure across 250 factory CNC machines, preventing $400k+ in downtime.',
    },
  },
};

interface SolutionDetailModalProps {
  isOpen: boolean;
  solutionId: string | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({
  isOpen,
  solutionId,
  onClose,
  onOpenContact,
}) => {
  const cmsSolution = useDetail<SolutionDetailData>(solutionId, fetchSolution);
  const solution = cmsSolution ?? (solutionId ? SOLUTION_DETAILS[solutionId] : null);

  if (!solution) return null;

  const renderIcon = () => {
    switch (solution.icon) {
      case 'consumer':
        return <Smartphone className="w-6 h-6 text-[#00D4FF]" />;
      case 'energy':
        return <Zap className="w-6 h-6 text-[#00D4FF]" />;
      case 'defense':
        return <Shield className="w-6 h-6 text-[#00D4FF]" />;
      case 'iot':
        return <Radio className="w-6 h-6 text-[#00D4FF]" />;
      case 'medical':
        return <Activity className="w-6 h-6 text-[#00D4FF]" />;
      case 'industrial':
        return <Cog className="w-6 h-6 text-[#00D4FF]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#00D4FF]" />;
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0C0C] border-2 border-white/15 rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(0,102,255,0.3)] text-[#D7E2EA] z-10 my-auto overflow-y-auto font-['Kanit',sans-serif]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#0066FF]/20 to-transparent blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#00D4FF]/15 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Close Button */}
            <button
              id="close-solution-modal"
              type="button"
              onClick={onClose}
              aria-label="Close solution details"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Badge & Tag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0">
                {renderIcon()}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#00D4FF] tracking-wider uppercase">
                INDUSTRY SOLUTION • {solution.tag}
              </span>
            </div>

            {/* Main Heading & Tagline */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.08] mb-3">
                {solution.title}
              </h2>
              <p className="text-base sm:text-lg text-[#00A3FF] font-semibold tracking-wide uppercase">
                {solution.tagline}
              </p>
            </div>

            {/* Comprehensive Overview Paragraphs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 sm:mb-10">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#94A3B8] mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066FF]" />
                Industry Impact &amp; Engineering Narrative
              </h3>
              <p className="text-sm sm:text-base text-[#D7E2EA] font-light leading-relaxed">
                {solution.fullOverview}
              </p>
            </div>

            {/* Architecture Highlights Grid */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white mb-5 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0066FF]" />
                Hardware Architecture &amp; System Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {solution.architecturePoints.map((item, idx) => (
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

            {/* Key Capabilities & Industry Certifications Two-Column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
              {/* Capabilities */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00D4FF]" />
                  Core Subsystems &amp; Capabilities
                </h4>
                <ul className="space-y-2.5">
                  {solution.keyCapabilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA] font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Case Study Example & Certifications */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-5">
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                    Featured Project Impact
                  </h4>
                  <p className="text-xs font-bold text-[#00A3FF] uppercase mb-1">
                    {solution.caseStudyExample.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                    {solution.caseStudyExample.impact}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight mb-3 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#00D4FF]" />
                    Standards &amp; Regulatory Compliance
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {solution.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-xs font-mono text-[#00D4FF]"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Specialized Solutions Portfolio
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
                  <span>REQUEST SOLUTION PROPOSAL</span>
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

export default SolutionDetailModal;
