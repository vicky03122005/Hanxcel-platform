import { Router } from 'express';
import { supabase, supabaseAdmin } from '../../lib/supabase';
import { audit, fail, pick, wrap } from '../../lib/helpers';
import { requireAdmin } from '../../middleware/auth';
import { resourceRouter, singletonRouter } from './factory';

export const adminRouter = Router();

/* =========================================================================
   AUTH  (unauthenticated — this is where a token is obtained)
   ========================================================================= */

const authRouter = Router();

authRouter.post(
  '/login',
  wrap(async (req, res) => {
    const { email, password } = (req.body ?? {}) as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const { data: profile } = await supabaseAdmin
      .from('admin_profiles')
      .select('full_name, role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (!profile) {
      // Authenticated with Supabase, but not provisioned as an admin.
      await supabase.auth.signOut();
      return res.status(403).json({ error: 'This account is not an admin.' });
    }

    return res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile.full_name,
        role: profile.role,
      },
    });
  }),
);

authRouter.post(
  '/refresh',
  wrap(async (req, res) => {
    const { refresh_token } = (req.body ?? {}) as { refresh_token?: string };
    if (!refresh_token) return res.status(400).json({ error: 'refresh_token is required.' });

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });
    if (error || !data.session) return res.status(401).json({ error: 'Invalid refresh token.' });

    return res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }),
);

adminRouter.use('/auth', authRouter);

/* =========================================================================
   Everything below requires a valid admin token.
   ========================================================================= */

adminRouter.use(requireAdmin);

/* ------------------------------------------------------------------- stats */

adminRouter.get(
  '/stats',
  wrap(async (_req, res) => {
    const count = async (table: string, filter?: [string, unknown]) => {
      let q = supabaseAdmin.from(table).select('id', { count: 'exact', head: true });
      if (filter) q = q.eq(filter[0], filter[1]);
      const { count: c } = await q;
      return c ?? 0;
    };

    const [total_contacts, new_contacts, newsletter_subs, blog_posts, team_members, testimonials] =
      await Promise.all([
        count('contact_submissions'),
        count('contact_submissions', ['status', 'new']),
        count('newsletter_subscribers', ['is_active', true]),
        count('blog_posts'),
        count('team_members'),
        count('testimonials'),
      ]);

    return res.json({
      total_contacts,
      new_contacts,
      newsletter_subs,
      blog_posts,
      team_members,
      testimonials,
    });
  }),
);

/* --------------------------------------------------------------- singletons */

adminRouter.use(
  '/hero',
  singletonRouter('hero', [
    'heading_line1',
    'heading_line2',
    'subtext',
    'cta_label',
    'portrait_url',
  ]),
);

adminRouter.use('/about', singletonRouter('about', ['tagline', 'body_text', 'cta_label']));

/* ----------------------------------------------------------------- services */
// Services are fixed 01-06: the factory's POST/DELETE are left mounted but the
// admin UI only exposes PATCH and the disciplines editor.

adminRouter.use(
  '/services',
  resourceRouter({
    table: 'services',
    select: '*, service_disciplines(*)',
    fields: [
      'number',
      'name',
      'description',
      'tagline',
      'full_overview',
      'icon',
      'deliverables',
      'tech_stack',
      'industry_applications',
      'sort_order',
      'is_visible',
    ],
    children: [
      {
        path: 'disciplines',
        table: 'service_disciplines',
        fk: 'service_id',
        fields: ['title', 'desc', 'sort_order'],
      },
    ],
  }),
);

/* ---------------------------------------------------------------- solutions */

const solutionsRouter = resourceRouter({
  table: 'solutions',
  select: '*, solution_details(*), solution_architecture_points(*)',
  fields: [
    'slug',
    'tag',
    'title',
    'description',
    'highlights',
    'icon',
    'sort_order',
    'is_visible',
  ],
  children: [
    {
      path: 'architecture-points',
      table: 'solution_architecture_points',
      fk: 'solution_id',
      fields: ['title', 'desc', 'sort_order'],
    },
  ],
});

// solution_details is 1:1 with solutions, so it upserts rather than CRUDs.
const SOLUTION_DETAIL_FIELDS = [
  'tagline',
  'description',
  'full_overview',
  'icon',
  'key_capabilities',
  'certifications',
  'case_study_title',
  'case_study_impact',
] as const;

solutionsRouter.patch(
  '/:id/details',
  wrap(async (req, res) => {
    const payload = pick(req.body, SOLUTION_DETAIL_FIELDS);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No writable fields supplied' });
    }

    const { data: before } = await supabaseAdmin
      .from('solution_details')
      .select('*')
      .eq('solution_id', req.params.id)
      .maybeSingle();

    const { data, error } = await supabaseAdmin
      .from('solution_details')
      .upsert({ ...before, ...payload, solution_id: req.params.id }, { onConflict: 'solution_id' })
      .select()
      .single();

    if (error) return fail(res, error);
    await audit(
      req.adminId,
      'solution_details',
      data.id,
      before ? 'update' : 'insert',
      before,
      data,
    );
    return res.json(data);
  }),
);

adminRouter.use('/solutions', solutionsRouter);

/* ----------------------------------------------------------------- projects */

const SUB_TABLE_CHILDREN = (owner: 'project' | 'portfolio') => [
  {
    path: 'architecture-points',
    table: `${owner}_architecture_points`,
    fk: `${owner}_id`,
    fields: ['title', 'desc', 'sort_order'] as const,
  },
  {
    path: 'technical-specs',
    table: `${owner}_technical_specs`,
    fk: `${owner}_id`,
    fields: ['label', 'value', 'sort_order'] as const,
  },
  {
    path: 'key-metrics',
    table: `${owner}_key_metrics`,
    fk: `${owner}_id`,
    fields: ['metric', 'label', 'sort_order'] as const,
  },
];

