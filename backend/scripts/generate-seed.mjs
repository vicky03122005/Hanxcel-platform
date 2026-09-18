/**
 * Extracts the hardcoded content constants out of the frozen frontend
 * components and emits backend/supabase/seed/001_seed.sql.
 *
 * Extracting rather than hand-transcribing guarantees the seeded database
 * reproduces the live site byte-for-byte.
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..'); // repo root (the public website)
const OUT_DIR = path.resolve(HERE, '../supabase/seed');
const TMP = HERE;

/** Component file -> constants to lift out (they are mostly not exported). */
const TARGETS = {
  'ServicesSection.tsx': ['SERVICES'],
  'ServiceDetailModal.tsx': ['SERVICE_DETAILS'],
  'SolutionsSection.tsx': ['SOLUTIONS'],
  'SolutionDetailModal.tsx': ['SOLUTION_DETAILS'],
  'ProjectsSection.tsx': ['PROJECTS'],
  'ProjectCaseStudyModal.tsx': ['PROJECT_CASE_STUDIES'],
  'PortfolioSection.tsx': ['PORTFOLIO_DATA'],
  'PortfolioDetailModal.tsx': ['PORTFOLIO_DETAILS'],
  'TeamSection.tsx': ['TEAM_MEMBERS'],
  'TestimonialsSection.tsx': ['TESTIMONIALS'],
  'FaqSection.tsx': ['FAQ_DATA'],
  'BlogSection.tsx': ['BLOG_POSTS'],
};

/**
 * Every identifier named-imported anywhere in src/components. The stub module
 * exports all of them as the sentinel string '__C_<Name>', which lets a value
 * like `icon: Smartphone` (a live lucide component) survive evaluation as a
 * recoverable name rather than becoming undefined.
 *
 * A Proxy cannot be used here: esbuild's CJS interop enumerates own properties,
 * and a Proxy over an empty object reports none.
 */
function collectImportedNames() {
  const dir = path.join(ROOT, 'src/components');
  const names = new Set();
  // Matches both `import { a, b } from 'x'` and `import React, { a } from 'x'`.
  const namedImport = /import\s[^{;]*\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g;

  for (const file of fs.readdirSync(dir)) {
    if (!/\.tsx?$/.test(file)) continue;
    const src = fs.readFileSync(path.join(dir, file), 'utf8');
    let m;
    while ((m = namedImport.exec(src)) !== null) {
      for (const part of m[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/)[0].trim();
        if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name);
      }
    }
  }
  return [...names];
}

const STUB_NAMES = collectImportedNames();

const STUB_SOURCE =
  STUB_NAMES.map((n) => `export const ${n} = ${JSON.stringify('__C_' + n)};`).join('\n') +
  '\nexport default "__C_default";\n';

/** Stub every runtime import so the module can be evaluated headlessly. */
const stubPlugin = {
  name: 'stub',
  setup(build) {
    // Image imports resolve to their bare filename — exactly what we seed.
    build.onResolve({ filter: /\.(png|jpe?g|svg|gif|webp)$/ }, (args) => ({
      path: args.path,
      namespace: 'img',
    }));
    build.onLoad({ filter: /.*/, namespace: 'img' }, (args) => ({
      contents: `export default ${JSON.stringify(path.basename(args.path))};`,
      loader: 'js',
    }));

    // Any bare package (react, lucide-react, motion/react, framer-motion...)
    // becomes a Proxy that yields a named stub for every property accessed.
    // NB: an absolute Windows entry path ("C:\...") also matches this filter,
    // so entry points must be allowed through untouched.
    build.onResolve({ filter: /^[^./]/ }, (args) =>
      args.kind === 'entry-point' ? null : { path: args.path, namespace: 'pkg' },
    );
    build.onLoad({ filter: /.*/, namespace: 'pkg' }, () => ({
      contents: STUB_SOURCE,
      loader: 'js',
    }));

    // Local sibling components (FadeIn, Magnet, HanxcelLogo...) — same stub.
    build.onResolve({ filter: /^\.\.?\// }, (args) => {
      const resolved = path.resolve(args.resolveDir, args.path);
      const candidates = [resolved, resolved + '.tsx', resolved + '.ts'];
      const hit = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
      if (!hit) return { path: args.path, namespace: 'pkg' };
      if (/\.(png|jpe?g|svg|gif|webp)$/.test(hit)) return { path: hit, namespace: 'img' };
      // types.ts holds only interfaces; components get stubbed.
      if (path.basename(hit) === 'types.ts') return { path: hit, namespace: 'pkg' };
      if (Object.keys(TARGETS).includes(path.basename(hit))) return { path: hit };
      return { path: args.path, namespace: 'pkg' };
    });
  },
};

