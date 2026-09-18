import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';

/* ========================================================================= */
/* Button                                                                    */
/* ========================================================================= */

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'text-[12px] px-3 py-1.5',
  md: 'text-[13px] px-4 py-2',
  lg: 'text-[14px] px-5 py-2.5',
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
> = ({ variant = 'primary', size = 'md', className = '', style, children, ...rest }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[22px] font-semibold ' +
    'transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed ' +
    'whitespace-nowrap cursor-pointer border';

  const variants: Record<ButtonVariant, string> = {
    primary: 'text-white border-transparent hover:brightness-110',
    ghost:
      'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-strong)] hover:bg-[var(--bg-hover)]',
    danger:
      'bg-[var(--tint-red)] text-[var(--red)] border-[var(--tint-red-edge)] hover:bg-[var(--tint-red-hover)]',
    success:
      'bg-[var(--tint-green)] text-[var(--green)] border-[var(--tint-green-edge)] hover:bg-[var(--tint-green-track)]',
  };

  const primaryStyle =
    variant === 'primary'
      ? {
          background: 'var(--grad-primary)',
          boxShadow: 'var(--shadow-primary)',
        }
      : undefined;

  return (
    <button
      className={`${base} ${BUTTON_SIZES[size]} ${variants[variant]} ${className}`}
      style={{ ...primaryStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
};

/* ========================================================================= */
/* Badge                                                                     */
/* ========================================================================= */

export type BadgeVariant =
  | 'new'
  | 'read'
  | 'replied'
  | 'archived'
  | 'visible'
  | 'hidden'
  | 'category'
  | 'insert'
  | 'update'
  | 'delete';

const BADGE_STYLES: Record<BadgeVariant, string> = {
  new: 'bg-[var(--tint-blue-strong)] text-[var(--blue-light)] border-[var(--tint-blue-border)]',
  read: 'bg-[var(--tint-green)] text-[var(--green)] border-[var(--tint-green-border)]',
  replied: 'bg-[var(--tint-amber)] text-[var(--amber)] border-[var(--tint-amber-border)]',
  archived: 'bg-[var(--tint-grey)] text-[var(--text-dim)] border-[var(--tint-grey-border)]',
  visible: 'bg-[var(--tint-green)] text-[var(--green)] border-[var(--tint-green-border)]',
  hidden: 'bg-[var(--tint-grey)] text-[var(--text-dim)] border-[var(--tint-grey-border)]',
  category: 'bg-[var(--tint-blue-strong)] text-[var(--blue-light)] border-[var(--tint-blue-border)]',
  insert: 'bg-[var(--tint-green)] text-[var(--green)] border-[var(--tint-green-border)]',
  update: 'bg-[var(--tint-amber)] text-[var(--amber)] border-[var(--tint-amber-border)]',
  delete: 'bg-[var(--tint-grey)] text-[var(--text-dim)] border-[var(--tint-grey-border)]',
};

export const Badge: React.FC<{ variant: BadgeVariant; children: React.ReactNode }> = ({
  variant,
  children,
}) => (
  <span
    className={`inline-block rounded-full border px-[10px] py-[3px] text-[11px] font-bold tracking-wide ${BADGE_STYLES[variant]}`}
  >
    {children}
  </span>
);

/* ========================================================================= */
/* Card                                                                      */
/* ========================================================================= */

export const Card: React.FC<{
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}> = ({ title, action, className = '', children }) => (
  <section
    className={`rounded-[18px] border border-[var(--border)] bg-[var(--bg-card)] ${className}`}
  >
    {(title || action) && (
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
        {title && <h2 className="text-[15px] font-bold tracking-tight">{title}</h2>}
        {action}
      </header>
    )}
    <div className="p-5">{children}</div>
  </section>
);

/* ========================================================================= */
/* StatCard                                                                  */
/* ========================================================================= */

const STAT_COLORS = {
  blue: 'var(--blue-light)',
  green: 'var(--green)',
  amber: 'var(--amber)',
  red: 'var(--red)',
} as const;

export const StatCard: React.FC<{
  label: string;
  value: number | string;
  color?: keyof typeof STAT_COLORS;
  onClick?: () => void;
}> = ({ label, value, color = 'blue', onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-[18px] border border-[var(--border)] bg-[var(--bg-card)] px-[22px] py-5 ${
      onClick ? 'cursor-pointer transition-colors hover:bg-[var(--bg-tertiary)]' : ''
    }`}
  >
    <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-dimmer)]">{label}</div>
    <div
      className="mt-1 text-[36px] font-black leading-none tracking-tight"
      style={{ color: STAT_COLORS[color] }}
    >
      {value}
    </div>
  </div>
);

/* ========================================================================= */
/* Modal                                                                     */
/* ========================================================================= */

const MODAL_WIDTHS = { sm: 480, md: 640, lg: 760, xl: 900 } as const;

export const Modal: React.FC<{
  open: boolean;
  title: string;
  size?: keyof typeof MODAL_WIDTHS;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}> = ({ open, title, size = 'md', onClose, footer, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 backdrop-blur-xl sm:p-8"
      style={{ background: 'var(--overlay)' }}
      onClick={onClose}
    >
      <div
        className="my-auto w-full rounded-[26px] border border-[var(--border-strong)] bg-[var(--bg-card)]"
        style={{ maxWidth: MODAL_WIDTHS[size], boxShadow: 'var(--shadow-modal)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-[17px] font-bold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-1.5 text-[var(--text-dim)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="max-h-[68vh] overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <footer className="flex items-center justify-end gap-2.5 border-t border-[var(--border)] px-6 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

/* ========================================================================= */
/* Toast                                                                     */
/* ========================================================================= */

export interface ToastState {
  message: string;
  kind: 'success' | 'error';
}

export const Toast: React.FC<{ toast: ToastState | null; onDone: () => void }> = ({
  toast,
  onDone,
}) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  if (!toast) return null;

  return (
    <div
      className="hx-slide-up fixed bottom-6 right-6 z-[60] max-w-sm rounded-[14px] border border-[var(--border-strong)] bg-[var(--bg-tertiary)] px-4 py-3 text-[13px]"
      style={{
        borderLeft: `3px solid ${toast.kind === 'success' ? 'var(--green)' : 'var(--red)'}`,
        boxShadow: 'var(--shadow-toast)',
      }}
      role="status"
    >
      {toast.message}
    </div>
  );
};

/** Toast state plus the two helpers every page uses. */
export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  return {
    toast,
    clear: () => setToast(null),
    success: (message: string) => setToast({ message, kind: 'success' }),
    error: (message: string) => setToast({ message, kind: 'error' }),
  };
}

/* ========================================================================= */
/* DataTable                                                                 */
/* ========================================================================= */

export const DataTable: React.FC<{ headers: string[]; children: React.ReactNode }> = ({
  headers,
  children,
}) => (
  <div className="overflow-x-auto rounded-[14px] border border-[var(--border)]">
    <table className="w-full border-collapse text-[13px]">
      <thead className="sticky top-0 bg-[var(--bg-tertiary)]">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--text-dimmer)]"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export const Tr: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => (
  <tr
    onClick={onClick}
    className={`border-t border-[var(--border-subtle)] transition-colors hover:bg-[var(--row-hover)] ${
      onClick ? 'cursor-pointer' : ''
    }`}
  >
    {children}
  </tr>
);

export const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;

/* ========================================================================= */
/* ItemList — the list/row shell used by most content pages                  */
/* ========================================================================= */

export const ItemRow: React.FC<{
  lead?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ lead, title, subtitle, badges, actions }) => (
  <div className="flex flex-wrap items-center gap-4 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3.5 transition-colors hover:bg-[var(--bg-tertiary)]">
    {lead}
    <div className="min-w-[180px] flex-1">
      <div className="text-[14px] font-semibold leading-snug">{title}</div>
      {subtitle && <div className="mt-0.5 text-[12px] text-[var(--text-dim)]">{subtitle}</div>}
    </div>
    {badges && <div className="flex shrink-0 items-center gap-2">{badges}</div>}
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </div>
);

export const EmptyState: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-[14px] border border-dashed border-[var(--border-strong)] px-6 py-12 text-center text-[13px] text-[var(--text-dim)]">
    {children}
  </div>
);

/* ========================================================================= */
/* Form fields                                                               */
/* ========================================================================= */

const FIELD_CLASS =
  'w-full rounded-[10px] border-[1.5px] border-[var(--border)] bg-[var(--bg-tertiary)] ' +
  'px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none transition-colors ' +
  'focus:border-[var(--blue)] placeholder:text-[var(--text-dimmer)]';

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[var(--text-dim)]">
    {children}
  </span>
);

export const Field: React.FC<{
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}> = ({ label, value, onChange, type = 'text', placeholder, className = '' }) => (
  <label className={`block ${className}`}>
    <Label>{label}</Label>
    <input
      className={FIELD_CLASS}
      type={type}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

export const TextArea: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}> = ({ label, value, onChange, rows = 4, placeholder, className = '' }) => (
  <label className={`block ${className}`}>
    <Label>{label}</Label>
    <textarea
      className={`${FIELD_CLASS} resize-y`}
      style={{ minHeight: 90 }}
      rows={rows}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

export const Select: React.FC<{
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  className?: string;
}> = ({ label, value, options, onChange, className = '' }) => (
  <label className={`block ${className}`}>
    <Label>{label}</Label>
    <select className={FIELD_CLASS} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </label>
);

export const Toggle: React.FC<{
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-3 py-1">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border transition-colors"
      style={{
        background: checked ? 'var(--tint-green-track)' : 'var(--bg-tertiary)',
        borderColor: checked ? 'var(--tint-green-edge)' : 'var(--border-strong)',
      }}
    >
      <span
        className="absolute top-[2px] h-[16px] w-[16px] rounded-full transition-all"
        style={{
          left: checked ? 22 : 3,
          background: checked ? 'var(--green)' : 'var(--text-dimmer)',
        }}
      />
    </button>
    <span className="text-[13px] text-[var(--text-primary)]">{label}</span>
  </label>
);

/** Array-of-strings editor rendering each entry as a removable blue chip. */
export const ChipsField: React.FC<{
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  className?: string;
}> = ({ label, values, onChange, placeholder = 'Type and press Enter', className = '' }) => {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...(values ?? []), v]);
    setDraft('');
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 pb-2">
        {(values ?? []).map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--tint-blue-border)] bg-[var(--tint-blue)] px-2.5 py-1 text-[12px] text-[var(--blue-light)]"
          >
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="cursor-pointer opacity-70 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {(values ?? []).length === 0 && (
          <span className="text-[12px] text-[var(--text-dimmer)]">No entries yet.</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className={FIELD_CLASS}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant="ghost" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>
    </div>
  );
};

/** Small preview thumbnail for URL-based image fields. */
export const ImagePreview: React.FC<{ src: string; className?: string }> = ({
  src,
  className = '',
}) => {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!src) return null;
  if (broken) {
    return (
      <div
        className={`flex items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--bg-tertiary)] text-[11px] text-[var(--text-dimmer)] ${className}`}
      >
        Not previewable
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setBroken(true)}
      className={`rounded-[10px] border border-[var(--border)] object-cover ${className}`}
    />
  );
};

/** Confirmation used before every destructive action. */
export function confirmDelete(what: string): boolean {
  return window.confirm(`Delete ${what}? This cannot be undone.`);
}
