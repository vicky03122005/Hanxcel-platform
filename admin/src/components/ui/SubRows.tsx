import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button, Label, confirmDelete } from './index';
import { adminDelete, adminPatch, adminPost } from '../../lib/api';

/**
 * Editor for a parent's child rows (disciplines, architecture points, technical
 * specs, key metrics). All four share the same shape: two text columns plus a
 * sort order, so one component covers every case.
 */
export interface SubRowColumn {
  key: string;
  label: string;
  /** Render as a textarea rather than a single-line input. */
  long?: boolean;
}

export interface SubRow {
  id: string;
  sort_order: number;
  [key: string]: unknown;
}

const INPUT =
  'w-full rounded-[8px] border-[1.5px] border-[var(--border)] bg-[var(--bg-tertiary)] ' +
  'px-2.5 py-1.5 text-[12.5px] text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--blue)]';

export const SubRowEditor: React.FC<{
  label: string;
  /** e.g. `/projects/<id>/architecture-points` */
  basePath: string;
  columns: SubRowColumn[];
  rows: SubRow[];
  onChanged: () => void | Promise<void>;
  /** Disabled until the parent record exists. */
  disabled?: boolean;
}> = ({ label, basePath, columns, rows, onChanged, disabled }) => {
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setErr('');
    try {
      await fn();
      await onChanged();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const add = () => {
    if (columns.some((c) => !draft[c.key]?.trim())) {
      setErr('Fill in every column before adding.');
      return;
    }
    void run(async () => {
      await adminPost(basePath, { ...draft, sort_order: sorted.length });
      setDraft({});
    });
  };

  const update = (row: SubRow, key: string, value: string) =>
    run(() => adminPatch(`${basePath}/${row.id}`, { [key]: value }));

  const remove = (row: SubRow) => {
    if (!confirmDelete('this entry')) return;
    void run(() => adminDelete(`${basePath}/${row.id}`));
  };

  if (disabled) {
    return (
      <div>
        <Label>{label}</Label>
        <p className="rounded-[10px] border border-dashed border-[var(--border-strong)] px-3 py-3 text-[12px] text-[var(--text-dimmer)]">
          Save this record first, then add {label.toLowerCase()}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Label>{label}</Label>

      {err && <p className="mb-2 text-[12px] text-[var(--red)]">{err}</p>}

      <div className="grid gap-2">
        {sorted.map((row) => (
          <div
            key={row.id}
            className="flex items-start gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] p-2"
          >
            {columns.map((c) => (
              <div key={c.key} className="min-w-0 flex-1">
                {c.long ? (
                  <textarea
                    className={`${INPUT} resize-y`}
                    rows={2}
                    defaultValue={String(row[c.key] ?? '')}
                    placeholder={c.label}
                    onBlur={(e) => {
                      if (e.target.value !== String(row[c.key] ?? '')) {
                        void update(row, c.key, e.target.value);
                      }
                    }}
                  />
                ) : (
                  <input
                    className={INPUT}
                    defaultValue={String(row[c.key] ?? '')}
                    placeholder={c.label}
                    onBlur={(e) => {
                      if (e.target.value !== String(row[c.key] ?? '')) {
                        void update(row, c.key, e.target.value);
                      }
                    }}
                  />
                )}
              </div>
            ))}
            <Button
              variant="danger"
              size="sm"
              disabled={busy}
              onClick={() => remove(row)}
              aria-label="Delete entry"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        {sorted.length === 0 && (
          <p className="text-[12px] text-[var(--text-dimmer)]">No {label.toLowerCase()} yet.</p>
        )}
      </div>

      {/* Add row */}
      <div className="mt-2 flex items-start gap-2 rounded-[10px] border border-dashed border-[var(--border-strong)] p-2">
        {columns.map((c) => (
          <input
            key={c.key}
            className={INPUT}
            value={draft[c.key] ?? ''}
            placeholder={c.label}
            onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.value }))}
          />
        ))}
        <Button variant="ghost" size="sm" disabled={busy} onClick={add}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      <p className="mt-1.5 text-[11px] text-[var(--text-dimmer)]">Edits save when you leave a field.</p>
    </div>
  );
};
