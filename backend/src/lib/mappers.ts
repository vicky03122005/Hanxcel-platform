/**
 * Maps snake_case database rows onto the EXACT TypeScript interfaces the public
 * website already uses (src/types.ts and the *_DETAILS records in the modals).
 *
 * Doing the mapping here is what keeps the frozen-UI edits down to ~3 lines per
 * component: the frontend receives data in the shape it already renders, so no
 * JSX or field access changes.
 *
 * Image fields are emitted verbatim — either a bare filename for one of the 7
 * bundled assets, or an absolute URL. The frontend's resolveImage() decides.
 */

type Row = Record<string, any>;

const sortBy = (rows: Row[] | null | undefined): Row[] =>
  [...(rows ?? [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

const points = (rows: Row[] | null | undefined) =>
  sortBy(rows).map((r) => ({ title: r.title, desc: r.desc }));

const specs = (rows: Row[] | null | undefined) =>
  sortBy(rows).map((r) => ({ label: r.label, value: r.value }));

const metrics = (rows: Row[] | null | undefined) =>
  sortBy(rows).map((r) => ({ metric: r.metric, label: r.label }));

/* ---------------------------------------------------------------- singletons */

export const mapHero = (r: Row) => ({
  heading_line1: r.heading_line1,
  heading_line2: r.heading_line2,
  subtext: r.subtext,
  cta_label: r.cta_label,
  portrait_url: r.portrait_url,
});

export const mapAbout = (r: Row) => ({
  tagline: r.tagline,
  body_text: r.body_text,
  cta_label: r.cta_label,
});

/* ------------------------------------------------------------------ services */

/** → ServiceItem (src/types.ts) */
export const mapServiceCard = (r: Row) => ({
  number: r.number,
  name: r.name,
  description: r.description,
});

/** → ServiceDetailData (ServiceDetailModal.tsx) */
export const mapServiceDetail = (r: Row) => ({
  number: r.number,
  name: r.name,
  tagline: r.tagline,
  description: r.description,
  fullOverview: r.full_overview,
  icon: r.icon,
  disciplines: points(r.service_disciplines),
  deliverables: r.deliverables ?? [],
  techStack: r.tech_stack ?? [],
  industryApplications: r.industry_applications ?? [],
});

/* ----------------------------------------------------------------- solutions */

/** → SolutionCard, except `icon` arrives as a lucide component NAME. */
export const mapSolutionCard = (r: Row) => ({
  id: r.slug,
  tag: r.tag,
  title: r.title,
  description: r.description,
  highlights: r.highlights ?? [],
  icon: r.icon,
});

/** → SolutionDetailData (SolutionDetailModal.tsx) */
export const mapSolutionDetail = (r: Row) => {
  const d: Row = r.solution_details ?? {};
  return {
    id: r.slug,
    tag: r.tag,
    title: r.title,
    tagline: d.tagline ?? '',
    description: d.description || r.description,
    fullOverview: d.full_overview ?? '',
    icon: d.icon ?? 'iot',
    architecturePoints: points(r.solution_architecture_points),
    keyCapabilities: d.key_capabilities ?? [],
    certifications: d.certifications ?? [],
    caseStudyExample: {
      title: d.case_study_title ?? '',
      impact: d.case_study_impact ?? '',
    },
  };
};

/* ------------------------------------------------------------------ projects */

/** → ProjectItem (src/types.ts) */
export const mapProjectCard = (r: Row) => {
  const gallery: string[] = r.gallery_images ?? [];
  return {
    id: r.slug,
    number: r.number,
    name: r.name,
    category: r.category,
    images: {
      col2_tall: r.hero_image,
      col1_top: gallery[1] ?? undefined,
      col1_bottom: gallery[2] ?? undefined,
    },
    col1_top_card: r.col1_top_title
      ? { title: r.col1_top_title, subtitle: r.col1_top_subtitle ?? undefined }
      : undefined,
    col1_bottom_card: r.col1_bottom_text ? { text: r.col1_bottom_text } : undefined,
    link: r.link ?? '#',
    buttonText: r.button_text,
  };
};

/** → ProjectCaseStudy (ProjectCaseStudyModal.tsx) */
export const mapProjectDetail = (r: Row) => ({
  id: r.slug,
  number: r.number,
  category: r.category,
  title: r.title,
  client: r.client,
  timeline: r.timeline,
  tagline: r.tagline,
  overview: r.overview,
  heroImage: r.hero_image,
  galleryImages: r.gallery_images ?? [],
  challenge: r.challenge,
  solution: r.solution,
  architecturePoints: points(r.project_architecture_points),
  technicalSpecs: specs(r.project_technical_specs),
  keyMetrics: metrics(r.project_key_metrics),
  toolsAndTech: r.tools_and_tech ?? [],
});

/* ----------------------------------------------------------------- portfolio */

/** → PortfolioItem (PortfolioSection.tsx) */
export const mapPortfolioCard = (r: Row) => ({
  id: r.slug,
  year: r.year,
  category: r.category,
  title: r.title,
  client: r.client,
  scope: r.scope ?? [],
  description: r.description,
  metric: r.metric,
  metricLabel: r.metric_label,
  link: r.link ?? '#',
});

/** → PortfolioDetailData (PortfolioDetailModal.tsx) */
export const mapPortfolioDetail = (r: Row) => ({
  id: r.slug,
  year: r.year,
  category: r.category,
  title: r.title,
  client: r.client,
  timeline: r.timeline,
  tagline: r.tagline,
  overview: r.overview,
  icon: r.icon,
  challenge: r.challenge,
  solution: r.solution,
  architecturePoints: points(r.portfolio_architecture_points),
  technicalSpecs: specs(r.portfolio_technical_specs),
  keyMetrics: metrics(r.portfolio_key_metrics),
  toolsAndTech: r.tools_and_tech ?? [],
  deliverables: r.deliverables ?? [],
});

/* ------------------------------------------------- team / testimonials / faq */

/** → TeamMember (TeamSection.tsx) — note image_url becomes `image`. */
export const mapTeamMember = (r: Row) => ({
  id: r.slug,
  name: r.name,
  role: r.role,
  bio: r.bio,
  specialties: r.specialties ?? [],
  image: r.image_url,
  linkedin: r.linkedin ?? undefined,
  email: r.email ?? undefined,
  github: r.github ?? undefined,
});

/** → Testimonial (TestimonialsSection.tsx) — avatar_url becomes `avatar`. */
export const mapTestimonial = (r: Row) => ({
  id: r.slug,
  name: r.name,
  role: r.role,
  company: r.company,
  badge: r.badge,
  quote: r.quote,
  rating: r.rating,
  avatar: r.avatar_url,
});

/** → FaqItem (FaqSection.tsx) */
export const mapFaq = (r: Row) => ({
  id: r.slug,
  question: r.question,
  answer: r.answer,
});

/* ---------------------------------------------------------------------- blog */

/** → BlogPost (BlogSection.tsx) */
export const mapBlogPost = (r: Row) => ({
  id: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  readTime: r.read_time,
  date: new Date(r.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }),
  image: r.image_url,
  author: {
    name: r.author_name,
    role: r.author_role,
    avatar: r.author_avatar,
  },
  content: {
    introduction: r.introduction,
    keyPoints: r.key_points ?? [],
    deepDive: r.deep_dive,
    conclusion: r.conclusion,
  },
});
