import React, { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil } from 'lucide-react';
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
  useToast,
} from '../components/ui';
import { SubRowEditor } from '../components/ui/SubRows';
import { adminGet, adminPatch, type Service } from '../lib/api';

/** Matches the icon union in the public site's ServiceDetailModal. */
const SERVICE_ICONS = ['software', 'web', 'mobile', 'ai', 'cloud', 'uiux'] as const;

export const ServicesPage: React.FC = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGet<Service[]>('/services');
      setItems(data);
      // Keep an open modal in sync after a discipline change.
      setDraft((d) => (d ? (data.find((s) => s.id === d.id) ?? d) : d));
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

  const patch = (p: Partial<Service>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      await adminPatch(`/services/${draft.id}`, {
        name: draft.name,
        description: draft.description,
        tagline: draft.tagline,
        full_overview: draft.full_overview,
        icon: draft.icon,
        deliverables: draft.deliverables,
        tech_stack: draft.tech_stack,
        industry_applications: draft.industry_applications,
        sort_order: draft.sort_order,
        is_visible: draft.is_visible,
      });
      success('Service saved.');
      setDraft(null);
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const toggleVisible = async (s: Service) => {
    try {
      await adminPatch(`/services/${s.id}`, { is_visible: !s.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell title="Services">
      <p className="mb-4 text-[12.5px] text-[var(--text-dim)]">
        Services are a fixed set of six (01–06). They can be edited and hidden, but not added or
        deleted.
      </p>

      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid gap-2.5">
          {items.map((s) => (
            <ItemRow
              key={s.id}
              lead={<Badge variant="category">{s.number}</Badge>}
              title={s.name}
              subtitle={s.description.length > 110 ? `${s.description.slice(0, 110)}…` : s.description}
              badges={
                <Badge variant={s.is_visible ? 'visible' : 'hidden'}>
                  {s.is_visible ? 'Visible' : 'Hidden'}
                </Badge>
              }
              actions={
                <>
                  <Button variant="ghost" size="sm" onClick={() => setDraft(s)}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void toggleVisible(s)}>
                    {s.is_visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {s.is_visible ? 'Hide' : 'Show'}
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
        title={draft ? `Edit Service ${draft.number}` : 'Edit Service'}
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
            <Field label="Service Name" value={draft.name} onChange={(v) => patch({ name: v })} />
            <Select
              label="Icon"
              options={SERVICE_ICONS}
              value={draft.icon}
              onChange={(v) => patch({ icon: v })}
            />
            <TextArea
              className="sm:col-span-2"
              label="Short Description (card text)"
              rows={3}
              value={draft.description}
              onChange={(v) => patch({ description: v })}
            />
            <Field
              className="sm:col-span-2"
              label="Tagline (modal subheading)"
              value={draft.tagline}
              onChange={(v) => patch({ tagline: v })}
            />
            <TextArea
              className="sm:col-span-2"
              label="Full Overview (modal body)"
              rows={6}
              value={draft.full_overview}
              onChange={(v) => patch({ full_overview: v })}
            />
            <ChipsField
              className="sm:col-span-2"
              label="Deliverables"
              values={draft.deliverables}
              onChange={(v) => patch({ deliverables: v })}
            />
            <ChipsField
              className="sm:col-span-2"
              label="Tech Stack"
              values={draft.tech_stack}
              onChange={(v) => patch({ tech_stack: v })}
            />
            <ChipsField
              className="sm:col-span-2"
              label="Industry Applications"
              values={draft.industry_applications}
              onChange={(v) => patch({ industry_applications: v })}
            />

            <div className="sm:col-span-2">
              <SubRowEditor
                label="Disciplines"
                basePath={`/services/${draft.id}/disciplines`}
                columns={[
                  { key: 'title', label: 'Title' },
                  { key: 'desc', label: 'Description', long: true },
                ]}
                rows={(draft.service_disciplines ?? []) as never}
                onChanged={load}
              />
            </div>

            <div className="sm:col-span-2">
              <Toggle
                label="Visible on the website"
                checked={draft.is_visible}
                onChange={(v) => patch({ is_visible: v })}
              />
            </div>
          </div>
        )}
      </Modal>

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

export default ServicesPage;
