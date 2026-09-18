import type { NextFunction, Request, Response } from 'express';
import { supabaseAdmin } from './supabase';

/**
 * Keep only the allowed keys from a request body. Every admin PATCH/POST runs
 * its body through this so a caller cannot write columns the endpoint does not
 * own (id, updated_at, or another resource's foreign key).
 */
export function pick<T extends object>(body: unknown, allowed: readonly string[]): Partial<T> {
  if (!body || typeof body !== 'object') return {};
  const src = body as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(src, key) && src[key] !== undefined) {
      out[key] = src[key];
    }
  }
  return out as Partial<T>;
}

/** Record an admin write. Never throws — a failed audit must not fail the request. */
export async function audit(
  adminId: string | undefined,
  tableName: string,
  recordId: string | null,
  action: 'insert' | 'update' | 'delete',
  oldData: unknown,
  newData: unknown,
): Promise<void> {
  try {
    await supabaseAdmin.from('audit_log').insert({
      admin_id: adminId ?? null,
      table_name: tableName,
      record_id: recordId,
      action,
      old_data: oldData ?? null,
      new_data: newData ?? null,
    });
  } catch (err) {
    console.error('[audit] failed to record', tableName, action, err);
  }
}

/** Read at call time so a late NODE_ENV assignment is still respected. */
const isProduction = () => process.env.NODE_ENV === 'production';

/** Translate a Supabase/Postgres error into a sensible HTTP response. */
export function fail(res: Response, err: unknown, fallbackStatus = 500): Response {
  const e = err as { message?: string; code?: string } | null;
  const message = e?.message ?? 'Unexpected server error';

  // 23505 unique_violation, 23503 foreign_key_violation, 23514 check_violation
  // These are caused by the submitted data, so the message is useful to the
  // caller and is returned unchanged in every environment.
  if (e?.code === '23505') return res.status(409).json({ error: message });
  if (e?.code === '23503' || e?.code === '23514') return res.status(400).json({ error: message });
  if (e?.code === 'PGRST116') return res.status(404).json({ error: 'Not found' });

  // Anything else is an internal fault. Log it in full, but do not return raw
  // Postgres/Supabase text in production — it can disclose schema, constraint
  // names and connection detail.
  console.error('[api]', err);
  return res
    .status(fallbackStatus)
    .json({ error: isProduction() ? 'Unexpected server error' : message });
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/** Wrap an async route handler so rejections reach Express' error handler. */
export function wrap(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

/** Coerce a value to a string[], tolerating a newline/comma separated string. */
export function toArray(value: unknown): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value.map(String).filter((s) => s.trim() !== '');
  if (typeof value === 'string') {
    return value
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}
