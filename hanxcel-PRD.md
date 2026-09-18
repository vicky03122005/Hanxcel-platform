# Hanxcel AI Technologies — Full-Stack Product Requirements Document
### For Claude Code | Version 1.0 | September 2026

---

## 0. Purpose & Scope

This PRD is the **single source of truth** for Claude Code to build the complete Hanxcel AI Technologies platform. It covers:

1. **Public Website** — the existing React frontend (provided as a zip). **Do not change its UI.** Wire it to the backend API.
2. **Admin Panel** — a new React app that matches the public site's exact visual identity, letting company staff control all website content.
3. **Backend** — Express + TypeScript API server, deployed on Render, connecting to Supabase.

**Stack:**
- Frontend (public): React 19 + Vite + Tailwind v4 + Framer Motion + Kanit font — **already built, UI frozen**
- Admin: React 19 + Vite + Tailwind v4 + Kanit font — **new, same visual identity**
- Backend: Node.js + Express + TypeScript — deployed on Render
- Database + Auth: Supabase (PostgreSQL + Row Level Security + Auth)
- Frontend deploy: Vercel
- Backend deploy: Render

---

## 1. Repository Structure

Claude Code must scaffold this exact folder structure:

```
hanxcel/
├── frontend/                  ← The existing public website (provided zip)
│   ├── src/
│   │   ├── components/        ← All existing components — DO NOT MODIFY UI
│   │   ├── lib/
│   │   │   ├── api.ts         ← NEW: typed fetch client
│   │   │   └── useCms.ts      ← NEW: React hooks replacing hardcoded data
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.local             ← VITE_API_URL=http://localhost:4000
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.ts
│
├── admin/                     ← NEW: admin panel React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Topbar.tsx
│   │   │   │   └── Shell.tsx
│   │   │   └── ui/
│   │   │       ├── Modal.tsx
│   │   │       ├── Toast.tsx
│   │   │       ├── DataTable.tsx
│   │   │       ├── ItemList.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       └── FormField.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── HeroPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── SolutionsPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── PortfolioPage.tsx
│   │   │   ├── TeamPage.tsx
│   │   │   ├── TestimonialsPage.tsx
│   │   │   ├── FaqPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── ContactLeadsPage.tsx
│   │   │   ├── NewsletterPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   └── AuditLogPage.tsx
│   │   ├── lib/
│   │   │   ├── api.ts          ← Admin API client (authenticated)
│   │   │   └── auth.ts         ← Auth state (Zustand or Context)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.local
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    ├── src/
    │   ├── index.ts             ← Express server entry
    │   ├── lib/
    │   │   └── supabase.ts      ← Supabase client (anon + service-role)
    │   ├── middleware/
    │   │   └── auth.ts          ← JWT verification middleware
    │   └── routes/
    │       ├── public/          ← No auth required
    │       │   ├── hero.ts
    │       │   ├── about.ts
    │       │   ├── services.ts
    │       │   ├── solutions.ts
    │       │   ├── projects.ts
    │       │   ├── portfolio.ts
    │       │   ├── team.ts
    │       │   ├── testimonials.ts
    │       │   ├── faq.ts
    │       │   ├── blog.ts
    │       │   ├── contact.ts
    │       │   ├── newsletter.ts
    │       │   └── settings.ts
    │       └── admin/           ← All require JWT
    │           ├── auth.ts      ← Login proxy
    │           ├── hero.ts
    │           ├── about.ts
    │           ├── services.ts
    │           ├── solutions.ts
    │           ├── projects.ts
    │           ├── portfolio.ts
    │           ├── team.ts
    │           ├── testimonials.ts
    │           ├── faq.ts
    │           ├── blog.ts
    │           ├── contacts.ts
    │           ├── newsletter.ts
    │           ├── settings.ts
    │           ├── audit.ts
    │           └── stats.ts
    ├── supabase/
    │   ├── migrations/
    │   │   └── 001_schema.sql
    │   └── seed/
    │       └── 001_seed.sql
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    └── render.yaml
```

---

## 2. Design Tokens — Admin Panel Must Match These Exactly

Claude Code must use these exact values from the public frontend throughout the admin panel:

### Colors
```css
--bg-primary:    #0C0C0C   /* page background (dark sections of public site) */
--bg-secondary:  #121418   /* sidebar, topbar */
--bg-tertiary:   #1a1d24   /* cards, hover states */
--bg-card:       #14171e   /* content cards */
--border:        rgba(215,226,234,0.10)
--border-strong: rgba(215,226,234,0.18)
--text-primary:  #D7E2EA   /* main text */
--text-dim:      #7a8fa0   /* secondary text */
--text-dimmer:   #4a5a6a   /* labels, metadata */
--blue:          #0066FF   /* primary accent */
--blue-light:    #00A3FF   /* active states */
--cyan:          #00D4FF   /* gradient end */
--green:         #22c55e   /* success / visible */
--amber:         #f59e0b   /* warning */
--red:           #ef4444   /* danger / delete */
--white-sections: #FFFFFF  /* note: public site has white sections (Services, Portfolio, Team, Contact, Footer) */
```

### Typography
```css
font-family: 'Kanit', sans-serif;   /* same Google Font as public site */
/* Load via: https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap */
```

### Gradients (exact — used on buttons, logo glow, etc.)
```css
/* Primary button */
background: linear-gradient(135deg, #002266, #0066FF, #00D4FF);
box-shadow: 0 4px 16px rgba(0,102,255,0.35);

/* Logo glow */
drop-shadow: 0 0 14px rgba(0,176,255,0.45);
```

### Border Radius
```css
--radius-xl:  36px   /* large cards (public site uses rounded-[36px] on solution cards) */
--radius-lg:  26px   /* modals */
--radius-md:  18px   /* content cards */
--radius-sm:  10px   /* inputs, small cards */
--radius-pill: 22px  /* pill buttons */
```

### HanxcelLogo SVG
The logo is a custom SVG with 4 polygons. Claude Code must use this exact component in the admin panel header/login:

```tsx
// Copy the exact HanxcelLogo.tsx from frontend/src/components/HanxcelLogo.tsx
// It uses two gradient definitions:
// - hanxcel-blue-dark: #0066FF → #0052CC → #003D99
// - hanxcel-cyan-light: #00E5FF → #00B0FF → #0080FF
// And 4 polygon shapes forming the "H" monogram
```

---

## 3. Supabase Schema

### 3.1 Run order
1. `backend/supabase/migrations/001_schema.sql`
2. `backend/supabase/seed/001_seed.sql`

### 3.2 Tables — exact column names (Claude Code must implement all)

#### `hero` (singleton — always 1 row)
```sql
id            uuid PK default uuid_generate_v4()
heading_line1 text NOT NULL default 'WE ENGINEER'
heading_line2 text NOT NULL default 'INTELLIGENCE'
subtext       text NOT NULL
cta_label     text NOT NULL default 'Start Project'
portrait_url  text
updated_at    timestamptz default now()
```

#### `about` (singleton — always 1 row)
```sql
id          uuid PK
tagline     text NOT NULL   -- "Engineering Ideas Into Real-World Products"
body_text   text NOT NULL   -- the long animated paragraph
cta_label   text NOT NULL default 'EXPLORE MORE'
updated_at  timestamptz
```

