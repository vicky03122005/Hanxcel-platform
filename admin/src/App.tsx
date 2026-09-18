import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isAuthed } from './lib/auth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AboutPage, HeroPage } from './pages/SingletonPages';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import { PortfolioPage, ProjectsPage } from './pages/CaseStudyPages';
import { FaqPage, TeamPage, TestimonialsPage } from './pages/ContentPages';
import { BlogEditorPage, BlogPage } from './pages/BlogPages';
import {
  AuditLogPage,
  ContactLeadsPage,
  NewsletterPage,
  SettingsPage,
} from './pages/OpsPages';

/** Redirects to /login when there is no stored token. */
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (!isAuthed()) return <Navigate to="/login" replace state={{ from: location }} />;
  return <>{children}</>;
};

const protectedRoutes: [string, React.ReactNode][] = [
  ['/dashboard', <DashboardPage />],
  ['/hero', <HeroPage />],
  ['/about', <AboutPage />],
  ['/services', <ServicesPage />],
  ['/solutions', <SolutionsPage />],
  ['/projects', <ProjectsPage />],
  ['/portfolio', <PortfolioPage />],
  ['/team', <TeamPage />],
  ['/testimonials', <TestimonialsPage />],
  ['/faq', <FaqPage />],
  ['/blog', <BlogPage />],
  ['/blog/new', <BlogEditorPage />],
  ['/blog/:id', <BlogEditorPage />],
  ['/contacts', <ContactLeadsPage />],
  ['/newsletter', <NewsletterPage />],
  ['/settings', <SettingsPage />],
  ['/audit', <AuditLogPage />],
];

export const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    {protectedRoutes.map(([path, element]) => (
      <Route key={path} path={path} element={<RequireAuth>{element}</RequireAuth>} />
    ))}

    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
