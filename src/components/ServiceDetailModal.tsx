import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Code2,
  Globe2,
  Smartphone,
  Sparkles,
  Server,
  ArrowRight,
  CheckCircle2,
  Layers,
  Wrench,
  Compass,
  FileCheck2,
} from 'lucide-react';
import { useDetail } from '../lib/useCms';
import { fetchService } from '../lib/api';

export interface ServiceDetailData {
  number: string;
  name: string;
  tagline: string;
  description: string;
  fullOverview: string;
  icon:
    | 'software'
    | 'web'
    | 'mobile'
    | 'ai'
    | 'cloud'
    | 'uiux';
  disciplines: {
    title: string;
    desc: string;
  }[];
  deliverables: string[];
  techStack: string[];
  industryApplications: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetailData> = {
  /* =========================================================
     01 — SOFTWARE DEVELOPMENT
     ========================================================= */
  '01': {
    number: '01',
    name: 'SOFTWARE DEVELOPMENT',
    tagline: 'Scalable Software Engineering From Concept to Deployment',

    description:
      'We build scalable and reliable software solutions tailored to business requirements, from modern web applications and enterprise platforms to custom digital products.',

    fullOverview:
      'Our Software Development services transform business ideas and product requirements into reliable digital solutions. We focus on clear architecture, maintainable code, intuitive user experiences, secure application design, and scalable foundations. From custom business applications to technology platforms, we develop software around real-world requirements while keeping future growth, integration, and maintainability in mind.',

    icon: 'software',

    disciplines: [
      {
        title: 'Application Architecture',
        desc:
          'Designing structured application architectures that support maintainability, scalability, integrations, and future product growth.',
      },
      {
        title: 'Frontend Development',
        desc:
          'Building responsive and interactive interfaces with modern web technologies and component-based development practices.',
      },
      {
        title: 'Backend Development',
        desc:
          'Developing application logic, APIs, databases, authentication, integrations, and backend services required to power digital products.',
      },
      {
        title: 'Testing & Quality',
        desc:
          'Applying structured testing and validation practices to improve application reliability, functionality, and production readiness.',
      },
    ],

    deliverables: [
      'Responsive Software Applications',
      'Application Architecture & Technical Documentation',
      'REST APIs & Backend Services',
      'Database Integration',
      'Testing & Deployment Support',
    ],

    techStack: [
      'React',
      'TypeScript',
      'Node.js',
      'Python',
      'REST APIs',
      'SQL / NoSQL',
    ],

    industryApplications: [
      'Business Applications',
      'Enterprise Platforms',
      'Digital Products',
      'IoT Platforms',
    ],
  },

  /* =========================================================
     02 — WEB APPLICATIONS
     ========================================================= */
  '02': {
    number: '02',
    name: 'WEB APPLICATIONS',
    tagline: 'Modern Web Experiences Built for Performance & Scale',

    description:
      'We design and develop responsive, high-performance web applications with intuitive user experiences, secure architectures, and scalable technology foundations.',

    fullOverview:
      'We create modern web applications that connect users, business processes, data, and services through intuitive digital experiences. Our approach combines interface design, frontend engineering, backend integration, authentication, APIs, and responsive architecture to create web products that work effectively across desktop, tablet, and mobile environments.',

    icon: 'web',

    disciplines: [
      {
        title: 'Responsive Web Interfaces',
        desc:
          'Creating responsive interfaces that adapt naturally across desktop, tablet, and mobile screen sizes.',
      },
      {
        title: 'Frontend Engineering',
        desc:
          'Developing reusable components, interactive experiences, application state management, and modern web interfaces.',
      },
      {
        title: 'API & Backend Integration',
        desc:
          'Connecting web applications with APIs, databases, authentication systems, third-party services, and backend platforms.',
      },
      {
        title: 'Performance & Accessibility',
        desc:
          'Optimizing application performance and implementing accessible interface patterns for better usability.',
      },
    ],

    deliverables: [
      'Responsive Web Applications',
      'Reusable UI Component Systems',
      'API & Backend Integration',
      'Authentication & User Management',
      'Production Deployment Support',
    ],

    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'REST APIs',
      'Tailwind CSS',
    ],

    industryApplications: [
      'Business Portals',
      'Admin Dashboards',
      'Customer Platforms',
      'IoT Dashboards',
    ],
  },

