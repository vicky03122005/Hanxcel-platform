import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  BookOpen,
  ClipboardList,
  Cpu,
  FileText,
  FolderKanban,
  Grid2X2,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Menu,
  MessageSquareQuote,
  Moon,
  Power,
  X,
  Settings,
  Sun,
  Target,
  Users,
} from 'lucide-react';
import { HanxcelLogo } from '../HanxcelLogo';
import { adminGet, type Stats } from '../../lib/api';
import { getUser, logout } from '../../lib/auth';
import { useTheme } from '../../lib/theme';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: 'newLeads';
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Website Content',
    items: [
      { to: '/hero', label: 'Hero Section', icon: Target },
      { to: '/about', label: 'About Section', icon: Lightbulb },
      { to: '/services', label: 'Services', icon: Cpu },
      { to: '/solutions', label: 'Solutions', icon: Grid2X2 },
      { to: '/projects', label: 'Projects', icon: FolderKanban },
      { to: '/portfolio', label: 'Portfolio', icon: BookOpen },
      { to: '/team', label: 'Team', icon: Users },
      { to: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
      { to: '/faq', label: 'FAQ', icon: HelpCircle },
      { to: '/blog', label: 'Blog Posts', icon: FileText },
    ],
  },
  {
    label: 'Enquiries',
    items: [
      { to: '/contacts', label: 'Contact Leads', icon: Inbox, badge: 'newLeads' },
      { to: '/newsletter', label: 'Newsletter', icon: Mail },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { to: '/settings', label: 'Site Settings', icon: Settings },
      { to: '/audit', label: 'Audit Log', icon: ClipboardList },
    ],
  },
];

const Sidebar: React.FC<{ newLeads: number; open: boolean; onClose: () => void }> = ({
  newLeads,
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const user = getUser();

  const signOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside
      /*
       * Below md this is an off-canvas drawer (fixed, slides in over the page).
       * From md up the md: classes restore the original sticky 260px column
       * exactly, so desktop layout is unchanged.
       */
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)] transition-transform duration-300 md:sticky md:top-0 md:z-auto md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close control, drawer only */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-3 top-3 cursor-pointer rounded-lg p-1.5 text-[var(--text-dim)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] md:hidden"
      >
        <X className="h-4 w-4" />
      </button>
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <HanxcelLogo id="admin-sidebar-logo" className="h-9 w-9" />
        <div className="leading-tight">
          <div className="text-[14px] font-extrabold tracking-wider">HANXCEL AI</div>
          <div className="text-[9px] font-semibold tracking-[0.18em] text-[var(--blue-light)]">
            TECHNOLOGIES
          </div>
        </div>
      </div>

      <div className="px-5 pb-1 pt-3">
        <span className="inline-block rounded-full border border-[var(--tint-blue-border)] bg-[var(--tint-blue)] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-[var(--blue-light)]">
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-dimmer)]">
              {group.label}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative mb-0.5 flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[var(--tint-blue)] font-semibold text-[var(--blue-light)]'
                      : 'text-[var(--text-dim)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute bottom-[6px] left-0 top-[6px] w-[3px] rounded-[2px]"
                        style={{ background: 'var(--blue)' }}
                      />
                    )}
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge === 'newLeads' && newLeads > 0 && (
                      <span className="rounded-full bg-[var(--red)] px-[7px] py-[1px] text-[10px] font-bold text-white">
                        {newLeads}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-[var(--border)] p-3">
        <div className="flex items-center gap-3 rounded-[12px] bg-[var(--bg-tertiary)] px-3 py-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ background: 'var(--grad-primary)' }}
          >
            {(user?.full_name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[12px] font-semibold">{user?.full_name ?? 'Admin'}</div>
            <div className="truncate text-[10px] capitalize text-[var(--text-dimmer)]">
              {(user?.role ?? 'editor').replace('_', ' ')}
            </div>
          </div>
          <button
            onClick={signOut}
            title="Sign out"
            aria-label="Sign out"
            className="cursor-pointer rounded-lg p-1.5 text-[var(--text-dim)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--red)]"
          >
            <Power className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

/** Light/dark switch. The icon shows the theme you will get, not the current one. */
export const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={toggle}
      title={`Switch to ${next} mode`}
      aria-label={`Switch to ${next} mode`}
      className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-[var(--bg-tertiary)] p-2 text-[var(--text-dim)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export const Topbar: React.FC<{
  title: string;
  actions?: React.ReactNode;
  onMenu?: () => void;
}> = ({ title, actions, onMenu }) => (
  <header
    className="flex h-[60px] shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 sm:gap-4 sm:px-6"
    style={{ position: 'sticky', top: 0, zIndex: 20 }}
  >
    <div className="flex min-w-0 items-center gap-2">
      {/* Drawer trigger, below md only */}
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="-ml-1 cursor-pointer rounded-lg p-1.5 text-[var(--text-dim)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="truncate text-[17px] font-bold tracking-tight">{title}</h1>
    </div>

    {/* Pages with several actions would overflow a narrow bar; let them scroll. */}
    <div className="flex shrink-0 items-center gap-2 overflow-x-auto">
      {actions}
      <ThemeToggle />
    </div>
  </header>
);

/**
 * Page wrapper: renders the sidebar, the topbar and the page body.
 * Pages supply their own title and topbar actions.
 */
export const Shell: React.FC<{
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, actions, children }) => {
  const [newLeads, setNewLeads] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Never leave the drawer open across a navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Refresh the badge on navigation so it reflects reads/replies immediately.
  useEffect(() => {
    let cancelled = false;
    adminGet<Stats>('/stats')
      .then((s) => {
        if (!cancelled) setNewLeads(s.new_contacts);
      })
      .catch(() => {
        /* badge is non-essential */
      });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Scrim behind the drawer, below md only */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <Sidebar newLeads={newLeads} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} actions={actions} onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};
