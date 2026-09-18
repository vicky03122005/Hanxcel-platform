import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, RefreshCw } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import {
  Badge,
  Button,
  Card,
  DataTable,
  Field,
  StatCard,
  Td,
  Toast,
  Tr,
  useToast,
} from '../components/ui';
import {
  adminGet,
  adminPatch,
  type AuditEntry,
  type ContactSubmission,
  type Setting,
  type Subscriber,
} from '../lib/api';

const fmtDateTime = (iso: string) => new Date(iso).toLocaleString();
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();

/* ===================================================================== */
/* Contact leads                                                         */
/* ===================================================================== */

const STATUSES = ['all', 'new', 'read', 'replied', 'archived'] as const;
type Status = ContactSubmission['status'];

const SOURCE_LABELS: Record<ContactSubmission['source'], string> = {
  contact_section: 'Contact form',
  contact_modal: 'Contact modal',
  faq_consultation: 'Consultation',
};

export const ContactLeadsPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const filter = (params.get('status') ?? 'all') as (typeof STATUSES)[number];

  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Always fetch everything so the summary counts stay accurate.
      setItems(await adminGet<ContactSubmission[]>('/contacts'));
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

  const counts = useMemo(() => {
    const c: Record<string, number> = { new: 0, read: 0, replied: 0, archived: 0 };
    for (const i of items) c[i.status] = (c[i.status] ?? 0) + 1;
    return c;
  }, [items]);

  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter);

  const setStatus = async (item: ContactSubmission, status: Status) => {
    try {
      await adminPatch(`/contacts/${item.id}`, { status });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status } : i)));
      success('Status updated.');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const displayName = (i: ContactSubmission) =>
    i.name || [i.first_name, i.last_name].filter(Boolean).join(' ') || '—';

  return (
    <Shell title="Contact Leads">
      <div className="mb-5 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
        <StatCard label="New" value={counts.new ?? 0} color="red" />
        <StatCard label="Read" value={counts.read ?? 0} color="green" />
        <StatCard label="Replied" value={counts.replied ?? 0} color="amber" />
        <StatCard label="Archived" value={counts.archived ?? 0} />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setParams(s === 'all' ? {} : { status: s })}
            className={`cursor-pointer rounded-[8px] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide transition-colors ${
              filter === s
                ? 'bg-[var(--tint-blue)] text-[var(--blue-light)]'
                : 'text-[var(--text-dim)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <DataTable headers={['Name', 'Email', 'Source / Type', 'Message', 'Submitted', 'Status']}>
          {visible.map((i) => (
            <React.Fragment key={i.id}>
              <Tr onClick={() => setExpanded(expanded === i.id ? null : i.id)}>
                <Td className="whitespace-nowrap font-semibold">{displayName(i)}</Td>
                <Td className="whitespace-nowrap text-[var(--text-dim)]">{i.email}</Td>
                <Td className="whitespace-nowrap text-[var(--text-dim)]">
                  {SOURCE_LABELS[i.source]}
                  {i.service || i.project_type || i.topic ? (
                    <span className="block text-[11px] text-[var(--text-dimmer)]">
                      {i.service || i.project_type || i.topic}
                    </span>
                  ) : null}
                </Td>
                <Td className="max-w-[280px] text-[var(--text-dim)]">
                  {i.message.length > 70 ? `${i.message.slice(0, 70)}…` : i.message}
                </Td>
                <Td className="whitespace-nowrap text-[var(--text-dim)]">{fmtDate(i.submitted_at)}</Td>
                <Td>
                  <select
                    value={i.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => void setStatus(i, e.target.value as Status)}
                    className="cursor-pointer rounded-[8px] border-[1.5px] border-[var(--border)] bg-[var(--bg-tertiary)] px-2 py-1 text-[12px] text-[var(--text-primary)] outline-none focus:border-[var(--blue)]"
                  >
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="replied">replied</option>
                    <option value="archived">archived</option>
                  </select>
                </Td>
              </Tr>

              {expanded === i.id && (
                <tr className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <td colSpan={6} className="px-4 py-4">
                    <div className="grid gap-3 text-[12.5px] sm:grid-cols-2">
                      <Detail label="Name" value={displayName(i)} />
                      <Detail label="Email" value={i.email} />
                      <Detail label="Company" value={i.company} />
                      <Detail label="Phone" value={i.phone} />
                      <Detail label="Service" value={i.service} />
                      <Detail label="Project Type" value={i.project_type} />
                      <Detail label="Budget" value={i.budget} />
                      <Detail label="Topic" value={i.topic} />
                      <Detail label="Timeline" value={i.timeline} />
                      <Detail label="Submitted" value={fmtDateTime(i.submitted_at)} />
                    </div>
                    <div className="mt-3 border-t border-[var(--border)] pt-3">
                      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--text-dimmer)]">
                        Message
                      </div>
                      <p className="whitespace-pre-wrap text-[13px] leading-relaxed">{i.message}</p>
                    </div>
                    <a href={`mailto:${i.email}`} className="mt-3 inline-block">
                      <Button variant="ghost" size="sm">
                        Reply by email
                      </Button>
                    </a>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </DataTable>
      )}

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

const Detail: React.FC<{ label: string; value?: string | null }> = ({ label, value }) =>
  value ? (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--text-dimmer)]">{label}: </span>
      <span>{value}</span>
    </div>
  ) : null;

/* ===================================================================== */
/* Newsletter                                                            */
/* ===================================================================== */

export const NewsletterPage: React.FC = () => {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await adminGet<Subscriber[]>('/newsletter'));
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

  const active = items.filter((i) => i.is_active).length;

  const toggle = async (s: Subscriber) => {
    try {
      await adminPatch(`/newsletter/${s.id}`, { is_active: !s.is_active });
      setItems((prev) => prev.map((i) => (i.id === s.id ? { ...i, is_active: !i.is_active } : i)));
      success('Updated.');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const exportCsv = () => {
    const rows = items.filter((i) => i.is_active);
    const csv = ['email,subscribed_at', ...rows.map((r) => `${r.email},${r.subscribed_at}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanxcel-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Shell
      title="Newsletter"
      actions={
        <Button variant="ghost" onClick={exportCsv} disabled={active === 0}>
          <Download className="h-4 w-4" />
          Export Active CSV
        </Button>
      }
    >
      <div className="mb-5 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
        <StatCard label="Total" value={items.length} />
        <StatCard label="Active" value={active} color="green" />
        <StatCard label="Unsubscribed" value={items.length - active} />
      </div>

      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <DataTable headers={['Email', 'Subscribed', 'Status', 'Actions']}>
          {items.map((s) => (
            <Tr key={s.id}>
              <Td className="font-semibold">{s.email}</Td>
              <Td className="whitespace-nowrap text-[var(--text-dim)]">{fmtDate(s.subscribed_at)}</Td>
              <Td>
                <Badge variant={s.is_active ? 'visible' : 'archived'}>
                  {s.is_active ? 'Active' : 'Unsubscribed'}
                </Badge>
              </Td>
              <Td>
                <Button variant="ghost" size="sm" onClick={() => void toggle(s)}>
                  {s.is_active ? 'Unsubscribe' : 'Re-subscribe'}
                </Button>
              </Td>
            </Tr>
          ))}
        </DataTable>
      )}

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

