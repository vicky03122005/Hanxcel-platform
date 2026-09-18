/**
 * Typed client for the Hanxcel CMS API.
 *
 * Every response is already shaped to the interfaces the components render, so
 * callers can drop the result straight into existing JSX. See
 * backend/src/lib/mappers.ts for the server-side shaping.
 */

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE + path, { cache: 'default' });
  if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string }).error || `API ${path} -> ${res.status}`);
  return json as T;
}

/* ------------------------------------------------------------------- types */

export interface HeroData {
  heading_line1: string;
  heading_line2: string;
  subtext: string;
  cta_label: string;
  portrait_url: string | null;
}

export interface AboutData {
  tagline: string;
  body_text: string;
  cta_label: string;
}

export type SiteSettings = Record<string, string | null>;

export interface ContactPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  projectType?: string;
  budget?: string;
  topic?: string;
  timeline?: string;
  message: string;
  source: 'contact_section' | 'contact_modal' | 'faq_consultation';
}

/* --------------------------------------------------------------- fetchers */

export const fetchHero = () => get<HeroData>('/hero');
export const fetchAbout = () => get<AboutData>('/about');
export const fetchSettings = () => get<SiteSettings>('/settings');

export const fetchServices = <T>() => get<T[]>('/services');
export const fetchService = <T>(number: string) => get<T>(`/services/${number}`);

export const fetchSolutions = <T>() => get<T[]>('/solutions');
export const fetchSolution = <T>(slug: string) => get<T>(`/solutions/${slug}`);

export const fetchProjects = <T>() => get<T[]>('/projects');
export const fetchProject = <T>(slug: string) => get<T>(`/projects/${slug}`);

export const fetchPortfolio = <T>() => get<T[]>('/portfolio');
export const fetchPortfolioItem = <T>(slug: string) => get<T>(`/portfolio/${slug}`);

export const fetchTeam = <T>() => get<T[]>('/team');
export const fetchTestimonials = <T>() => get<T[]>('/testimonials');
export const fetchFaq = <T>() => get<T[]>('/faq');

export const fetchBlog = <T>(category?: string) =>
  get<T[]>('/blog' + (category && category !== 'ALL' ? `?category=${encodeURIComponent(category)}` : ''));
export const fetchBlogPost = <T>(slug: string) => get<T>(`/blog/${slug}`);

/* ------------------------------------------------------------ submissions */

export const submitContact = (body: ContactPayload) =>
  post<{ success: true }>('/contact', body);

export const submitNewsletter = (email: string) =>
  post<{ success: true }>('/newsletter', { email });
