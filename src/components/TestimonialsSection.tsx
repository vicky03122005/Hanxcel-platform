import React from 'react';
import { MessageSquareQuote, Star, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { useTestimonials } from '../lib/useCms';
import { resolveImage } from '../lib/images';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  badge: string;
  quote: string;
  rating: number;
  avatar: string;
}

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const TESTIMONIALS_FALLBACK: Testimonial[] = [
  {
    id: 'vikram-nair',
    name: 'Vikram Nair',
    role: 'VP of Engineering',
    company: 'VoltEdge Robotics',
    badge: 'Industrial Robotics',
    quote:
      'Hanxcel took our rough architecture and delivered a certified, dual-MCU industrial motor controller ahead of schedule. Their thermal analysis and EMI shielding passed regulatory certification on the very first attempt.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'claire-dupont',
    name: 'Claire Dupont',
    role: 'Co-Founder & CTO',
    company: 'Sensus Smart Health',
    badge: 'Wearable MedTech',
    quote:
      'Developing miniaturized, ultra-low-power connected hardware is notoriously unforgiving. Hanxcel optimized our board layout and quiescent currents, extending battery longevity from 3 days to over 2 weeks.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    role: 'Head of Hardware',
    company: 'NexaGrid Energy',
    badge: 'Clean Energy & IoT',
    quote:
      'Their turnkey execution—from schematic capture and rigid-flex routing to pilot batch assembly—slashed our hardware iteration cycle by five full months. True engineering craftsmen.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'anita-kulkarni',
    name: 'Anita Kulkarni',
    role: 'Chief Product Officer',
    company: 'Aeroflux Avionics',
    badge: 'Aerospace & Telemetry',
    quote:
      'The depth of testing and firmware rigor is exceptional. Our rugged CAN-bus sensor units underwent extreme vibration, shock, and thermal stress tests without a single signal drop.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'jonathan-hayes',
    name: 'Jonathan Hayes',
    role: 'Founder & CEO',
    company: 'Lumina Vision Tech',
    badge: 'Edge AI Systems',
    quote:
      'Running on-device neural vision processing on an edge microcontroller seemed unfeasible within our strict thermal and power limits until Hanxcel re-engineered the hardware pipeline.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tarun-singhania',
    name: 'Tarun Singhania',
    role: 'Director of Operations',
    company: 'Indus AutoSys',
    badge: 'Factory Automation',
    quote:
      'Outstanding firmware stability and telemetry design. Their zero-downtime over-the-air firmware update system has kept thousands of active units across our industrial plants running 24/7.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
];

export const TestimonialsSection: React.FC = () => {
  const { data } = useTestimonials<Testimonial>();
  const TESTIMONIALS = data ?? TESTIMONIALS_FALLBACK;

  return (
    <section
      id="testimonials"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-16 sm:pb-20 md:pb-24 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <MessageSquareQuote className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              CLIENT TESTIMONIALS
            </span>
          </span>

          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Testimonials
          </h2>

          <p className="text-[#A5B5C1] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            Trusted by hardware founders, enterprise directors, and industrial innovators to engineer mission-critical systems and production-ready electronics.
          </p>
        </FadeIn>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.08}
              y={30}
              className="bg-[#161616] border border-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#00D4FF] hover:-translate-y-1 shadow-2xl group"
            >
              <div>
                {/* Top Row: Stars and Project Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#00D4FF] text-[#00D4FF]"
                      />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#00D4FF] text-[10px] font-semibold tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[#D7E2EA]/90 font-light text-sm sm:text-[15px] leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={resolveImage(item.avatar)}
                  alt={item.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm sm:text-base truncate group-hover:text-[#00D4FF] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                  </div>
                  <p className="text-[#9BAEC0] text-xs truncate">
                    {item.role}, <span className="text-[#D7E2EA] font-medium">{item.company}</span>
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
