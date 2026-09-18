import { Router } from 'express';
import { supabase, supabaseAdmin } from '../../lib/supabase';
import { fail, wrap } from '../../lib/helpers';
import {
  mapAbout,
  mapBlogPost,
  mapFaq,
  mapHero,
  mapPortfolioCard,
  mapPortfolioDetail,
  mapProjectCard,
  mapProjectDetail,
  mapServiceCard,
  mapServiceDetail,
  mapSolutionCard,
  mapSolutionDetail,
  mapTeamMember,
  mapTestimonial,
} from '../../lib/mappers';

export const publicRouter = Router();


/* =========================================================================
   SINGLETONS
   ========================================================================= */

publicRouter.get(
  '/hero',
  wrap(async (_req, res) => {
    const { data, error } = await supabase.from('hero').select('*').limit(1).maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Hero not configured' });
    return res.json(mapHero(data));
  }),
);

publicRouter.get(
  '/about',
  wrap(async (_req, res) => {
    const { data, error } = await supabase.from('about').select('*').limit(1).maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'About not configured' });
    return res.json(mapAbout(data));
  }),
);

/* =========================================================================
   SERVICES
   ========================================================================= */

publicRouter.get(
  '/services',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('services')
      .select('number, name, description, sort_order')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapServiceCard));
  }),
);

publicRouter.get(
  '/services/:number',
  wrap(async (req, res) => {
    const { data, error } = await supabase
      .from('services')
      .select('*, service_disciplines(*)')
      .eq('number', req.params.number)
      .eq('is_visible', true)
      .maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Service not found' });
    return res.json(mapServiceDetail(data));
  }),
);

/* =========================================================================
   SOLUTIONS
   ========================================================================= */

publicRouter.get(
  '/solutions',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('solutions')
      .select('slug, tag, title, description, highlights, icon, sort_order')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapSolutionCard));
  }),
);

publicRouter.get(
  '/solutions/:slug',
  wrap(async (req, res) => {
    const { data, error } = await supabase
      .from('solutions')
      .select('*, solution_details(*), solution_architecture_points(*)')
      .eq('slug', req.params.slug)
      .eq('is_visible', true)
      .maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Solution not found' });
    return res.json(mapSolutionDetail(data));
  }),
);

/* =========================================================================
   PROJECTS
   ========================================================================= */

publicRouter.get(
  '/projects',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select(
        'slug, number, name, category, hero_image, gallery_images, ' +
          'col1_top_title, col1_top_subtitle, col1_bottom_text, link, button_text, sort_order',
      )
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapProjectCard));
  }),
);

publicRouter.get(
  '/projects/:slug',
  wrap(async (req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select(
        '*, project_architecture_points(*), project_technical_specs(*), project_key_metrics(*)',
      )
      .eq('slug', req.params.slug)
      .eq('is_visible', true)
      .maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Project not found' });
    return res.json(mapProjectDetail(data));
  }),
);

/* =========================================================================
   PORTFOLIO
   ========================================================================= */

publicRouter.get(
  '/portfolio',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('portfolio')
      .select('slug, year, category, title, client, scope, description, metric, metric_label, link, sort_order')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapPortfolioCard));
  }),
);

publicRouter.get(
  '/portfolio/:slug',
  wrap(async (req, res) => {
    const { data, error } = await supabase
      .from('portfolio')
      .select(
        '*, portfolio_architecture_points(*), portfolio_technical_specs(*), portfolio_key_metrics(*)',
      )
      .eq('slug', req.params.slug)
      .eq('is_visible', true)
      .maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Portfolio item not found' });
    return res.json(mapPortfolioDetail(data));
  }),
);

/* =========================================================================
   TEAM / TESTIMONIALS / FAQ
   ========================================================================= */

publicRouter.get(
  '/team',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapTeamMember));
  }),
);

publicRouter.get(
  '/testimonials',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapTestimonial));
  }),
);

publicRouter.get(
  '/faq',
  wrap(async (_req, res) => {
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapFaq));
  }),
);

/* =========================================================================
   BLOG
   ========================================================================= */

publicRouter.get(
  '/blog',
  wrap(async (req, res) => {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    if (category && category !== 'ALL') query = query.eq('category', category);

    const { data, error } = await query;
    if (error) return fail(res, error);
    return res.json((data ?? []).map(mapBlogPost));
  }),
);

publicRouter.get(
  '/blog/:slug',
  wrap(async (req, res) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('is_visible', true)
      .maybeSingle();
    if (error) return fail(res, error);
    if (!data) return res.status(404).json({ error: 'Post not found' });
    return res.json(mapBlogPost(data));
  }),
);

/* =========================================================================
   SETTINGS
   ========================================================================= */

publicRouter.get(
  '/settings',
  wrap(async (_req, res) => {
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error) return fail(res, error);
    const out: Record<string, string | null> = {};
    for (const row of data ?? []) out[row.key] = row.value;
    return res.json(out);
  }),
);

/* =========================================================================
   SUBMISSIONS
   ========================================================================= */

const SOURCES = ['contact_section', 'contact_modal', 'faq_consultation'] as const;
type Source = (typeof SOURCES)[number];

const str = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t === '' ? null : t.slice(0, 5000);
};

publicRouter.post(
  '/contact',
  wrap(async (req, res) => {
    const b = (req.body ?? {}) as Record<string, unknown>;

    const email = str(b.email);
    const message = str(b.message);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!message) return res.status(400).json({ error: 'A message is required.' });

    const source: Source = SOURCES.includes(b.source as Source)
      ? (b.source as Source)
      : 'contact_section';

    const { error } = await supabase.from('contact_submissions').insert({
      first_name: str(b.firstName),
      last_name: str(b.lastName),
      name: str(b.name),
      email,
      company: str(b.company),
      phone: str(b.phone),
      service: str(b.service),
      project_type: str(b.projectType),
      budget: str(b.budget),
      topic: str(b.topic),
      timeline: str(b.timeline),
      message,
      source,
    });

    if (error) return fail(res, error);
    return res.json({ success: true });
  }),
);

publicRouter.post(
  '/newsletter',
  wrap(async (req, res) => {
    const email = str((req.body ?? {}).email)?.toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }

    // Re-subscribing an existing address reactivates it rather than erroring.
    // Uses the service-role client: an upsert needs UPDATE on conflict, and the
    // anon RLS policy deliberately grants INSERT only.
    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .upsert({ email, is_active: true }, { onConflict: 'email' });

    if (error) return fail(res, error);
    return res.json({ success: true });
  }),
);
