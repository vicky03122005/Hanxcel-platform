import React, { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { HanxcelLogo } from './HanxcelLogo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '#hero-section', isLogo: true },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'SOLUTIONS', href: '#solutions' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'BLOG', href: '#blog' },
    { label: 'CONTACT', href: '#contact' },
  ];

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#contact' && onContactClick) {
      onContactClick();
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between relative overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full relative z-30 shrink-0">
        <ul className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 list-none gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {/* Logo (Always visible on all screens) */}
          <li className="flex items-center">
            <a
              href="#hero-section"
              onClick={(e) => handleNavClick(e, '#hero-section')}
              aria-label="Hanxcel AI Technologies Home"
              className="text-[#D7E2EA] font-medium tracking-wider hover:opacity-95 transition-all duration-200 whitespace-nowrap flex items-center gap-2.5 sm:gap-3 min-h-[44px] group"
            >
              <div className="flex items-center justify-center shrink-0">
                <HanxcelLogo className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-[0_0_14px_rgba(0,176,255,0.45)]" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="font-extrabold tracking-wider text-xs sm:text-base md:text-[1.05rem] text-[#DCE7F0] group-hover:text-white transition-colors uppercase leading-none font-sans">
                  HANXCEL AI
                </span>
                <span className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#00A3FF] uppercase leading-none mt-1 group-hover:text-[#33B5FF] transition-colors font-sans">
                  TECHNOLOGIES
                </span>
              </div>
            </a>
          </li>

          {/* Desktop links (visible on md: and up) */}
          {navItems
            .filter((item) => !item.isLogo)
            .map((item) => (
              <li key={item.label} className="hidden md:flex items-center">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs md:text-sm lg:text-base xl:text-[1.15rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap min-h-[44px] flex items-center"
                >
                  {item.label}
                </a>
              </li>
            ))}

          {/* Mobile hamburger button (visible on < md:) */}
          <li className="flex md:hidden items-center">
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#D7E2EA] hover:text-white rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </li>
        </ul>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-0 right-0 px-4 pt-2 pb-4 z-50 pointer-events-auto"
            >
              <div className="bg-[#12151B]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/80 flex flex-col gap-1 max-h-[calc(100dvh-90px)] overflow-y-auto">
                {navItems
                  .filter((item) => !item.isLogo)
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-[#D7E2EA] hover:text-white font-medium uppercase tracking-wider text-sm sm:text-base py-3 px-3.5 rounded-xl hover:bg-white/5 flex items-center justify-between transition-colors min-h-[44px]"
                    >
                      <span>{item.label}</span>
                      <span className="text-white/30 text-xs tracking-widest">↗</span>
                    </a>
                  ))}
                {onContactClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onContactClick();
                    }}
                    className="mt-2 w-full py-3 px-4 rounded-xl font-semibold uppercase tracking-wider text-xs sm:text-sm text-[#D7E2EA] border border-white/20 bg-gradient-to-r from-[#20252E] to-[#161920] hover:border-white/40 transition-all text-center min-h-[44px] flex items-center justify-center shadow-lg"
                  >
                    Start Project
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full relative z-0 flex items-center justify-center px-3 sm:px-4 my-auto">
        <FadeIn delay={0.15} y={30} className="w-full flex justify-center">
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-[0.86] w-full text-center flex flex-col items-center justify-center select-none"
            style={{
              fontSize: 'clamp(2.2rem, 11.5vw, 15.5rem)',
              letterSpacing: '-0.035em',
            }}
          >
            <span className="whitespace-nowrap block max-w-full overflow-hidden text-ellipsis">
              WE ENGINEER
            </span>
            <span className="whitespace-nowrap block max-w-full overflow-hidden text-ellipsis">
              INTELLIGENCE
            </span>
          </h1>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 pb-5 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-10 relative z-20 w-full shrink-0">
        {/* Left text */}
        <FadeIn delay={0.35} y={20} className="max-w-md sm:max-w-xl">
          <p
            className="text-[#D7E2EA] font-normal tracking-normal leading-[1.35] sm:leading-[1.38] flex flex-col text-xs sm:text-base md:text-lg lg:text-[21.2px]"
          >
            <span>We build intelligent technology, digital products,</span>
            <span>and business solutions that turn complex ideas into</span>
            <span className="text-[#0099FF] font-medium">real-world impact.</span>
          </p>
        </FadeIn>

        {/* Right Contact button */}
        <FadeIn delay={0.5} y={20} className="self-end sm:self-auto shrink-0">
          <ContactButton
            onClick={onContactClick}
            href="#contact"
            id="hero-contact-button"
            label="Start Project"
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
