import React, { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import {
  Badge,
  Button,
  ChipsField,
  Field,
  ImagePreview,
  ItemRow,
  Modal,
  Select,
  TextArea,
  Toast,
  Toggle,
  confirmDelete,
  useToast,
} from '../components/ui';
import { SubRowEditor } from '../components/ui/SubRows';
import {
  adminDelete,
  adminGet,
  adminPatch,
  adminPost,
  type PortfolioItem,
  type Project,
} from '../lib/api';
import { slugify } from './ResourcePage';

/* ------------------------------------------------------------------ tabs */

const Tabs: React.FC<{
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}> = ({ tabs, active, onChange }) => (
  <div className="mb-5 flex flex-wrap gap-1.5 border-b border-[var(--border)] pb-2">
    {tabs.map((t) => (
      <button
        key={t}
        type="button"
        onClick={() => onChange(t)}
        className={`cursor-pointer rounded-[8px] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide transition-colors ${
          active === t
            ? 'bg-[var(--tint-blue)] text-[var(--blue-light)]'
            : 'text-[var(--text-dim)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

/** Repeatable list of plain string values (gallery image URLs). */
const UrlListField: React.FC<{
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}> = ({ label, values, onChange }) => (
  <div>
    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[var(--text-dim)]">
      {label}
    </span>
    <div className="grid gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
            value={v}
            placeholder="https://… or bundled filename"
            onChange={(e) => onChange(values.map((x, j) => (j === i ? e.target.value : x)))}
          />
          <ImagePreview src={v} className="h-10 w-10 shrink-0" />
          <Button
            variant="danger"
            size="sm"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
            aria-label="Remove image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      {values.length === 0 && <p className="text-[12px] text-[var(--text-dimmer)]">No images yet.</p>}
    </div>
    <Button variant="ghost" size="sm" className="mt-2" onClick={() => onChange([...values, ''])}>
      <Plus className="h-3.5 w-3.5" />
      Add Image
    </Button>
  </div>
);

/* ===================================================================== */
/* Projects                                                              */
/* ===================================================================== */

const PROJECT_TABS = ['Overview', 'Images', 'Case Study', 'Sub-Data', 'Settings'];

export const ProjectsPage: React.FC = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Partial<Project> | null>(null);
  const [tab, setTab] = useState(PROJECT_TABS[0]);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGet<Project[]>('/projects');
      setItems(data);
      setDraft((d) => (d?.id ? (data.find((p) => p.id === d.id) ?? d) : d));
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const patch = (p: Partial<Project>) => setDraft((d) => ({ ...(d ?? {}), ...p }));

  const openNew = () => {
    setTab(PROJECT_TABS[0]);
    setDraft({
      slug: '',
      number: String(items.length + 1).padStart(2, '0'),
      name: '',
      button_text: 'VIEW CASE STUDY',
      category: '',
      title: '',
      client: '',
      timeline: '',
      tagline: '',
      overview: '',
      hero_image: '',
      gallery_images: [],
      col1_top_title: '',
      col1_top_subtitle: '',
      col1_bottom_text: '',
      challenge: '',
      solution: '',
      tools_and_tech: [],
      link: '#',
      sort_order: items.length,
      is_visible: true,
    });
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const body: Record<string, unknown> = {
        slug: draft.slug || slugify(draft.title ?? draft.name ?? ''),
        number: draft.number,
        name: draft.name,
        button_text: draft.button_text,
        category: draft.category,
        title: draft.title,
        client: draft.client,
        timeline: draft.timeline,
        tagline: draft.tagline,
        overview: draft.overview,
        hero_image: draft.hero_image,
        gallery_images: (draft.gallery_images ?? []).filter(Boolean),
        col1_top_title: draft.col1_top_title,
        col1_top_subtitle: draft.col1_top_subtitle,
        col1_bottom_text: draft.col1_bottom_text,
        challenge: draft.challenge,
        solution: draft.solution,
        tools_and_tech: draft.tools_and_tech,
        link: draft.link,
        sort_order: draft.sort_order,
        is_visible: draft.is_visible,
      };

      if (draft.id) await adminPatch(`/projects/${draft.id}`, body);
      else await adminPost('/projects', body);

      success(draft.id ? 'Project saved.' : 'Project created.');
      setDraft(null);
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p: Project) => {
    if (!confirmDelete('this project')) return;
    try {
      await adminDelete(`/projects/${p.id}`);
      success('Deleted.');
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const toggleVisible = async (p: Project) => {
    try {
      await adminPatch(`/projects/${p.id}`, { is_visible: !p.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title="Projects"
      actions={
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid gap-2.5">
          {items.map((p) => (
            <ItemRow
              key={p.id}
              lead={<Badge variant="category">{p.number}</Badge>}
              title={p.title}
              subtitle={`${p.client} · ${p.timeline}`}
              badges={
                <Badge variant={p.is_visible ? 'visible' : 'hidden'}>
                  {p.is_visible ? 'Visible' : 'Hidden'}
                </Badge>
              }
              actions={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTab(PROJECT_TABS[0]);
                      setDraft(p);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void toggleVisible(p)}>
                    {p.is_visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {p.is_visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => void remove(p)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={draft !== null}
        size="xl"
        title={draft?.id ? 'Edit Project' : 'Add Project'}
        onClose={() => setDraft(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </Button>
          </>
        }
      >
        {draft && (
          <>
            <Tabs tabs={PROJECT_TABS} active={tab} onChange={setTab} />

            {tab === 'Overview' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Slug" value={draft.slug ?? ''} placeholder="auto from title" onChange={(v) => patch({ slug: v })} />
                <Field label="Number" value={draft.number ?? ''} onChange={(v) => patch({ number: v })} />
                <Field label="Name (card)" value={draft.name ?? ''} onChange={(v) => patch({ name: v })} />
                <Field label="Button Text" value={draft.button_text ?? ''} onChange={(v) => patch({ button_text: v })} />
                <Field label="Category" value={draft.category ?? ''} onChange={(v) => patch({ category: v })} />
                <Field label="Title (case study)" value={draft.title ?? ''} onChange={(v) => patch({ title: v })} />
                <Field label="Client" value={draft.client ?? ''} onChange={(v) => patch({ client: v })} />
                <Field label="Timeline" value={draft.timeline ?? ''} onChange={(v) => patch({ timeline: v })} />
                <Field className="sm:col-span-2" label="Tagline" value={draft.tagline ?? ''} onChange={(v) => patch({ tagline: v })} />
                <TextArea className="sm:col-span-2" label="Overview" rows={5} value={draft.overview ?? ''} onChange={(v) => patch({ overview: v })} />
              </div>
            )}

            {tab === 'Images' && (
              <div className="grid gap-4">
                <div>
                  <Field label="Hero Image" value={draft.hero_image ?? ''} onChange={(v) => patch({ hero_image: v })} placeholder="https://… or bundled filename" />
                  <ImagePreview src={draft.hero_image ?? ''} className="mt-2 h-24 w-32" />
                </div>
                <UrlListField
                  label="Gallery Images"
                  values={draft.gallery_images ?? []}
                  onChange={(v) => patch({ gallery_images: v })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Col1 Top Title" value={draft.col1_top_title ?? ''} onChange={(v) => patch({ col1_top_title: v })} />
                  <Field label="Col1 Top Subtitle" value={draft.col1_top_subtitle ?? ''} onChange={(v) => patch({ col1_top_subtitle: v })} />
                  <Field className="sm:col-span-2" label="Col1 Bottom Text" value={draft.col1_bottom_text ?? ''} onChange={(v) => patch({ col1_bottom_text: v })} />
                </div>
              </div>
            )}

            {tab === 'Case Study' && (
              <div className="grid gap-4">
                <TextArea label="Challenge" rows={6} value={draft.challenge ?? ''} onChange={(v) => patch({ challenge: v })} />
                <TextArea label="Solution" rows={6} value={draft.solution ?? ''} onChange={(v) => patch({ solution: v })} />
                <ChipsField label="Tools & Tech" values={draft.tools_and_tech ?? []} onChange={(v) => patch({ tools_and_tech: v })} />
                <Field label="Link" value={draft.link ?? '#'} onChange={(v) => patch({ link: v })} />
              </div>
            )}

            {tab === 'Sub-Data' && (
              <div className="grid gap-6">
                <SubRowEditor
                  label="Architecture Points"
                  basePath={`/projects/${draft.id}/architecture-points`}
                  columns={[{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', long: true }]}
                  rows={(draft.project_architecture_points ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
                <SubRowEditor
                  label="Technical Specs"
                  basePath={`/projects/${draft.id}/technical-specs`}
                  columns={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]}
                  rows={(draft.project_technical_specs ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
                <SubRowEditor
                  label="Key Metrics"
                  basePath={`/projects/${draft.id}/key-metrics`}
                  columns={[{ key: 'metric', label: 'Metric' }, { key: 'label', label: 'Label' }]}
                  rows={(draft.project_key_metrics ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
              </div>
            )}

            {tab === 'Settings' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Sort Order" type="number" value={draft.sort_order ?? 0} onChange={(v) => patch({ sort_order: Number(v) })} />
                <div className="flex items-end">
                  <Toggle label="Visible on the website" checked={draft.is_visible ?? true} onChange={(v) => patch({ is_visible: v })} />
                </div>
              </div>
            )}
          </>
        )}
      </Modal>

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

/* ===================================================================== */
/* Portfolio                                                             */
/* ===================================================================== */

const PORTFOLIO_TABS = ['Overview', 'Details', 'Case Study', 'Sub-Data', 'Settings'];
const PORTFOLIO_ICONS = ['iot', 'wearable', 'energy', 'ai'] as const;

export const PortfolioPage: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Partial<PortfolioItem> | null>(null);
  const [tab, setTab] = useState(PORTFOLIO_TABS[0]);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGet<PortfolioItem[]>('/portfolio');
      setItems(data);
      setDraft((d) => (d?.id ? (data.find((p) => p.id === d.id) ?? d) : d));
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const patch = (p: Partial<PortfolioItem>) => setDraft((d) => ({ ...(d ?? {}), ...p }));

  const openNew = () => {
    setTab(PORTFOLIO_TABS[0]);
    setDraft({
      slug: '',
      year: String(new Date().getFullYear()),
      category: '',
      title: '',
      client: '',
      timeline: '',
      tagline: '',
      overview: '',
      icon: 'iot',
      scope: [],
      description: '',
      metric: '',
      metric_label: '',
      challenge: '',
      solution: '',
      tools_and_tech: [],
      deliverables: [],
      link: '#',
      sort_order: items.length,
      is_visible: true,
    });
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const body: Record<string, unknown> = {
        slug: draft.slug || slugify(draft.title ?? ''),
        year: draft.year,
        category: draft.category,
        title: draft.title,
        client: draft.client,
        timeline: draft.timeline,
        tagline: draft.tagline,
        overview: draft.overview,
        icon: draft.icon,
        scope: draft.scope,
        description: draft.description,
        metric: draft.metric,
        metric_label: draft.metric_label,
        challenge: draft.challenge,
        solution: draft.solution,
        tools_and_tech: draft.tools_and_tech,
        deliverables: draft.deliverables,
        link: draft.link,
        sort_order: draft.sort_order,
        is_visible: draft.is_visible,
      };

      if (draft.id) await adminPatch(`/portfolio/${draft.id}`, body);
      else await adminPost('/portfolio', body);

      success(draft.id ? 'Portfolio item saved.' : 'Portfolio item created.');
      setDraft(null);
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p: PortfolioItem) => {
    if (!confirmDelete('this portfolio item')) return;
    try {
      await adminDelete(`/portfolio/${p.id}`);
      success('Deleted.');
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const toggleVisible = async (p: PortfolioItem) => {
    try {
      await adminPatch(`/portfolio/${p.id}`, { is_visible: !p.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title="Portfolio"
      actions={
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add Portfolio Item
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid gap-2.5">
          {items.map((p) => (
            <ItemRow
              key={p.id}
              title={p.title}
              subtitle={`${p.client} · ${p.year}`}
              badges={
                <>
                  <Badge variant="category">{p.category}</Badge>
                  <Badge variant={p.is_visible ? 'visible' : 'hidden'}>
                    {p.is_visible ? 'Visible' : 'Hidden'}
                  </Badge>
                </>
              }
              actions={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTab(PORTFOLIO_TABS[0]);
                      setDraft(p);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void toggleVisible(p)}>
                    {p.is_visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {p.is_visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => void remove(p)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={draft !== null}
        size="xl"
        title={draft?.id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
        onClose={() => setDraft(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </Button>
          </>
        }
      >
        {draft && (
          <>
            <Tabs tabs={PORTFOLIO_TABS} active={tab} onChange={setTab} />

            {tab === 'Overview' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Slug" value={draft.slug ?? ''} placeholder="auto from title" onChange={(v) => patch({ slug: v })} />
                <Field label="Year" value={draft.year ?? ''} onChange={(v) => patch({ year: v })} />
                <Field label="Category" value={draft.category ?? ''} onChange={(v) => patch({ category: v })} />
                <Select label="Icon" options={PORTFOLIO_ICONS} value={draft.icon ?? 'iot'} onChange={(v) => patch({ icon: v })} />
                <Field label="Title" value={draft.title ?? ''} onChange={(v) => patch({ title: v })} />
                <Field label="Client" value={draft.client ?? ''} onChange={(v) => patch({ client: v })} />
                <Field label="Timeline" value={draft.timeline ?? ''} onChange={(v) => patch({ timeline: v })} />
                <Field label="Tagline" value={draft.tagline ?? ''} onChange={(v) => patch({ tagline: v })} />
                <TextArea className="sm:col-span-2" label="Overview" rows={5} value={draft.overview ?? ''} onChange={(v) => patch({ overview: v })} />
              </div>
            )}

            {tab === 'Details' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <ChipsField className="sm:col-span-2" label="Scope" values={draft.scope ?? []} onChange={(v) => patch({ scope: v })} />
                <TextArea className="sm:col-span-2" label="Description" rows={4} value={draft.description ?? ''} onChange={(v) => patch({ description: v })} />
                <Field label="Metric" value={draft.metric ?? ''} onChange={(v) => patch({ metric: v })} />
                <Field label="Metric Label" value={draft.metric_label ?? ''} onChange={(v) => patch({ metric_label: v })} />
                <Field className="sm:col-span-2" label="Link" value={draft.link ?? '#'} onChange={(v) => patch({ link: v })} />
              </div>
            )}

            {tab === 'Case Study' && (
              <div className="grid gap-4">
                <TextArea label="Challenge" rows={6} value={draft.challenge ?? ''} onChange={(v) => patch({ challenge: v })} />
                <TextArea label="Solution" rows={6} value={draft.solution ?? ''} onChange={(v) => patch({ solution: v })} />
                <ChipsField label="Tools & Tech" values={draft.tools_and_tech ?? []} onChange={(v) => patch({ tools_and_tech: v })} />
                <ChipsField label="Deliverables" values={draft.deliverables ?? []} onChange={(v) => patch({ deliverables: v })} />
              </div>
            )}

            {tab === 'Sub-Data' && (
              <div className="grid gap-6">
                <SubRowEditor
                  label="Architecture Points"
                  basePath={`/portfolio/${draft.id}/architecture-points`}
                  columns={[{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', long: true }]}
                  rows={(draft.portfolio_architecture_points ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
                <SubRowEditor
                  label="Technical Specs"
                  basePath={`/portfolio/${draft.id}/technical-specs`}
                  columns={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]}
                  rows={(draft.portfolio_technical_specs ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
                <SubRowEditor
                  label="Key Metrics"
                  basePath={`/portfolio/${draft.id}/key-metrics`}
                  columns={[{ key: 'metric', label: 'Metric' }, { key: 'label', label: 'Label' }]}
                  rows={(draft.portfolio_key_metrics ?? []) as never}
                  onChanged={load}
                  disabled={!draft.id}
                />
              </div>
            )}

            {tab === 'Settings' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Sort Order" type="number" value={draft.sort_order ?? 0} onChange={(v) => patch({ sort_order: Number(v) })} />
                <div className="flex items-end">
                  <Toggle label="Visible on the website" checked={draft.is_visible ?? true} onChange={(v) => patch({ is_visible: v })} />
                </div>
              </div>
            )}
          </>
        )}
      </Modal>

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};
