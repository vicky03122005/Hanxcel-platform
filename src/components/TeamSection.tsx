import React from 'react';
import { Users, Linkedin, Mail, Github } from 'lucide-react';
import { FadeIn } from './FadeIn';
import jagadishImage from '../assets/images/Jagadish.jpeg';
import srinivasaImage from '../assets/images/Srinivasa.jpeg';
import dineshImage from '../assets/images/DineshP.jpeg';
import { useTeam } from '../lib/useCms';
import { resolveImage } from '../lib/images';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
  linkedin?: string;
  email?: string;
  github?: string;
}

/** Rendered until the CMS responds, and whenever the API is unreachable. */
const TEAM_FALLBACK: TeamMember[] = [
  {
    id: 'jagadish-mallesh',
    name: 'Jagadish Mallesh',
    role: 'Director',
    bio: 'Leads Hanxcel AI Technologies with a focus on engineering intelligent products and end-to-end technology solutions across electronics, embedded systems, IoT, AI, software, and manufacturing.',
    specialties: ['Product Engineering','IoT & AI Solutions','Technology Strategy',
    ],
    image: jagadishImage,
    linkedin: 'https://www.linkedin.com/in/jagadish-m-b987ab120?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    email: 'technical@hanxcel.com',
  },
{
  id: 'srinivasa-muniswami',
  name: 'Srinivasa Muniswami',
  role: 'Director',
  bio: 'Leads technology development at Hanxcel AI Technologies, bringing together electronics, embedded systems, IoT, AI, software, and connected product development to build reliable and intelligent technology solutions.',
  specialties: [
    'Embedded Systems',
    'IoT & Connected Products',
    'AI & Software Solutions',
  ],
  image: srinivasaImage,
  linkedin: 'https://www.linkedin.com/in/srinivasa-m-6b4a8475?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  email: 'technical@hanxcel.com',
},
{
  id: 'dinesh-p',
  name: 'Dinesh P',
  role: 'Software Developer',
  bio: 'Develops software and connected technology solutions at Hanxcel AI Technologies, working across application development, IoT integration, AI-powered solutions, and digital products.',
  specialties: [
    'Software Development',
    'IoT Integration',
    'AI Solutions',
  ],
  image: dineshImage,
  linkedin: '#',
  github: '#',
},
];

export const TeamSection: React.FC = () => {
  const { data } = useTeam<TeamMember>();
  const TEAM_MEMBERS = data ?? TEAM_FALLBACK;

  return (
    <section
      id="team"
      className="w-full bg-white text-[#0C0C0C] pt-8 sm:pt-12 md:pt-14 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-12 relative z-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-14 sm:mb-18 md:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <Users className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              THE MINDS BEHIND THE TECH
            </span>
          </span>

          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Team
          </h2>

          <p className="text-[#4A5568] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            A multidisciplinary collective of hardware architects, embedded firmware developers, RF specialists, and industrial designers engineering next-generation technology.
          </p>
        </FadeIn>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <FadeIn
              key={member.id}
              delay={index * 0.08}
              y={30}
              className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#0C0C0C] hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Avatar / Photo Container */}
                <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-5 bg-[#E2E8F0] relative">
                  <img
                    src={resolveImage(member.image)}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Member Info */}
                <div className="mb-3">
                  <span className="text-[#0066FF] text-[11px] font-bold tracking-wider uppercase block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0C0C0C] tracking-tight group-hover:text-[#0066FF] transition-colors">
                    {member.name}
                  </h3>
                </div>

                <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-light">
                  {member.bio}
                </p>
              </div>

              <div>
                {/* Specialties / Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] text-[11px] font-medium tracking-wide"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Social Links Divider & Icons */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#94A3B8] tracking-widest uppercase">
                    Connect
                  </span>
                  <div className="flex items-center gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        aria-label={`${member.name} LinkedIn`}
                        className="text-[#94A3B8] hover:text-[#0066FF] transition-colors p-1"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        aria-label={`${member.name} GitHub`}
                        className="text-[#94A3B8] hover:text-[#0C0C0C] transition-colors p-1"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="text-[#94A3B8] hover:text-[#0066FF] transition-colors p-1"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