  /* =========================================================
     03 — MOBILE APPLICATIONS
     ========================================================= */
  '03': {
    number: '03',
    name: 'MOBILE APPLICATIONS',
    tagline: 'Connected Mobile Experiences for Modern Products',

    description:
      'We create modern mobile applications that deliver seamless experiences across platforms, combining intuitive interfaces, robust functionality, and reliable backend systems.',

    fullOverview:
      'Our mobile application development services connect users with products, platforms, and connected technology through intuitive mobile experiences. We build applications around real product requirements, integrating backend services, APIs, authentication, notifications, device capabilities, and real-time data where required.',

    icon: 'mobile',

    disciplines: [
      {
        title: 'Cross-Platform Application Development',
        desc:
          'Developing mobile experiences that can support multiple platforms while maintaining consistent functionality and user experience.',
      },
      {
        title: 'Mobile UI & Interaction',
        desc:
          'Designing intuitive mobile interfaces with clear navigation, responsive layouts, and user-focused interactions.',
      },
      {
        title: 'API & Cloud Integration',
        desc:
          'Connecting mobile applications with backend APIs, databases, authentication, cloud services, and real-time data.',
      },
      {
        title: 'Connected Device Integration',
        desc:
          'Integrating mobile applications with connected products and IoT systems where device interaction and telemetry are required.',
      },
    ],

    deliverables: [
      'Cross-Platform Mobile Applications',
      'Mobile UI Implementation',
      'Backend & API Integration',
      'Authentication & User Management',
      'Application Testing & Release Support',
    ],

    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Firebase',
    ],

