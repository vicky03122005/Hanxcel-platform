import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'hx_admin_theme';

/**
 * Dark is the default so the panel looks unchanged for anyone who has not
 * chosen a theme. To follow the operating system instead, change this to:
 *   matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
 */
const DEFAULT_THEME: Theme = 'dark';

export function getStoredTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* private mode / storage blocked — fall through to the default */
  }
  return DEFAULT_THEME;
}

/** Stamp the theme onto <html>, which is what the CSS variables key off. */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Run before React mounts so the first paint is already the right theme —
 * without this the panel flashes dark before switching to light.
 */
export function initTheme(): void {
  applyTheme(getStoredTheme());
}

/** Theme state plus a toggle, shared via the data-theme attribute. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* preference simply will not persist */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggle };
}
