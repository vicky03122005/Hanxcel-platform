# Hanxcel AI Technologies — Setup & Deployment

Three apps live in this repo:

| Folder | What it is | Deploys to | Dev port |
|---|---|---|---|
| `/` (repo root) | Public website (React + Vite) | Vercel | 3000 |
| `/backend` | Express + TypeScript API | Render | 4000 |
| `/admin` | Admin panel (React + Vite) | Vercel | 3001 |

The website runs today with no backend at all — every section falls back to its
bundled content. The backend only makes that content editable.

---

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste and run `backend/supabase/migrations/001_schema.sql`.
3. **SQL Editor** → paste and run `backend/supabase/seed/001_seed.sql`.
   This loads the exact content the website currently shows.
4. **Authentication → Users → Add user** (or Invite). Use the email the admin
   will sign in with, and set a password.
5. Promote that user to an admin — **SQL Editor**, with your own email:

   ```sql
   insert into admin_profiles (id, full_name, role)
   select id, 'Your Name', 'super_admin'
   from auth.users
   where email = 'you@company.com';
   ```

   Without this row, sign-in returns "This account is not an admin."

6. **Project Settings → API**, copy three values:
   - Project URL → `SUPABASE_URL`
   - `anon` `public` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

   The `service_role` key bypasses all row-level security. It belongs only in
   the backend's environment — never in the website, the admin panel, or a
   commit.

### Verifying the seed

```sql
select
  (select count(*) from services)     as services,      -- 6
  (select count(*) from solutions)    as solutions,     -- 6
  (select count(*) from projects)     as projects,      -- 3
  (select count(*) from portfolio)    as portfolio,     -- 4
  (select count(*) from team_members) as team,          -- 3
  (select count(*) from testimonials) as testimonials,  -- 6
  (select count(*) from faq)          as faq,           -- 6
  (select count(*) from blog_posts)   as blog;          -- 6
```

Re-running the seed is safe: it replaces all content rows and never touches
enquiries, admin accounts or the audit log.

---

## 2. Local development

Three terminals.

```bash
# 1 — backend
cd backend
cp .env.example .env          # then fill in the three Supabase values
npm install
npm run dev                   # http://localhost:4000

# 2 — public website (repo root)
npm install
npm run dev                   # http://localhost:3000

# 3 — admin panel
cd admin
npm install
npm run dev                   # http://localhost:3001
```

`.env.local` files are already present for the website and admin panel and point
at `http://localhost:4000`. In development the backend also accepts CORS from
ports 3000, 3001 and 5173 automatically.

Sign in at <http://localhost:3001/login> with the user from step 1.4.

### Health check

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/services
curl http://localhost:4000/api/admin/hero     # expect 401 without a token
```

---

## 3. Deploy the backend (Render)

1. Push this repo to GitHub.
2. Render → **New → Web Service** → connect the repo.
3. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Health Check Path: `/health`
4. Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `NODE_ENV=production`, plus `FRONTEND_URL` and
   `ADMIN_URL` (fill these in after step 4 and 5, then redeploy).
5. Note the URL, e.g. `https://hanxcel-api.onrender.com`.

`backend/render.yaml` describes the same setup if you prefer a Blueprint deploy.

> Render's free tier sleeps after inactivity and can take ~50s to wake. The
> website stays fully readable during that window because each section falls
> back to its bundled content — but admin sign-in will be slow on first hit.

---

## 4. Deploy the website (Vercel)

1. Vercel → **New Project** → import the repo.
2. Root Directory: leave as the repository root. Framework: Vite.
3. Environment variable: `VITE_API_URL=https://hanxcel-api.onrender.com`
4. Deploy, then note the URL, e.g. `https://hanxcel.vercel.app`.

---

## 5. Deploy the admin panel (Vercel)

1. Vercel → **New Project** → import the same repo again.
2. **Root Directory: `admin`**. Framework: Vite.
3. Environment variables:
   - `VITE_API_URL=https://hanxcel-api.onrender.com`
   - `VITE_SITE_URL=https://hanxcel.vercel.app`
4. Deploy, then note the URL, e.g. `https://hanxcel-admin.vercel.app`.

`admin/vercel.json` already sends `X-Robots-Tag: noindex, nofollow` and
`X-Frame-Options: DENY`.

---

## 6. Close the loop

Go back to Render and set:

```
FRONTEND_URL=https://hanxcel.vercel.app
ADMIN_URL=https://hanxcel-admin.vercel.app
```

Redeploy. CORS now accepts exactly those two origins in production.

---

## How content flows

- The admin panel writes to the API, which writes to Supabase.
- The website reads the public API on load. Public endpoints return only rows
  with `is_visible = true`, ordered by `sort_order`.
- Every admin write is recorded in `audit_log` and visible at `/audit`.

### Images

Image fields accept either:

- a full URL (`https://…`) — used as-is, or
- one of the seven filenames bundled with the website:
  `SmartConnectedDevice.png`, `IntelligentControlSystem.png`,
  `IndustrialIoTPlatform.png`, `Wireless.png`, `Jagadish.jpeg`,
  `Srinivasa.jpeg`, `DineshP.jpeg`

`src/lib/images.ts` resolves a bundled filename to its hashed build URL. Any
other value is passed straight through. There is no file upload in this version
— paste a URL from wherever you host images.

### Regenerating the seed

If the bundled fallback content in the components changes and you want the seed
to match again:

```bash
cd backend
npm run generate-seed
```

This re-extracts the data directly from `src/components/*.tsx`, so the seed can
never drift from what the site renders.

---

## Where things live

| Task | File |
|---|---|
| Database schema, RLS, triggers | `backend/supabase/migrations/001_schema.sql` |
| Seed content | `backend/supabase/seed/001_seed.sql` (generated) |
| Public API routes | `backend/src/routes/public/index.ts` |
| Admin API routes | `backend/src/routes/admin/index.ts` |
| DB row → website shape mapping | `backend/src/lib/mappers.ts` |
| Website API client / hooks | `src/lib/api.ts`, `src/lib/useCms.ts` |
| Image resolution | `src/lib/images.ts` |
| Admin design tokens | `admin/src/index.css` |