adminRouter.use(
  '/projects',
  resourceRouter({
    table: 'projects',
    select:
      '*, project_architecture_points(*), project_technical_specs(*), project_key_metrics(*)',
    fields: [
      'slug',
      'number',
      'name',
      'button_text',
      'category',
      'title',
      'client',
      'timeline',
      'tagline',
      'overview',
      'hero_image',
      'gallery_images',
      'col1_top_title',
      'col1_top_subtitle',
      'col1_bottom_text',
      'challenge',
      'solution',
      'tools_and_tech',
      'link',
      'sort_order',
      'is_visible',
    ],
    children: SUB_TABLE_CHILDREN('project'),
  }),
);

/* ---------------------------------------------------------------- portfolio */

adminRouter.use(
  '/portfolio',
  resourceRouter({
    table: 'portfolio',
    select:
      '*, portfolio_architecture_points(*), portfolio_technical_specs(*), portfolio_key_metrics(*)',
    fields: [
      'slug',
      'year',
      'category',
      'title',
      'client',
      'timeline',
      'tagline',
      'overview',
      'icon',
      'scope',
      'description',
      'metric',
      'metric_label',
      'challenge',
      'solution',
      'tools_and_tech',
      'deliverables',
      'link',
      'sort_order',
      'is_visible',
    ],
    children: SUB_TABLE_CHILDREN('portfolio'),
  }),
);

/* ------------------------------------------------- team / testimonials / faq */

adminRouter.use(
  '/team',
  resourceRouter({
    table: 'team_members',
    fields: [
      'slug',
      'name',
      'role',
      'bio',
      'specialties',
      'image_url',
      'linkedin',
      'email',
      'github',
      'sort_order',
      'is_visible',
    ],
  }),
);

adminRouter.use(
  '/testimonials',
  resourceRouter({
    table: 'testimonials',
    fields: [
      'slug',
      'name',
      'role',
      'company',
      'badge',
      'quote',
      'rating',
      'avatar_url',
      'sort_order',
      'is_visible',
    ],
  }),
);

adminRouter.use(
  '/faq',
  resourceRouter({
    table: 'faq',
    fields: ['slug', 'question', 'answer', 'sort_order', 'is_visible'],
  }),
);

/* --------------------------------------------------------------------- blog */

adminRouter.use(
  '/blog',
  resourceRouter({
    table: 'blog_posts',
    fields: [
      'slug',
      'title',
      'excerpt',
      'category',
      'read_time',
      'published_at',
      'image_url',
      'author_name',
      'author_role',
      'author_avatar',
      'introduction',
      'key_points',
      'deep_dive',
      'conclusion',
      'is_visible',
      'sort_order',
    ],
  }),
);

/* ----------------------------------------------------------------- contacts */

adminRouter.get(
  '/contacts',
  wrap(async (req, res) => {
    let query = supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    if (status && status !== 'all') query = query.eq('status', status);

    const { data, error } = await query;
    if (error) return fail(res, error);
    return res.json(data ?? []);
  }),
);

adminRouter.patch(
  '/contacts/:id',
  wrap(async (req, res) => {
    const status = (req.body ?? {}).status;
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'status must be new, read, replied or archived.' });
    }

    const { data: before } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();
    if (!before) return res.status(404).json({ error: 'Not found' });

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) return fail(res, error);
    await audit(req.adminId, 'contact_submissions', req.params.id, 'update', before, data);
    return res.json(data);
  }),
);

/* --------------------------------------------------------------- newsletter */

adminRouter.get(
  '/newsletter',
  wrap(async (_req, res) => {
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    if (error) return fail(res, error);
    return res.json(data ?? []);
  }),
);

adminRouter.patch(
  '/newsletter/:id',
  wrap(async (req, res) => {
    const is_active = (req.body ?? {}).is_active;
    if (typeof is_active !== 'boolean') {
      return res.status(400).json({ error: 'is_active must be a boolean.' });
    }

    const { data: before } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();
    if (!before) return res.status(404).json({ error: 'Not found' });

    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ is_active })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) return fail(res, error);
    await audit(req.adminId, 'newsletter_subscribers', req.params.id, 'update', before, data);
    return res.json(data);
  }),
);

/* ----------------------------------------------------------------- settings */

adminRouter.get(
  '/settings',
  wrap(async (_req, res) => {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true });
    if (error) return fail(res, error);
    return res.json(data ?? []);
  }),
);

adminRouter.patch(
  '/settings/:key',
  wrap(async (req, res) => {
    const value = (req.body ?? {}).value;
    if (typeof value !== 'string') {
      return res.status(400).json({ error: 'value must be a string.' });
    }

    const { data: before } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('key', req.params.key)
      .maybeSingle();

    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key: req.params.key, value }, { onConflict: 'key' })
      .select()
      .single();
    if (error) return fail(res, error);
    await audit(req.adminId, 'site_settings', data.id, before ? 'update' : 'insert', before, data);
    return res.json(data);
  }),
);

/* -------------------------------------------------------------------- audit */

adminRouter.get(
  '/audit',
  wrap(async (req, res) => {
    const requested = Number.parseInt(String(req.query.limit ?? '100'), 10);
    const limit = Math.min(Number.isFinite(requested) ? requested : 100, 200);

    const { data, error } = await supabaseAdmin
      .from('audit_log')
      .select('*, admin_profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) return fail(res, error);
    return res.json(data ?? []);
  }),
);
