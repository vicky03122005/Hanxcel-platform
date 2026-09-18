import { getToken, logout } from './auth';

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/api';

async function authedFetch<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = getToken();

  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  // An expired or revoked token should drop straight back to the login screen
  // rather than surfacing a confusing error on every panel.
  if (res.status === 401) {
    logout();
    if (!location.pathname.startsWith('/login')) location.href = '/login';
    throw new Error('Session expired. Please sign in again.');
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string }).error || res.statusText);
  return json as T;
}

export const adminGet = <T>(path: string) => authedFetch<T>('GET', '/admin' + path);
export const adminPost = <T>(path: string, body: unknown) =>
  authedFetch<T>('POST', '/admin' + path, body);
export const adminPatch = <T>(path: string, body: unknown) =>
  authedFetch<T>('PATCH', '/admin' + path, body);
export const adminDelete = <T>(path: string) => authedFetch<T>('DELETE', '/admin' + path);

/* ----------------------------------------------------------------- types */

export interface Stats {
  total_contacts: number;
  new_contacts: number;
  newsletter_subs: number;
  blog_posts: number;
  team_members: number;
  testimonials: number;
}

export interface Hero {
  id?: string;
  heading_line1: string;
  heading_line2: string;
  subtext: string;
  cta_label: string;
  portrait_url: string | null;
}

export interface About {
  id?: string;
  tagline: string;
  body_text: string;
  cta_label: string;
}

export interface Discipline {
  id: string;
  service_id: string;
  title: string;
  desc: string;
  sort_order: number;
}

export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  tagline: string;
  full_overview: string;
  icon: string;
  deliverables: string[];
  tech_stack: string[];
  industry_applications: string[];
  sort_order: number;
  is_visible: boolean;
  service_disciplines?: Discipline[];
}

export interface SolutionDetails {
  id?: string;
  solution_id?: string;
  tagline: string;
  description: string;
  full_overview: string;
  icon: string;
  key_capabilities: string[];
  certifications: string[];
  case_study_title: string;
  case_study_impact: string;
}

export interface ArchPoint {
  id: string;
  title: string;
  desc: string;
  sort_order: number;
}

export interface Solution {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
  sort_order: number;
  is_visible: boolean;
  solution_details?: SolutionDetails | null;
  solution_architecture_points?: ArchPoint[];
}

export interface Spec {
  id: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface Metric {
  id: string;
  metric: string;
  label: string;
  sort_order: number;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  name: string;
  button_text: string;
  category: string;
  title: string;
  client: string;
  timeline: string;
  tagline: string;
  overview: string;
  hero_image: string;
  gallery_images: string[];
  col1_top_title: string | null;
  col1_top_subtitle: string | null;
  col1_bottom_text: string | null;
  challenge: string;
  solution: string;
  tools_and_tech: string[];
  link: string;
  sort_order: number;
  is_visible: boolean;
  project_architecture_points?: ArchPoint[];
  project_technical_specs?: Spec[];
  project_key_metrics?: Metric[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  year: string;
  category: string;
  title: string;
  client: string;
  timeline: string;
  tagline: string;
  overview: string;
  icon: string;
  scope: string[];
  description: string;
  metric: string;
  metric_label: string;
  challenge: string;
  solution: string;
  tools_and_tech: string[];
  deliverables: string[];
  link: string;
  sort_order: number;
  is_visible: boolean;
  portfolio_architecture_points?: ArchPoint[];
  portfolio_technical_specs?: Spec[];
  portfolio_key_metrics?: Metric[];
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image_url: string;
  linkedin: string | null;
  email: string | null;
  github: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface Testimonial {
  id: string;
  slug: string;
  name: string;
  role: string;
  company: string;
  badge: string;
  quote: string;
  rating: number;
  avatar_url: string;
  sort_order: number;
  is_visible: boolean;
}

export interface FaqItem {
  id: string;
  slug: string;
  question: string;
  answer: string;
  sort_order: number;
  is_visible: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  published_at: string;
  image_url: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  introduction: string;
  key_points: string[];
  deep_dive: string;
  conclusion: string;
  is_visible: boolean;
  sort_order: number;
}

export interface ContactSubmission {
  id: string;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  project_type: string | null;
  budget: string | null;
  topic: string | null;
  timeline: string | null;
  message: string;
  source: 'contact_section' | 'contact_modal' | 'faq_consultation';
  status: 'new' | 'read' | 'replied' | 'archived';
  submitted_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface Setting {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export interface AuditEntry {
  id: string;
  admin_id: string | null;
  table_name: string;
  record_id: string | null;
  action: 'insert' | 'update' | 'delete';
  created_at: string;
  admin_profiles?: { full_name: string } | null;
}