#### `services`
```sql
id                    uuid PK
number                char(2) UNIQUE NOT NULL   -- '01'..'06'
name                  text NOT NULL
description           text NOT NULL             -- short card text
tagline               text NOT NULL             -- modal subheading
full_overview         text NOT NULL             -- modal body
icon                  text NOT NULL             -- 'cpu'|'firmware'|'iot'|'ai'|'pcb'|'manufacturing'
deliverables          text[] NOT NULL default '{}'
tech_stack            text[] NOT NULL default '{}'
industry_applications text[] NOT NULL default '{}'
sort_order            int NOT NULL default 0
is_visible            boolean NOT NULL default true
updated_at            timestamptz
```

#### `service_disciplines`
```sql
id         uuid PK
service_id uuid FK → services(id) ON DELETE CASCADE
title      text NOT NULL
desc       text NOT NULL
sort_order int NOT NULL default 0
```

#### `solutions`
```sql
id          uuid PK
tag         text NOT NULL   -- e.g. 'CONSUMER ELECTRONICS'
title       text NOT NULL
description text NOT NULL
highlights  text[] NOT NULL default '{}'
icon        text NOT NULL   -- lucide icon name: 'Smartphone'|'Zap'|'Shield'|'Radio'|'Activity'|'Cog'
sort_order  int NOT NULL default 0
is_visible  boolean NOT NULL default true
updated_at  timestamptz
```

#### `solution_details`
```sql
id                uuid PK
solution_id       uuid FK → solutions(id) ON DELETE CASCADE UNIQUE
tagline           text NOT NULL
full_overview     text NOT NULL
deliverables      text[] NOT NULL default '{}'
tech_stack        text[] NOT NULL default '{}'
key_metrics       jsonb NOT NULL default '[]'   -- [{metric: string, label: string}]
updated_at        timestamptz
```

#### `projects`
```sql
id                uuid PK
slug              text UNIQUE NOT NULL      -- 'nextlevel-studio'
number            char(2) UNIQUE NOT NULL   -- '01'
name              text NOT NULL             -- short section card name
button_text       text NOT NULL default 'VIEW CASE STUDY'
category          text NOT NULL
title             text NOT NULL             -- full case-study title
client            text NOT NULL
timeline          text NOT NULL
tagline           text NOT NULL
overview          text NOT NULL
hero_image        text NOT NULL
gallery_images    text[] NOT NULL default '{}'
col1_top_title    text
col1_top_subtitle text
col1_bottom_text  text
challenge         text NOT NULL
solution          text NOT NULL
tools_and_tech    text[] NOT NULL default '{}'
link              text default '#'
sort_order        int NOT NULL default 0
is_visible        boolean NOT NULL default true
updated_at        timestamptz
```

#### `project_architecture_points`
```sql
id         uuid PK
project_id uuid FK → projects(id) ON DELETE CASCADE
title      text NOT NULL
desc       text NOT NULL
sort_order int NOT NULL default 0
```

#### `project_technical_specs`
```sql
id         uuid PK
project_id uuid FK → projects(id) ON DELETE CASCADE
label      text NOT NULL
value      text NOT NULL
sort_order int NOT NULL default 0
```

#### `project_key_metrics`
```sql
id         uuid PK
project_id uuid FK → projects(id) ON DELETE CASCADE
metric     text NOT NULL
label      text NOT NULL
sort_order int NOT NULL default 0
```

#### `portfolio`
```sql
id            uuid PK
slug          text UNIQUE NOT NULL
year          char(4) NOT NULL
category      text NOT NULL
title         text NOT NULL
client        text NOT NULL
timeline      text NOT NULL
tagline       text NOT NULL
overview      text NOT NULL
icon          text NOT NULL   -- 'iot'|'wearable'|'energy'|'ai'
scope         text[] NOT NULL default '{}'
description   text NOT NULL
metric        text NOT NULL
metric_label  text NOT NULL
challenge     text NOT NULL
solution      text NOT NULL
tools_and_tech text[] NOT NULL default '{}'
deliverables  text[] NOT NULL default '{}'
link          text default '#'
sort_order    int NOT NULL default 0
is_visible    boolean NOT NULL default true
updated_at    timestamptz
```

#### `portfolio_architecture_points` / `portfolio_technical_specs` / `portfolio_key_metrics`
Same structure as project equivalents but FK → `portfolio(id)`.

#### `team_members`
```sql
id          uuid PK
slug        text UNIQUE NOT NULL
name        text NOT NULL
role        text NOT NULL
bio         text NOT NULL
specialties text[] NOT NULL default '{}'
image_url   text NOT NULL
linkedin    text
email       text
github      text
sort_order  int NOT NULL default 0
is_visible  boolean NOT NULL default true
updated_at  timestamptz
```

#### `testimonials`
```sql
id         uuid PK
slug       text UNIQUE NOT NULL
name       text NOT NULL
role       text NOT NULL
company    text NOT NULL
badge      text NOT NULL
quote      text NOT NULL
rating     int NOT NULL default 5 CHECK (rating BETWEEN 1 AND 5)
avatar_url text NOT NULL
sort_order int NOT NULL default 0
is_visible boolean NOT NULL default true
updated_at timestamptz
```

#### `faq`
```sql
id         uuid PK
question   text NOT NULL
answer     text NOT NULL
sort_order int NOT NULL default 0
is_visible boolean NOT NULL default true
updated_at timestamptz
```

#### `blog_posts`
```sql
id           uuid PK
slug         text UNIQUE NOT NULL
title        text NOT NULL
excerpt      text NOT NULL
category     text NOT NULL CHECK (category IN ('HARDWARE & PCB','EMBEDDED & IOT','MANUFACTURING','EDGE AI'))
read_time    text NOT NULL
published_at date NOT NULL
image_url    text NOT NULL
author_name  text NOT NULL
author_role  text NOT NULL
author_avatar text NOT NULL
introduction text NOT NULL
key_points   text[] NOT NULL default '{}'
deep_dive    text NOT NULL
conclusion   text NOT NULL
is_visible   boolean NOT NULL default true
sort_order   int NOT NULL default 0
updated_at   timestamptz
```

#### `contact_submissions`
```sql
id           uuid PK default uuid_generate_v4()
first_name   text
last_name    text
name         text              -- from ContactModal (single name field)
email        text NOT NULL
company      text
phone        text
service      text              -- from ContactSection dropdown
project_type text              -- from ContactModal project type
budget       text              -- from ContactModal budget
message      text NOT NULL
source       text NOT NULL default 'contact_section'
             CHECK (source IN ('contact_section','contact_modal'))
status       text NOT NULL default 'new'
             CHECK (status IN ('new','read','replied','archived'))
submitted_at timestamptz default now()
```

#### `newsletter_subscribers`
```sql
id            uuid PK
email         text UNIQUE NOT NULL
subscribed_at timestamptz default now()
is_active     boolean NOT NULL default true
```

#### `site_settings` (key-value store)
```sql
id         uuid PK
key        text UNIQUE NOT NULL
value      text
updated_at timestamptz
```

Pre-populated keys:
- `contact_email` → `contact@hanxcel.com`
- `contact_phone` → `+91 98765 43210`
- `contact_address` → `Bengaluru, Karnataka, India`
- `social_twitter` → `#`
- `social_linkedin` → `#`
- `social_github` → `#`
- `marquee_enabled` → `true`

#### `admin_profiles`
```sql
id         uuid PK REFERENCES auth.users(id) ON DELETE CASCADE
full_name  text NOT NULL
role       text NOT NULL default 'editor' CHECK (role IN ('super_admin','editor'))
created_at timestamptz default now()
```

