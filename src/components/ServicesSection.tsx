import React from 'react';
import { Lightbulb } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';
import { useServices } from '../lib/useCms';

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const SERVICES_FALLBACK: ServiceItem[] = [
  {
    number: '01',
    name: 'SOFTWARE DEVELOPMENT',
    description:
      'We build scalable and reliable software solutions tailored to business requirements, from modern web applications and enterprise platforms to custom digital products.',
  },
  {
    number: '02',
    name: 'WEB APPLICATIONS',
    description:
      'We design and develop responsive, high-performance web applications with intuitive user experiences, secure architectures, and scalable technology foundations.',
  },
  {
    number: '03',
    name: 'MOBILE APPLICATIONS',
    description:
      'We create modern mobile applications that deliver seamless experiences across platforms, combining intuitive interfaces, robust functionality, and reliable backend systems.',
  },
  {
    number: '04',
    name: 'AI & MACHINE LEARNING',
    description:
      'We integrate artificial intelligence and machine learning into software products to automate processes, generate insights, and create intelligent digital experiences.',
  },
  {
    number: '05',
    name: 'CLOUD & BACKEND SYSTEMS',
    description:
      'We engineer secure and scalable backend and cloud systems that power applications, APIs, databases, integrations, and real-time digital services.',
  },
  {
    number: '06',
    name: 'UI/UX & DIGITAL PRODUCTS',
    description:
      'We transform ideas into intuitive digital products through thoughtful UX, modern interfaces, product architecture, and experiences designed around real user needs.',
  },
];

interface ServicesSectionProps {
  onServiceClick?: (serviceNumber: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onServiceClick,
}) => {
  const { data } = useServices<ServiceItem>();
  const SERVICES = data ?? SERVICES_FALLBACK;

  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* Heading */}
        <FadeIn
          delay={0}
          y={40}
          className="w-full flex flex-col items-center justify-center mb-10 sm:mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-3 shadow-none">
            <Lightbulb
              className="w-3 h-3 text-[#0066FF] shrink-0 stroke-[2.2]"
              id="services-badge-logo"
            />

            <span className="text-[#0066FF]">
              FROM IDEA TO DIGITAL PRODUCT
            </span>
          </span>

          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>

          <p className="text-[#4A5568] max-w-2xl text-center font-light text-base sm:text-lg md:text-xl leading-relaxed">
            We combine software engineering, AI, cloud technology, and product
            design to transform complex ideas into scalable digital products
            and intelligent solutions.
          </p>
        </FadeIn>

        {/* Services List */}
        <div className="w-full border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className={`group relative py-6 sm:py-8 md:py-9 cursor-pointer transition-all duration-300 hover:z-10 before:content-[''] before:absolute before:-top-[1px] before:left-0 before:right-0 before:h-[1px] before:bg-transparent hover:before:bg-black before:transition-colors before:duration-300 ${
                index === SERVICES.length - 1
                  ? 'border-b border-transparent hover:border-black'
                  : 'border-b border-[rgba(12,12,12,0.15)] hover:border-black'
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => onServiceClick?.(service.number)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onServiceClick?.(service.number);
                  }
                }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 md:gap-14 w-full text-left focus:outline-none"
              >

                {/* Left: Huge Number */}
                <span
                  className="font-black leading-none text-[#0C0C0C] shrink-0 select-none tracking-tighter group-hover:text-[#0066FF] transition-colors duration-300"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </span>

                {/* Right: Stacked Name + Description */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="font-medium uppercase text-[#0C0C0C] tracking-wide group-hover:text-[#0066FF] transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                      }}
                    >
                      {service.name}
                    </h3>

                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#0066FF] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      Explore Module &rarr;
                    </span>
                  </div>

                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    }}
                  >
                    {service.description}
                  </p>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;