/* ===================================================================== */
/* Site settings                                                         */
/* ===================================================================== */

const CONTACT_KEYS = [
  ['contact_email', 'Contact Email'],
  ['contact_phone', 'Contact Phone'],
  ['contact_address', 'Office Address'],
] as const;

const SOCIAL_KEYS = [
  ['social_twitter', 'Twitter / X'],
  ['social_linkedin', 'LinkedIn'],
  ['social_github', 'GitHub'],
] as const;

export const SettingsPage: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  useEffect(() => {
    adminGet<Setting[]>('/settings')
      .then((rows) => {
        const map: Record<string, string> = {};
        for (const r of rows) map[r.key] = r.value ?? '';
        setValues(map);
      })
      .catch((e) => error(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setBusy(true);
    try {
      const keys = [...CONTACT_KEYS, ...SOCIAL_KEYS].map(([k]) => k);
      await Promise.all(keys.map((k) => adminPatch(`/settings/${k}`, { value: values[k] ?? '' })));
      success('Settings saved.');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell
      title="Site Settings"
      actions={
        <Button onClick={() => void save()} disabled={loading || busy}>
          {busy ? 'Saving…' : 'Save All Settings'}
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid max-w-4xl gap-5 lg:grid-cols-2">
          <Card title="Contact Information">
            <div className="grid gap-4">
              {CONTACT_KEYS.map(([k, label]) => (
                <Field key={k} label={label} value={values[k] ?? ''} onChange={(v) => set(k, v)} />
              ))}
            </div>
          </Card>
          <Card title="Social Links">
            <div className="grid gap-4">
              {SOCIAL_KEYS.map(([k, label]) => (
                <Field key={k} label={label} value={values[k] ?? ''} onChange={(v) => set(k, v)} />
              ))}
            </div>
          </Card>
        </div>
      )}

      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

/* ===================================================================== */
/* Audit log                                                             */
/* ===================================================================== */

export const AuditLogPage: React.FC = () => {
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, clear, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await adminGet<AuditEntry[]>('/audit?limit=100'));
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

  return (
    <Shell
      title="Audit Log"
      actions={
        <Button variant="ghost" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <DataTable headers={['Timestamp', 'Admin', 'Table', 'Action', 'Record']}>
          {items.map((a) => (
            <Tr key={a.id}>
              <Td className="whitespace-nowrap text-[var(--text-dim)]">{fmtDateTime(a.created_at)}</Td>
              <Td>{a.admin_profiles?.full_name ?? '—'}</Td>
              <Td className="font-semibold">{a.table_name}</Td>
              <Td>
                <Badge variant={a.action}>{a.action}</Badge>
              </Td>
              <Td className="font-mono text-[11px] text-[var(--text-dimmer)]">
                {a.record_id ? a.record_id.slice(0, 8) : '—'}
              </Td>
            </Tr>
          ))}
        </DataTable>
      )}
      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};