#### `audit_log`
```sql
id         uuid PK
admin_id   uuid FK → admin_profiles(id)
table_name text NOT NULL
record_id  uuid
action     text NOT NULL CHECK (action IN ('insert','update','delete'))
old_data   jsonb
new_data   jsonb
created_at timestamptz default now()
```

### 3.3 RLS Policies

```sql
-- Enable RLS on ALL tables
-- Content tables (hero, about, services, service_disciplines, solutions, solution_details,
--                 projects + sub-tables, portfolio + sub-tables, team_members, testimonials,
--                 faq, blog_posts, site_settings):
--   SELECT: open to anon (public reads)
--   INSERT/UPDATE/DELETE: only authenticated admins (is_admin() = true)

-- contact_submissions:
--   INSERT: anon allowed (form submissions)
--   SELECT/UPDATE: only admins

-- newsletter_subscribers:
--   INSERT: anon allowed
--   SELECT/UPDATE: only admins

-- admin_profiles: own row only
-- audit_log: admins read/insert only

-- Helper function:
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
$$;
```

### 3.4 Triggers

```sql
-- Auto-update updated_at on all content tables
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN new.updated_at = now(); RETURN new; END;
$$;
-- Apply to: hero, about, services, solutions, solution_details,
--           projects, portfolio, team_members, testimonials, faq, blog_posts, site_settings
```

---

## 4. Backend API Specification

### 4.1 Server setup (`backend/src/index.ts`)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL!, process.env.ADMIN_URL!],
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// Rate limits
const apiLimiter     = rateLimit({ windowMs: 15*60*1000, max: 300 });
const submitLimiter  = rateLimit({ windowMs: 60*60*1000, max: 10,
  message: { error: 'Too many submissions, please try again later.' } });

app.use('/api/', apiLimiter);
app.use('/api/contact',    submitLimiter);
app.use('/api/newsletter', submitLimiter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }));
```

### 4.2 Supabase client (`backend/src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

// Public client — respects RLS
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Service-role client — bypasses RLS (admin routes only)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

### 4.3 Auth middleware (`backend/src/middleware/auth.ts`)

```typescript
export async function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.slice(7);
  if (!token) return res.status(401).json({ error: 'No token' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) return res.status(403).json({ error: 'Not an admin' });

  req.adminId   = user.id;
  req.adminRole = profile.role;
  next();
}
```

### 4.4 Public API Routes

All these return `is_visible = true` rows only, ordered by `sort_order`.

| Method | Path | Returns | Notes |
|--------|------|---------|-------|
| GET | `/api/hero` | Single hero object | Singleton |
| GET | `/api/about` | Single about object | Singleton |
| GET | `/api/services` | Service[] with nested service_disciplines[] | |
| GET | `/api/services/:number` | Single service + disciplines | number = '01'..'06' |
| GET | `/api/solutions` | Solution[] with solution_details | |
| GET | `/api/projects` | Project[] with arch_points, specs, metrics | |
| GET | `/api/projects/:slug` | Single project + sub-tables | |
| GET | `/api/portfolio` | Portfolio[] with sub-tables | |
| GET | `/api/portfolio/:slug` | Single portfolio item + sub-tables | |
| GET | `/api/team` | TeamMember[] | |
| GET | `/api/testimonials` | Testimonial[] | |
| GET | `/api/faq` | FaqItem[] | |
| GET | `/api/blog` | BlogPost[] (mapped to camelCase) | ?category= filter |
| GET | `/api/blog/:slug` | Single blog post | |
| GET | `/api/settings` | `{ key: value }` object | |
| POST | `/api/contact` | `{ success: true }` | Saves to contact_submissions |
| POST | `/api/newsletter` | `{ success: true }` | Upsert to newsletter_subscribers |

#### Blog response mapping (snake_case DB → camelCase for frontend)
```typescript
// The frontend BlogPost interface expects camelCase:
{
  id:       row.slug,
  title:    row.title,
  excerpt:  row.excerpt,
  category: row.category,
  readTime: row.read_time,
  date:     new Date(row.published_at).toLocaleDateString('en-US', { month:'short', day:'2-digit', year:'numeric' }),
  image:    row.image_url,
  author: {
    name:   row.author_name,
    role:   row.author_role,
    avatar: row.author_avatar,
  },
  content: {
    introduction: row.introduction,
    keyPoints:    row.key_points,
    deepDive:     row.deep_dive,
    conclusion:   row.conclusion,
  },
}
```

#### Contact POST body (from ContactSection.tsx)
```typescript
{ firstName, lastName, email, service, message, source: 'contact_section' }
```

#### Contact POST body (from ContactModal.tsx)
```typescript
{ name, email, company, phone, projectType, budget, message, source: 'contact_modal' }
```

### 4.5 Admin API Routes (all require `requireAdmin` middleware)

#### Auth
| Method | Path | Body | Returns |
|--------|------|------|---------|
| POST | `/api/admin/auth/login` | `{ email, password }` | `{ access_token, user: { id, email, full_name, role } }` |
| POST | `/api/admin/auth/refresh` | `{ refresh_token }` | `{ access_token }` |

#### Dashboard
| Method | Path | Returns |
|--------|------|---------|
| GET | `/api/admin/stats` | `{ total_contacts, new_contacts, newsletter_subs, blog_posts, team_members, testimonials }` |

#### Hero (singleton)
| Method | Path | Body | Returns |
|--------|------|------|---------|
| GET | `/api/admin/hero` | — | hero row |
| PATCH | `/api/admin/hero` | Partial hero fields | Updated hero |

Allowed PATCH fields: `heading_line1`, `heading_line2`, `subtext`, `cta_label`, `portrait_url`

#### About (singleton)
| Method | Path | Body |
|--------|------|------|
| GET | `/api/admin/about` | — |
| PATCH | `/api/admin/about` | `{ tagline, body_text, cta_label }` |

#### Services
| Method | Path | Body |
|--------|------|------|
| GET | `/api/admin/services` | — |
| PATCH | `/api/admin/services/:id` | `{ name, description, tagline, full_overview, icon, deliverables[], tech_stack[], industry_applications[], sort_order, is_visible }` |
| POST | `/api/admin/services/:serviceId/disciplines` | `{ title, desc, sort_order }` |
| PATCH | `/api/admin/services/:serviceId/disciplines/:id` | `{ title, desc, sort_order }` |
| DELETE | `/api/admin/services/:serviceId/disciplines/:id` | — |

#### Solutions
| Method | Path |
|--------|------|
| GET | `/api/admin/solutions` |
| POST | `/api/admin/solutions` |
| PATCH | `/api/admin/solutions/:id` |
| DELETE | `/api/admin/solutions/:id` |
| PATCH | `/api/admin/solutions/:id/details` |

#### Projects
| Method | Path |
|--------|------|
| GET | `/api/admin/projects` |
| POST | `/api/admin/projects` |
| PATCH | `/api/admin/projects/:id` |
| DELETE | `/api/admin/projects/:id` |
| POST | `/api/admin/projects/:id/architecture-points` |
| PATCH | `/api/admin/projects/:id/architecture-points/:apId` |
| DELETE | `/api/admin/projects/:id/architecture-points/:apId` |
| POST | `/api/admin/projects/:id/technical-specs` |
| PATCH | `/api/admin/projects/:id/technical-specs/:tsId` |
| DELETE | `/api/admin/projects/:id/technical-specs/:tsId` |
| POST | `/api/admin/projects/:id/key-metrics` |
| PATCH | `/api/admin/projects/:id/key-metrics/:kmId` |
| DELETE | `/api/admin/projects/:id/key-metrics/:kmId` |

