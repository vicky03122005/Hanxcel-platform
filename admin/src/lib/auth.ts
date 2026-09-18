const TOKEN_KEY = 'hx_admin_token';
const USER_KEY = 'hx_admin_user';

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/api';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'editor';
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function isAuthed(): boolean {
  return Boolean(getToken());
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const res = await fetch(`${BASE}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string }).error || 'Sign in failed.');

  localStorage.setItem(TOKEN_KEY, json.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(json.user));
  return json.user as AdminUser;
}

export function logout(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}
