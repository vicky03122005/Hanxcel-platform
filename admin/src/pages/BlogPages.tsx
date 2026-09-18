import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import {
  Badge,
  Button,
  ChipsField,
  DataTable,
  Field,
  ImagePreview,
  Select,
  Td,
  TextArea,
  Toast,
  Tr,
  confirmDelete,
  useToast,
} from '../components/ui';
import { adminDelete, adminGet, adminPatch, adminPost, type BlogPost } from '../lib/api';
import { slugify } from './ResourcePage';

/** Must match the category union in the public site's BlogSection. */
const CATEGORIES = ['HARDWARE & PCB', 'EMBEDDED & IOT', 'MANUFACTURING', 'EDGE AI'] as const;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

/* ===================================================================== */
/* List                                                                  */
/* ===================================================================== */

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, clear, success, error } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await adminGet<BlogPost[]>('/blog'));
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

  const togglePublished = async (p: BlogPost) => {
    try {
      await adminPatch(`/blog/${p.id}`, { is_visible: !p.is_visible });
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  const remove = async (p: BlogPost) => {
    if (!confirmDelete('this post')) return;
    try {
      await adminDelete(`/blog/${p.id}`);
      success('Deleted.');
      await load();
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title="Blog Posts"
      actions={
        <Button onClick={() => navigate('/blog/new')}>
          <Plus className="h-4 w-4" />
          Write Post
        </Button>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <DataTable headers={['Title', 'Author', 'Category', 'Published', 'Status', 'Actions']}>
          {items.map((p) => (
            <Tr key={p.id}>
              <Td className="max-w-[320px]">
                <span className="font-semibold">{p.title}</span>
              </Td>
              <Td className="text-[var(--text-dim)]">{p.author_name}</Td>
              <Td>
                <Badge variant="category">{p.category}</Badge>
              </Td>
              <Td className="whitespace-nowrap text-[var(--text-dim)]">{fmtDate(p.published_at)}</Td>
              <Td>
                <Badge variant={p.is_visible ? 'visible' : 'hidden'}>
                  {p.is_visible ? 'Published' : 'Draft'}
                </Badge>
              </Td>
              <Td>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/blog/${p.id}`)}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void togglePublished(p)}>
                    {p.is_visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => void remove(p)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
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
/* Editor                                                                */
/* ===================================================================== */

const blankPost = (): Partial<BlogPost> => ({
  slug: '',
  title: '',
  excerpt: '',
  category: CATEGORIES[0],
  read_time: '6 min read',
  published_at: new Date().toISOString().slice(0, 10),
  image_url: '',
  author_name: '',
  author_role: '',
  author_avatar: '',
  introduction: '',
  key_points: [],
  deep_dive: '',
  conclusion: '',
  is_visible: false,
  sort_order: 0,
});

export const BlogEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [draft, setDraft] = useState<Partial<BlogPost>>(blankPost());
  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const { toast, clear, success, error } = useToast();

  useEffect(() => {
    if (isNew) return;
    adminGet<BlogPost>(`/blog/${id}`)
      .then((p) => setDraft({ ...p, published_at: p.published_at?.slice(0, 10) }))
      .catch((e) => error(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const patch = (p: Partial<BlogPost>) => setDraft((d) => ({ ...d, ...p }));

  const save = async (publish: boolean) => {
    setBusy(true);
    try {
      const body: Record<string, unknown> = {
        slug: draft.slug || slugify(draft.title ?? ''),
        title: draft.title,
        excerpt: draft.excerpt,
        category: draft.category,
        read_time: draft.read_time,
        published_at: draft.published_at,
        image_url: draft.image_url,
        author_name: draft.author_name,
        author_role: draft.author_role,
        author_avatar: draft.author_avatar,
        introduction: draft.introduction,
        key_points: draft.key_points,
        deep_dive: draft.deep_dive,
        conclusion: draft.conclusion,
        sort_order: draft.sort_order,
        is_visible: publish,
      };

      if (isNew) await adminPost('/blog', body);
      else await adminPatch(`/blog/${id}`, body);

      success(publish ? 'Published.' : 'Saved as draft.');
      navigate('/blog');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (isNew || !confirmDelete('this post')) return;
    try {
      await adminDelete(`/blog/${id}`);
      navigate('/blog');
    } catch (e) {
      error(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Shell
      title={isNew ? 'Write Post' : 'Edit Post'}
      actions={
        <>
          <Button variant="ghost" onClick={() => navigate('/blog')}>
            Back
          </Button>
          {!isNew && (
            <Button variant="danger" onClick={() => void remove()}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          )}
          <Button variant="ghost" disabled={busy} onClick={() => void save(false)}>
            Save as Draft
          </Button>
          <Button disabled={busy} onClick={() => void save(true)}>
            {busy ? 'Saving…' : 'Publish'}
          </Button>
        </>
      }
    >
      {loading ? (
        <p className="text-[13px] text-[var(--text-dim)]">Loading…</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* ------------------------------------------------ form ----- */}
          <div className="grid gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:grid-cols-2">
            <Field className="sm:col-span-2" label="Title" value={draft.title ?? ''} onChange={(v) => patch({ title: v })} />
            <Field className="sm:col-span-2" label="Slug" value={draft.slug ?? ''} placeholder="auto from title" onChange={(v) => patch({ slug: v })} />
            <TextArea className="sm:col-span-2" label="Excerpt" rows={2} value={draft.excerpt ?? ''} onChange={(v) => patch({ excerpt: v })} />
            <Select label="Category" options={CATEGORIES} value={draft.category ?? CATEGORIES[0]} onChange={(v) => patch({ category: v })} />
            <Field label="Read Time" value={draft.read_time ?? ''} onChange={(v) => patch({ read_time: v })} />
            <Field label="Published Date" type="date" value={draft.published_at ?? ''} onChange={(v) => patch({ published_at: v })} />
            <Field label="Sort Order" type="number" value={draft.sort_order ?? 0} onChange={(v) => patch({ sort_order: Number(v) })} />

            <div className="sm:col-span-2">
              <Field label="Cover Image URL" value={draft.image_url ?? ''} onChange={(v) => patch({ image_url: v })} placeholder="https://… or bundled filename" />
              <ImagePreview src={draft.image_url ?? ''} className="mt-2 h-24 w-40" />
            </div>

            <Field label="Author Name" value={draft.author_name ?? ''} onChange={(v) => patch({ author_name: v })} />
            <Field label="Author Role" value={draft.author_role ?? ''} onChange={(v) => patch({ author_role: v })} />
            <div className="sm:col-span-2">
              <Field label="Author Avatar URL" value={draft.author_avatar ?? ''} onChange={(v) => patch({ author_avatar: v })} />
              <ImagePreview src={draft.author_avatar ?? ''} className="mt-2 h-14 w-14 rounded-full" />
            </div>

            <TextArea className="sm:col-span-2" label="Introduction" rows={6} value={draft.introduction ?? ''} onChange={(v) => patch({ introduction: v })} />
            <ChipsField className="sm:col-span-2" label="Key Points" values={draft.key_points ?? []} onChange={(v) => patch({ key_points: v })} />
            <TextArea className="sm:col-span-2" label="Deep Dive" rows={8} value={draft.deep_dive ?? ''} onChange={(v) => patch({ deep_dive: v })} />
            <TextArea className="sm:col-span-2" label="Conclusion" rows={5} value={draft.conclusion ?? ''} onChange={(v) => patch({ conclusion: v })} />
          </div>

          {/* --------------------------------------------- preview ----- */}
          <aside>
            <div className="sticky top-[76px]">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--text-dimmer)]">
                Card Preview
              </p>
              <div className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--bg-card)]">
                <ImagePreview src={draft.image_url ?? ''} className="h-40 w-full rounded-none border-0" />
                <div className="p-4">
                  <Badge variant="category">{draft.category}</Badge>
                  <h3 className="mt-2.5 text-[15px] font-bold leading-snug">
                    {draft.title || 'Untitled post'}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--text-dim)]">
                    {draft.excerpt || 'Your excerpt will appear here.'}
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-[var(--border)] pt-3">
                    <ImagePreview src={draft.author_avatar ?? ''} className="h-8 w-8 rounded-full" />
                    <div className="min-w-0 flex-1 leading-tight">
                      <div className="truncate text-[12px] font-semibold">
                        {draft.author_name || 'Author name'}
                      </div>
                      <div className="truncate text-[10.5px] text-[var(--text-dimmer)]">
                        {draft.author_role || 'Author role'}
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] text-[var(--text-dimmer)]">{draft.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
      <Toast toast={toast} onDone={clear} />
    </Shell>
  );
};