#### Portfolio (same CRUD pattern as Projects)
Replace `projects` with `portfolio` in all paths above.

#### Team
| Method | Path |
|--------|------|
| GET | `/api/admin/team` |
| POST | `/api/admin/team` |
| PATCH | `/api/admin/team/:id` |
| DELETE | `/api/admin/team/:id` |

#### Testimonials
| Method | Path |
|--------|------|
| GET | `/api/admin/testimonials` |
| POST | `/api/admin/testimonials` |
| PATCH | `/api/admin/testimonials/:id` |
| DELETE | `/api/admin/testimonials/:id` |

#### FAQ
| Method | Path |
|--------|------|
| GET | `/api/admin/faq` |
| POST | `/api/admin/faq` |
| PATCH | `/api/admin/faq/:id` |
| DELETE | `/api/admin/faq/:id` |

#### Blog
| Method | Path |
|--------|------|
| GET | `/api/admin/blog` |
| POST | `/api/admin/blog` |
| PATCH | `/api/admin/blog/:id` |
| DELETE | `/api/admin/blog/:id` |

#### Contact Submissions
| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/admin/contacts` | ?status=new\|read\|replied\|archived |
| PATCH | `/api/admin/contacts/:id` | `{ status }` only |

#### Newsletter
| Method | Path |
|--------|------|
| GET | `/api/admin/newsletter` |
| PATCH | `/api/admin/newsletter/:id` | `{ is_active: boolean }` |

#### Site Settings
| Method | Path |
|--------|------|
| GET | `/api/admin/settings` |
| PATCH | `/api/admin/settings/:key` | `{ value: string }` |

#### Audit Log
| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/admin/audit` | ?limit=100 (max 200) |

### 4.6 Audit Logging

Every admin write operation (POST/PATCH/DELETE) must call this helper:

```typescript
async function audit(adminId: string, tableName: string, recordId: string, action: 'insert'|'update'|'delete', oldData: any, newData: any) {
  await supabaseAdmin.from('audit_log').insert({
    admin_id: adminId, table_name: tableName, record_id: recordId,
    action, old_data: oldData ?? null, new_data: newData ?? null,
  });
}
```

### 4.7 Backend package.json

```json
{
  "name": "hanxcel-backend",
  "scripts": {
    "dev":   "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.50.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "helmet": "^8.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}
```

### 4.8 Backend environment variables

```env
# backend/.env.example
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
FRONTEND_URL=https://hanxcel.vercel.app
ADMIN_URL=https://hanxcel-admin.vercel.app
PORT=4000
NODE_ENV=production
```

### 4.9 render.yaml

```yaml
services:
  - type: web
    name: hanxcel-api
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_ANON_KEY
        sync: false
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false
      - key: FRONTEND_URL
        sync: false
      - key: ADMIN_URL
        sync: false
```

---

## 5. Frontend Integration (Public Website)

**The UI is completely frozen. Claude Code only adds the API integration layer.**

### 5.1 Files to ADD to `frontend/src/lib/`

#### `api.ts` — Typed fetch functions

```typescript
const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/api';

async function get<T>(path: string): Promise<T> {
  const r = await fetch(BASE + path, { cache: 'default' });
  if (!r.ok) throw new Error(`API ${path} → ${r.status}`);
  return r.json();
}

// Export one typed function per endpoint:
export const fetchHero         = () => get<HeroData>('/hero');
export const fetchAbout        = () => get<AboutData>('/about');
export const fetchServices     = () => get<ServiceData[]>('/services');
export const fetchSolutions    = () => get<SolutionData[]>('/solutions');
export const fetchProjects     = () => get<ProjectData[]>('/projects');
export const fetchPortfolio    = () => get<PortfolioData[]>('/portfolio');
export const fetchTeam         = () => get<TeamMember[]>('/team');
export const fetchTestimonials = () => get<Testimonial[]>('/testimonials');
export const fetchFaq          = () => get<FaqItem[]>('/faq');
export const fetchBlog         = (cat?: string) => get<BlogPost[]>('/blog' + (cat ? `?category=${encodeURIComponent(cat)}` : ''));
export const fetchBlogPost     = (slug: string) => get<BlogPost>(`/blog/${slug}`);
export const fetchSettings     = () => get<SiteSettings>('/settings');
export const submitContact     = (body: ContactPayload) => /* POST /contact */;
export const submitNewsletter  = (email: string) => /* POST /newsletter */;
```

#### `useCms.ts` — React hooks

```typescript
function useAsync<T>(fetcher: () => Promise<T>, deps = []) {
  const [data, setData]     = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);
  useEffect(() => { /* call fetcher, set state */ }, deps);
  return { data, loading, error };
}

export const useHero         = () => useAsync(fetchHero);
export const useAbout        = () => useAsync(fetchAbout);
export const useServices     = () => useAsync(fetchServices);
export const useSolutions    = () => useAsync(fetchSolutions);
export const useProjects     = () => useAsync(fetchProjects);
export const usePortfolio    = () => useAsync(fetchPortfolio);
export const useTeam         = () => useAsync(fetchTeam);
export const useTestimonials = () => useAsync(fetchTestimonials);
export const useFaq          = () => useAsync(fetchFaq);
export const useBlog         = (cat?: string) => useAsync(() => fetchBlog(cat), [cat]);
export const useSettings     = () => useAsync(fetchSettings);
```

### 5.2 Component Migrations (exact changes only — no UI changes)

#### HeroSection.tsx
```typescript
// ADD:
import { useHero } from '../lib/useCms';
// INSIDE COMPONENT ADD:
const { data: hero } = useHero();
// REPLACE hardcoded strings with:
// hero?.heading_line1  (was: 'WE ENGINEER')
// hero?.heading_line2  (was: 'INTELLIGENCE')
// hero?.subtext        (was: the tagline paragraph)
// hero?.cta_label      (was: 'Start Project')
// hero?.portrait_url   (was: hardcoded Figma URL)
```

#### AboutSection.tsx
```typescript
// ADD:
import { useAbout } from '../lib/useCms';
// INSIDE COMPONENT ADD:
const { data: about } = useAbout();
const aboutText = about?.body_text ?? '';
const tagline   = about?.tagline   ?? 'Engineering Ideas Into Real-World Products';
const ctaLabel  = about?.cta_label ?? 'EXPLORE MORE';
// Replace hardcoded const aboutText = "Hanxcel AI Technologies..."
// Replace hardcoded "Engineering Ideas Into Real-World Products"
// Replace hardcoded "EXPLORE MORE"
```

#### ServicesSection.tsx
```typescript
// ADD:
import { useServices } from '../lib/useCms';
// REMOVE: const SERVICES: ServiceItem[] = [ ...6 hardcoded items... ]
// REPLACE WITH:
const { data: SERVICES, loading } = useServices();
if (loading) return <LoadingSpinner />;
// The data shape is the same: number, name, description — no JSX changes needed
```

