import type { NextFunction, Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../lib/supabase';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      adminId?: string;
      adminRole?: 'super_admin' | 'editor';
    }
  }
}

/**
 * Verify the bearer token with Supabase Auth, then confirm the user has an
 * admin_profiles row. Populates req.adminId / req.adminRole.
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ error: 'No token' });
    return;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  // Service-role read: the anon client cannot see admin_profiles rows here
  // because RLS restricts SELECT to the row owner in an authenticated session.
  const { data: profile } = await supabaseAdmin
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile) {
    res.status(403).json({ error: 'Not an admin' });
    return;
  }

  req.adminId = user.id;
  req.adminRole = profile.role as 'super_admin' | 'editor';
  next();
}