    industryApplications: [
      'Consumer Applications',
      'Connected Products',
      'IoT Applications',
      'Business Mobility',
    ],
  },

  /* =========================================================
     04 — AI & MACHINE LEARNING
     ========================================================= */
  '04': {
    number: '04',
    name: 'AI & MACHINE LEARNING',
    tagline: 'Intelligent Software Solutions Powered by AI',

    description:
      'We integrate artificial intelligence and machine learning into software products to automate processes, generate insights, and create intelligent digital experiences.',

    fullOverview:
      'Our AI and Machine Learning services bring intelligence into software products and connected technology. We focus on practical applications of AI, including intelligent automation, data-driven insights, prediction, classification, and AI-assisted digital experiences. AI capabilities can be integrated into applications, platforms, and connected systems according to the requirements of each product.',

    icon: 'ai',

    disciplines: [
      {
        title: 'AI Application Integration',
        desc:
          'Integrating AI capabilities into software applications to create intelligent features and automated workflows.',
      },
      {
        title: 'Machine Learning Solutions',
        desc:
          'Developing machine learning workflows for classification, prediction, pattern recognition, and data-driven applications.',
      },
      {
        title: 'Data & Model Workflows',
        desc:
          'Preparing data pipelines and model workflows that support experimentation, validation, and deployment.',
      },
      {
        title: 'Intelligent Product Experiences',
        desc:
          'Combining AI with software, connected devices, and user interfaces to create smarter technology experiences.',
      },
    ],

    deliverables: [
      'AI-Powered Application Features',
      'Machine Learning Models',
      'Data Processing & Model Pipelines',
      'AI API Integrations',
      'Model Evaluation & Validation',
    ],

    techStack: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'ONNX',
      'FastAPI',
      'AI APIs',
    ],

    industryApplications: [
      'Intelligent Automation',
      'Predictive Applications',
      'Connected Products',
      'Business Intelligence',
    ],
  },

  /* =========================================================
     05 — CLOUD & BACKEND SYSTEMS
     ========================================================= */
  '05': {
    number: '05',
    name: 'CLOUD & BACKEND SYSTEMS',
    tagline: 'Secure Backend Architecture for Connected Digital Products',

    description:
      'We engineer secure and scalable backend and cloud systems that power applications, APIs, databases, integrations, and real-time digital services.',

    fullOverview:
      'We build the backend foundations that allow digital products and connected systems to operate reliably. Our work covers API development, databases, authentication, application services, cloud integration, real-time communication, and data processing. The architecture is designed around the product requirements, expected workloads, integrations, and future scalability.',

    icon: 'cloud',

    disciplines: [
      {
        title: 'Backend Architecture',
        desc:
          'Designing structured backend systems that support application functionality, integrations, data processing, and future growth.',
      },
      {
        title: 'API Development',
        desc:
          'Building APIs that connect frontend applications, mobile applications, services, databases, and external integrations.',
      },
      {
        title: 'Database Systems',
        desc:
          'Designing and integrating structured data storage solutions for application data, users, transactions, and connected systems.',
      },
      {
        title: 'Cloud & Real-Time Services',
        desc:
          'Integrating cloud infrastructure and real-time communication services for modern applications and connected products.',
      },
    ],

    deliverables: [
      'Backend Application Services',
      'REST API Development',
      'Database Architecture & Integration',
      'Authentication & Authorization',
      'Cloud Integration & Deployment Support',
    ],

    techStack: [
      'Node.js',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Redis',
    ],

    industryApplications: [
      'SaaS Platforms',
      'Enterprise Applications',
      'IoT Platforms',
      'Real-Time Systems',
    ],
  },

  /* =========================================================
     06 — UI/UX & DIGITAL PRODUCTS
     ========================================================= */
  '06': {
    number: '06',
    name: 'UI/UX & DIGITAL PRODUCTS',
    tagline: 'Human-Centered Design for Meaningful Digital Experiences',

    description:
      'We transform ideas into intuitive digital products through thoughtful UX, modern interfaces, product architecture, and experiences designed around real user needs.',

    fullOverview:
      'Our UI/UX and Digital Product services bring structure and clarity to complex digital products. We work across user journeys, information architecture, interface design, responsive layouts, design systems, and product experiences to create digital products that are intuitive and consistent. The design process is connected closely with product and software development so that experiences remain practical to build and scale.',

    icon: 'uiux',

    disciplines: [
      {
        title: 'User Experience Design',
        desc:
          'Mapping user journeys, information architecture, navigation, and interaction patterns around real user requirements.',
      },
      {
        title: 'Interface Design',
        desc:
          'Creating modern and consistent interfaces for websites, applications, dashboards, and digital platforms.',
      },
      {
        title: 'Design Systems',
        desc:
          'Developing reusable interface patterns, components, typography, spacing, and interaction guidelines for product consistency.',
      },
      {
        title: 'Digital Product Strategy',
        desc:
          'Translating product requirements into structured digital experiences that align business objectives with user needs.',
      },
    ],

    deliverables: [
      'User Flows & Information Architecture',
      'Wireframes & Interface Designs',
      'Responsive UI Systems',
      'Reusable Design Components',
      'Developer-Ready Product Specifications',
    ],

    techStack: [
      'Figma',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Design Systems',
      'Prototyping',
    ],

    industryApplications: [
      'Web Platforms',
      'Mobile Applications',
      'SaaS Products',
      'Business Dashboards',
    ],
  },
};

/* ============================================================
   SERVICE DETAIL MODAL
   ============================================================ */