#### ServiceDetailModal.tsx
```typescript
// REMOVE: export const SERVICE_DETAILS: Record<string, ServiceDetailData> = { ... }
// ADD:
import { fetchService } from '../lib/api';
// The modal already receives serviceNumber prop — fetch on open:
const [detail, setDetail] = useState<ServiceDetailData | null>(null);
useEffect(() => {
  if (serviceNumber) fetchService(serviceNumber).then(setDetail);
}, [serviceNumber]);
// Map API response fields:
// service.service_disciplines → disciplines (array)
// service.deliverables, service.tech_stack, service.industry_applications — same shape
```

#### SolutionsSection.tsx
```typescript
// REMOVE: const SOLUTIONS: SolutionCard[] = [ ...6 hardcoded items... ]
// ADD:
import { useSolutions } from '../lib/useCms';
const { data: SOLUTIONS, loading } = useSolutions();
// Icons: the icon field returns string like 'Smartphone','Zap','Shield','Radio','Activity','Cog'
// Create an icon map: const ICON_MAP = { Smartphone, Zap, Shield, Radio, Activity, Cog }
// const IconComponent = ICON_MAP[solution.icon]
```

#### ProjectsSection.tsx
```typescript
// REMOVE: hardcoded project data
// ADD:
import { useProjects } from '../lib/useCms';
const { data: projects, loading } = useProjects();
// Map to ProjectItem shape for existing JSX:
const projectItems = (projects ?? []).map(p => ({
  id:           p.slug,
  number:       p.number,
  name:         p.name,
  category:     p.category,
  images: {
    col2_tall:    p.hero_image,
    col1_top:     p.gallery_images[1] ?? undefined,
    col1_bottom:  p.gallery_images[2] ?? undefined,
  },
  col1_top_card:    p.col1_top_title ? { title: p.col1_top_title, subtitle: p.col1_top_subtitle } : undefined,
  col1_bottom_card: p.col1_bottom_text ? { text: p.col1_bottom_text } : undefined,
  link:       p.link,
  buttonText: p.button_text,
}));
```

#### ProjectCaseStudyModal.tsx
```typescript
// REMOVE: export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = { ... }
// The modal receives projectId (slug). Fetch on open:
import { fetchProject } from '../lib/api';
const [caseStudy, setCaseStudy] = useState(null);
useEffect(() => {
  if (projectId) fetchProject(projectId).then(setCaseStudy);
}, [projectId]);
// Map:
// caseStudy.project_architecture_points → architecturePoints
// caseStudy.project_technical_specs     → technicalSpecs
// caseStudy.project_key_metrics         → keyMetrics
```

#### PortfolioSection.tsx
```typescript
// REMOVE: const PORTFOLIO_DATA = [ ...4 hardcoded items... ]
// ADD:
import { usePortfolio } from '../lib/useCms';
const { data: PORTFOLIO_DATA, loading } = usePortfolio();
// Map metric_label → metricLabel for existing JSX
```

#### TeamSection.tsx
```typescript
// REMOVE: const TEAM_MEMBERS: TeamMember[] = [ ...6 hardcoded items... ]
// ADD:
import { useTeam } from '../lib/useCms';
const { data: TEAM_MEMBERS, loading } = useTeam();
// image_url → image (the existing interface uses 'image')
```

#### TestimonialsSection.tsx
```typescript
// REMOVE: const TESTIMONIALS: Testimonial[] = [ ...6 hardcoded items... ]
// ADD:
import { useTestimonials } from '../lib/useCms';
const { data: TESTIMONIALS, loading } = useTestimonials();
// avatar_url → avatar (existing interface uses 'avatar')
```

#### FaqSection.tsx
```typescript
// REMOVE: const FAQ_DATA: FaqItem[] = [ ...6 hardcoded items... ]
// ADD:
import { useFaq } from '../lib/useCms';
const { data: FAQ_DATA, loading } = useFaq();
```

#### BlogSection.tsx
```typescript
// REMOVE: const BLOG_POSTS: BlogPost[] = [ ...4 hardcoded items... ]
// ADD:
import { useBlog } from '../lib/useCms';
const { data: BLOG_POSTS, loading } = useBlog(activeCategory);
// Response already camelCase — no field mapping needed
```

#### ContactModal.tsx
```typescript
// REPLACE the fake setTimeout submit handler:
import { submitContact } from '../lib/api';
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await submitContact({
      name, email, company, phone, projectType, budget, message,
      source: 'contact_modal',
    });
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); resetForm(); }, 2800);
  } catch { alert('Failed to send. Please try again.'); }
};
```

#### ContactSection.tsx
```typescript
// REPLACE the fake setTimeout submit handler:
import { submitContact } from '../lib/api';
const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('submitting');
  try {
    await submitContact({ firstName, lastName, email, service, message, source: 'contact_section' });
    setStatus('sent');
    resetForm();
    setTimeout(() => setStatus('idle'), 4500);
  } catch { setStatus('idle'); alert('Failed. Please try again.'); }
};
```

#### Footer.tsx
```typescript
// REPLACE the fake newsletter handler:
import { submitNewsletter } from '../lib/api';
const handleSubscribe = async (e) => {
  e.preventDefault();
  try {
    await submitNewsletter(email);
    setSubscribed(true);
    setEmail('');
  } catch { alert('Subscription failed. Please try again.'); }
};
```

### 5.3 Loading Spinner Component

Add `frontend/src/components/LoadingSpinner.tsx`:
```tsx
export const LoadingSpinner = () => (
  <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto" />
);
```

Use it as a section-level loading state: wrap in the same `<section>` with matching background and minimum height.

### 5.4 Frontend environment files

```env
# frontend/.env.local (dev)
VITE_API_URL=http://localhost:4000
```

```json
// frontend/vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 6. Admin Panel — Complete Specification

### 6.1 Overview

The admin panel is a **separate React app** in the `admin/` folder. It is deployed independently on Vercel. It uses **the exact same visual identity** as the public site:

- Font: Kanit (same weights)
- Background: `#0C0C0C` (same dark base)
- Accent: `#0066FF` / `#00D4FF` gradient
- Same border styles, radius, and card aesthetic
- Same HanxcelLogo SVG component

### 6.2 Admin package.json

```json
{
  "name": "hanxcel-admin",
  "dependencies": {
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router-dom": "^7.0.0",
    "@supabase/supabase-js": "^2.50.0",
    "lucide-react": "^0.546.0",
    "@tailwindcss/vite": "^4.1.14"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
```

### 6.3 Admin routing (`admin/src/App.tsx`)

```tsx
// React Router v7 routes:
/login              → LoginPage
/                   → redirect to /dashboard (if auth)
/dashboard          → DashboardPage
/hero               → HeroPage
/about              → AboutPage
/services           → ServicesPage
/services/:id       → ServiceEditPage (with disciplines editor)
/solutions          → SolutionsPage
/projects           → ProjectsPage
/projects/:id       → ProjectEditPage
/portfolio          → PortfolioPage
/portfolio/:id      → PortfolioEditPage
/team               → TeamPage
/testimonials       → TestimonialsPage
/faq                → FaqPage
/blog               → BlogPage
/blog/new           → BlogEditorPage (new)
/blog/:id           → BlogEditorPage (edit)
/contacts           → ContactLeadsPage
/newsletter         → NewsletterPage
/settings           → SettingsPage
/audit              → AuditLogPage
```

### 6.4 Auth flow

```typescript
// admin/src/lib/auth.ts
// Store token in localStorage as 'hx_admin_token'
// On app load: read token → validate → redirect to /login if invalid

async function login(email: string, password: string) {
  const r = await fetch(`${API_BASE}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error);
  localStorage.setItem('hx_admin_token', j.access_token);
  localStorage.setItem('hx_admin_user', JSON.stringify(j.user));
  return j.user;
}

