import React from 'react';
import { FadeIn } from './FadeIn';
import {
  Smartphone,
  Zap,
  Shield,
  Radio,
  Activity,
  Cog,
  Sparkles,
  Layers,
} from 'lucide-react';

import { useSolutions } from '../lib/useCms';

interface SolutionCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * The CMS stores `icon` as a lucide component NAME; this turns it back into the
 * component the grid below renders.
 */
const SOLUTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Zap,
  Shield,
  Radio,
  Activity,
  Cog,
  Sparkles,
  Layers,
};

type ApiSolution = Omit<SolutionCard, 'icon'> & { icon: string };

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const SOLUTIONS_FALLBACK: SolutionCard[] = [
  {
    id: 'consumer-electronics',
    tag: 'CONSUMER ELECTRONICS',
    title: 'Smart Products & Connected Experiences',
    description:
      'We develop smart home devices, wearable technology, and connected consumer products designed for seamless connectivity, usability, and everyday experiences.',
    highlights: [
      'Smart home devices',
      'Wearable technology',
      'Connected personal electronics',
    ],
    icon: Smartphone,
  },
  {
    id: 'energy-utilities',
    tag: 'ENERGY & UTILITIES',
    title: 'Smart Energy Systems',
    description:
      'We engineer connected and energy-efficient technologies that help address modern energy challenges through smarter monitoring and intelligent systems.',
    highlights: [
      'Smart metering',
      'Energy-efficient technologies',
      'Sustainable connected systems',
    ],
    icon: Zap,
  },
  {
    id: 'defense-aerospace',
    tag: 'DEFENSE & AEROSPACE',
    title: 'High-Reliability Electronics',
    description:
      'We develop high-reliability electronic systems and components engineered to perform under critical conditions where precision and operational reliability matter.',
    highlights: [
      'High-reliability electronics',
      'Critical-condition systems',
      'Precision engineering',
    ],
    icon: Shield,
  },
  {
    id: 'iot-connected-systems',
    tag: 'IoT & CONNECTED SYSTEMS',
    title: 'End-to-End IoT Solutions',
    description:
      'We build connected IoT ecosystems that bring together hardware, firmware, and cloud integration to enable smarter homes, industries, and environments.',
    highlights: [
      'IoT hardware',
      'Firmware integration',
      'Cloud-connected systems',
    ],
    icon: Radio,
  },
  {
    id: 'medical-devices',
    tag: 'MEDICAL DEVICES',
    title: 'Precision Medical Technology',
    description:
      'We design advanced electronic solutions for medical applications with a focus on precision, reliability, compliance, and innovation.',
    highlights: [
      'Medical monitoring',
      'Diagnostic systems',
      'Medical electronics',
    ],
    icon: Activity,
  },
  {
    id: 'industrial-automation',
    tag: 'INDUSTRIAL AUTOMATION',
    title: 'Intelligent Industrial Systems',
    description:
      'We create intelligent control and automation technologies that improve industrial efficiency, productivity, and operational reliability.',
    highlights: [
      'Intelligent control systems',
      'Predictive maintenance',
      'Industrial automation',
    ],
    icon: Cog,
  },
];

interface SolutionsSectionProps {
  onSolutionClick?: (solutionId: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onSolutionClick }) => {
  const { data } = useSolutions<ApiSolution>();
  const SOLUTIONS: SolutionCard[] = data
    ? data.map((s) => ({ ...s, icon: SOLUTION_ICONS[s.icon] ?? Sparkles }))
    : SOLUTIONS_FALLBACK;

  return (
    <section
      id="solutions"
      className="bg-[#0C0C0C] text-[#D7E2EA] relative px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-36 overflow-hidden rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, #0066FF 70%, transparent 100%)' }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <FadeIn delay={0} y={35} className="w-full flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <Layers className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              END - END CAPABILITIES
            </span>
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Solutions
          </h2>
          <p className="text-[#A5B5C1] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed">
            Integrated electronic and digital solutions engineered to bridge the gap between vision, hardware
            prototyping, scalable manufacturing, and real-world deployment.
          </p>
        </FadeIn>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {SOLUTIONS.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <FadeIn
                key={solution.id}
                delay={index * 0.08}
                y={25}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-[36px] sm:rounded-[42px] bg-[#0C0C0C] border-2 border-[#D7E2EA] transition-all duration-300 hover:border-[#00D4FF] hover:shadow-[0_10px_35px_rgba(0,212,255,0.2)] hover:-translate-y-1.5 cursor-pointer"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSolutionClick?.(solution.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSolutionClick?.(solution.id);
                    }
                  }}
                  className="flex flex-col justify-between h-full w-full text-left focus:outline-none"
                >
                  <div>
                    {/* Top Bar: Icon + Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#00D4FF] group-hover:scale-110 group-hover:bg-[#0066FF]/20 group-hover:border-[#00D4FF]/50 transition-all duration-300">
                        <IconComponent className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider text-[#738A9C] uppercase group-hover:text-[#00D4FF] transition-colors duration-200">
                        {solution.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-[#00D4FF] transition-colors duration-300">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#9BAEC0] text-sm sm:text-base leading-relaxed font-light mb-6">
                      {solution.description}
                    </p>
                  </div>

                  {/* Highlights List + Callout */}
                  <div className="pt-5 border-t border-[rgba(255,255,255,0.06)]">
                    <ul className="space-y-2 mb-4">
                      {solution.highlights.map((item) => (
                        <li key={item} className="flex items-center text-xs sm:text-sm text-[#D7E2EA] font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mr-2.5 shrink-0 opacity-80" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A3FF] uppercase tracking-wider group-hover:text-[#00D4FF] transition-colors">
                      <span>View Solution Architecture</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
