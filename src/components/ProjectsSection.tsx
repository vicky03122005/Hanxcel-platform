import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectItem } from '../types';
import { useProjects } from '../lib/useCms';
import { resolveImage } from '../lib/images';
import SmartConnectedDeviceImage from '../assets/images/SmartConnectedDevice.png';
import IntelligentControlSystemImage from '../assets/images/IntelligentControlSystem.png';
import IndustrialIoTPlatformImage from '../assets/images/IndustrialIoTPlatform.png';

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const PROJECTS_FALLBACK: ProjectItem[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    name: 'CONSUMER ELECTRONICS',
    buttonText: 'VIEW CASE STUDY',
    col1_top_card: {
      title: 'SMART CONNECTED DEVICE',
      subtitle: 'Electronics · Embedded · IoT',
    },
    col1_bottom_card: {
      text: 'A connected consumer product combining intelligent electronics, embedded technology, and IoT for smarter everyday experiences.',
    },
    images: {
      col2_tall:
        SmartConnectedDeviceImage,
    },
    link: '#',
  },
  {
    id: 'aura-brand-identity',
    number: '02',
    name: 'IoT & CONNECTED SYSTEMS',
    buttonText: 'VIEW CASE STUDY',
    col1_top_card: {
      title: 'INDUSTRIAL IoT PLATFORM',
      subtitle: 'IoT Hardware · Firmware · Cloud',
    },
    col1_bottom_card: {
      text: 'Intelligent control solutions that combine embedded technology and automation to improve industrial efficiency, productivity, and operational reliability.',
    },
    images: {
      col2_tall:
        IndustrialIoTPlatformImage,
    },
    link: '#',
  },
  {
    id: 'solaris-digital',
    number: '03',
    name: 'INDUSTRIAL AUTOMATION',
    buttonText: 'VIEW CASE STUDY',
    col1_top_card: {
      title: 'INTELLIGENT CONTROL SYSTEM',
      subtitle: 'Embedded · Automation · Control',
    },
    col1_bottom_card: {
      text: 'Intelligent control solutions that combine embedded technology and automation to improve industrial efficiency, productivity, and operational reliability.',
    },
    images: {
      col2_tall:
        IntelligentControlSystemImage,
    },
    link: '#',
  },
];

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onProjectClick?: (projectId: string) => void;
}

const ProjectImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, alt, className = '', style }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-[#161616] rounded-[22px] sm:rounded-[26px] ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover select-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#1b1e24] p-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[520px] sm:min-h-[580px] md:h-[85vh] md:min-h-[680px] w-full flex items-start justify-center relative"
    >
      <motion.div
        style={{
          scale,
          top: `calc(clamp(3.5rem, 6vh, 6.5rem) + ${index * 24}px)`,
        }}
        className="sticky w-full max-w-6xl rounded-[28px] sm:rounded-[40px] md:rounded-[48px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl origin-top md:h-[600px] flex flex-col justify-between overflow-hidden group/card"
      >
        {/* Top Row: Number, category label, project name, and Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6 mb-3 sm:mb-6 border-b border-[#D7E2EA]/15 pb-3 sm:pb-5 shrink-0">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onProjectClick?.(project.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onProjectClick?.(project.id);
              }
            }}
            className="flex items-baseline gap-2.5 sm:gap-6 flex-wrap cursor-pointer focus:outline-none"
          >
            {/* Number: huge, same style as services */}
            <span
              className="font-black leading-none text-[#D7E2EA] select-none tracking-tighter group-hover/card:text-[#00D4FF] transition-colors duration-300"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              {project.number}
            </span>

            {/* Category label */}
            {project.category && (
              <span className="text-[10px] sm:text-xs font-light text-[#D7E2EA]/60 uppercase tracking-widest border border-[#D7E2EA]/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                {project.category}
              </span>
            )}

            {/* Project Name */}
            <h3
              className="font-medium uppercase text-[#D7E2EA] tracking-wide group-hover/card:text-[#00D4FF] transition-colors duration-300"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 2.2rem)' }}
            >
              {project.name}
            </h3>
          </div>

          {/* Live Project Ghost Button */}
          <LiveProjectButton
            href={project.link}
            id={`live-btn-${project.id}`}
            label={project.buttonText || 'VIEW CASE STUDY'}
            onClick={() => onProjectClick?.(project.id)}
          />
        </div>

        {/* Bottom row: Two-column responsive card & image grid */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onProjectClick?.(project.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onProjectClick?.(project.id);
            }
          }}
          className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 md:gap-5 w-full flex-1 min-h-0 cursor-pointer focus:outline-none"
        >
          {/* Left column (40% width): 2 stacked cards/images */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5 h-full">
            {/* Top card or image */}
            {project.col1_top_card ? (
              <div
                className="w-full flex-1 min-h-[90px] sm:min-h-[110px] md:min-h-0 bg-[#161616] border border-white/5 rounded-[18px] sm:rounded-[26px] p-3.5 sm:p-5 md:p-6 flex flex-col justify-center items-start relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all duration-300"
              >
                {project.col1_top_card.subtitle && (
                  <span
                    className="text-[#00D4FF] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2 text-xs sm:text-sm"
                  >
                    {project.col1_top_card.subtitle}
                  </span>
                )}
                <h4
                  className="font-bold uppercase text-white tracking-wide leading-snug text-base sm:text-xl md:text-[22px]"
                >
                  {project.col1_top_card.title}
                </h4>
              </div>
            ) : project.images.col1_top ? (
              <ProjectImage
                src={resolveImage(project.images.col1_top)}
                alt={`${project.name} preview 1`}
                className="w-full flex-1 min-h-[90px] sm:min-h-[110px] md:min-h-0"
              />
            ) : null}

            {/* Bottom card or image */}
            {project.col1_bottom_card ? (
              <div
                className="w-full flex-[1.3] min-h-[100px] sm:min-h-[130px] md:min-h-0 bg-[#161616] border border-white/5 rounded-[18px] sm:rounded-[26px] p-3.5 sm:p-5 md:p-6 flex flex-col justify-center items-start relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all duration-300"
              >
                <p
                  className="font-normal text-[#D7E2EA]/85 leading-relaxed text-xs sm:text-base md:text-[17px] lg:text-[18px]"
                >
                  {project.col1_bottom_card.text}
                </p>
              </div>
            ) : project.images.col1_bottom ? (
              <ProjectImage
                src={resolveImage(project.images.col1_bottom)}
                alt={`${project.name} preview 2`}
                className="w-full flex-[1.3] min-h-[100px] sm:min-h-[130px] md:min-h-0"
              />
            ) : null}
          </div>

          {/* Right column (60% width): 1 tall image */}
          <div className="md:col-span-6 flex h-[200px] xs:h-[240px] sm:h-[320px] md:h-full md:min-h-0 rounded-[18px] sm:rounded-[26px] overflow-hidden group-hover/card:ring-2 group-hover/card:ring-[#00D4FF]/50 transition-all duration-300">
            <ProjectImage
              src={resolveImage(project.images.col2_tall)}
              alt={`${project.name} feature view`}
              className="w-full h-full flex-1 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onProjectClick }) => {
  const { data } = useProjects<ProjectItem>();
  const PROJECTS = data ?? PROJECTS_FALLBACK;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-16 sm:mb-20 md:mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <Zap className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              ENGINEERED IN ACTION
            </span>
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
          <p className="text-[#A5B5C1] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            Explore how we turn complex ideas into engineered products and intelligent solutions across electronics, embedded systems, IoT, AI, software, and manufacturing.
          </p>
        </FadeIn>

        {/* 3 sticky-stacking project cards */}
        <div className="flex flex-col gap-12 sm:gap-16 w-full">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