function logout() {
  localStorage.removeItem('hx_admin_token');
  localStorage.removeItem('hx_admin_user');
}

function getToken() { return localStorage.getItem('hx_admin_token'); }
```

### 6.5 Admin API client (`admin/src/lib/api.ts`)

```typescript
const BASE = import.meta.env.VITE_API_URL + '/api';

async function authedFetch(method: string, path: string, body?: any) {
  const token = getToken();
  const r = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}

export const adminGet    = (path: string)             => authedFetch('GET',    '/admin' + path);
export const adminPost   = (path: string, body: any)  => authedFetch('POST',   '/admin' + path, body);
export const adminPatch  = (path: string, body: any)  => authedFetch('PATCH',  '/admin' + path, body);
export const adminDelete = (path: string)             => authedFetch('DELETE', '/admin' + path);
```

### 6.6 Shell Layout

#### Sidebar (`admin/src/components/layout/Sidebar.tsx`)

```
Width: 260px
Background: #121418
Border-right: 1px solid rgba(215,226,234,0.10)

Top: Brand area
  - HanxcelLogo SVG (exact same component)
  - "HANXCEL AI" font-weight:800 tracking-wider
  - "TECHNOLOGIES" small blue label
  - "Admin Panel" tiny badge

Nav groups with labels:
  OVERVIEW
    ⬡ Dashboard         /dashboard

  WEBSITE CONTENT
    🎯 Hero Section     /hero
    💡 About Section    /about
    ⚡ Services         /services
    🔬 Solutions        /solutions
    📐 Projects         /projects
    🗂️  Portfolio        /portfolio
    👥 Team             /team
    💬 Testimonials     /testimonials
    ❓ FAQ              /faq
    📝 Blog Posts       /blog

  ENQUIRIES
    📬 Contact Leads    /contacts   [red badge: new count]
    📧 Newsletter       /newsletter

  CONFIGURATION
    ⚙️  Site Settings   /settings
    📋 Audit Log        /audit

Bottom: User info card
  - Avatar (first letter of name)
  - Name + role
  - Sign out button (⏻)
