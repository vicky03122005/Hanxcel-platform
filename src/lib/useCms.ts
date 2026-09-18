import { useEffect, useState } from 'react';
import {
  fetchAbout,
  fetchBlog,
  fetchFaq,
  fetchHero,
  fetchPortfolio,
  fetchProjects,
  fetchServices,
  fetchSettings,
  fetchSolutions,
  fetchTeam,
  fetchTestimonials,
  type AboutData,
  type HeroData,
  type SiteSettings,
} from './api';

/**
 * Fetch-once hook used by every section.
 *
 * `data` stays null until the request succeeds, which is what lets each section
 * render its bundled fallback content immediately and swap in CMS data when it
 * arrives. If the API is unreachable (or Render is cold-starting) the site keeps
 * showing the fallback rather than an empty section.
 */
export function useAsync<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        // Non-fatal: the caller falls back to its bundled content.
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

export const useHero = () => useAsync<HeroData>(fetchHero);
export const useAbout = () => useAsync<AboutData>(fetchAbout);
export const useSettings = () => useAsync<SiteSettings>(fetchSettings);

export const useServices = <T>() => useAsync<T[]>(() => fetchServices<T>());
export const useSolutions = <T>() => useAsync<T[]>(() => fetchSolutions<T>());
export const useProjects = <T>() => useAsync<T[]>(() => fetchProjects<T>());
export const usePortfolio = <T>() => useAsync<T[]>(() => fetchPortfolio<T>());
export const useTeam = <T>() => useAsync<T[]>(() => fetchTeam<T>());
export const useTestimonials = <T>() => useAsync<T[]>(() => fetchTestimonials<T>());
export const useFaq = <T>() => useAsync<T[]>(() => fetchFaq<T>());
export const useBlog = <T>(category?: string) =>
  useAsync<T[]>(() => fetchBlog<T>(category), [category]);

/**
 * Fetch a single detail record when a modal opens, keyed by slug/number.
 * Returns null while closed or in flight, so callers fall back to their
 * bundled record.
 */
export function useDetail<T>(key: string | null, fetcher: (key: string) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }
    let cancelled = false;
    fetcher(key)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
