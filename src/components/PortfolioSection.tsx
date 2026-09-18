import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../lib/useCms';

interface PortfolioItem {
  id: string;
  year: string;
  category: string;
  title: string;
  client: string;
  scope: string[];
  description: string;
  metric: string;
  metricLabel: string;
  link?: string;
}

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const PORTFOLIO_FALLBACK: PortfolioItem[] = [
  {
    id: 'smart-connected-mesh',
    year: '2026',
    category: 'IoT & HARDWARE',
    title: 'Industrial Mesh Sensor Node',
    client: 'Global Logistics Corp',
    scope: ['PCB Design', 'Sub-GHz RF', 'Enclosure Engineering'],
    description:
      'Ultra-low-power environmental monitoring nodes transmitting telemetry over multi-hop LoRa mesh networks with 5+ years of battery lifespan.',
    metric: '99.98%',
    metricLabel: 'Packet Delivery Reliability',
    link: '#',
  },
  {
    id: 'nextgen-wearable',
    year: '2025',
    category: 'CONSUMER ELECTRONICS',
    title: 'Haptic Vitality Smart Tracker',
    client: 'Aura Healthtech',
    scope: ['Flex-PCB', 'BLE 5.3', 'Biometric Algorithms'],
    description:
      'Continuous PPG heart rate and galvanic skin response biometric band featuring custom flexible circuitry, miniature packaging, and waterproof sealing.',
    metric: '14 Days',
    metricLabel: 'Battery Runtime per Charge',
    link: '#',
  },
  {
    id: 'smart-energy-controller',
    year: '2025',
    category: 'ENERGY & AUTOMATION',
    title: 'Smart Microgrid Power Inverter',
    client: 'Solaris Energy Systems',
    scope: ['Power Electronics', 'Firmware', 'Modbus/MQTT Cloud'],
    description:
      'Bidirectional smart inverter controller managing dual-source photovoltaic generation and battery storage with sub-cycle peak power switching.',
    metric: '32% Faster',
    metricLabel: 'Grid Fault Response Time',
    link: '#',
  },
  {
    id: 'edge-vision-module',
    year: '2024',
    category: 'AI & EMBEDDED',
    title: 'Edge AI Computer Vision Controller',
    client: 'Kinetix Robotics',
    scope: ['Neural Accelerator', 'Automotive CAN', 'Thermal Design'],
    description:
      'High-throughput optical inspection module executing real-time defect classification on industrial assembly lines at 120 FPS latency.',
    metric: '<8ms',
    metricLabel: 'Inference Latency',
    link: '#',
  },
];

const CATEGORIES = ['ALL', 'IoT & HARDWARE', 'CONSUMER ELECTRONICS', 'ENERGY & AUTOMATION', 'AI & EMBEDDED'];

interface PortfolioSectionProps {
  onContactClick?: () => void;
  onPortfolioClick?: (portfolioId: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onContactClick,
  onPortfolioClick,
}) => {
  const { data } = usePortfolio<PortfolioItem>();
  const PORTFOLIO_DATA = data ?? PORTFOLIO_FALLBACK;

  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems =
    activeCategory === 'ALL'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 md:pb-14 relative z-10 -mt-10 sm:-mt-12 md:-mt-14"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={35} className="w-full flex flex-col items-center text-center mb-14 sm:mb-18 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.2em] uppercase">
              Proven Track Record
            </span>
          </div>

          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Portfolio
          </h2>

          <p className="text-[#4A5568] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed">
            Explore the products, systems, and technology solutions we&apos;ve engineered across electronics, IoT, AI, embedded systems, and manufacturing.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0C0C0C] text-white shadow-md'
                      : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0C0C0C]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {filteredItems.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.08}
              y={25}
              id={`portfolio-card-${item.id}`}
              onClick={() => onPortfolioClick?.(item.id)}
              className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-[32px] sm:rounded-[40px] bg-[#FAFAFA] border-2 border-[#E2E8F0] hover:border-[#0C0C0C] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Meta Row: Year + Category Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#0C0C0C]/5 text-[#0066FF] font-semibold text-xs tracking-wider uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0C0C0C] mb-3 group-hover:text-[#0066FF] transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Client Reference */}
                <div className="text-xs font-semibold text-[#64748B] tracking-wider uppercase mb-4">
                  Client: <span className="text-[#0C0C0C] font-bold">{item.client}</span>
                </div>

                {/* Description */}
                <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed font-light mb-6">
                  {item.description}
                </p>

                {/* Scope Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.scope.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-xs font-medium text-[#334155]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metric & Action Bar */}
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0C0C0C] tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">
                    {item.metricLabel}
                  </div>
                </div>

                <a
                  id={`portfolio-btn-${item.id}`}
                  href={item.link || '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPortfolioClick?.(item.id);
                  }}
                  className="w-11 h-11 rounded-full bg-[#0C0C0C] text-white flex items-center justify-center group-hover:bg-[#0066FF] transition-all duration-300 group-hover:scale-105 shadow-sm cursor-pointer"
                  title="View Case Details"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