```

Active nav item styling:
```css
background: rgba(0,102,255,0.12);
color: #00A3FF;
/* left border accent: */
::before { content:''; position:absolute; left:0; top:6px; bottom:6px; width:3px; background:#0066FF; border-radius:2px; }
```

#### Topbar (`admin/src/components/layout/Topbar.tsx`)

```
Height: 60px
Background: #121418
Border-bottom: 1px solid rgba(215,226,234,0.10)
Content: Page title (left) | Action button slot (right)
```

### 6.7 Reusable UI Components

#### `Button.tsx`
```tsx
// Variants: 'primary' | 'ghost' | 'danger' | 'success'
// Sizes: 'sm' | 'md' | 'lg'
// primary: gradient background (linear-gradient(135deg, #002266, #0066FF, #00D4FF))
// ghost: #1a1d24 bg, border rgba(215,226,234,0.18)
// danger: rgba(239,68,68,0.1) bg, red text
// pill border-radius (22px)
```

#### `Modal.tsx`
```tsx
// Fixed overlay: rgba(0,0,0,0.85) backdrop-blur-xl
// Modal box: background #14171e, border rgba(215,226,234,0.18), border-radius 26px
// Shadow: 0 0 60px rgba(0,102,255,0.2)
// Close button: top-right X
// Footer: flex justify-end gap-10 with border-top
// Sizes: 'sm' (480px) | 'md' (640px) | 'lg' (760px) | 'xl' (900px)
```

#### `Toast.tsx`
```tsx
// Fixed bottom-right
// Background #1a1d24, border rgba(215,226,234,0.18), border-radius 14px
// success: green left border
// error: red left border
// Auto-dismiss after 3.2s
// Slide-up animation
```

#### `DataTable.tsx`
```tsx
// Table with:
// - Sticky header: background #1a1d24
// - Row hover: rgba(255,255,255,0.025)
// - border-collapse: collapse
// - th: uppercase tracking-wide text-[#4a5a6a] font-700 font-size 11px
// - Overflow-x scroll wrapper
```

#### `Badge.tsx`
```tsx
// Variants:
// 'new':      blue bg + border
// 'read':     green bg + border
// 'replied':  amber bg + border
// 'archived': grey bg + border
// 'visible':  green
// 'hidden':   grey
// 'category': blue (for blog categories, service numbers)
// Shape: rounded-full, padding 3px 10px, font-size 11px, font-weight 700
```

#### `FormField.tsx`
```tsx
// Label: uppercase tracking-wide font-600 font-size 12px text-[#7a8fa0]
// Input/Textarea/Select:
//   background: #1a1d24
//   border: 1.5px solid rgba(215,226,234,0.10)
//   border-radius: 10px
//   focus: border-color #0066FF
//   color: #D7E2EA
//   font-family: Kanit
// Textarea min-height: 90px, resize: vertical
// Array fields (tags): chips input showing array items as removable blue chips
```

#### `StatCard.tsx`
```tsx
// Background: #14171e
// Border: 1px solid rgba(215,226,234,0.10)
// Border-radius: 18px
// Padding: 20px 22px
// label: uppercase 11px grey
// value: 36px font-900 tracking-tight (colored: blue | green | amber | red)
```

### 6.8 Page Specifications

#### LoginPage (`/login`)
```
Full-screen centered layout
Background: #0C0C0C

Card (420px wide):
  Background: #14171e
  Border: 1.5px solid rgba(215,226,234,0.18)
  Border-radius: 28px
  Padding: 40px
  Box-shadow: 0 0 60px rgba(0,102,255,0.15)

Contents:
  - HanxcelLogo + "HANXCEL AI / TECHNOLOGIES" brand
  - "Admin Panel" h1 (font-weight:900)
  - "Sign in with your company admin account." subtitle
  - Error message area (red, shown if login fails)
  - Email input
  - Password input
  - "Sign In →" primary button (full width)
```

#### DashboardPage (`/dashboard`)
```
Stats grid (6 cards, auto-fill min 170px):
  New Leads       → red number, links to /contacts?status=new
  Total Leads     → blue number
  Subscribers     → green number
  Blog Posts      → blue number
  Team Members    → blue number
  Testimonials    → blue number

Quick Actions card:
  Buttons: View New Leads | Write Blog Post | Manage Team | Site Settings | View Website ↗

"Admin Controls" card:
  2-column grid listing all 14 controllable areas with ✦ prefix
```

#### HeroPage (`/hero`)
```
Card with "Save Changes" button in header

Fields:
  Heading Line 1    text input       (e.g. "WE ENGINEER")
  Heading Line 2    text input       (e.g. "INTELLIGENCE")
  Sub-text          textarea         (the paragraph below the heading)
  CTA Button Label  text input       (e.g. "Start Project")
  Portrait URL      text input       (the character/product image)

On save: PATCH /api/admin/hero
Show success toast on save
```

#### AboutPage (`/about`)
```
Card with "Save Changes" button

Fields:
  Tagline           text input       ("Engineering Ideas Into Real-World Products")
  Body Text         textarea tall    (the long animated paragraph)
  CTA Button Label  text input       ("EXPLORE MORE")

On save: PATCH /api/admin/about
```

#### ServicesPage (`/services`)
```
List of 6 service rows (not add/delete — services are fixed 01-06):
  Each row shows: number badge | name | short description | Visible/Hidden badge | [Edit] [Show/Hide]

[Edit] opens ServiceEditModal (Modal 'lg'):
  Fields:
    Service Name            text input
    Short Description       textarea (card text)
    Tagline                 text input (modal subheading)
    Full Overview           textarea large (modal body)
    Icon                    select: cpu | firmware | iot | ai | pcb | manufacturing
    Deliverables            tags/array input (one per chip)
    Tech Stack              tags/array input
    Industry Applications   tags/array input
    is_visible              toggle switch

  Disciplines sub-section (within same modal):
    Table of existing disciplines with Edit/Delete per row
    [+ Add Discipline] button → inline form: title + desc inputs
    On add: POST /api/admin/services/:id/disciplines
    On edit: PATCH /api/admin/services/:id/disciplines/:disciplineId
    On delete: DELETE (with confirm dialog)

[Show/Hide]: PATCH is_visible toggle
```

#### SolutionsPage (`/solutions`)
```
[+ Add Solution] button in topbar

Item list showing all solutions:
  tag badge | title | is_visible badge | [Edit] [Show/Hide] [Delete]

Edit/Add opens Modal 'md':
  Fields:
    Tag           text input (e.g. "CONSUMER ELECTRONICS")
    Title         text input
    Description   textarea
    Highlights    tags input (3 items)
    Icon          select: Smartphone | Zap | Shield | Radio | Activity | Cog | Sparkles | Layers
    Sort Order    number input
    Is Visible    toggle

Solution Details sub-section (collapsible):
  Tagline         text input
  Full Overview   textarea large
  Deliverables    tags input
  Tech Stack      tags input
  Key Metrics     repeatable: [{metric, label}] pairs

On save: PATCH /api/admin/solutions/:id (and /api/admin/solutions/:id/details)
```

#### ProjectsPage (`/projects`)
```
[+ Add Project] button in topbar

Item list showing all projects:
  number | title | client · timeline | Visible/Hidden | [Edit] [Show/Hide] [Delete]

Edit/Add opens Modal 'xl' with tabs:

  Tab 1: OVERVIEW
    Slug          text input (auto-generated from title on create)
    Number        char(2) input (01..10)
    Name          text input (short card name)
    Button Text   text input ("VIEW CASE STUDY")
    Category      text input
    Title         text input (full case-study title)
    Client        text input
    Timeline      text input
    Tagline       text input
    Overview      textarea

  Tab 2: IMAGES
    Hero Image URL      text input
    Gallery Images      repeatable URL inputs (add/remove)
    Col1 Top Title      text input
    Col1 Top Subtitle   text input
    Col1 Bottom Text    text input

  Tab 3: CASE STUDY
    Challenge     textarea
    Solution      textarea
    Tools & Tech  tags input
    Link          text input

  Tab 4: SUB-DATA
    Architecture Points:  repeatable {title, desc} pairs with sort_order
    Technical Specs:      repeatable {label, value} pairs
    Key Metrics:          repeatable {metric, label} pairs
    (Each row has Edit / Delete inline + Add new button)

  Tab 5: SETTINGS
    Sort Order    number
    Is Visible    toggle
```

#### PortfolioPage (`/portfolio`)
```
[+ Add Portfolio Item] button in topbar

Item list:
  title | client · year | category badge | metric badge | Visible/Hidden | [Edit] [Show/Hide] [Delete]

Edit/Add opens Modal 'xl' with tabs:

  Tab 1: OVERVIEW
    Slug          text
    Year          text (4 chars)
    Category      text
    Title         text
    Client        text
    Timeline      text
    Tagline       text
    Overview      textarea
    Icon          select: iot | wearable | energy | ai

  Tab 2: DETAILS
    Scope           tags input
    Description     textarea
    Metric          text (e.g. "99.98%")
    Metric Label    text (e.g. "Packet Delivery Reliability")
    Link            text

  Tab 3: CASE STUDY
    Challenge       textarea
    Solution        textarea
    Tools & Tech    tags input
    Deliverables    tags input

  Tab 4: SUB-DATA
    Architecture Points / Technical Specs / Key Metrics
    (same repeatable pattern as Projects)

  Tab 5: SETTINGS
    Sort Order / Is Visible
```

#### TeamPage (`/team`)
```
[+ Add Member] button in topbar

Item list with avatar photo:
  photo | name | role | Visible/Hidden | [Edit] [Delete]

Edit/Add opens Modal 'md':
  Name          text input
  Role          text input
  Bio           textarea
  Specialties   tags input (3 chips)
  Image URL     text input + preview thumbnail
  LinkedIn URL  text input (optional)
  Email         text input (optional)
  GitHub URL    text input (optional)
  Sort Order    number
  Is Visible    toggle

On create: auto-generate slug from name
```

#### TestimonialsPage (`/testimonials`)
```
[+ Add] button in topbar

Item list with avatar:
  avatar | name — company | quote preview | [Edit] [Delete]

Edit/Add opens Modal 'md':
  Name          text
  Role          text
  Company       text
  Badge Label   text (e.g. "Industrial Robotics")
  Quote         textarea
  Rating        number 1-5
  Avatar URL    text + preview
  Sort Order    number
  Is Visible    toggle
```

#### FaqPage (`/faq`)
```
[+ Add Question] button in topbar

Item list:
  question | answer preview | Visible/Hidden | [Edit] [Show/Hide] [Delete]

Edit/Add opens Modal 'sm':
  Question   text input
  Answer     textarea
  Sort Order number
  Is Visible toggle
```

#### BlogPage (`/blog`)
```
[+ Write Post] button in topbar

Data table columns:
  Title | Author | Category badge | Published Date | Status (Published/Draft) | Actions

Actions: [Edit] [Publish/Unpublish] [Delete]

Edit/Add opens a FULL-PAGE editor (route /blog/new or /blog/:id), NOT a modal:

Layout: 2-column (left: form, right: preview card)

Left column fields:
  Title              text
  Excerpt            textarea (2 lines)
  Category           select: HARDWARE & PCB | EMBEDDED & IOT | MANUFACTURING | EDGE AI
  Read Time          text (e.g. "6 min read")
  Published Date     date picker
  Cover Image URL    text + preview img
  Author Name        text
  Author Role        text
  Author Avatar URL  text + preview
  Introduction       textarea (large)
  Key Points         repeatable text inputs (add/remove)
  Deep Dive          textarea (large)
  Conclusion         textarea (large)
  Sort Order         number

Right column (live preview card):
  Shows a preview matching the BlogSection card design:
  - cover image, category badge, title, excerpt, author info, read time

Footer actions:
  [Save as Draft] [Publish] buttons
  [Delete] if editing existing post
```

#### ContactLeadsPage (`/contacts`)
```
Filter bar: [All] [New] [Read] [Replied] [Archived] filter tabs

Data table columns:
  Name | Email | Service/Type | Message (truncated) | Submitted Date | Status badge | Status dropdown

Status dropdown: select → PATCH status on change
  new → read → replied → archived

Row click expands full message detail panel below row

Stats summary at top:
  New: X | Read: X | Replied: X | Archived: X
```

#### NewsletterPage (`/newsletter`)
```
Stats at top: Total: X | Active: X | Unsubscribed: X

Data table:
  Email | Subscribed Date | Status (Active/Unsubscribed) | [Unsubscribe/Re-subscribe]

Export button: downloads email list as CSV (client-side, filter active only)
```

#### SettingsPage (`/settings`)
```
Two-column form grid:

Contact Information card:
  Contact Email     text input
  Contact Phone     text input
  Office Address    text input (full width)

Social Links card:
  Twitter / X       text input
  LinkedIn          text input
  GitHub            text input

[Save All Settings] button → PATCH each key individually
Show success toast on save
```

#### AuditLogPage (`/audit`)
```
Data table (last 100 entries, newest first):
  Timestamp | Admin Name | Table | Action badge | Record ID (truncated)

Action badges:
  insert → green
  update → amber
  delete → grey

Refresh button
```

### 6.9 Admin environment

```env
# admin/.env.local
VITE_API_URL=http://localhost:4000
VITE_SITE_URL=http://localhost:3000
```

```json
// admin/vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Robots-Tag", "value": "noindex, nofollow" },
      { "key": "X-Frame-Options", "value": "DENY" }
    ]
  }]
}
```

---

## 7. Seed Data

The seed SQL must insert the exact data currently hardcoded in the frontend components:

### Services (6 rows matching ServicesSection.tsx + ServiceDetailModal.tsx)
- 01: ELECTRONIC PRODUCT DESIGN
- 02: EMBEDDED SYSTEMS
- 03: IoT & CONNECTED PRODUCTS
- 04: AI & SOFTWARE SOLUTIONS
- 05: PCB & ELECTRONICS
- 06: PROTOTYPING & MANUFACTURING

Each with all fields from `SERVICE_DETAILS` in ServiceDetailModal.tsx: full_overview, tagline, deliverables[], tech_stack[], industry_applications[], and 4 discipline rows.

### Solutions (6 rows matching SolutionsSection.tsx)
- CONSUMER ELECTRONICS: Smart Products & Connected Experiences
- ENERGY & UTILITIES: Smart Energy Systems
- DEFENSE & AEROSPACE: High-Reliability Electronics
- IoT & CONNECTED SYSTEMS: End-to-End IoT Solutions
- MEDICAL DEVICES: Precision Medical Technology
- INDUSTRIAL AUTOMATION: Intelligent Industrial Systems

### Projects (3 rows matching ProjectsSection.tsx + ProjectCaseStudyModal.tsx)
- 01: nextlevel-studio (consumer wearable)
- 02: aura-brand-identity (industrial IoT gateway)
- 03: solaris-digital (smart grid inverter)

Each with architecture_points, technical_specs, key_metrics from ProjectCaseStudyModal.tsx.

### Portfolio (4 rows matching PortfolioSection.tsx + PortfolioDetailModal.tsx)
- smart-connected-mesh (2026)
- nextgen-wearable (2025)
- smart-energy-controller (2025)
- edge-vision-module (2024)

### Team (6 rows matching TeamSection.tsx)
Alex Vance, Elena Rostova, Marcus Chen, Sarah Jenkins, David O'Connor, Priya Sharma

### Testimonials (6 rows matching TestimonialsSection.tsx)
Vikram Nair, Claire Dupont, Rohan Mehta, Anita Kulkarni, Jonathan Hayes, Tarun Singhania

### FAQ (6 rows matching FaqSection.tsx)
All 6 Q&A pairs from FAQ_DATA array

### Blog Posts (4 rows matching BlogSection.tsx)
All 4 posts with complete content from BLOG_POSTS array

### Hero (1 row)
From HeroSection.tsx hardcoded strings

### About (1 row)
From AboutSection.tsx: the `aboutText` paragraph and heading

### Site Settings (7 rows)
contact_email, contact_phone, contact_address, social_twitter, social_linkedin, social_github, marquee_enabled

---

## 8. Deployment Instructions

### Step 1: Supabase
1. Create new project at supabase.com
2. SQL Editor → run `001_schema.sql`
3. SQL Editor → run `001_seed.sql`
4. Authentication → Users → Invite user (admin email)
5. After invite accepted, SQL Editor:
   ```sql
   INSERT INTO admin_profiles (id, full_name, role)
   SELECT id, 'Admin Name', 'super_admin'
   FROM auth.users WHERE email = 'admin@company.com';
   ```
6. Copy: Project URL, anon key, service_role key

### Step 2: Backend → Render
1. Push `backend/` to GitHub
2. Render → New Web Service → connect repo
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Add env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, FRONTEND_URL, ADMIN_URL
6. Note your Render URL: `https://hanxcel-api.onrender.com`

