import React, { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import {
  Badge,
  Button,
  ChipsField,
  Field,
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
  type Solution,
  type SolutionDetails,
} from '../lib/api';
import { slugify } from './ResourcePage';

/** Lucide component names rendered by the public SolutionsSection grid. */
const CARD_ICONS = ['Smartphone', 'Zap', 'Shield', 'Radio', 'Activity', 'Cog', 'Sparkles', 'Layers'] as const;
/** Semantic icons used by the public SolutionDetailModal. */
const DETAIL_ICONS = ['consumer', 'energy', 'defense', 'iot', 'medical', 'industrial'] as const;

const BLANK_DETAILS: SolutionDetails = {
  tagline: '',
  description: '',
  full_overview: '',
  icon: 'iot',
  key_capabilities: [],
  certifications: [],
  case_study_title: '',
  case_study_impact: '',
};

type Draft = Partial<Solution> & { details?: SolutionDetails };

export const SolutionsPage: React.FC = () => {
  const [items, setItems] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGet<Solution[]>('/solutions');
      setItems(data);
      setDraft((d) => {
        if (!d?.id) return d;
        const fresh = data.find((s) => s.id === d.id);
        return fresh ? { ...fresh, details: fresh.solution_details ?? { ...BLANK_DETAILS } } : d;
      });
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

  const patch = (p: Draft) => setDraft((d) => ({ ...(d ?? {}), ...p }));
  const patchDetails = (p: Partial<SolutionDetails>) =>
    setDraft((d) => (d ? { ...d, details: { ...(d.details ?? BLANK_DETAILS), ...p } } : d));

  const openNew = () =>
    setDraft({
      slug: '',
      tag: '',
      title: '',
      description: '',
      highlights: [],
      icon: 'Smartphone',
      sort_order: items.length,
      is_visible: true,
      details: { ...BLANK_DETAILS },
    });

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const body = {
        slug: draft.slug || slugify(draft.title ?? ''),
        tag: draft.tag,
        title: draft.title,
        description: draft.description,
        highlights: draft.highlights,
        icon: draft.icon,
        sort_order: draft.sort_order,
        is_visible: draft.is_visible,
      };

      const saved = draft.id
        ? await adminPatch<Solution>(`/solutions/${draft.id}`, body)
        : await adminPost<Solution>('/solutions', body);

      // solution_details is 1:1 and upserts on the parent id.
      if (draft.details) {
        await adminPatch(`/solutions/${saved.id}/details`, draft.details);
      }

      success(draft.id ? 'Solution saved.' : 'Solution created.');
      setDraft(null);
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const toggleVisible = async (s: Solution) => {
    try {
      await adminPatch(`/solutions/${s.id}`, { is_visible: !s.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const remove = async (s: Solution) => {
    if (!confirmDelete('this solution')) return;
    try {
      await adminDelete(`/solutions/${s.id}`);
      success('Deleted.');
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title="Solutions"
      actions={
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add Solution
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid gap-2.5">
          {items.map((s) => (
            <ItemRow
              key={s.id}
              lead={<Badge variant="category">{s.tag}</Badge>}
              title={s.title}
              subtitle={s.description.length > 100 ? `${s.description.slice(0, 100)}…` : s.description}
              badges={
                <Badge variant={s.is_visible ? 'visible' : 'hidden'}>
                  {s.is_visible ? 'Visible' : 'Hidden'}
                </Badge>
              }
              actions={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDraft({ ...s, details: s.solution_details ?? { ...BLANK_DETAILS } })}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void toggleVisible(s)}>
                    {s.is_visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {s.is_visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => void remove(s)}>
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
        size="lg"
        title={draft?.id ? 'Edit Solution' : 'Add Solution'}
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
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tag" value={draft.tag ?? ''} onChange={(v) => patch({ tag: v })} />
            <Field label="Title" value={draft.title ?? ''} onChange={(v) => patch({ title: v })} />
            <Field
              label="Slug"
              value={draft.slug ?? ''}
              placeholder="auto-generated from the title"
              onChange={(v) => patch({ slug: v })}
            />
            <Select
              label="Card Icon (grid)"
              options={CARD_ICONS}
              value={draft.icon ?? 'Smartphone'}
              onChange={(v) => patch({ icon: v })}
            />
            <TextArea
              className="sm:col-span-2"
              label="Description"
              rows={3}
              value={draft.description ?? ''}
              onChange={(v) => patch({ description: v })}
            />
            <ChipsField
              className="sm:col-span-2"
              label="Highlights"
              values={draft.highlights ?? []}
              onChange={(v) => patch({ highlights: v })}
            />
            <Field
              label="Sort Order"
              type="number"
              value={draft.sort_order ?? 0}
              onChange={(v) => patch({ sort_order: Number(v) })}
            />
            <div className="flex items-end">
              <Toggle
                label="Visible on the website"
                checked={draft.is_visible ?? true}
                onChange={(v) => patch({ is_visible: v })}
              />
            </div>

            {/* ------------------------------ detail modal content ------- */}
            <div className="sm:col-span-2 mt-2 border-t border-[var(--border)] pt-4">
              <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[var(--text-dim)]">
                Detail Modal
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Tagline"
                  value={draft.details?.tagline ?? ''}
                  onChange={(v) => patchDetails({ tagline: v })}
                />
                <Select
                  label="Detail Icon"
                  options={DETAIL_ICONS}
                  value={draft.details?.icon ?? 'iot'}
                  onChange={(v) => patchDetails({ icon: v })}
                />
                <TextArea
                  className="sm:col-span-2"
                  label="Detail Description"
                  rows={3}
                  value={draft.details?.description ?? ''}
                  onChange={(v) => patchDetails({ description: v })}
                />
                <TextArea
                  className="sm:col-span-2"
                  label="Full Overview"
                  rows={6}
                  value={draft.details?.full_overview ?? ''}
                  onChange={(v) => patchDetails({ full_overview: v })}
                />
                <ChipsField
                  className="sm:col-span-2"
                  label="Key Capabilities"
                  values={draft.details?.key_capabilities ?? []}
                  onChange={(v) => patchDetails({ key_capabilities: v })}
                />
                <ChipsField
                  className="sm:col-span-2"
                  label="Certifications"
                  values={draft.details?.certifications ?? []}
                  onChange={(v) => patchDetails({ certifications: v })}
                />
                <Field
                  label="Case Study Title"
                  value={draft.details?.case_study_title ?? ''}
                  onChange={(v) => patchDetails({ case_study_title: v })}
                />
                <Field
                  label="Case Study Impact"
                  value={draft.details?.case_study_impact ?? ''}
                  onChange={(v) => patchDetails({ case_study_impact: v })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <SubRowEditor
                label="Architecture Points"
                basePath={`/solutions/${draft.id}/architecture-points`}
                columns={[
                  { key: 'title', label: 'Title' },
                  { key: 'desc', label: 'Description', long: true },
                ]}
                rows={(draft.solution_architecture_points ?? []) as never}
                onChanged={load}
                disabled={!draft.id}
              />
            </div>
          </div>
        )}
      </Modal>

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

export default SolutionsPage;
