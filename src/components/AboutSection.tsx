import React from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { AnimatedText } from './AnimatedText';

interface AboutSectionProps {
  onContactClick?: () => void;
  onExploreClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick, onExploreClick }) => {
  const aboutText =
    "Hanxcel AI Technologies is a software and technology company focused on building intelligent digital products and scalable software solutions. We bring together software engineering, artificial intelligence, cloud technologies, web and mobile application development, UI/UX, and connected systems to transform complex ideas into meaningful digital experiences. From product strategy and design to development, integration, testing, and deployment, we help businesses turn ideas into reliable, scalable, and future-ready technology.";

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-[#0C0C0C] relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 mt-10 sm:mt-20 md:mt-28 select-none"
    >
      {/* Decorative moving 3D objects in corners */}

      {/* Top-left: Moon icon */}
      <div className="absolute top-[2%] sm:top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [-8, 12, -8],
              rotate: [-4, 5, -4],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Magnet padding={80} strength={2.5}>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                alt="Decorative Moon"
                loading="lazy"
                className="w-[65px] sm:w-[120px] md:w-[170px] lg:w-[210px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none opacity-80 sm:opacity-100"
              />
            </Magnet>
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[4%] sm:bottom-[8%] left-[2%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [3, -4, 3],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Magnet padding={80} strength={2.5}>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
                alt="Decorative 3D Shape"
                loading="lazy"
                className="w-[55px] sm:w-[100px] md:w-[145px] lg:w-[180px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none opacity-75 sm:opacity-100"
              />
            </Magnet>
          </motion.div>
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[2%] sm:top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [12, -8, 12],
              rotate: [5, -3, 5],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Magnet padding={80} strength={2.5}>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                alt="Decorative Lego"
                loading="lazy"
                className="w-[65px] sm:w-[120px] md:w-[170px] lg:w-[210px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none opacity-80 sm:opacity-100"
              />
            </Magnet>
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[4%] sm:bottom-[8%] right-[2%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [-10, 8, -10],
              rotate: [-4, 4, -4],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Magnet padding={80} strength={2.5}>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
                alt="Decorative 3D Cluster"
                loading="lazy"
                className="w-[70px] sm:w-[125px] md:w-[180px] lg:w-[220px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none opacity-80 sm:opacity-100"
              />
            </Magnet>
          </motion.div>
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full flex justify-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 160px)' }}
          >
            About us
          </h2>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-6 sm:h-8 md:h-12" />

        {/* Hero sub-heading above paragraph */}
        <FadeIn delay={0.1} y={20} className="w-full flex justify-center px-2 sm:px-4 mb-4 sm:mb-6 md:mb-8">
          <h3
            id="about-tagline-heading"
            className="text-center font-bold tracking-tight text-white max-w-[850px] text-lg sm:text-2xl md:text-3xl lg:text-4xl"
            style={{
              lineHeight: 1.25,
              textShadow: '0 2px 20px rgba(0, 153, 255, 0.25)',
            }}
          >
            Engineering Ideas Into{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#3B82F6] bg-clip-text text-transparent">
              Real-World Products
            </span>
          </h3>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="w-full px-2 sm:px-4">
          <AnimatedText text={aboutText} id="about-animated-text" />
        </div>

        {/* Gap between text block and button */}
        <div className="h-10 sm:h-14 md:h-20" />

        {/* Contact button below the text block */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton
            onClick={onExploreClick || onContactClick}
            href="#about"
            id="about-contact-button"
            label="EXPLORE MORE"
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