### Step 3: Admin Panel → Vercel
1. Push `admin/` to GitHub
2. Vercel → New Project → import
3. Framework: Vite
4. Add env vars: `VITE_API_URL=https://hanxcel-api.onrender.com`, `VITE_SITE_URL=https://hanxcel.vercel.app`
5. Note URL: `https://hanxcel-admin.vercel.app`

### Step 4: Public Website → Vercel
1. Push `frontend/` to GitHub
2. Vercel → New Project → import
3. Framework: Vite
4. Add env var: `VITE_API_URL=https://hanxcel-api.onrender.com`
5. Update backend env: set `FRONTEND_URL` and `ADMIN_URL` to your actual Vercel URLs

---

## 9. Local Development

```bash
# Terminal 1 — Backend
cd backend
cp .env.example .env    # fill in Supabase keys
npm install
npm run dev             # http://localhost:4000

# Terminal 2 — Public website
cd frontend
echo "VITE_API_URL=http://localhost:4000" > .env.local
npm install
npm run dev             # http://localhost:3000

# Terminal 3 — Admin panel
cd admin
echo "VITE_API_URL=http://localhost:4000" > .env.local
echo "VITE_SITE_URL=http://localhost:3000" >> .env.local
npm install
npm run dev             # http://localhost:3001
```

---

## 10. What Admins Control — Complete List

| Section | Fields Editable |
|---------|----------------|
| Hero | Heading line 1, heading line 2, sub-text paragraph, CTA button label, portrait image URL |
| About | Tagline (bold heading), body paragraph (animated text), CTA button label |
| Services | Name, short description, tagline, full overview, icon type, deliverables list, tech stack list, industry applications list; disciplines (add/edit/delete/reorder); show/hide each service |
| Solutions | Tag, title, description, highlights, icon; detail: tagline, overview, deliverables, tech stack, key metrics; add/delete solutions; show/hide |
| Projects | All text fields, all images, challenge, solution, tools; architecture points (add/edit/delete); technical specs (add/edit/delete); key metrics (add/edit/delete); add/delete projects; show/hide |
| Portfolio | All text fields, scope, metric + label, challenge, solution, deliverables, tools; architecture points, technical specs, key metrics (add/edit/delete); add/delete items; show/hide |
| Team | Add/edit/delete members: name, role, bio, specialties, photo, LinkedIn, email, GitHub; reorder; show/hide |
| Testimonials | Add/edit/delete: name, role, company, badge, quote, rating, avatar; show/hide |
| FAQ | Add/edit/delete questions and answers; show/hide individual items; reorder |
| Blog Posts | Write new posts, edit all content fields, publish/unpublish, delete |
| Contact Leads | View all submissions from both forms; update status (new→read→replied→archived) |
| Newsletter | View subscribers; unsubscribe/re-subscribe individual emails; CSV export |
| Site Settings | contact_email, contact_phone, contact_address, social_twitter, social_linkedin, social_github |
| Audit Log | Read-only view of all admin changes |

