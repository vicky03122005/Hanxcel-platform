import { Router } from 'express';
import { supabaseAdmin } from '../../lib/supabase';
import { audit, fail, pick, wrap } from '../../lib/helpers';

/** A child table owned by a parent resource (disciplines, specs, metrics...). */
export interface ChildSpec {
  /** URL segment, e.g. 'architecture-points' */
  path: string;
  /** Table name, e.g. 'project_architecture_points' */
  table: string;
  /** Foreign key column pointing at the parent, e.g. 'project_id' */
  fk: string;
  /** Writable columns */
  fields: readonly string[];
}

export interface ResourceSpec {
  table: string;
  /** Writable columns for POST/PATCH */
  fields: readonly string[];
  /** Column to order list results by. Defaults to 'sort_order'. */
  orderBy?: string;
  /** PostgREST select string for list/detail. Defaults to '*'. */
  select?: string;
  children?: ChildSpec[];
}

/**
 * Builds the standard admin CRUD surface for one resource plus its children:
 *
 *   GET    /                        list
 *   GET    /:id                     one
 *   POST   /                        create
 *   PATCH  /:id                     update
 *   DELETE /:id                     delete
 *   POST   /:id/<child>             create child
 *   PATCH  /:id/<child>/:childId    update child
 *   DELETE /:id/<child>/:childId    delete child
 *
 * Every write is audited, and every body passes through pick() so only the
 * declared columns can be written.
 */
export function resourceRouter(spec: ResourceSpec): Router {
  const router = Router({ mergeParams: true });
  const { table, fields, orderBy = 'sort_order', select = '*' } = spec;

  router.get(
    '/',
    wrap(async (_req, res) => {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select(select)
        .order(orderBy, { ascending: true });
      if (error) return fail(res, error);
      return res.json(data ?? []);
    }),
  );

  router.get(
    '/:id',
    wrap(async (req, res) => {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select(select)
        .eq('id', req.params.id)
        .maybeSingle();
      if (error) return fail(res, error);
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.json(data);
    }),
  );

  router.post(
    '/',
    wrap(async (req, res) => {
      const payload = pick(req.body, fields);
      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'No writable fields supplied' });
      }
      const { data, error } = await supabaseAdmin.from(table).insert(payload).select().single();
      if (error) return fail(res, error);
      await audit(req.adminId, table, data.id, 'insert', null, data);
      return res.status(201).json(data);
    }),
  );

  router.patch(
    '/:id',
    wrap(async (req, res) => {
      const payload = pick(req.body, fields);
      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'No writable fields supplied' });
      }

      const { data: before } = await supabaseAdmin
        .from(table)
        .select('*')
        .eq('id', req.params.id)
        .maybeSingle();
      if (!before) return res.status(404).json({ error: 'Not found' });

      const { data, error } = await supabaseAdmin
        .from(table)
        .update(payload)
        .eq('id', req.params.id)
        .select()
        .single();
      if (error) return fail(res, error);
      await audit(req.adminId, table, req.params.id, 'update', before, data);
      return res.json(data);
    }),
  );

  router.delete(
    '/:id',
    wrap(async (req, res) => {
      const { data: before } = await supabaseAdmin
        .from(table)
        .select('*')
        .eq('id', req.params.id)
        .maybeSingle();
      if (!before) return res.status(404).json({ error: 'Not found' });

      const { error } = await supabaseAdmin.from(table).delete().eq('id', req.params.id);
      if (error) return fail(res, error);
      await audit(req.adminId, table, req.params.id, 'delete', before, null);
      return res.json({ success: true });
    }),
  );

  for (const child of spec.children ?? []) mountChild(router, child);

  return router;
}

function mountChild(router: Router, child: ChildSpec): void {
  const { path, table, fk, fields } = child;

  router.post(
    '/:id/' + path,
    wrap(async (req, res) => {
      const payload = { ...pick(req.body, fields), [fk]: req.params.id };
      const { data, error } = await supabaseAdmin.from(table).insert(payload).select().single();
      if (error) return fail(res, error);
      await audit(req.adminId, table, data.id, 'insert', null, data);
      return res.status(201).json(data);
    }),
  );

  router.patch(
    '/:id/' + path + '/:childId',
    wrap(async (req, res) => {
      const payload = pick(req.body, fields);
      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'No writable fields supplied' });
      }

      const { data: before } = await supabaseAdmin
        .from(table)
        .select('*')
        .eq('id', req.params.childId)
        .eq(fk, req.params.id)
        .maybeSingle();
      if (!before) return res.status(404).json({ error: 'Not found' });

      const { data, error } = await supabaseAdmin
        .from(table)
        .update(payload)
        .eq('id', req.params.childId)
        .eq(fk, req.params.id)
        .select()
        .single();
      if (error) return fail(res, error);
      await audit(req.adminId, table, req.params.childId, 'update', before, data);
      return res.json(data);
    }),
  );

  router.delete(
    '/:id/' + path + '/:childId',
    wrap(async (req, res) => {
      const { data: before } = await supabaseAdmin
        .from(table)
        .select('*')
        .eq('id', req.params.childId)
        .eq(fk, req.params.id)
        .maybeSingle();
      if (!before) return res.status(404).json({ error: 'Not found' });

      const { error } = await supabaseAdmin
        .from(table)
        .delete()
        .eq('id', req.params.childId)
        .eq(fk, req.params.id);
      if (error) return fail(res, error);
      await audit(req.adminId, table, req.params.childId, 'delete', before, null);
      return res.json({ success: true });
    }),
  );
}

/**
 * Singleton resources (hero, about): GET returns the single row, PATCH updates
 * it, creating it on first write if the table is empty.
 */
export function singletonRouter(table: string, fields: readonly string[]): Router {
  const router = Router();

  router.get(
    '/',
    wrap(async (_req, res) => {
      const { data, error } = await supabaseAdmin.from(table).select('*').limit(1).maybeSingle();
      if (error) return fail(res, error);
      return res.json(data ?? {});
    }),
  );

  router.patch(
    '/',
    wrap(async (req, res) => {
      const payload = pick(req.body, fields);
      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'No writable fields supplied' });
      }

      const { data: before } = await supabaseAdmin.from(table).select('*').limit(1).maybeSingle();

      const query = before
        ? supabaseAdmin.from(table).update(payload).eq('id', before.id)
        : supabaseAdmin.from(table).insert(payload);

      const { data, error } = await query.select().single();
      if (error) return fail(res, error);
      await audit(req.adminId, table, data.id, before ? 'update' : 'insert', before, data);
      return res.json(data);
    }),
  );

  return router;
}