interface ServiceDetailModalProps {
  isOpen: boolean;
  serviceNumber: string | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  serviceNumber,
  onClose,
  onOpenContact,
}) => {
  const cmsService = useDetail<ServiceDetailData>(serviceNumber, fetchService);
  const service = cmsService ?? (serviceNumber ? SERVICE_DETAILS[serviceNumber] : null);

  if (!service) return null;

  const renderIcon = () => {
    switch (service.icon) {
      case 'software':
        return <Code2 className="w-6 h-6 text-[#00D4FF]" />;

      case 'web':
        return <Globe2 className="w-6 h-6 text-[#00D4FF]" />;

      case 'mobile':
        return <Smartphone className="w-6 h-6 text-[#00D4FF]" />;

      case 'ai':
        return <Sparkles className="w-6 h-6 text-[#00D4FF]" />;

      case 'cloud':
        return <Server className="w-6 h-6 text-[#00D4FF]" />;

      case 'uiux':
        return <Layers className="w-6 h-6 text-[#00D4FF]" />;

      default:
        return <Code2 className="w-6 h-6 text-[#00D4FF]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto select-none">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 320,
            }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFFFF] border border-[#E2E8F0] rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.35)] text-[#0C0C0C] z-10 my-auto overflow-y-auto font-['Kanit',sans-serif]"
          >

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#0066FF]/10 to-transparent blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />

            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

            {/* Close Button */}
            <button
              id="close-service-modal"
              type="button"
              onClick={onClose}
              aria-label="Close service details"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full border border-slate-200 bg-slate-100/90 flex items-center justify-center text-[#0C0C0C] hover:text-black hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all duration-200 z-20 cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Badge & Number */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/25 flex items-center justify-center shrink-0">
                {renderIcon()}
              </div>

              <span className="font-mono text-xs sm:text-sm font-bold text-[#0066FF] tracking-wider uppercase">
                SERVICE MODULE {service.number} • HANXCEL TECHNOLOGY
              </span>
            </div>

            {/* Main Heading & Tagline */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0C0C0C] leading-[1.08] mb-3">
                {service.name}
              </h2>

              <p className="text-base sm:text-lg text-[#0066FF] font-semibold tracking-wide uppercase">
                {service.tagline}
              </p>
            </div>

            {/* Comprehensive Overview */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-8 sm:mb-10 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#64748B] mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066FF]" />
                Capability &amp; Technology Overview
              </h3>

              <p className="text-sm sm:text-base text-[#1E293B] font-light leading-relaxed">
                {service.fullOverview}
              </p>
            </div>

            {/* Core Disciplines Grid */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[#0C0C0C] mb-5 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0066FF]" />
                Specialized Capabilities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {service.disciplines.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0066FF]/50 hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    <h4 className="text-sm sm:text-base font-bold text-[#0C0C0C] uppercase tracking-tight mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed pl-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Technology Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">

              {/* Deliverables */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
                <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-4 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#0066FF]" />
                  Standard Deliverables
                </h4>

                <ul className="space-y-2.5">
                  {service.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155] font-light"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology & Industry */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between gap-5 shadow-sm">

                {/* Technology Stack */}
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#0066FF]" />
                    Tools &amp; Technologies
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0066FF] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industry Applications */}
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0C0C0C] uppercase tracking-tight mb-3 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#0066FF]" />
                    Key Applications
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {service.industryApplications.map((ind, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/25 text-xs font-semibold text-[#0066FF] uppercase"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">

              <p className="text-xs text-[#64748B] font-mono text-center sm:text-left">
                Hanxcel AI Technologies • Technology Service Module{' '}
                {service.number}
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#CBD5E1] hover:bg-slate-100 text-[#0C0C0C] font-bold text-xs uppercase tracking-widest transition-all text-center cursor-pointer"
                >
                  Close
                </button>

                {/* Contact */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();

                    if (onOpenContact) {
                      onOpenContact();
                    }
                  }}
                  style={{
                    background:
                      'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',

                    boxShadow:
                      '0px 8px 25px rgba(0, 180, 216, 0.35), 0px 0px 20px rgba(0, 102, 255, 0.3)',

                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
                >
                  <span>INQUIRE ABOUT THIS SERVICE</span>

                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;