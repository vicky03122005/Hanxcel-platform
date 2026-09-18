import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import { Button, Card, StatCard } from '../components/ui';
import { adminGet, type Stats } from '../lib/api';

const CONTROLS = [
  'Hero headline, sub-text and CTA',
  'About tagline and body copy',
  'Services and their disciplines',
  'Solutions and solution details',
  'Projects and case studies',
  'Portfolio items and sub-data',
  'Team members',
  'Testimonials',
  'FAQ questions',
  'Blog posts',
  'Contact leads',
  'Newsletter subscribers',
  'Site settings',
  'Audit log',
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminGet<Stats>('/stats')
      .then(setStats)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000';

  return (
    <Shell title="Dashboard">
      {error && (
        <div className="mb-5 rounded-[12px] border border-[var(--tint-red-border)] bg-[var(--tint-red)] px-4 py-3 text-[13px] text-[var(--red)]">
          {error}
        </div>
      )}

      <div className="mb-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
        <StatCard
          label="New Leads"
          value={stats?.new_contacts ?? '—'}
          color="red"
          onClick={() => navigate('/contacts?status=new')}
        />
        <StatCard label="Total Leads" value={stats?.total_contacts ?? '—'} onClick={() => navigate('/contacts')} />
        <StatCard label="Subscribers" value={stats?.newsletter_subs ?? '—'} color="green" onClick={() => navigate('/newsletter')} />
        <StatCard label="Blog Posts" value={stats?.blog_posts ?? '—'} onClick={() => navigate('/blog')} />
        <StatCard label="Team Members" value={stats?.team_members ?? '—'} onClick={() => navigate('/team')} />
        <StatCard label="Testimonials" value={stats?.testimonials ?? '—'} onClick={() => navigate('/testimonials')} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Quick Actions">
          <div className="flex flex-wrap gap-2.5">
            <Button variant="ghost" size="sm" onClick={() => navigate('/contacts?status=new')}>
              View New Leads
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/blog/new')}>
              Write Blog Post
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/team')}>
              Manage Team
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              Site Settings
            </Button>
            <a href={siteUrl} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="sm">
                View Website
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </Card>

        <Card title="Admin Controls">
          <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {CONTROLS.map((c) => (
              <li key={c} className="text-[12.5px] text-[var(--text-dim)]">
                <span className="mr-1.5 text-[var(--blue)]">✦</span>
                {c}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
};

export default DashboardPage;
