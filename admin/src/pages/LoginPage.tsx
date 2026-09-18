import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HanxcelLogo } from '../components/HanxcelLogo';
import { Button, Field } from '../components/ui';
import { login } from '../lib/auth';
import { ThemeToggle } from '../components/layout/Shell';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[28px] border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-card)] p-10"
        style={{ maxWidth: 420, boxShadow: 'var(--shadow-card)' }}
      >
        <div className="mb-7 flex items-center gap-3">
          <HanxcelLogo id="admin-login-logo" className="h-10 w-10" />
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-wider">HANXCEL AI</div>
            <div className="text-[9px] font-semibold tracking-[0.18em] text-[var(--blue-light)]">
              TECHNOLOGIES
            </div>
          </div>
        </div>

        <h1 className="text-[28px] font-black leading-none tracking-tight">Admin Panel</h1>
        <p className="mb-6 mt-2 text-[13px] text-[var(--text-dim)]">
          Sign in with your company admin account.
        </p>

        {error && (
          <div
            className="mb-4 rounded-[10px] border px-3 py-2.5 text-[12px]"
            style={{
              background: 'var(--tint-red)',
              borderColor: 'var(--tint-red-border)',
              color: 'var(--red)',
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        </div>

        <Button type="submit" size="lg" disabled={busy} className="mt-6 w-full">
          {busy ? 'Signing in…' : 'Sign In'}
          {!busy && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
