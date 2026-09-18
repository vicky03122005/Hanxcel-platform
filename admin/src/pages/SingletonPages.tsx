import React, { useEffect, useState } from 'react';
import { Shell } from '../components/layout/Shell';
import { Button, Card, Field, ImagePreview, TextArea, Toast, useToast } from '../components/ui';
import { adminGet, adminPatch, type About, type Hero } from '../lib/api';

/* ========================================================================= */
/* Hero                                                                      */
/* ========================================================================= */

export const HeroPage: React.FC = () => {
  const [form, setForm] = useState<Hero | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  useEffect(() => {
    adminGet<Hero>('/hero')
      .then(setForm)
      .catch((e) => error(e instanceof Error ? e.message : String(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof Hero>(k: K, v: Hero[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async () => {
    if (!form) return;
    setBusy(true);
    try {
      await adminPatch('/hero', {
        heading_line1: form.heading_line1,
        heading_line2: form.heading_line2,
        subtext: form.subtext,
        cta_label: form.cta_label,
        portrait_url: form.portrait_url,
      });
      success('Hero section saved.');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell
      title="Hero Section"
      actions={
        <Button onClick={save} disabled={!form || busy}>
          {busy ? 'Saving…' : 'Save Changes'}
        </Button>
      }
    >
      <Card className="max-w-3xl">
        {!form ? (
          <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Heading Line 1" value={form.heading_line1} onChange={(v) => set('heading_line1', v)} />
              <Field label="Heading Line 2" value={form.heading_line2} onChange={(v) => set('heading_line2', v)} />
            </div>

            <TextArea
              label="Sub-text (one line per rendered row — the third row is the blue accent)"
              value={form.subtext}
              rows={3}
              onChange={(v) => set('subtext', v)}
            />

            <Field label="CTA Button Label" value={form.cta_label} onChange={(v) => set('cta_label', v)} />

            <div>
              <Field
                label="Portrait URL (optional)"
                value={form.portrait_url ?? ''}
                onChange={(v) => set('portrait_url', v)}
                placeholder="https://…"
              />
              <ImagePreview src={form.portrait_url ?? ''} className="mt-2 h-28 w-28" />
            </div>
          </div>
        )}
      </Card>
      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};

/* ========================================================================= */
/* About                                                                     */
/* ========================================================================= */

export const AboutPage: React.FC = () => {
  const [form, setForm] = useState<About | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  useEffect(() => {
    adminGet<About>('/about')
      .then(setForm)
      .catch((e) => error(e instanceof Error ? e.message : String(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof About>(k: K, v: About[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async () => {
    if (!form) return;
    setBusy(true);
    try {
      await adminPatch('/about', {
        tagline: form.tagline,
        body_text: form.body_text,
        cta_label: form.cta_label,
      });
      success('About section saved.');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell
      title="About Section"
      actions={
        <Button onClick={save} disabled={!form || busy}>
          {busy ? 'Saving…' : 'Save Changes'}
        </Button>
      }
    >
      <Card className="max-w-3xl">
        {!form ? (
          <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
        ) : (
          <div className="grid gap-4">
            <Field label="Tagline (the last two words render as the gradient accent)" value={form.tagline} onChange={(v) => set('tagline', v)} />
            <TextArea label="Body Text" value={form.body_text} rows={10} onChange={(v) => set('body_text', v)} />
            <Field label="CTA Button Label" value={form.cta_label} onChange={(v) => set('cta_label', v)} />
          </div>
        )}
      </Card>
      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};