async function loadConstants(file, names) {
  const src = fs.readFileSync(path.join(ROOT, 'src/components', file), 'utf8');

  // Force-export the constants we need, and drop the type annotations that
  // would otherwise reference stubbed interfaces.
  let patched = src;
  for (const n of names) {
    patched = patched.replace(
      new RegExp(`(^|\\n)(export\\s+)?const\\s+${n}\\b[^=]*=`, 'm'),
      `$1export const ${n} =`,
    );
  }

  const entry = path.join(TMP, '__entry_' + file.replace(/\W/g, '_') + '.tsx');
  fs.writeFileSync(entry, patched);

  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'neutral',
    target: 'es2022',
    loader: { '.tsx': 'tsx', '.ts': 'ts' },
    plugins: [stubPlugin],
    logLevel: 'warning',
    absWorkingDir: path.join(ROOT, 'src/components'),
  });

  const js = result.outputFiles[0].text;
  const outFile = path.join(TMP, '__out_' + file.replace(/\W/g, '_') + '.mjs');
  fs.writeFileSync(outFile, js);
  const mod = await import(url.pathToFileURL(outFile).href + '?t=' + Date.now());
  fs.unlinkSync(entry);
  fs.unlinkSync(outFile);

  const out = {};
  for (const n of names) {
    if (mod[n] === undefined) {
      throw new Error(
        `${file}: expected export '${n}' but the bundle exported: ` +
          Object.keys(mod).join(', '),
      );
    }
    out[n] = mod[n];
  }
  return out;
}

/* ----------------------------------------------------------------- SQL utils */

