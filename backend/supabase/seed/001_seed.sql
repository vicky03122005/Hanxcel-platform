-- ============================================================================
-- Hanxcel AI Technologies — seed data
-- 
-- GENERATED from the frontend components by scripts/generate-seed.mjs.
-- Do not hand-edit: re-run the generator instead.
-- 
-- Run AFTER migrations/001_schema.sql. Idempotent — re-running replaces all
-- content rows. Enquiries (contact_submissions, newsletter_subscribers),
-- admin_profiles and audit_log are never touched.
-- ============================================================================

begin;

-- Clear content tables. Child rows cascade.
truncate table
  public.hero, public.about, public.services, public.solutions,
  public.projects, public.portfolio, public.team_members,
  public.testimonials, public.faq, public.blog_posts, public.site_settings
  restart identity cascade;

-- ---------------------------------------------------------------- hero
insert into public.hero (heading_line1, heading_line2, subtext, cta_label, portrait_url) values
  ('WE ENGINEER', 'INTELLIGENCE', 'We build intelligent technology, digital products,
and business solutions that turn complex ideas into
real-world impact.', 'Start Project', NULL);

-- --------------------------------------------------------------- about
insert into public.about (tagline, body_text, cta_label) values
  ('Engineering Ideas Into Real-World Products', 'Hanxcel AI Technologies is a software and technology company focused on building intelligent digital products and scalable software solutions. We bring together software engineering, artificial intelligence, cloud technologies, web and mobile application development, UI/UX, and connected systems to transform complex ideas into meaningful digital experiences. From product strategy and design to development, integration, testing, and deployment, we help businesses turn ideas into reliable, scalable, and future-ready technology.', 'EXPLORE MORE');

-- ------------------------------------------------------------ services
insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('01', 'SOFTWARE DEVELOPMENT', 'We build scalable and reliable software solutions tailored to business requirements, from modern web applications and enterprise platforms to custom digital products.',
   'Scalable Software Engineering From Concept to Deployment', 'Our Software Development services transform business ideas and product requirements into reliable digital solutions. We focus on clear architecture, maintainable code, intuitive user experiences, secure application design, and scalable foundations. From custom business applications to technology platforms, we develop software around real-world requirements while keeping future growth, integration, and maintainability in mind.', 'software',
   ARRAY['Responsive Software Applications', 'Application Architecture & Technical Documentation', 'REST APIs & Backend Services', 'Database Integration', 'Testing & Deployment Support']::text[], ARRAY['React', 'TypeScript', 'Node.js', 'Python', 'REST APIs', 'SQL / NoSQL']::text[], ARRAY['Business Applications', 'Enterprise Platforms', 'Digital Products', 'IoT Platforms']::text[], 0, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Application Architecture', 'Designing structured application architectures that support maintainability, scalability, integrations, and future product growth.', 0
  from public.services where number = '01';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Frontend Development', 'Building responsive and interactive interfaces with modern web technologies and component-based development practices.', 1
  from public.services where number = '01';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Backend Development', 'Developing application logic, APIs, databases, authentication, integrations, and backend services required to power digital products.', 2
  from public.services where number = '01';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Testing & Quality', 'Applying structured testing and validation practices to improve application reliability, functionality, and production readiness.', 3
  from public.services where number = '01';

insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('02', 'WEB APPLICATIONS', 'We design and develop responsive, high-performance web applications with intuitive user experiences, secure architectures, and scalable technology foundations.',
   'Modern Web Experiences Built for Performance & Scale', 'We create modern web applications that connect users, business processes, data, and services through intuitive digital experiences. Our approach combines interface design, frontend engineering, backend integration, authentication, APIs, and responsive architecture to create web products that work effectively across desktop, tablet, and mobile environments.', 'web',
   ARRAY['Responsive Web Applications', 'Reusable UI Component Systems', 'API & Backend Integration', 'Authentication & User Management', 'Production Deployment Support']::text[], ARRAY['React', 'TypeScript', 'Vite', 'Node.js', 'REST APIs', 'Tailwind CSS']::text[], ARRAY['Business Portals', 'Admin Dashboards', 'Customer Platforms', 'IoT Dashboards']::text[], 1, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Responsive Web Interfaces', 'Creating responsive interfaces that adapt naturally across desktop, tablet, and mobile screen sizes.', 0
  from public.services where number = '02';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Frontend Engineering', 'Developing reusable components, interactive experiences, application state management, and modern web interfaces.', 1
  from public.services where number = '02';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'API & Backend Integration', 'Connecting web applications with APIs, databases, authentication systems, third-party services, and backend platforms.', 2
  from public.services where number = '02';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Performance & Accessibility', 'Optimizing application performance and implementing accessible interface patterns for better usability.', 3
  from public.services where number = '02';

insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('03', 'MOBILE APPLICATIONS', 'We create modern mobile applications that deliver seamless experiences across platforms, combining intuitive interfaces, robust functionality, and reliable backend systems.',
   'Connected Mobile Experiences for Modern Products', 'Our mobile application development services connect users with products, platforms, and connected technology through intuitive mobile experiences. We build applications around real product requirements, integrating backend services, APIs, authentication, notifications, device capabilities, and real-time data where required.', 'mobile',
   ARRAY['Cross-Platform Mobile Applications', 'Mobile UI Implementation', 'Backend & API Integration', 'Authentication & User Management', 'Application Testing & Release Support']::text[], ARRAY['React Native', 'Expo', 'TypeScript', 'Node.js', 'REST APIs', 'Firebase']::text[], ARRAY['Consumer Applications', 'Connected Products', 'IoT Applications', 'Business Mobility']::text[], 2, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Cross-Platform Application Development', 'Developing mobile experiences that can support multiple platforms while maintaining consistent functionality and user experience.', 0
  from public.services where number = '03';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Mobile UI & Interaction', 'Designing intuitive mobile interfaces with clear navigation, responsive layouts, and user-focused interactions.', 1
  from public.services where number = '03';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'API & Cloud Integration', 'Connecting mobile applications with backend APIs, databases, authentication, cloud services, and real-time data.', 2
  from public.services where number = '03';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Connected Device Integration', 'Integrating mobile applications with connected products and IoT systems where device interaction and telemetry are required.', 3
  from public.services where number = '03';

insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('04', 'AI & MACHINE LEARNING', 'We integrate artificial intelligence and machine learning into software products to automate processes, generate insights, and create intelligent digital experiences.',
   'Intelligent Software Solutions Powered by AI', 'Our AI and Machine Learning services bring intelligence into software products and connected technology. We focus on practical applications of AI, including intelligent automation, data-driven insights, prediction, classification, and AI-assisted digital experiences. AI capabilities can be integrated into applications, platforms, and connected systems according to the requirements of each product.', 'ai',
   ARRAY['AI-Powered Application Features', 'Machine Learning Models', 'Data Processing & Model Pipelines', 'AI API Integrations', 'Model Evaluation & Validation']::text[], ARRAY['Python', 'PyTorch', 'TensorFlow', 'ONNX', 'FastAPI', 'AI APIs']::text[], ARRAY['Intelligent Automation', 'Predictive Applications', 'Connected Products', 'Business Intelligence']::text[], 3, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'AI Application Integration', 'Integrating AI capabilities into software applications to create intelligent features and automated workflows.', 0
  from public.services where number = '04';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Machine Learning Solutions', 'Developing machine learning workflows for classification, prediction, pattern recognition, and data-driven applications.', 1
  from public.services where number = '04';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Data & Model Workflows', 'Preparing data pipelines and model workflows that support experimentation, validation, and deployment.', 2
  from public.services where number = '04';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Intelligent Product Experiences', 'Combining AI with software, connected devices, and user interfaces to create smarter technology experiences.', 3
  from public.services where number = '04';

insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('05', 'CLOUD & BACKEND SYSTEMS', 'We engineer secure and scalable backend and cloud systems that power applications, APIs, databases, integrations, and real-time digital services.',
   'Secure Backend Architecture for Connected Digital Products', 'We build the backend foundations that allow digital products and connected systems to operate reliably. Our work covers API development, databases, authentication, application services, cloud integration, real-time communication, and data processing. The architecture is designed around the product requirements, expected workloads, integrations, and future scalability.', 'cloud',
   ARRAY['Backend Application Services', 'REST API Development', 'Database Architecture & Integration', 'Authentication & Authorization', 'Cloud Integration & Deployment Support']::text[], ARRAY['Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'MongoDB', 'Redis']::text[], ARRAY['SaaS Platforms', 'Enterprise Applications', 'IoT Platforms', 'Real-Time Systems']::text[], 4, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Backend Architecture', 'Designing structured backend systems that support application functionality, integrations, data processing, and future growth.', 0
  from public.services where number = '05';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'API Development', 'Building APIs that connect frontend applications, mobile applications, services, databases, and external integrations.', 1
  from public.services where number = '05';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Database Systems', 'Designing and integrating structured data storage solutions for application data, users, transactions, and connected systems.', 2
  from public.services where number = '05';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Cloud & Real-Time Services', 'Integrating cloud infrastructure and real-time communication services for modern applications and connected products.', 3
  from public.services where number = '05';

insert into public.services
  (number, name, description, tagline, full_overview, icon,
   deliverables, tech_stack, industry_applications, sort_order, is_visible) values
  ('06', 'UI/UX & DIGITAL PRODUCTS', 'We transform ideas into intuitive digital products through thoughtful UX, modern interfaces, product architecture, and experiences designed around real user needs.',
   'Human-Centered Design for Meaningful Digital Experiences', 'Our UI/UX and Digital Product services bring structure and clarity to complex digital products. We work across user journeys, information architecture, interface design, responsive layouts, design systems, and product experiences to create digital products that are intuitive and consistent. The design process is connected closely with product and software development so that experiences remain practical to build and scale.', 'uiux',
   ARRAY['User Flows & Information Architecture', 'Wireframes & Interface Designs', 'Responsive UI Systems', 'Reusable Design Components', 'Developer-Ready Product Specifications']::text[], ARRAY['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Prototyping']::text[], ARRAY['Web Platforms', 'Mobile Applications', 'SaaS Products', 'Business Dashboards']::text[], 5, true);

insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'User Experience Design', 'Mapping user journeys, information architecture, navigation, and interaction patterns around real user requirements.', 0
  from public.services where number = '06';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Interface Design', 'Creating modern and consistent interfaces for websites, applications, dashboards, and digital platforms.', 1
  from public.services where number = '06';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Design Systems', 'Developing reusable interface patterns, components, typography, spacing, and interaction guidelines for product consistency.', 2
  from public.services where number = '06';
insert into public.service_disciplines (service_id, title, "desc", sort_order)
  select id, 'Digital Product Strategy', 'Translating product requirements into structured digital experiences that align business objectives with user needs.', 3
  from public.services where number = '06';

-- ----------------------------------------------------------- solutions
insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('consumer-electronics', 'CONSUMER ELECTRONICS', 'Smart Products & Connected Experiences', 'We develop smart home devices, wearable technology, and connected consumer products designed for seamless connectivity, usability, and everyday experiences.',
   ARRAY['Smart home devices', 'Wearable technology', 'Connected personal electronics']::text[], 'Smartphone', 0, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'High-Fidelity Audio, Smart Wearables & Next-Gen Smart Home Ecosystems', 'We develop smart home devices, wearable technology, and connected consumer products designed for seamless connectivity, usability, and everyday experiences.', 'In the competitive consumer hardware landscape, user delight depends on ultra-compact miniaturization, battery longevity, and frictionless wireless connectivity. Hanxcel delivers complete product realization for consumer brands—engineering custom flex-rigid PCBs, Bluetooth 5.4 Low Energy stacks, capacitive touch interfaces, and ergonomic enclosure tooling. We bridge consumer aesthetic demands with rugged engineering that excels in daily use.', 'consumer',
         ARRAY['Smart Home Hubs & Matter/Thread Integration', 'Continuous Biometric Wearables & Optical PPG', 'True Wireless Stereo (TWS) Audio & DSP Tuning', 'Qi & MagSafe Compatible Fast Wireless Charging', 'Over-The-Air (OTA) Dual-Bank Firmware Upgrades']::text[], ARRAY['CE', 'FCC Part 15', 'Bluetooth SIG', 'RoHS / WEEE', 'USB-IF']::text[],
         'Smart Biometric Ring Tracker', 'Engineered 18-day battery life on a 22mAh micro-lipo cell with sub-1% heart rate variance against medical ECG.'
  from public.solutions where slug = 'consumer-electronics';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Ultra-Compact HDI & Flex-Rigid PCB', 'Sub-millimeter component density allowing sleek, ergonomic form factors for wearables and handheld gadgets.', 0
  from public.solutions where slug = 'consumer-electronics';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Power-Adaptive Firmware', 'Intelligent sleep states and ultra-low quiescent current (<5µA) yielding multi-week battery longevity.', 1
  from public.solutions where slug = 'consumer-electronics';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Zero-Friction Companion Apps', 'Instant BLE pairing, seamless Wi-Fi credential onboarding, and responsive iOS/Android synchronization.', 2
  from public.solutions where slug = 'consumer-electronics';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Rapid Acoustic & Ergonomic Validation', 'Precision 3D SLA/SLS acoustic prototyping, water-resistance testing (IP67/68), and drop-impact simulation.', 3
  from public.solutions where slug = 'consumer-electronics';

insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('energy-utilities', 'ENERGY & UTILITIES', 'Smart Energy Systems', 'We engineer connected and energy-efficient technologies that help address modern energy challenges through smarter monitoring and intelligent systems.',
   ARRAY['Smart metering', 'Energy-efficient technologies', 'Sustainable connected systems']::text[], 'Zap', 1, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'Grid Edge Intelligence, High-Current Power Electronics & Renewable Storage', 'We engineer connected and energy-efficient technologies that help address modern energy challenges through smarter monitoring and intelligent systems.', 'The transition to clean energy demands robust power conversion, bidirectional smart metering, and decentralized microgrid telemetry. Hanxcel designs high-voltage Silicon Carbide (SiC) and Gallium Nitride (GaN) power inverters, high-accuracy current-sensing frontends, and cellular-connected energy management gateways that operate reliably across extreme industrial temperatures (-40°C to +85°C).', 'energy',
         ARRAY['Solar Microinverters & MPPT Charge Controllers', 'Battery Management Systems (BMS) for EV & ESS', 'Bidirectional EV Fast Chargers (Level 3 DC)', 'Substation Condition Monitoring Sensors', 'Smart Grid SCADA & DNP3 / Modbus TCP Protocols']::text[], ARRAY['UL 1741', 'IEEE 1547', 'IEC 62053-22', 'IEC 61850', 'CE-LVD']::text[],
         'Commercial Solar Energy Storage BMS', 'Designed 800V 120kW BMS with active cell balancing, extending pack cycle life by 24% in high-heat desert environments.'
  from public.solutions where slug = 'energy-utilities';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Wide Bandgap Power Inverters (SiC / GaN)', 'Up to 99.2% electrical efficiency with reduced magnetics size and superior thermal dissipation.', 0
  from public.solutions where slug = 'energy-utilities';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Class 0.2S Revenue-Grade Metering', 'High-precision polyphase metering IC integration for instantaneous RMS voltage, current, and harmonics.', 1
  from public.solutions where slug = 'energy-utilities';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Decentralized Microgrid Synchronization', 'Sub-millisecond grid-tie phase matching, islanding protection, and demand-response load balancing.', 2
  from public.solutions where slug = 'energy-utilities';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Resilient Long-Range Telemetry', 'Dual-path cellular NB-IoT and LoRaWAN fallback for remote substations and solar farm deployments.', 3
  from public.solutions where slug = 'energy-utilities';

insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('defense-aerospace', 'DEFENSE & AEROSPACE', 'High-Reliability Electronics', 'We develop high-reliability electronic systems and components engineered to perform under critical conditions where precision and operational reliability matter.',
   ARRAY['High-reliability electronics', 'Critical-condition systems', 'Precision engineering']::text[], 'Shield', 2, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'Mission-Critical Avionics, Radiation-Tolerant Compute & Secure Communications', 'We develop high-reliability electronic systems and components engineered to perform under critical conditions where precision and operational reliability matter.', 'When failure is not an option, Hanxcel engineers mission-grade electronics built to endure intense vibration, severe thermal shock, electromagnetic pulses (EMP), and radiation. Our aerospace engineering team follows strict DO-254 and DO-178C guidelines, leveraging FPGA-accelerated computing, ruggedized VPX backplanes, conformal coating, and tamper-resistant cryptographic enclaves.', 'defense',
         ARRAY['Rugged Single Board Computers (3U / 6U OpenVPX)', 'Software-Defined Radio (SDR) Transceivers (UHF/VHF/Ku)', 'Inertial Navigation Systems (INS) & GPS-Denied Dead Reckoning', 'UAV Flight Controller & Motor ESC Subsystems', 'MIL-STD-810H & MIL-STD-461G Pre-Compliance Testing']::text[], ARRAY['MIL-STD-810H', 'MIL-STD-461G', 'DO-254 / DO-178C', 'IPC-A-610 Class 3', 'AS9100 Rev D Ready']::text[],
         'Autonomous UAV Avionics Hub', 'Delivered an integrated triple-redundant flight control computer that passed continuous 40G shock and vibration tests.'
  from public.solutions where slug = 'defense-aerospace';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'DO-254 / DO-178C Level A Compliance', 'Deterministic avionics hardware and safety-critical RTOS software design with complete traceability.', 0
  from public.solutions where slug = 'defense-aerospace';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Conformal Coating & Potting Encapsulation', 'Military-grade polyurethanes and silicones protecting boards from moisture, salt spray, and extreme G-forces.', 1
  from public.solutions where slug = 'defense-aerospace';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Hardware Anti-Tamper & Zeroization', 'Cryptographic enclaves featuring active mesh sensors and instantaneous zeroize triggers on chassis breach.', 2
  from public.solutions where slug = 'defense-aerospace';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Thermal Conduction Cooling', 'Fanless conduction-cooled rugged enclosures dissipating over 200W through cold-plate thermal paths.', 3
  from public.solutions where slug = 'defense-aerospace';

insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('iot-connected-systems', 'IoT & CONNECTED SYSTEMS', 'End-to-End IoT Solutions', 'We build connected IoT ecosystems that bring together hardware, firmware, and cloud integration to enable smarter homes, industries, and environments.',
   ARRAY['IoT hardware', 'Firmware integration', 'Cloud-connected systems']::text[], 'Radio', 3, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'Industrial Sensor Clusters, Edge Gateways & Global Cloud Telemetry', 'We build connected IoT ecosystems that bring together hardware, firmware, and cloud integration to enable smarter homes, industries, and environments.', 'Hanxcel builds massive-scale IoT systems that collect, sanitize, and transmit critical telemetry from tens of thousands of edge devices to enterprise cloud warehouses. We design custom low-power multi-radio gateways (BLE 5.4, LoRaWAN, Cellular LTE-M, Thread/Matter), automated zero-touch provisioning tools, and encrypted bi-directional cloud control planes.', 'iot',
         ARRAY['Multi-Sensor Environmental & Asset Tracking Nodes', 'Industrial Edge Gateways with Dual SIM Failover', 'Private LoRaWAN Base Stations & Cloud Network Servers', 'Enterprise AWS IoT Core / Azure IoT Hub Connectors', 'Micro-Power Energy Harvesting Circuit Design']::text[], ARRAY['FCC / IC / CE-RED', 'PTCRB & AT&T/Verizon Carrier Certified', 'LoRa Alliance', 'RoHS / REACH']::text[],
         'Global Cold-Chain Logistics Tracker', 'Deployed 60,000+ real-time temperature & vibration tracking beacons with 5-year battery life and global satellite roaming.'
  from public.solutions where slug = 'iot-connected-systems';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Multi-Radio Mesh Architecture', 'Self-healing mesh topology enabling reliable coverage across vast industrial factories and agricultural farms.', 0
  from public.solutions where slug = 'iot-connected-systems';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Zero-Touch Secure Provisioning', 'Automated factory cryptographic key injection ensuring plug-and-play mutual TLS authentication to AWS/Azure.', 1
  from public.solutions where slug = 'iot-connected-systems';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Edge Pre-Processing & Compression', 'Local edge data filtering reducing cellular bandwidth costs by over 70% while preserving anomaly alerts.', 2
  from public.solutions where slug = 'iot-connected-systems';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Dynamic Power Harvesting', 'Solar and thermoelectric micro-energy harvesting for continuous 10+ year maintenance-free outdoor deployments.', 3
  from public.solutions where slug = 'iot-connected-systems';

insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('medical-devices', 'MEDICAL DEVICES', 'Precision Medical Technology', 'We design advanced electronic solutions for medical applications with a focus on precision, reliability, compliance, and innovation.',
   ARRAY['Medical monitoring', 'Diagnostic systems', 'Medical electronics']::text[], 'Activity', 4, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'ISO 13485 Compliant Patient Monitoring, Diagnostic Electronics & MedTech', 'We design advanced electronic solutions for medical applications with a focus on precision, reliability, compliance, and innovation.', 'In medical instrumentation, precision and patient safety are paramount. Hanxcel engineers clinical-grade analog frontends (AFE), galvanic patient isolation barriers, wearable biometric patches, and optical diagnostic analyzers. We strictly adhere to ISO 13485 quality systems, IEC 60601-1 electrical safety standards, and FDA 21 CFR 820 Design Controls throughout every phase.', 'medical',
         ARRAY['Multiparameter Vital Signs Patient Monitors', 'Wearable Continuous Cardiac ECG Holter Patches', 'In-Vitro Diagnostic (IVD) Optical Spectrometers', 'Insulin Pumps & Smart Drug Delivery Controllers', 'Medical Ultrasonic Transducer Drive Electronics']::text[], ARRAY['ISO 13485:2016', 'IEC 60601-1 (Electrical Safety)', 'IEC 60601-1-2 (EMC)', 'FDA 510(k) Ready']::text[],
         'Continuous ICU-Grade ECG/SpO2 Patch', 'Engineered a wireless 7-day disposable patch with medical clinical validation and direct HL7 EHR hospital integration.'
  from public.solutions where slug = 'medical-devices';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'IEC 60601-1 3rd Ed. & 2xMOPP Isolation', '4000V reinforced galvanic patient isolation protecting both patients and sensitive measurement amplifiers.', 0
  from public.solutions where slug = 'medical-devices';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Ultra-Low Noise Clinical Bio-Frontends', 'Sub-microvolt ECG, EEG, EMG, and multi-wavelength SpO2 analog signal capture with 24-bit delta-sigma ADCs.', 1
  from public.solutions where slug = 'medical-devices';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'FDA Design History File (DHF) Documentation', 'Complete ISO 14971 risk management files, verification matrices, and biocompatibility documentation.', 2
  from public.solutions where slug = 'medical-devices';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Sterilizable & Biocompatible Enclosures', 'Medical-grade polymer enclosures resistant to autoclave sterilization, chemical disinfectants, and ingress.', 3
  from public.solutions where slug = 'medical-devices';

insert into public.solutions
  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values
  ('industrial-automation', 'INDUSTRIAL AUTOMATION', 'Intelligent Industrial Systems', 'We create intelligent control and automation technologies that improve industrial efficiency, productivity, and operational reliability.',
   ARRAY['Intelligent control systems', 'Predictive maintenance', 'Industrial automation']::text[], 'Cog', 5, true);

insert into public.solution_details
  (solution_id, tagline, description, full_overview, icon,
   key_capabilities, certifications, case_study_title, case_study_impact)
  select id, 'Rugged PLCs, Motor Controllers, Vibration Analytics & Predictive AI', 'We create intelligent control and automation technologies that improve industrial efficiency, productivity, and operational reliability.', 'We empower smart factories with deterministic control electronics, fieldbus communication modules, and real-time edge AI diagnostics. From high-power brushless DC (BLDC) motor drivers and PLC controllers to wireless vibration sensors for predictive maintenance, Hanxcel engineers rugged industrial hardware that eliminates unplanned plant downtime.', 'industrial',
         ARRAY['Modular Programmable Logic Controllers (PLCs)', 'Multi-Axis Servo & Stepper Motor Drive Controllers', 'Predictive Maintenance 4.0 Vibration Sensors', 'Industrial Human-Machine Interfaces (HMI)', 'Isolated Analog I/O & RTD/Thermocouple Modules']::text[], ARRAY['IEC 61131-2', 'IEC 61000-6-2 (Immunity)', 'IEC 61000-6-4 (Emissions)', 'UL 508A', 'CE']::text[],
         'High-Speed CNC Vibration Telemetry Node', 'Detected motor spindle degradation 14 days before failure across 250 factory CNC machines, preventing $400k+ in downtime.'
  from public.solutions where slug = 'industrial-automation';

insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Real-Time Industrial Fieldbus Networks', 'Sub-microsecond synchronization supporting EtherCAT, PROFINET, Modbus TCP, CANopen, and IO-Link.', 0
  from public.solutions where slug = 'industrial-automation';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Vibration Anomaly Detection with Edge TinyML', 'High-frequency 3-axis MEMS accelerometer FFT analysis predicting bearing failure weeks in advance.', 1
  from public.solutions where slug = 'industrial-automation';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'High-Power BLDC / PMSM Motor Control', 'Field-Oriented Control (FOC) algorithms driving multi-kilowatt robotic joints with smooth torque delivery.', 2
  from public.solutions where slug = 'industrial-automation';
insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)
  select id, 'Severe Surge & Transient Protection', 'TVS diodes, optocouplers, and gas discharge tubes rated for harsh IEC 61000-4-5 4kV industrial surges.', 3
  from public.solutions where slug = 'industrial-automation';

-- ------------------------------------------------------------ projects
insert into public.projects
  (slug, number, name, button_text, category, title, client, timeline, tagline, overview,
   hero_image, gallery_images, col1_top_title, col1_top_subtitle, col1_bottom_text,
   challenge, solution, tools_and_tech, link, sort_order, is_visible) values
  ('nextlevel-studio', '01', 'CONSUMER ELECTRONICS', 'VIEW CASE STUDY',
   'CONSUMER ELECTRONICS', 'Next-Gen Smart Connected Wearable & Audio Ecosystem', 'NextLevel Audio & Wearables Inc.', '4 Months (Architecture to DFM)', 'Ultra-Compact HDI Architecture, Bluetooth 5.4 LE Audio & Sub-Microamp Power Management',
   'A groundbreaking connected consumer wearable and audio product that combines sub-millimeter electronic miniaturization, custom active noise-cancellation (ANC) DSP filters, and ultra-low quiescent current management. Engineered to deliver studio-grade acoustics and multi-day battery endurance in a featherweight ergonomic housing.', 'SmartConnectedDevice.png', ARRAY['SmartConnectedDevice.png']::text[],
   'SMART CONNECTED DEVICE', 'Electronics · Embedded · IoT', 'A connected consumer product combining intelligent electronics, embedded technology, and IoT for smarter everyday experiences.',
   'The client required an exceptionally compact form factor capable of housing a high-performance Bluetooth 5.4 chipset, 24-bit audio DAC, optical PPG biometric sensors, and touch controls while maintaining IP68 water resistance and exceeding 30 hours of continuous playback.', 'Hanxcel designed a 10-layer any-layer HDI flex-rigid PCB architecture coupled with an ultra-efficient Nordic nRF5340 dual-core SoC. We implemented bespoke dynamic voltage scaling in firmware and tuned custom LDS (Laser Direct Structuring) antennas for robust RF propagation even near the human body.', ARRAY['Altium Designer', 'Nordic nRF Connect SDK', 'Zephyr RTOS', 'Ansys HFSS Antenna Sim', 'SolidWorks CAD', 'Audio Precision APx555']::text[], '#', 0, true);

insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Any-Layer HDI & Flex-Rigid Stackup', 'Reduced internal electronics volume by 42% utilizing microvias and blind/buried vias.', 0
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Dual-Core ARM Cortex-M33 Processing', 'Dedicated core for audio DSP & ANC filters; secondary core managing BLE connectivity and biometrics.', 1
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Sub-3.2µA Sleep Current Engine', 'Dynamic peripheral power gating delivering over 14 days of standby battery retention.', 2
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Qi Fast Wireless Charging Receiver', 'Integrated miniature wireless coil with 5W rapid charge receiving 80% capacity in under 25 minutes.', 3
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Processor', 'Dual ARM Cortex-M33 @ 128MHz', 0
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Wireless Protocol', 'Bluetooth 5.4, LE Audio, Auracast', 1
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'PCB Technology', '10-Layer Any-Layer HDI Rigid-Flex', 2
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Ingress Protection', 'IP68 Submersible (1.5m / 30min)', 3
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Battery Capacity', '75mAh Micro-LiPo + 520mAh Case', 4
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Firmware OS', 'Zephyr RTOS with Secure Bootloader', 5
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '38 hrs', 'Total Playback Time', 0
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '<18 ms', 'Ultra-Low Latency', 1
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '99.8%', 'First-Pass SMT Yield', 2
  from public.projects where slug = 'nextlevel-studio';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, 'IP68', 'Water & Dust Rating', 3
  from public.projects where slug = 'nextlevel-studio';

insert into public.projects
  (slug, number, name, button_text, category, title, client, timeline, tagline, overview,
   hero_image, gallery_images, col1_top_title, col1_top_subtitle, col1_bottom_text,
   challenge, solution, tools_and_tech, link, sort_order, is_visible) values
  ('aura-brand-identity', '02', 'IoT & CONNECTED SYSTEMS', 'VIEW CASE STUDY',
   'IoT & CONNECTED SYSTEMS', 'Enterprise Industrial IoT Platform & Edge Telemetry Hub', 'Aura Logistics & Global Sensor Network', '5.5 Months (Pilot to Mass Rollout)', 'Multi-Protocol Wireless Gateway, Real-Time Edge Analytics & Enterprise Cloud Pipeline',
   'An industrial-grade IoT gateway and sensor fleet designed for real-time asset tracking, predictive machine maintenance, and mission-critical telemetry. Engineered with dual-SIM cellular failover, local edge caching, and plug-and-play mutual TLS cloud connectivity.', 'IndustrialIoTPlatform.png', ARRAY['IndustrialIoTPlatform.png']::text[],
   'INDUSTRIAL IoT PLATFORM', 'IoT Hardware · Firmware · Cloud', 'Intelligent control solutions that combine embedded technology and automation to improve industrial efficiency, productivity, and operational reliability.',
   'Manufacturing facilities and remote logistics fleets suffered from lost data packets, high cellular data consumption costs, and frequent network dropouts across harsh electromagnetic environments.', 'Hanxcel built an intelligent multi-radio edge hub combining LTE-M/NB-IoT, LoRaWAN Class C, and RS-485 Modbus. Firmware runs local edge compression and TinyML anomaly detection, buffering data in non-volatile flash during disconnects and securely flushing via encrypted MQTT when reconnected.', ARRAY['Yocto Linux', 'AWS IoT Core', 'Semtech LoRaWAN', 'KiCad Pro / Cadence Allegro', 'Docker on Edge', 'Grafana Enterprise']::text[], '#', 1, true);

insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Dual SIM Global Cellular Roaming', 'Automatic network failover supporting over 140 carriers globally without operator lock-in.', 0
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Hardware Cryptographic Enclave (ATECC608B)', 'Protected private keys ensuring tamper-proof zero-touch authentication to AWS IoT Core.', 1
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Edge Time-Series Compression', 'Reduces cellular bandwidth by 76% while retaining sub-millisecond peak vibration samples.', 2
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Industrial Wide-Voltage Input (9-36V DC)', 'Built-in 4kV surge suppression, reverse polarity protection, and supercapacitor brownout backup.', 3
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Compute Core', 'NXP i.MX 8M Mini Quad Cortex-A53', 0
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Cellular Modem', 'Quectel BG95-M3 Cat M1/NB-IoT/EGPRS', 1
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'LoRa Concentrator', 'Semtech SX1302 8-Channel Base Station', 2
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Local Storage', '8GB eMMC + MicroSD Crash Dump Buffer', 3
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Operating Temp', '-40°C to +85°C Industrial Grade', 4
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Cloud Protocol', 'Mutual TLS MQTT / HTTPS / WebSockets', 5
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '50k+', 'Connected Edge Nodes', 0
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '99.99%', 'Uptime Reliability', 1
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '-76%', 'Cellular Data Costs', 2
  from public.projects where slug = 'aura-brand-identity';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '<8 ms', 'Telemetry Latency', 3
  from public.projects where slug = 'aura-brand-identity';

insert into public.projects
  (slug, number, name, button_text, category, title, client, timeline, tagline, overview,
   hero_image, gallery_images, col1_top_title, col1_top_subtitle, col1_bottom_text,
   challenge, solution, tools_and_tech, link, sort_order, is_visible) values
  ('solaris-digital', '03', 'INDUSTRIAL AUTOMATION', 'VIEW CASE STUDY',
   'INDUSTRIAL AUTOMATION', 'Intelligent High-Precision Control & Automation System', 'Solaris Industrial Automation Group', '6 Months (Concept to Production Line Deployment)', 'Deterministic Multi-Axis Motor Control, EtherCAT Fieldbus & Edge TinyML Diagnostics',
   'A mission-critical PLC and multi-axis servo drive automation solution designed for high-speed assembly robotics and smart factories. Delivers sub-microsecond deterministic motion synchronization, real-time current loop closures, and automated vibration wear forecasting.', 'IntelligentControlSystem.png', ARRAY['IntelligentControlSystem.png']::text[],
   'INTELLIGENT CONTROL SYSTEM', 'Embedded · Automation · Control', 'Intelligent control solutions that combine embedded technology and automation to improve industrial efficiency, productivity, and operational reliability.',
   'The client needed to synchronize 6 robotic servo axes with sub-50 nanosecond clock jitter while operating next to high-EMC noise sources (20kW induction heaters and pulsed laser welders) without experiencing signal corruption.', 'Hanxcel engineered an STM32H7 dual-core + FPGA co-processing architecture with isolated EtherCAT slave controllers, galvanically isolated gate drivers, and 4-layer shielding planes. We integrated TinyML vibration anomaly detection directly onto the microcontroller DSP pipeline.', ARRAY['Xilinx Vivado', 'STM32CubeIDE', 'TwinCAT 3 EtherCAT', 'Cadence Allegro PCB', 'TensorFlow Lite for Microcontrollers', 'Rohde & Schwarz EMI Receiver']::text[], '#', 2, true);

insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Dual-Core STM32H7 + Xilinx Artix-7 FPGA', 'FPGA calculates hardware FOC current loops in 1.2 microseconds with zero CPU overhead.', 0
  from public.projects where slug = 'solaris-digital';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'EtherCAT Real-Time Industrial Bus', 'Deterministic cycle times of 250 microseconds with sub-20ns distributed clock synchronization.', 1
  from public.projects where slug = 'solaris-digital';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Complete Galvanic Optical Isolation', '5000Vrms isolation between digital logic control planes and high-current 48V/60A power stages.', 2
  from public.projects where slug = 'solaris-digital';
insert into public.project_architecture_points (project_id, title, "desc", sort_order)
  select id, 'Predictive Vibration FFT Anomaly Sensor', 'Onboard 3-axis MEMS accelerometer monitoring bearing wear and alerting before mechanical binding.', 3
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Motion Controller', 'STM32H747XI Dual Core + Artix-7 FPGA', 0
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Fieldbus Support', 'EtherCAT, CANopen, PROFINET, Modbus TCP', 1
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Drive Rating', '24V - 60V DC, 50A Continuous / 120A Peak', 2
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Current Loop Rate', '20kHz FOC Field-Oriented Control', 3
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Feedback Encoders', 'BiSS-C, EnDat 2.2, Incremental ABZ', 4
  from public.projects where slug = 'solaris-digital';
insert into public.project_technical_specs (project_id, label, value, sort_order)
  select id, 'Safety Standards', 'SIL3 / PLe Safe Torque Off (STO)', 5
  from public.projects where slug = 'solaris-digital';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '250 µs', 'EtherCAT Cycle Time', 0
  from public.projects where slug = 'solaris-digital';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '<20 ns', 'Clock Sync Jitter', 1
  from public.projects where slug = 'solaris-digital';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '100%', 'EMC Noise Immunity', 2
  from public.projects where slug = 'solaris-digital';
insert into public.project_key_metrics (project_id, metric, label, sort_order)
  select id, '4.8x', 'Factory Throughput Boost', 3
  from public.projects where slug = 'solaris-digital';

-- ----------------------------------------------------------- portfolio
insert into public.portfolio
  (slug, year, category, title, client, timeline, tagline, overview, icon, scope,
   description, metric, metric_label, challenge, solution, tools_and_tech,
   deliverables, link, sort_order, is_visible) values
  ('smart-connected-mesh', '2026', 'IoT & HARDWARE', 'Industrial Mesh Sensor Node', 'Global Logistics Corp',
   '4.5 Months (Concept to Pilot Rollout)', 'Self-Healing Sub-GHz LoRa Mesh Telemetry with 5+ Year Battery Endurance', 'Engineered an ultra-ruggedized, low-power industrial sensor node cluster designed for harsh enterprise environments, multi-acre logistics yards, and container shipping hubs. Nodes autonomously organize into a resilient, self-healing Sub-GHz mesh network that continuously monitors temperature, 3-axis shock, humidity, and atmospheric pressure without requiring external line power or dedicated cellular modems on each unit.', 'iot', ARRAY['PCB Design', 'Sub-GHz RF', 'Enclosure Engineering']::text[],
   'Ultra-low-power environmental monitoring nodes transmitting telemetry over multi-hop LoRa mesh networks with 5+ years of battery lifespan.', '99.98%', 'Packet Delivery Reliability',
   'Massive metal shipping containers and steel warehouse superstructures caused frequent RF multipath reflections and signal dead zones, while nodes were required to run on a single lithium thionyl chloride battery cell for over 5 years.', 'Hanxcel designed a custom dual-antenna diversity frontend with an optimized LoRa mesh routing protocol. We engineered deep-sleep power gating circuits with sub-1.8µA sleep currents and dynamic transmit power scaling based on RSSI packet acknowledgments.', ARRAY['STM32CubeIDE', 'Altium Designer 24', 'Ansys HFSS Antenna Sim', 'Nordic Power Profiler Kit II', 'AWS IoT Core', 'LoRa Alliance Mesh Stack']::text[],
   ARRAY['Complete Schematics & 4-Layer Controlled-Impedance PCB Gerbers', 'Zephyr RTOS C/C++ Firmware Repository with Automated CI/CD', 'Production In-Circuit Testing (ICT) Fixture Design', 'FCC Part 15 & CE-RED Regulatory Compliance Dossier']::text[], '#', 0, true);

insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Sub-GHz LoRa Mesh Protocol Engine', 'Dynamic multi-hop routing protocol with automatic route failover in under 200ms when paths become obstructed.', 0
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Ultra-Low Quiescent Power Management', 'Sub-1.8µA sleep state with intelligent periodic wakeups and hardware threshold interrupt wake pins.', 1
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'IP67 Weatherproof Polycarbonate Enclosure', 'Overmolded silicone gaskets and breathable ePTFE acoustic/pressure equalization membranes.', 2
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Encrypted Cryptographic Element (ATECC608A)', 'AES-128 payload encryption ensuring end-to-end data integrity from physical edge nodes to cloud brokers.', 3
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Microcontroller', 'STM32WL55 Dual-Core ARM Cortex-M4/M0+', 0
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'RF Frequency', '868 MHz / 915 MHz Sub-GHz LoRa', 1
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Transmission Range', 'Up to 3.2 km Line-of-Sight per hop', 2
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Battery Power', '3.6V LiSOCl2 8500mAh Industrial Cell', 3
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Enclosure Rating', 'IP67 Waterproof & UV-Stabilized', 4
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Sensors Integrated', 'Sensirion Temp/RH + Bosch 3-Axis Shock', 5
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '99.98%', 'Packet Delivery Reliability', 0
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '5.4 Yrs', 'Calculated Battery Life', 1
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '<1.8 µA', 'Deep Sleep Quiescent', 2
  from public.portfolio where slug = 'smart-connected-mesh';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '10,000+', 'Deployed Node Fleet', 3
  from public.portfolio where slug = 'smart-connected-mesh';

insert into public.portfolio
  (slug, year, category, title, client, timeline, tagline, overview, icon, scope,
   description, metric, metric_label, challenge, solution, tools_and_tech,
   deliverables, link, sort_order, is_visible) values
  ('nextgen-wearable', '2025', 'CONSUMER ELECTRONICS', 'Haptic Vitality Smart Tracker', 'Aura Healthtech',
   '5 Months (Architecture to DFM)', 'Continuous Clinical-Grade Optical PPG, GSR Biometrics & Flex-Rigid Circuitry', 'A sleek, ultra-ergonomic vitality wristband combining clinical-grade optical photoplethysmography (PPG), galvanic skin response (GSR), skin temperature sensing, and linear resonant haptic feedback. Designed with a flexible circuit architecture that wraps smoothly inside hypoallergenic medical silicone bands.', 'wearable', ARRAY['Flex-PCB', 'BLE 5.3', 'Biometric Algorithms']::text[],
   'Continuous PPG heart rate and galvanic skin response biometric band featuring custom flexible circuitry, miniature packaging, and waterproof sealing.', '14 Days', 'Battery Runtime per Charge',
   'Integrating a high-density 6-layer flex-rigid PCB, dual green/red/IR LEDs, sensitive photodiodes, battery management, and a linear resonant actuator (LRA) into a water-submersible band under 8.5mm total thickness.', 'Engineered an ultra-dense flex-rigid substrate with blind and buried microvias, isolating analog optical sensor signals from high-current haptic motor drive lines. Optimized firmware with adaptive optical LED driving that reduces power consumption by 45% during quiet sleep phases.', ARRAY['Altium Designer 24 (Rigid-Flex)', 'Cadence Sigrity SI/PI', 'Nordic nRF Connect SDK', 'MATLAB PPG Filter Modeling', 'SolidWorks Medical Tooling', 'Keysight Scope Spectrum Analyzer']::text[],
   ARRAY['Fabrication Gerbers, ODB++ and Flex Stiffener Specifications', 'Embedded Firmware with On-Device Motion Artifact Cancellation', 'Bluetooth LE Custom GATT Service Profile Documentation', 'ISO 10993 Biocompatibility Test Validation Protocols']::text[], '#', 1, true);

insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Flex-Rigid Multi-Zone Substrate', '6-layer polyimide flex circuit enabling seamless contouring around the wrist without trace strain.', 0
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Multi-Wavelength Optical Biometric AFE', 'Triple LED optical emitter array with 24-bit high dynamic range ADC capturing microvolt PPG waveforms.', 1
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Linear Resonant Haptic Feedback (LRA)', 'Sub-millisecond tactile haptic transients for discreet vitality alerts and wellness pacing reminders.', 2
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'IP68 Waterproof Magnetic Pogo Dock', 'Hermetically sealed charging contacts preventing corrosion from sweat, saltwater, and daily wear.', 3
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'SoC Platform', 'Nordic nRF5340 Dual-Core BLE 5.3', 0
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Sensors', 'Multi-Wavelength PPG, GSR, Temp, 6-Axis IMU', 1
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'PCB Technology', '6-Layer Flex-Rigid with 0.4mm BGA', 2
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Battery Capacity', '140mAh Curved Li-Po Polymer', 3
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Battery Runtime', '14 Days Continuous Tracking', 4
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Water Ingress', '5 ATM / IP68 Submersible (50m)', 5
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '14 Days', 'Battery Runtime per Charge', 0
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '8.2 mm', 'Ultra-Slim Profile', 1
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '98.6%', 'HR Correlation vs Medical ECG', 2
  from public.portfolio where slug = 'nextgen-wearable';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '<35 min', 'Fast Magnetic Charge (80%)', 3
  from public.portfolio where slug = 'nextgen-wearable';

insert into public.portfolio
  (slug, year, category, title, client, timeline, tagline, overview, icon, scope,
   description, metric, metric_label, challenge, solution, tools_and_tech,
   deliverables, link, sort_order, is_visible) values
  ('smart-energy-controller', '2025', 'ENERGY & AUTOMATION', 'Smart Microgrid Power Inverter', 'Solaris Energy Systems',
   '6 Months (Topology Simulation to Factory Trial)', 'Bidirectional GaN Power Stage with Sub-Cycle Islanding & Grid-Tie Synchronization', 'High-efficiency, bidirectional microgrid inverter controller engineered for residential and commercial energy storage systems. Features Gallium Nitride (GaN) high-frequency switching stages, real-time Maximum Power Point Tracking (MPPT), and autonomous sub-cycle grid islanding protection during blackout events.', 'energy', ARRAY['Power Electronics', 'Firmware', 'Modbus/MQTT Cloud']::text[],
   'Bidirectional smart inverter controller managing dual-source photovoltaic generation and battery storage with sub-cycle peak power switching.', '32% Faster', 'Grid Fault Response Time',
   'Achieving greater than 98.8% conversion efficiency while maintaining sub-millisecond islanding detection without false trips from fluctuating inductive industrial loads.', 'Designed a dual-core DSP control architecture executing 100kHz digital current loops with advanced phase-locked loop (PLL) algorithms. Integrated galvanically isolated gate drivers and low-inductance planar magnetics for minimal thermal dissipation.', ARRAY['PLECS Power Electronics Simulation', 'TI Code Composer Studio', 'Altium Designer (High-Current 4oz Cu)', 'Yokogawa WT5000 Power Analyzer', 'Modbus TCP / SunSpec Protocol', 'EMC Pre-Compliance Chamber']::text[],
   ARRAY['Complete High-Voltage Schematic & 4oz Heavy Copper PCB Layout', 'Real-Time C Firmware for DSP Inverter Control & MPPT Loops', 'UL 1741 & IEEE 1547 Test Verification Documentation', 'Factory Automated Test System (ATE) Calibration Guidelines']::text[], '#', 2, true);

insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'High-Frequency GaN Power Stage', 'Wide-bandgap transistors operating at 100kHz reducing inductor size by 60% with 98.9% peak efficiency.', 0
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Sub-Cycle Islanding Transition', 'Autonomous microgrid disconnection in under 8ms during grid collapse, protecting downstream electronics.', 1
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Bidirectional Four-Quadrant Inversion', 'Seamless transition between solar battery charging, grid export, and peak-shaving domestic support.', 2
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Dual Isolated RS-485 / Modbus & Wi-Fi Gateway', 'Sub-second real-time telemetry streaming to cloud energy management platforms and utility SCADA.', 3
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'DSP Controller', 'TI C2000 TMS320F28379D Dual Core', 0
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Power Rating', '15 kW Continuous / 22 kW Peak', 1
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Switching Frequency', '100 kHz GaN Semiconductor', 2
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Peak Efficiency', '98.9% CEC Weighted Efficiency', 3
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Grid Standard', 'IEEE 1547-2018 / UL 1741 SB', 4
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Cooling Method', 'Fanless Convection Aluminum Heatsink', 5
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '32% Faster', 'Grid Fault Response Time', 0
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '98.9%', 'Peak Conversion Efficiency', 1
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '<8 ms', 'Seamless Islanding Transfer', 2
  from public.portfolio where slug = 'smart-energy-controller';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '15 kW', 'Continuous Output Power', 3
  from public.portfolio where slug = 'smart-energy-controller';

insert into public.portfolio
  (slug, year, category, title, client, timeline, tagline, overview, icon, scope,
   description, metric, metric_label, challenge, solution, tools_and_tech,
   deliverables, link, sort_order, is_visible) values
  ('edge-vision-module', '2024', 'AI & EMBEDDED', 'Edge AI Computer Vision Controller', 'Kinetix Robotics',
   '4 Months (Hardware & Neural Model Optimization)', '120 FPS Real-Time Defect Classification with Automotive CAN & Gigabit Ethernet', 'High-throughput optical inspection compute engine engineered for automated assembly lines, high-speed pick-and-place sorting, and precision robotic packaging. Integrates hardware neural processing accelerators with deterministic machine vision camera interfaces to detect micro-defects at line speeds.', 'ai', ARRAY['Neural Accelerator', 'Automotive CAN', 'Thermal Design']::text[],
   'High-throughput optical inspection module executing real-time defect classification on industrial assembly lines at 120 FPS latency.', '<8ms', 'Inference Latency',
   'Processing multi-megapixel global shutter camera frames with sub-8ms inference latency while operating fanless inside hot factory control cabinets (+65°C ambient).', 'Engineered an edge compute board combining an NXP i.MX 8M Plus NPU with a dedicated FPGA image pre-processor. Quantized custom convolutional defect detection models to INT8, achieving 120 FPS classification throughput with zero dropped frames.', ARRAY['TensorFlow Lite / ONNX Runtime', 'Yocto Linux Board Support Package', 'Cadence Allegro High-Speed Design', 'OpenCV Machine Vision Pipeline', 'Ansys Icepak Thermal Simulation', 'Keysight Signal Integrity Scope']::text[],
   ARRAY['High-Speed 8-Layer HDI PCB Design & Manufacturing Package', 'Custom Yocto Linux BSP with Hardware Accelerated ISP Drivers', 'Quantized INT8 Deep Learning Inspection Model Pipelines', 'Industrial CE & EN 61000-6-2 Electromagnetic Immunity Certification']::text[], '#', 3, true);

insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Dedicated 2.3 TOPS Neural Processing Unit (NPU)', 'Accelerated INT8 tensor operations performing defect classification in 5.8 milliseconds per frame.', 0
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Global Shutter MIPI-CSI2 Interface', 'Zero-blur image acquisition of fast-moving products on conveyor belts traveling up to 4.5 m/s.', 1
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Automotive CAN-FD & Industrial Isolated Digital I/O', 'Immediate optical reject trigger outputs with sub-microsecond deterministic response times.', 2
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_architecture_points (portfolio_id, title, "desc", sort_order)
  select id, 'Fanless Conduction Thermal Solution', 'Direct die-to-chassis heat pipe routing keeping compute core temperatures under 72°C in hot enclosures.', 3
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Compute Core', 'NXP i.MX 8M Plus Quad Cortex-A53 + NPU', 0
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'NPU Throughput', '2.3 TOPS Dedicated Neural Accelerator', 1
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Camera Interface', 'Dual 4-Lane MIPI CSI-2 with Hardware ISP', 2
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Industrial Interfaces', 'CAN-FD, Gigabit Ethernet, 24V Opto-I/O', 3
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'System Memory', '8GB LPDDR4 + 32GB eMMC Industrial', 4
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_technical_specs (portfolio_id, label, value, sort_order)
  select id, 'Operating Temp', '-40°C to +85°C Fanless Industrial', 5
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '<8 ms', 'Inference Latency', 0
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '120 FPS', 'Inspection Throughput', 1
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '99.94%', 'Defect Detection Accuracy', 2
  from public.portfolio where slug = 'edge-vision-module';
insert into public.portfolio_key_metrics (portfolio_id, metric, label, sort_order)
  select id, '0 dB', 'Silent Fanless Operation', 3
  from public.portfolio where slug = 'edge-vision-module';

-- ---------------------------------------------------------------- team
insert into public.team_members
  (slug, name, role, bio, specialties, image_url, linkedin, email, github, sort_order, is_visible) values
  ('jagadish-mallesh', 'Jagadish Mallesh', 'Director', 'Leads Hanxcel AI Technologies with a focus on engineering intelligent products and end-to-end technology solutions across electronics, embedded systems, IoT, AI, software, and manufacturing.', ARRAY['Product Engineering', 'IoT & AI Solutions', 'Technology Strategy']::text[],
   'Jagadish.jpeg', 'https://www.linkedin.com/in/jagadish-m-b987ab120?utm_source=share_via&utm_content=profile&utm_medium=member_android', 'technical@hanxcel.com', NULL, 0, true);
insert into public.team_members
  (slug, name, role, bio, specialties, image_url, linkedin, email, github, sort_order, is_visible) values
  ('srinivasa-muniswami', 'Srinivasa Muniswami', 'Director', 'Leads technology development at Hanxcel AI Technologies, bringing together electronics, embedded systems, IoT, AI, software, and connected product development to build reliable and intelligent technology solutions.', ARRAY['Embedded Systems', 'IoT & Connected Products', 'AI & Software Solutions']::text[],
   'Srinivasa.jpeg', 'https://www.linkedin.com/in/srinivasa-m-6b4a8475?utm_source=share_via&utm_content=profile&utm_medium=member_android', 'technical@hanxcel.com', NULL, 1, true);
insert into public.team_members
  (slug, name, role, bio, specialties, image_url, linkedin, email, github, sort_order, is_visible) values
  ('dinesh-p', 'Dinesh P', 'Software Developer', 'Develops software and connected technology solutions at Hanxcel AI Technologies, working across application development, IoT integration, AI-powered solutions, and digital products.', ARRAY['Software Development', 'IoT Integration', 'AI Solutions']::text[],
   'DineshP.jpeg', '#', NULL, '#', 2, true);

-- -------------------------------------------------------- testimonials
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('vikram-nair', 'Vikram Nair', 'VP of Engineering', 'VoltEdge Robotics', 'Industrial Robotics',
   'Hanxcel took our rough architecture and delivered a certified, dual-MCU industrial motor controller ahead of schedule. Their thermal analysis and EMI shielding passed regulatory certification on the very first attempt.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 0, true);
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('claire-dupont', 'Claire Dupont', 'Co-Founder & CTO', 'Sensus Smart Health', 'Wearable MedTech',
   'Developing miniaturized, ultra-low-power connected hardware is notoriously unforgiving. Hanxcel optimized our board layout and quiescent currents, extending battery longevity from 3 days to over 2 weeks.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 1, true);
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('rohan-mehta', 'Rohan Mehta', 'Head of Hardware', 'NexaGrid Energy', 'Clean Energy & IoT',
   'Their turnkey execution—from schematic capture and rigid-flex routing to pilot batch assembly—slashed our hardware iteration cycle by five full months. True engineering craftsmen.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 2, true);
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('anita-kulkarni', 'Anita Kulkarni', 'Chief Product Officer', 'Aeroflux Avionics', 'Aerospace & Telemetry',
   'The depth of testing and firmware rigor is exceptional. Our rugged CAN-bus sensor units underwent extreme vibration, shock, and thermal stress tests without a single signal drop.', 5, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', 3, true);
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('jonathan-hayes', 'Jonathan Hayes', 'Founder & CEO', 'Lumina Vision Tech', 'Edge AI Systems',
   'Running on-device neural vision processing on an edge microcontroller seemed unfeasible within our strict thermal and power limits until Hanxcel re-engineered the hardware pipeline.', 5, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 4, true);
insert into public.testimonials
  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values
  ('tarun-singhania', 'Tarun Singhania', 'Director of Operations', 'Indus AutoSys', 'Factory Automation',
   'Outstanding firmware stability and telemetry design. Their zero-downtime over-the-air firmware update system has kept thousands of active units across our industrial plants running 24/7.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 5, true);

-- ----------------------------------------------------------------- faq
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-1', 'What stages of hardware & product development do you handle?', 'We provide full-lifecycle turnkey capabilities: initial schematic capture, high-density multi-layer PCB layout, firmware architecture, rapid 3D prototyping, mechanical enclosure design, DFM (Design for Manufacturability), pre-compliance testing (FCC, CE, RoHS), and mass production scaling.', 0, true);
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-2', 'Who owns the Intellectual Property (IP) and design files?', 'You retain 100% ownership of all intellectual property, source code, Gerber files, schematics, Bill of Materials (BOM), and mechanical CAD assets upon milestone completion. We execute strict bilateral Non-Disclosure Agreements (NDAs) prior to any engineering discussions.', 1, true);
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-3', 'How fast can you deliver working hardware prototypes?', 'For rapid proof-of-concept and engineering validation (EVT), we leverage fast-turn localized SMT assembly and quick-turn PCB fabrication to deliver fully functional prototypes within 2 to 4 weeks, depending on component availability and complexity.', 2, true);
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-4', 'Which wireless protocols and embedded platforms do you support?', 'Our team routinely designs for BLE, Wi-Fi 6, LoRa / LoRaWAN, Cellular IoT (LTE-M, NB-IoT, 5G), Sub-GHz, Zigbee, CAN-bus, RS-485, and Ethernet across ARM Cortex-M, ESP32, STM32, Nordic nRF, RISC-V, and Linux-based edge compute microprocessors.', 3, true);
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-5', 'Can you redesign existing hardware to lower BOM costs or extend battery life?', 'Yes. Value engineering is one of our core specialties. We optimize component selection to bypass supply chain bottlenecks, redesign power rails to minimize sleep current consumption, and consolidate multi-board systems to drastically reduce per-unit manufacturing costs.', 4, true);
insert into public.faq (slug, question, answer, sort_order, is_visible) values
  ('faq-6', 'How do you ensure hardware reliability and pass regulatory certifications?', 'Every design is subjected to thermal dissipation modeling, signal integrity simulation, environmental stress testing, and pre-compliance EMC/EMI scans to ensure smooth, first-pass certification at accredited test laboratories worldwide.', 5, true);

-- ---------------------------------------------------------------- blog
insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('pcb-signal-integrity-emi', 'Overcoming High-Speed Signal Integrity & EMI in Multi-Layer PCBs', 'A practical guide to controlled impedance routing, ground plane stitching, return current paths, and passing rigorous FCC Class B testing on the first spin.', 'HARDWARE & PCB', '6 min read',
   '2026-09-08', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
   'Vigneshwaran K.', 'Lead Hardware Architect', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
   'As clock speeds and edge transition rates climb into the gigahertz realm, trace geometry ceases to act as simple resistive wire and transitions into transmission lines. Understanding electromagnetic wave propagation and ground return currents is essential for modern hardware reliability.', ARRAY['Calculating dielectric constant tolerances across FR4 vs. Rogers high-frequency laminates.', 'Continuous reference planes and avoiding split plane crossing for differential pairs.', 'Symmetrical via placement and ground shielding vias to suppress cross-talk by over 18dB.', 'Decoupling capacitor placement directly on BGA power balls to suppress PDN resonance.']::text[],
   'During our recent 12-layer industrial gateway revision, high-speed DDR4 memory traces exhibited intermittent signal reflection. By simulating the power distribution network (PDN) impedance across frequency spectrums up to 3GHz, we re-tuned the termination resistor values and re-routed ground return stitching vias adjacent to layer transitions, immediately reducing jitter by 42%.', 'Prioritizing signal integrity during schematic and preliminary floorplanning saves weeks of costly board respins and guarantees smooth compliance lab qualification.', 0, true);

insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('ultra-low-power-iot-firmware', 'Ultra-Low Power Firmware Architectures for Battery-Powered Edge IoT', 'How to design deterministic event loops, sleep states, and sensor sampling pipelines to achieve 5+ years of battery life on a single coin cell.', 'EMBEDDED & IOT', '8 min read',
   '2026-08-28', 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
   'Priya Sundaram', 'Embedded Systems Director', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
   'In field-deployed telemetry devices and medical wearables, energy budget is the ultimate architectural constraint. Achieving sub-microamp quiescent sleep current demands seamless harmony between silicon hardware switches and interrupt-driven firmware.', ARRAY['Configuring asynchronous DMA peripherals to sample sensors while keeping MCU cores in Deep Sleep.', 'Choosing LDOs with ultra-low quiescent current (<500nA) and fast transient wake-up times.', 'Batching radio transmissions with adaptive payload compression to minimize active TX window.', 'Watchdog timer fail-safes and brownout detection calibration without excessive power draw.']::text[],
   'By transitioning from polling routines to FreeRTOS tickless idle modes on a Nordic nRF52840 SoC, the average system consumption plummeted from 2.4mA to 3.8µA. Utilizing an onboard accelerometer hardware FIFO allowed the core to wake once every 60 seconds instead of hundreds of times per second.', 'Every microamp saved in software directly translates into years of operational field reliability and reduced maintenance expenditure for connected devices.', 1, true);

insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('hardware-dfm-checklist-10k-units', 'From Lab Prototype to 10k Units: The Comprehensive Hardware DFM Checklist', 'Avoid costly manufacturing yield traps. Detailed strategies for automated optical inspection (AOI), SMT panelization, test jigs, and component sourcing resilience.', 'MANUFACTURING', '10 min read',
   '2026-08-14', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
   'Aditya Sen', 'Manufacturing & DFM Specialist', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
   'Building a working bench prototype is only 20% of the journey. Scaling a product to 10,000 units requires engineering for high automated assembly yield, testability, component second-sourcing, and enclosure tolerance stack-ups.', ARRAY['Standardizing SMT component packages (0402 minimum for cost-effective automated placement).', 'Designing bed-of-nails test points on a dedicated 2.54mm grid for automated ICT testing.', 'Fiducial marker placement at opposite board corners to calibrate pick-and-place cameras.', 'Dual-sourcing critical passives and ICs to eliminate supply chain line shutdowns.']::text[],
   'During our mass manufacturing ramp for a smart energy meter, we integrated a custom automated pogo-pin test jig. In under 14 seconds per board, the fixture flashed firmware, calibrated the metering ADC, tested wireless RSSI, and logged UID certificates directly to the cloud database.', 'Investing in rigorous DFM reviews before tooling cuts warranty risks, boosts first-pass yield above 99%, and dramatically accelerates time-to-volume.', 2, true);

insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('edge-ai-cortex-m-quantization', 'Deploying Quantized Edge AI Models on ARM Cortex-M Microcontrollers', 'Running real-time computer vision and vibration anomaly detection directly on edge microcontrollers with INT8 quantization and CMSIS-NN optimization.', 'EDGE AI', '7 min read',
   '2026-07-29', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
   'Farhan Zaidi', 'Edge AI & Firmware Engineer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
   'Edge AI eliminates cloud latency, reduces bandwidth costs, and guarantees privacy by processing neural networks locally on microcontrollers with constrained SRAM and Flash resources.', ARRAY['Post-training quantization from FP32 to INT8 with minimal accuracy loss (<1.2%).', 'CMSIS-NN SIMD instruction acceleration for vector dot products on Cortex-M4/M7/M55 cores.', 'Memory buffer reuse strategies to keep tensor arenas strictly within 256KB SRAM.', 'On-device anomaly detection for predictive maintenance in industrial pumps and motors.']::text[],
   'We implemented a MobileNetV2-based classification pipeline on an STM32H7 microcontroller. With 8-bit weight quantization and DSP-accelerated convolution routines, inference latency dropped from 480ms to 62ms per frame, drawing under 45mA during active computation.', 'TinyML has reached enterprise maturity. Intelligent silicon sensors can now perceive and classify physical world events locally without constant cloud connectivity.', 3, true);

insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('rf-antenna-tuning-certification', 'RF Antenna Tuning & Wireless Certification: FCC & CE Demystified', 'A field-tested approach to matching networks, anechoic chamber testing, antenna clearance zones, and mitigating spurious harmonics.', 'HARDWARE & PCB', '5 min read',
   '2026-07-12', 'Wireless.png',
   'Vigneshwaran K.', 'Lead Hardware Architect', 'Wireless.png',
   'Failing regulatory wireless certification can halt product shipment for months. Proper antenna feedline geometry, ground clearance, and vector network analyzer (VNA) tuning are non-negotiable for wireless success.', ARRAY['Calculating Pi-network matching component values on Smith Charts for exact 50-ohm resonance.', 'Ground plane clearance zones for chip antennas vs. custom PCB inverted-F antennas (IFA).', 'Managing harmonics radiated by switching buck converters into the 2.4GHz ISM band.', 'Pre-compliance spectrum analysis using near-field magnetic probes to catch radiation hotspots early.']::text[],
   'In an ultra-compact GPS & LTE tracker enclosure, detuning occurred due to battery proximity. By recalibrating the matching inductor and adjusting the clearance keep-out zone by 1.8mm, radiated power (TRP) improved by +4.2dBm, cutting satellite lock time in half.', 'Proactive RF simulation combined with localized pre-compliance verification eliminates expensive lab retests and ensures rapid global deployment.', 4, true);

insert into public.blog_posts
  (slug, title, excerpt, category, read_time, published_at, image_url,
   author_name, author_role, author_avatar, introduction, key_points,
   deep_dive, conclusion, sort_order, is_visible) values
  ('dual-mcu-safety-robotics', 'Dual-MCU Safety Architectures in Industrial Robotics & Motor Drives', 'Designing fault-tolerant hardware interlocks, redundant encoder feedback loops, and isolated CAN communications for mission-critical automation.', 'EMBEDDED & IOT', '9 min read',
   '2026-06-24', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
   'Priya Sundaram', 'Embedded Systems Director', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
   'In automated guided vehicles (AGVs) and collaborative robotic arms, an unhandled sensor glitch or stuck gate driver can cause catastrophic physical damage. Redundant cross-checking architectures provide mandatory safety fail-safes.', ARRAY['Primary trajectory planner MCU coupled with a dedicated safety watchdog supervisor.', 'Cross-monitoring SPI heartbeat loops with deterministic 5ms fault-trip windows.', 'Hardware-level emergency stop circuits physically disabling gate power rails independently of software.', 'Optically isolated industrial CAN-bus interfaces immune to inductive motor back-EMF spikes.']::text[],
   'We implemented this dual-microcontroller architecture for a 48V 100A automated factory AMR. When the supervisor detected a 2% divergence in wheel encoder delta compared to IMU velocity, it safely engaged regenerative dynamic braking within 8 milliseconds.', 'Hardware safety must be built into the architectural foundation, providing provable fail-safe reliability for autonomous industrial machines.', 5, true);

-- ------------------------------------------------------------ settings
insert into public.site_settings (key, value) values
  ('contact_email', 'hanxcelaitech14@gmail.com'),
  ('contact_phone', '+91 8148637170'),
  ('contact_address', 'Bengaluru, Karnataka, India'),
  ('social_twitter', '#'),
  ('social_linkedin', '#'),
  ('social_github', '#'),
  ('marquee_enabled', 'true');

commit;
