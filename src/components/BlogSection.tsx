import React, { useState } from 'react';
import { BookOpen, Clock, ArrowUpRight, X, Calendar, User, CheckCircle2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import WirelessImage from '../assets/images/Wireless.png';
import { useBlog } from '../lib/useCms';
import { resolveImage } from '../lib/images';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'HARDWARE & PCB' | 'EMBEDDED & IOT' | 'MANUFACTURING' | 'EDGE AI';
  readTime: string;
  date: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    introduction: string;
    keyPoints: string[];
    deepDive: string;
    conclusion: string;
  };
}

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const BLOG_FALLBACK: BlogPost[] = [
  {
    id: 'pcb-signal-integrity-emi',
    title: 'Overcoming High-Speed Signal Integrity & EMI in Multi-Layer PCBs',
    excerpt:
      'A practical guide to controlled impedance routing, ground plane stitching, return current paths, and passing rigorous FCC Class B testing on the first spin.',
    category: 'HARDWARE & PCB',
    readTime: '6 min read',
    date: 'Sep 08, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Vigneshwaran K.',
      role: 'Lead Hardware Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    content: {
      introduction:
        'As clock speeds and edge transition rates climb into the gigahertz realm, trace geometry ceases to act as simple resistive wire and transitions into transmission lines. Understanding electromagnetic wave propagation and ground return currents is essential for modern hardware reliability.',
      keyPoints: [
        'Calculating dielectric constant tolerances across FR4 vs. Rogers high-frequency laminates.',
        'Continuous reference planes and avoiding split plane crossing for differential pairs.',
        'Symmetrical via placement and ground shielding vias to suppress cross-talk by over 18dB.',
        'Decoupling capacitor placement directly on BGA power balls to suppress PDN resonance.',
      ],
      deepDive:
        'During our recent 12-layer industrial gateway revision, high-speed DDR4 memory traces exhibited intermittent signal reflection. By simulating the power distribution network (PDN) impedance across frequency spectrums up to 3GHz, we re-tuned the termination resistor values and re-routed ground return stitching vias adjacent to layer transitions, immediately reducing jitter by 42%.',
      conclusion:
        'Prioritizing signal integrity during schematic and preliminary floorplanning saves weeks of costly board respins and guarantees smooth compliance lab qualification.',
    },
  },
  {
    id: 'ultra-low-power-iot-firmware',
    title: 'Ultra-Low Power Firmware Architectures for Battery-Powered Edge IoT',
    excerpt:
      'How to design deterministic event loops, sleep states, and sensor sampling pipelines to achieve 5+ years of battery life on a single coin cell.',
    category: 'EMBEDDED & IOT',
    readTime: '8 min read',
    date: 'Aug 28, 2026',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Priya Sundaram',
      role: 'Embedded Systems Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    content: {
      introduction:
        'In field-deployed telemetry devices and medical wearables, energy budget is the ultimate architectural constraint. Achieving sub-microamp quiescent sleep current demands seamless harmony between silicon hardware switches and interrupt-driven firmware.',
      keyPoints: [
        'Configuring asynchronous DMA peripherals to sample sensors while keeping MCU cores in Deep Sleep.',
        'Choosing LDOs with ultra-low quiescent current (<500nA) and fast transient wake-up times.',
        'Batching radio transmissions with adaptive payload compression to minimize active TX window.',
        'Watchdog timer fail-safes and brownout detection calibration without excessive power draw.',
      ],
      deepDive:
        'By transitioning from polling routines to FreeRTOS tickless idle modes on a Nordic nRF52840 SoC, the average system consumption plummeted from 2.4mA to 3.8µA. Utilizing an onboard accelerometer hardware FIFO allowed the core to wake once every 60 seconds instead of hundreds of times per second.',
      conclusion:
        'Every microamp saved in software directly translates into years of operational field reliability and reduced maintenance expenditure for connected devices.',
    },
  },
  {
    id: 'hardware-dfm-checklist-10k-units',
    title: 'From Lab Prototype to 10k Units: The Comprehensive Hardware DFM Checklist',
    excerpt:
      'Avoid costly manufacturing yield traps. Detailed strategies for automated optical inspection (AOI), SMT panelization, test jigs, and component sourcing resilience.',
    category: 'MANUFACTURING',
    readTime: '10 min read',
    date: 'Aug 14, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Aditya Sen',
      role: 'Manufacturing & DFM Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    content: {
      introduction:
        'Building a working bench prototype is only 20% of the journey. Scaling a product to 10,000 units requires engineering for high automated assembly yield, testability, component second-sourcing, and enclosure tolerance stack-ups.',
      keyPoints: [
        'Standardizing SMT component packages (0402 minimum for cost-effective automated placement).',
        'Designing bed-of-nails test points on a dedicated 2.54mm grid for automated ICT testing.',
        'Fiducial marker placement at opposite board corners to calibrate pick-and-place cameras.',
        'Dual-sourcing critical passives and ICs to eliminate supply chain line shutdowns.',
      ],
      deepDive:
        'During our mass manufacturing ramp for a smart energy meter, we integrated a custom automated pogo-pin test jig. In under 14 seconds per board, the fixture flashed firmware, calibrated the metering ADC, tested wireless RSSI, and logged UID certificates directly to the cloud database.',
      conclusion:
        'Investing in rigorous DFM reviews before tooling cuts warranty risks, boosts first-pass yield above 99%, and dramatically accelerates time-to-volume.',
    },
  },
  {
    id: 'edge-ai-cortex-m-quantization',
    title: 'Deploying Quantized Edge AI Models on ARM Cortex-M Microcontrollers',
    excerpt:
      'Running real-time computer vision and vibration anomaly detection directly on edge microcontrollers with INT8 quantization and CMSIS-NN optimization.',
    category: 'EDGE AI',
    readTime: '7 min read',
    date: 'Jul 29, 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Farhan Zaidi',
      role: 'Edge AI & Firmware Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    content: {
      introduction:
        'Edge AI eliminates cloud latency, reduces bandwidth costs, and guarantees privacy by processing neural networks locally on microcontrollers with constrained SRAM and Flash resources.',
      keyPoints: [
        'Post-training quantization from FP32 to INT8 with minimal accuracy loss (<1.2%).',
        'CMSIS-NN SIMD instruction acceleration for vector dot products on Cortex-M4/M7/M55 cores.',
        'Memory buffer reuse strategies to keep tensor arenas strictly within 256KB SRAM.',
        'On-device anomaly detection for predictive maintenance in industrial pumps and motors.',
      ],
      deepDive:
        'We implemented a MobileNetV2-based classification pipeline on an STM32H7 microcontroller. With 8-bit weight quantization and DSP-accelerated convolution routines, inference latency dropped from 480ms to 62ms per frame, drawing under 45mA during active computation.',
      conclusion:
        'TinyML has reached enterprise maturity. Intelligent silicon sensors can now perceive and classify physical world events locally without constant cloud connectivity.',
    },
  },
  {
    id: 'rf-antenna-tuning-certification',
    title: 'RF Antenna Tuning & Wireless Certification: FCC & CE Demystified',
    excerpt:
      'A field-tested approach to matching networks, anechoic chamber testing, antenna clearance zones, and mitigating spurious harmonics.',
    category: 'HARDWARE & PCB',
    readTime: '5 min read',
    date: 'Jul 12, 2026',
    image: WirelessImage,
    author: {
      name: 'Vigneshwaran K.',
      role: 'Lead Hardware Architect',
      avatar: WirelessImage,
    },
    content: {
      introduction:
        'Failing regulatory wireless certification can halt product shipment for months. Proper antenna feedline geometry, ground clearance, and vector network analyzer (VNA) tuning are non-negotiable for wireless success.',
      keyPoints: [
        'Calculating Pi-network matching component values on Smith Charts for exact 50-ohm resonance.',
        'Ground plane clearance zones for chip antennas vs. custom PCB inverted-F antennas (IFA).',
        'Managing harmonics radiated by switching buck converters into the 2.4GHz ISM band.',
        'Pre-compliance spectrum analysis using near-field magnetic probes to catch radiation hotspots early.',
      ],
      deepDive:
        'In an ultra-compact GPS & LTE tracker enclosure, detuning occurred due to battery proximity. By recalibrating the matching inductor and adjusting the clearance keep-out zone by 1.8mm, radiated power (TRP) improved by +4.2dBm, cutting satellite lock time in half.',
      conclusion:
        'Proactive RF simulation combined with localized pre-compliance verification eliminates expensive lab retests and ensures rapid global deployment.',
    },
  },
  {
    id: 'dual-mcu-safety-robotics',
    title: 'Dual-MCU Safety Architectures in Industrial Robotics & Motor Drives',
    excerpt:
      'Designing fault-tolerant hardware interlocks, redundant encoder feedback loops, and isolated CAN communications for mission-critical automation.',
    category: 'EMBEDDED & IOT',
    readTime: '9 min read',
    date: 'Jun 24, 2026',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Priya Sundaram',
      role: 'Embedded Systems Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    content: {
      introduction:
        'In automated guided vehicles (AGVs) and collaborative robotic arms, an unhandled sensor glitch or stuck gate driver can cause catastrophic physical damage. Redundant cross-checking architectures provide mandatory safety fail-safes.',
      keyPoints: [
        'Primary trajectory planner MCU coupled with a dedicated safety watchdog supervisor.',
        'Cross-monitoring SPI heartbeat loops with deterministic 5ms fault-trip windows.',
        'Hardware-level emergency stop circuits physically disabling gate power rails independently of software.',
        'Optically isolated industrial CAN-bus interfaces immune to inductive motor back-EMF spikes.',
      ],
      deepDive:
        'We implemented this dual-microcontroller architecture for a 48V 100A automated factory AMR. When the supervisor detected a 2% divergence in wheel encoder delta compared to IMU velocity, it safely engaged regenerative dynamic braking within 8 milliseconds.',
      conclusion:
        'Hardware safety must be built into the architectural foundation, providing provable fail-safe reliability for autonomous industrial machines.',
    },
  },
];

