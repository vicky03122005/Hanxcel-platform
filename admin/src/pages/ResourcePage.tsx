import React, { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import {
  Badge,
  Button,
  ChipsField,
  EmptyState,
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
import { adminDelete, adminGet, adminPatch, adminPost } from '../lib/api';

/* ---------------------------------------------------------------- schema */

export type FieldSpec<T> =
  | { kind: 'text' | 'number' | 'url'; name: keyof T & string; label: string; placeholder?: string; full?: boolean }
  | { kind: 'textarea'; name: keyof T & string; label: string; rows?: number; full?: boolean }
  | { kind: 'select'; name: keyof T & string; label: string; options: readonly string[]; full?: boolean }
  | { kind: 'chips'; name: keyof T & string; label: string; full?: boolean }
  | { kind: 'toggle'; name: keyof T & string; label: string; full?: boolean }
  | { kind: 'image'; name: keyof T & string; label: string; full?: boolean };

interface BaseItem {
  id: string;
  is_visible?: boolean;
  sort_order?: number;
}

export interface ResourceConfig<T extends BaseItem> {
  title: string;
  endpoint: string;
  addLabel: string;
  /** Singular noun used in confirmation dialogs, e.g. "this team member". */
  noun: string;
  fields: FieldSpec<T>[];
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  blank: () => Partial<T>;
  rowTitle: (item: T) => React.ReactNode;
  rowSubtitle?: (item: T) => React.ReactNode;
  rowLead?: (item: T) => React.ReactNode;
  rowBadges?: (item: T) => React.ReactNode;
  /** Derive the slug from the draft when creating. */
  slugFrom?: (draft: Partial<T>) => string;
  /** Hide the add/delete controls (used for the fixed 01-06 services). */
  fixed?: boolean;
  /** Extra editor rendered inside the modal, below the standard fields. */
  extraEditor?: (draft: Partial<T>, patch: (p: Partial<T>) => void) => React.ReactNode;
  /** Runs after the main record saves — used for 1:1 detail tables. */
  afterSave?: (saved: T, draft: Partial<T>) => Promise<void>;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ------------------------------------------------------------- component */

export function ResourcePage<T extends BaseItem>({ config }: { config: ResourceConfig<T> }) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Partial<T> | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await adminGet<T[]>(config.endpoint));
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  const patch = (p: Partial<T>) => setDraft((d) => ({ ...(d ?? {}), ...p }));

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const body: Record<string, unknown> = { ...draft };
      delete body.id;

      if (!draft.id && config.slugFrom && !body.slug) {
        body.slug = config.slugFrom(draft);
      }

      const saved = draft.id
        ? await adminPatch<T>(`${config.endpoint}/${draft.id}`, body)
        : await adminPost<T>(config.endpoint, body);

      await config.afterSave?.(saved, draft);

      success(draft.id ? 'Saved.' : 'Created.');
      setDraft(null);
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const toggleVisible = async (item: T) => {
    try {
      await adminPatch(`${config.endpoint}/${item.id}`, { is_visible: !item.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const remove = async (item: T) => {
    if (!confirmDelete(config.noun)) return;
    try {
      await adminDelete(`${config.endpoint}/${item.id}`);
      success('Deleted.');
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title={config.title}
      actions={
        !config.fixed && (
          <Button onClick={() => setDraft(config.blank())}>
            <Plus className="h-4 w-4" />
            {config.addLabel}
          </Button>
        )
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : items.length === 0 ? (
        <EmptyState>Nothing here yet.</EmptyState>
      ) : (
        <div className="grid gap-2.5">
          {items.map((item) => (
            <ItemRow
              key={item.id}
              lead={config.rowLead?.(item)}
              title={config.rowTitle(item)}
              subtitle={config.rowSubtitle?.(item)}
              badges={
                <>
                  {config.rowBadges?.(item)}
                  {item.is_visible !== undefined && (
                    <Badge variant={item.is_visible ? 'visible' : 'hidden'}>
                      {item.is_visible ? 'Visible' : 'Hidden'}
                    </Badge>
                  )}
                </>
              }
              actions={
                <>
                  <Button variant="ghost" size="sm" onClick={() => setDraft(item)}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  {item.is_visible !== undefined && (
                    <Button variant="ghost" size="sm" onClick={() => void toggleVisible(item)}>
                      {item.is_visible ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                      {item.is_visible ? 'Hide' : 'Show'}
                    </Button>
                  )}
                  {!config.fixed && (
                    <Button variant="danger" size="sm" onClick={() => void remove(item)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={draft !== null}
        size={config.modalSize ?? 'md'}
        title={draft?.id ? `Edit ${config.noun}` : config.addLabel}
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
            {config.fields.map((f) => (
              <FieldRenderer key={f.name} spec={f} draft={draft} patch={patch} />
            ))}
            {config.extraEditor && (
              <div className="sm:col-span-2">{config.extraEditor(draft, patch)}</div>
            )}
          </div>
        )}
      </Modal>

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
}

/* --------------------------------------------------------------- fields */

export function FieldRenderer<T extends object>({
  spec,
  draft,
  patch,
}: {
  spec: FieldSpec<T>;
  draft: Partial<T>;
  patch: (p: Partial<T>) => void;
}) {
  const name = spec.name as string;
  const raw = (draft as Record<string, unknown>)[name];
  const span = spec.full ? 'sm:col-span-2' : '';
  const set = (v: unknown) => patch({ [name]: v } as unknown as Partial<T>);

  switch (spec.kind) {
    case 'textarea':
      return (
        <TextArea
          className={span}
          label={spec.label}
          rows={spec.rows ?? 4}
          value={(raw as string) ?? ''}
          onChange={set}
        />
      );

    case 'select':
      return (
        <Select
          className={span}
          label={spec.label}
          options={spec.options}
          value={(raw as string) ?? spec.options[0]}
          onChange={set}
        />
      );

    case 'chips':
      return (
        <ChipsField
          className={span}
          label={spec.label}
          values={(raw as string[]) ?? []}
          onChange={set}
        />
      );

    case 'toggle':
      return (
        <div className={span}>
          <Toggle label={spec.label} checked={Boolean(raw)} onChange={set} />
        </div>
      );

    case 'image':
      return (
        <div className={span}>
          <Field label={spec.label} value={(raw as string) ?? ''} onChange={set} placeholder="https://… or bundled filename" />
          <ImagePreview src={(raw as string) ?? ''} className="mt-2 h-20 w-20" />
        </div>
      );

    case 'number':
      return (
        <Field
          className={span}
          label={spec.label}
          type="number"
          value={(raw as number) ?? 0}
          onChange={(v) => set(Number(v))}
        />
      );

    default:
      return (
        <Field
          className={span}
          label={spec.label}
          value={(raw as string) ?? ''}
          placeholder={spec.placeholder}
          onChange={set}
        />
      );
  }
}
