import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { AboutCompanyModal } from './components/AboutCompanyModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SolutionDetailModal } from './components/SolutionDetailModal';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { FaqConsultationModal } from './components/FaqConsultationModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutCompanyOpen, setIsAboutCompanyOpen] = useState(false);
  const [selectedServiceNumber, setSelectedServiceNumber] = useState<string | null>(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [isFaqConsultationOpen, setIsFaqConsultationOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const openAboutCompany = () => setIsAboutCompanyOpen(true);
  const closeAboutCompany = () => setIsAboutCompanyOpen(false);

  const openServiceDetail = (serviceNumber: string) => {
    setSelectedServiceNumber(serviceNumber);
  };
  const closeServiceDetail = () => {
    setSelectedServiceNumber(null);
  };

  const openSolutionDetail = (solutionId: string) => {
    setSelectedSolutionId(solutionId);
  };
  const closeSolutionDetail = () => {
    setSelectedSolutionId(null);
  };

  const openProjectCaseStudy = (projectId: string) => {
    setSelectedProjectId(projectId);
  };
  const closeProjectCaseStudy = () => {
    setSelectedProjectId(null);
  };

  const openPortfolioDetail = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
  };
  const closePortfolioDetail = () => {
    setSelectedPortfolioId(null);
  };

  const openFaqConsultation = () => setIsFaqConsultationOpen(true);
  const closeFaqConsultation = () => setIsFaqConsultationOpen(false);

  return (
    <div
      id="main-wrapper"
      className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen w-full relative"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={openContact} />

      {/* 2. ABOUT SECTION */}
      <AboutSection onContactClick={openContact} onExploreClick={openAboutCompany} />

      {/* 3. SERVICES SECTION */}
      <ServicesSection onServiceClick={openServiceDetail} />

      {/* 4. SOLUTIONS SECTION */}
      <SolutionsSection onSolutionClick={openSolutionDetail} />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection onProjectClick={openProjectCaseStudy} />

      {/* 6. PORTFOLIO SECTION (WHITE) */}
      <PortfolioSection onContactClick={openContact} onPortfolioClick={openPortfolioDetail} />

      {/* 7. TEAM SECTION (WHITE) */}
      <TeamSection />

      {/* 8. TESTIMONIALS SECTION (BLACK) */}
      <TestimonialsSection />

      {/* 9. FAQ SECTION (BLACK) */}
      <FaqSection onContactClick={openContact} onConsultationClick={openFaqConsultation} />

      {/* 10. BLOG SECTION (BLACK) */}
      <BlogSection />

      {/* 11. CONTACT SECTION (WHITE) */}
      <ContactSection />

      {/* 12. FOOTER (WHITE) */}
      <Footer />

      {/* Contact modal accessible globally */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      {/* About Company modal */}
      <AboutCompanyModal
        isOpen={isAboutCompanyOpen}
        onClose={closeAboutCompany}
        onOpenContact={openContact}
      />

      {/* Service Detail modal */}
      <ServiceDetailModal
        isOpen={Boolean(selectedServiceNumber)}
        serviceNumber={selectedServiceNumber}
        onClose={closeServiceDetail}
        onOpenContact={openContact}
      />

      {/* Solution Detail modal */}
      <SolutionDetailModal
        isOpen={Boolean(selectedSolutionId)}
        solutionId={selectedSolutionId}
        onClose={closeSolutionDetail}
        onOpenContact={openContact}
      />

      {/* Project Case Study modal */}
      <ProjectCaseStudyModal
        isOpen={Boolean(selectedProjectId)}
        projectId={selectedProjectId}
        onClose={closeProjectCaseStudy}
        onOpenContact={openContact}
      />

      {/* Portfolio Detail modal */}
      <PortfolioDetailModal
        isOpen={Boolean(selectedPortfolioId)}
        portfolioId={selectedPortfolioId}
        onClose={closePortfolioDetail}
        onOpenContact={openContact}
      />

      {/* FAQ Technical Consultation modal */}
      <FaqConsultationModal
        isOpen={isFaqConsultationOpen}
        onClose={closeFaqConsultation}
        onOpenContact={openContact}
      />
    </div>
  );
}