const CATEGORIES = ['ALL', 'HARDWARE & PCB', 'EMBEDDED & IOT', 'MANUFACTURING', 'EDGE AI'] as const;

export const BlogSection: React.FC = () => {
  const { data } = useBlog<BlogPost>();
  const BLOG_POSTS = data ?? BLOG_FALLBACK;

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts =
    activeCategory === 'ALL'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <section
      id="blog"
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] z-20 relative px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-16 pb-28 sm:pb-36 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <BookOpen className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              ENGINEERING INSIGHTS
            </span>
          </span>

          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-5"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Blog
          </h2>

          <p className="text-[#A5B5C1] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            Technical blueprints, hardware architecture teardowns, firmware strategies, and manufacturing insights directly from our lab.
          </p>
        </FadeIn>

        {/* Category Filter Pills */}
        <FadeIn delay={0.1} y={20} className="w-full flex items-center justify-center mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#141414] border border-white/10 rounded-full max-w-3xl">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0C0C0C] shadow-md scale-105'
                      : 'text-[#9BAEC0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPosts.map((post, index) => (
            <FadeIn
              key={post.id}
              delay={index * 0.08}
              y={30}
              className="group bg-[#161616] border border-white/10 rounded-[26px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white hover:-translate-y-1.5 shadow-2xl"
            >
              <div>
                {/* Image Container */}
                <div className="w-full h-52 sm:h-56 relative overflow-hidden bg-black">
                  <img
                    src={resolveImage(post.image)}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#00D4FF] text-[10px] font-bold tracking-widest uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#9BAEC0] mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00D4FF]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#A5B5C1] text-sm leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author & Read Trigger */}
              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={resolveImage(post.author.avatar)}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {post.author.name}
                    </p>
                    <p className="text-[10px] text-[#9BAEC0] truncate">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-white/20 group-hover:border-white text-xs font-medium text-white group-hover:bg-white group-hover:text-[#0C0C0C] transition-all duration-300 shrink-0"
                >
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-white/20 rounded-[28px] max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl p-6 sm:p-9 text-[#D7E2EA] relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#9BAEC0] mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00D4FF] font-bold text-[10px] tracking-wider uppercase">
                  {selectedPost.category}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.date}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
                {selectedPost.title}
              </h2>

              {/* Author Banner */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-[20px] bg-white/5 border border-white/10 mb-8">
                <img
                  src={resolveImage(selectedPost.author.avatar)}
                  alt={selectedPost.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {selectedPost.author.name}
                  </h4>
                  <p className="text-xs text-[#9BAEC0]">{selectedPost.author.role}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-6 text-sm sm:text-base font-light leading-relaxed text-[#CBD5E1]">
                <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed">
                  {selectedPost.content.introduction}
                </p>

                {/* Key Points */}
                <div className="p-5 sm:p-6 rounded-[22px] bg-[#1A1A1A] border border-white/10">
                  <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D4FF]" />
                    Key Engineering Takeaways
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#A5B5C1]">
                    {selectedPost.content.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0066FF] font-bold mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Technical Deep Dive</h3>
                  <p>{selectedPost.content.deepDive}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">Conclusion</h3>
                  <p>{selectedPost.content.conclusion}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#9BAEC0]">
                  Published by Hanxcel AI Technologies Lab
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-full bg-white text-[#0C0C0C] font-bold text-xs uppercase hover:bg-[#00D4FF] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
