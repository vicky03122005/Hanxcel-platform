import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { publicRouter } from './routes/public';
import { adminRouter } from './routes/admin';

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Render terminates TLS at a proxy; express-rate-limit needs this to read the
// real client IP rather than rate-limiting every visitor as one address.
app.set('trust proxy', 1);

app.use(helmet());

/**
 * FRONTEND_URL and ADMIN_URL each accept a comma-separated list, so an apex
 * domain, its www variant and the Vercel-assigned URL can all be allowed:
 *   FRONTEND_URL=https://hanxcel.com,https://www.hanxcel.com,https://hanxcel.vercel.app
 * Trailing slashes are trimmed because a browser Origin header never has one.
 */
const parseOrigins = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

const allowedOrigins = [
  ...parseOrigins(process.env.FRONTEND_URL),
  ...parseOrigins(process.env.ADMIN_URL),
  ...(isProd ? [] : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173']),
];

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin/server-to-server requests arrive without an Origin header.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);

      // Reject by omitting the CORS headers rather than raising: an Error here
      // reaches the error handler and surfaces as a misleading HTTP 500 that
      // echoes the origin back. The browser blocks the response either way.
      console.warn(`[cors] blocked origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '2mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions, please try again later.' },
});

app.use('/api/', apiLimiter);
app.use('/api/contact', submitLimiter);
app.use('/api/newsletter', submitLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// Admin mounts first so /api/admin/* is not captured by the public router.
app.use('/api/admin', adminRouter);
app.use('/api', publicRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // Full detail to the logs; a generic message to the client in production so
  // internal failures cannot disclose stack or infrastructure detail.
  console.error('[unhandled]', err);
  const message = err instanceof Error ? err.message : 'Unexpected server error';
  res.status(500).json({ error: isProd ? 'Unexpected server error' : message });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`Hanxcel API listening on http://localhost:${port}`);
  console.log(`CORS origins: ${allowedOrigins.join(', ') || '(none configured)'}`);
});