const q = (v) => {
  if (v === null || v === undefined || v === '') return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
};
const qs = (v) => "'" + String(v ?? '').replace(/'/g, "''") + "'"; // non-null text
const arr = (a) => {
  if (!a || a.length === 0) return "'{}'";
  return 'ARRAY[' + a.map((x) => qs(x)).join(', ') + ']::text[]';
};

const lines = [];
const w = (s = '') => lines.push(s);

/* ---------------------------------------------------------------------- run */

const data = {};
for (const [file, names] of Object.entries(TARGETS)) {
  Object.assign(data, await loadConstants(file, names));
  process.stderr.write(`loaded ${file}\n`);
}

const {
  SERVICES,
  SERVICE_DETAILS,
  SOLUTIONS,
  SOLUTION_DETAILS,
  PROJECTS,
  PROJECT_CASE_STUDIES,
  PORTFOLIO_DATA,
  PORTFOLIO_DETAILS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  FAQ_DATA,
  BLOG_POSTS,
} = data;

// Sanity: counts must match what the site renders today.
const expect = (name, actual, want) => {
  if (actual !== want) throw new Error(`${name}: expected ${want}, got ${actual}`);
};
expect('SERVICES', SERVICES.length, 6);
expect('SERVICE_DETAILS', Object.keys(SERVICE_DETAILS).length, 6);
expect('SOLUTIONS', SOLUTIONS.length, 6);
expect('SOLUTION_DETAILS', Object.keys(SOLUTION_DETAILS).length, 6);
expect('PROJECTS', PROJECTS.length, 3);
expect('PROJECT_CASE_STUDIES', Object.keys(PROJECT_CASE_STUDIES).length, 3);
expect('PORTFOLIO_DATA', PORTFOLIO_DATA.length, 4);
expect('PORTFOLIO_DETAILS', Object.keys(PORTFOLIO_DETAILS).length, 4);
expect('TEAM_MEMBERS', TEAM_MEMBERS.length, 3);
expect('TESTIMONIALS', TESTIMONIALS.length, 6);
expect('FAQ_DATA', FAQ_DATA.length, 6);
expect('BLOG_POSTS', BLOG_POSTS.length, 6);

/* The lucide component stub yields '__C_Smartphone' etc. Recover the name. */
const iconName = (v) => (typeof v === 'string' && v.startsWith('__C_') ? v.slice(4) : String(v));

w('-- ============================================================================');
w('-- Hanxcel AI Technologies — seed data');
w('-- ');
w('-- GENERATED from the frontend components by scripts/generate-seed.mjs.');
w('-- Do not hand-edit: re-run the generator instead.');
w('-- ');
w('-- Run AFTER migrations/001_schema.sql. Idempotent — re-running replaces all');
w('-- content rows. Enquiries (contact_submissions, newsletter_subscribers),');
w('-- admin_profiles and audit_log are never touched.');
w('-- ============================================================================');
w('');
w('begin;');
w('');
w('-- Clear content tables. Child rows cascade.');
w('truncate table');
w('  public.hero, public.about, public.services, public.solutions,');
w('  public.projects, public.portfolio, public.team_members,');
w('  public.testimonials, public.faq, public.blog_posts, public.site_settings');
w('  restart identity cascade;');
w('');

/* ------------------------------------------------------------------- hero */
const HERO_SUBTEXT = [
  'We build intelligent technology, digital products,',
  'and business solutions that turn complex ideas into',
  'real-world impact.',
].join('\n');

w('-- ---------------------------------------------------------------- hero');
w('insert into public.hero (heading_line1, heading_line2, subtext, cta_label, portrait_url) values');
w(`  (${qs('WE ENGINEER')}, ${qs('INTELLIGENCE')}, ${qs(HERO_SUBTEXT)}, ${qs('Start Project')}, NULL);`);
w('');

/* ------------------------------------------------------------------ about */
const ABOUT_BODY =
  "Hanxcel AI Technologies is a software and technology company focused on building intelligent digital products and scalable software solutions. We bring together software engineering, artificial intelligence, cloud technologies, web and mobile application development, UI/UX, and connected systems to transform complex ideas into meaningful digital experiences. From product strategy and design to development, integration, testing, and deployment, we help businesses turn ideas into reliable, scalable, and future-ready technology.";

w('-- --------------------------------------------------------------- about');
w('insert into public.about (tagline, body_text, cta_label) values');
w(`  (${qs('Engineering Ideas Into Real-World Products')}, ${qs(ABOUT_BODY)}, ${qs('EXPLORE MORE')});`);
w('');

/* --------------------------------------------------------------- services */
w('-- ------------------------------------------------------------ services');
SERVICES.forEach((card, i) => {
  const d = SERVICE_DETAILS[card.number];
  if (!d) throw new Error('missing SERVICE_DETAILS for ' + card.number);
  w('insert into public.services');
  w('  (number, name, description, tagline, full_overview, icon,');
  w('   deliverables, tech_stack, industry_applications, sort_order, is_visible) values');
  w(`  (${qs(card.number)}, ${qs(card.name)}, ${qs(card.description)},`);
  w(`   ${qs(d.tagline)}, ${qs(d.fullOverview)}, ${qs(d.icon)},`);
  w(`   ${arr(d.deliverables)}, ${arr(d.techStack)}, ${arr(d.industryApplications)}, ${i}, true);`);
  w('');
  d.disciplines.forEach((disc, j) => {
    w('insert into public.service_disciplines (service_id, title, "desc", sort_order)');
    w(`  select id, ${qs(disc.title)}, ${qs(disc.desc)}, ${j}`);
    w(`  from public.services where number = ${qs(card.number)};`);
  });
  w('');
});

/* -------------------------------------------------------------- solutions */
w('-- ----------------------------------------------------------- solutions');
SOLUTIONS.forEach((card, i) => {
  const d = SOLUTION_DETAILS[card.id];
  if (!d) throw new Error('missing SOLUTION_DETAILS for ' + card.id);
  w('insert into public.solutions');
  w('  (slug, tag, title, description, highlights, icon, sort_order, is_visible) values');
  w(`  (${qs(card.id)}, ${qs(card.tag)}, ${qs(card.title)}, ${qs(card.description)},`);
  w(`   ${arr(card.highlights)}, ${qs(iconName(card.icon))}, ${i}, true);`);
  w('');
  w('insert into public.solution_details');
  w('  (solution_id, tagline, description, full_overview, icon,');
  w('   key_capabilities, certifications, case_study_title, case_study_impact)');
  w(`  select id, ${qs(d.tagline)}, ${qs(d.description)}, ${qs(d.fullOverview)}, ${qs(d.icon)},`);
  w(`         ${arr(d.keyCapabilities)}, ${arr(d.certifications)},`);
  w(`         ${qs(d.caseStudyExample.title)}, ${qs(d.caseStudyExample.impact)}`);
  w(`  from public.solutions where slug = ${qs(card.id)};`);
  w('');
  d.architecturePoints.forEach((p, j) => {
    w('insert into public.solution_architecture_points (solution_id, title, "desc", sort_order)');
    w(`  select id, ${qs(p.title)}, ${qs(p.desc)}, ${j}`);
    w(`  from public.solutions where slug = ${qs(card.id)};`);
  });
  w('');
});

/* --------------------------------------------------------------- projects */
w('-- ------------------------------------------------------------ projects');
PROJECTS.forEach((card, i) => {
  const d = PROJECT_CASE_STUDIES[card.id];
  if (!d) throw new Error('missing PROJECT_CASE_STUDIES for ' + card.id);
  w('insert into public.projects');
  w('  (slug, number, name, button_text, category, title, client, timeline, tagline, overview,');
  w('   hero_image, gallery_images, col1_top_title, col1_top_subtitle, col1_bottom_text,');
  w('   challenge, solution, tools_and_tech, link, sort_order, is_visible) values');
  w(`  (${qs(card.id)}, ${qs(card.number)}, ${qs(card.name)}, ${qs(card.buttonText ?? 'VIEW CASE STUDY')},`);
  w(`   ${qs(d.category)}, ${qs(d.title)}, ${qs(d.client)}, ${qs(d.timeline)}, ${qs(d.tagline)},`);
  w(`   ${qs(d.overview)}, ${qs(d.heroImage)}, ${arr(d.galleryImages)},`);
  w(`   ${q(card.col1_top_card?.title)}, ${q(card.col1_top_card?.subtitle)}, ${q(card.col1_bottom_card?.text)},`);
  w(`   ${qs(d.challenge)}, ${qs(d.solution)}, ${arr(d.toolsAndTech)}, ${qs(card.link ?? '#')}, ${i}, true);`);
  w('');
  const sub = [
    ['project_architecture_points', '(project_id, title, "desc", sort_order)', d.architecturePoints, (p) => [qs(p.title), qs(p.desc)]],
    ['project_technical_specs', '(project_id, label, value, sort_order)', d.technicalSpecs, (p) => [qs(p.label), qs(p.value)]],
    ['project_key_metrics', '(project_id, metric, label, sort_order)', d.keyMetrics, (p) => [qs(p.metric), qs(p.label)]],
  ];
  for (const [table, cols, rows, vals] of sub) {
    rows.forEach((r, j) => {
      w(`insert into public.${table} ${cols}`);
      w(`  select id, ${vals(r).join(', ')}, ${j}`);
      w(`  from public.projects where slug = ${qs(card.id)};`);
    });
  }
  w('');
});

/* -------------------------------------------------------------- portfolio */
w('-- ----------------------------------------------------------- portfolio');
PORTFOLIO_DATA.forEach((card, i) => {
  const d = PORTFOLIO_DETAILS[card.id];
  if (!d) throw new Error('missing PORTFOLIO_DETAILS for ' + card.id);
  w('insert into public.portfolio');
  w('  (slug, year, category, title, client, timeline, tagline, overview, icon, scope,');
  w('   description, metric, metric_label, challenge, solution, tools_and_tech,');
  w('   deliverables, link, sort_order, is_visible) values');
  w(`  (${qs(card.id)}, ${qs(card.year)}, ${qs(card.category)}, ${qs(card.title)}, ${qs(card.client)},`);
  w(`   ${qs(d.timeline)}, ${qs(d.tagline)}, ${qs(d.overview)}, ${qs(d.icon)}, ${arr(card.scope)},`);
  w(`   ${qs(card.description)}, ${qs(card.metric)}, ${qs(card.metricLabel)},`);
  w(`   ${qs(d.challenge)}, ${qs(d.solution)}, ${arr(d.toolsAndTech)},`);
  w(`   ${arr(d.deliverables)}, ${qs(card.link ?? '#')}, ${i}, true);`);
  w('');
  const sub = [
    ['portfolio_architecture_points', '(portfolio_id, title, "desc", sort_order)', d.architecturePoints, (p) => [qs(p.title), qs(p.desc)]],
    ['portfolio_technical_specs', '(portfolio_id, label, value, sort_order)', d.technicalSpecs, (p) => [qs(p.label), qs(p.value)]],
    ['portfolio_key_metrics', '(portfolio_id, metric, label, sort_order)', d.keyMetrics, (p) => [qs(p.metric), qs(p.label)]],
  ];
  for (const [table, cols, rows, vals] of sub) {
    rows.forEach((r, j) => {
      w(`insert into public.${table} ${cols}`);
      w(`  select id, ${vals(r).join(', ')}, ${j}`);
      w(`  from public.portfolio where slug = ${qs(card.id)};`);
    });
  }
  w('');
});

/* ------------------------------------------------------------------- team */
w('-- ---------------------------------------------------------------- team');
TEAM_MEMBERS.forEach((m, i) => {
  w('insert into public.team_members');
  w('  (slug, name, role, bio, specialties, image_url, linkedin, email, github, sort_order, is_visible) values');
  w(`  (${qs(m.id)}, ${qs(m.name)}, ${qs(m.role)}, ${qs(m.bio)}, ${arr(m.specialties)},`);
  w(`   ${qs(m.image)}, ${q(m.linkedin)}, ${q(m.email)}, ${q(m.github)}, ${i}, true);`);
});
w('');

/* ----------------------------------------------------------- testimonials */
w('-- -------------------------------------------------------- testimonials');
TESTIMONIALS.forEach((t, i) => {
  w('insert into public.testimonials');
  w('  (slug, name, role, company, badge, quote, rating, avatar_url, sort_order, is_visible) values');
  w(`  (${qs(t.id)}, ${qs(t.name)}, ${qs(t.role)}, ${qs(t.company)}, ${qs(t.badge)},`);
  w(`   ${qs(t.quote)}, ${t.rating}, ${qs(t.avatar)}, ${i}, true);`);
});
w('');

/* -------------------------------------------------------------------- faq */
w('-- ----------------------------------------------------------------- faq');
FAQ_DATA.forEach((f, i) => {
  w('insert into public.faq (slug, question, answer, sort_order, is_visible) values');
  w(`  (${qs(f.id)}, ${qs(f.question)}, ${qs(f.answer)}, ${i}, true);`);
});
w('');

/* ------------------------------------------------------------------- blog */
w('-- ---------------------------------------------------------------- blog');
BLOG_POSTS.forEach((p, i) => {
  // BlogSection stores a display date like "Mar 12, 2026"; store it as a date.
  const iso = new Date(p.date + ' UTC');
  if (Number.isNaN(iso.getTime())) throw new Error('unparseable blog date: ' + p.date);
  const published = iso.toISOString().slice(0, 10);
  w('insert into public.blog_posts');
  w('  (slug, title, excerpt, category, read_time, published_at, image_url,');
  w('   author_name, author_role, author_avatar, introduction, key_points,');
  w('   deep_dive, conclusion, sort_order, is_visible) values');
  w(`  (${qs(p.id)}, ${qs(p.title)}, ${qs(p.excerpt)}, ${qs(p.category)}, ${qs(p.readTime)},`);
  w(`   ${qs(published)}, ${qs(p.image)},`);
  w(`   ${qs(p.author.name)}, ${qs(p.author.role)}, ${qs(p.author.avatar)},`);
  w(`   ${qs(p.content.introduction)}, ${arr(p.content.keyPoints)},`);
  w(`   ${qs(p.content.deepDive)}, ${qs(p.content.conclusion)}, ${i}, true);`);
  w('');
});

/* --------------------------------------------------------------- settings */
const SETTINGS = [
  ['contact_email', 'hanxcelaitech14@gmail.com'],
  ['contact_phone', '+91 8148637170'],
  ['contact_address', 'Bengaluru, Karnataka, India'],
  ['social_twitter', '#'],
  ['social_linkedin', '#'],
  ['social_github', '#'],
  ['marquee_enabled', 'true'],
];
w('-- ------------------------------------------------------------ settings');
w('insert into public.site_settings (key, value) values');
w(SETTINGS.map(([k, v]) => `  (${qs(k)}, ${qs(v)})`).join(',\n') + ';');
w('');
w('commit;');
w('');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, '001_seed.sql'), lines.join('\n'), 'utf8');

process.stderr.write(`\nWrote 001_seed.sql (${lines.length} lines)\n`);
process.stderr.write(
  `services=${SERVICES.length} solutions=${SOLUTIONS.length} projects=${PROJECTS.length} ` +
    `portfolio=${PORTFOLIO_DATA.length} team=${TEAM_MEMBERS.length} ` +
    `testimonials=${TESTIMONIALS.length} faq=${FAQ_DATA.length} blog=${BLOG_POSTS.length}\n`,
);

// Report the image filenames seeded, so the frontend resolver can be checked.
const imgs = new Set();
PROJECTS.forEach((p) => imgs.add(p.images.col2_tall));
Object.values(PROJECT_CASE_STUDIES).forEach((p) => {
  imgs.add(p.heroImage);
  p.galleryImages.forEach((g) => imgs.add(g));
});
TEAM_MEMBERS.forEach((m) => imgs.add(m.image));
BLOG_POSTS.forEach((p) => {
  imgs.add(p.image);
  imgs.add(p.author.avatar);
});
const local = [...imgs].filter((x) => x && !/^https?:\/\//.test(x));
process.stderr.write('\nLocal (non-URL) image values seeded:\n');
local.sort().forEach((x) => process.stderr.write('  ' + x + '\n'));
