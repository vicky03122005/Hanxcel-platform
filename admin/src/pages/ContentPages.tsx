import React from 'react';
import { Badge, ImagePreview } from '../components/ui';
import { ResourcePage, slugify, type ResourceConfig } from './ResourcePage';
import type { FaqItem, TeamMember, Testimonial } from '../lib/api';

/* ========================================================================= */
/* Team                                                                      */
/* ========================================================================= */

const teamConfig: ResourceConfig<TeamMember> = {
  title: 'Team',
  endpoint: '/team',
  addLabel: 'Add Member',
  noun: 'this team member',
  modalSize: 'md',
  slugFrom: (d) => slugify(d.name ?? ''),
  blank: () => ({
    name: '',
    role: '',
    bio: '',
    specialties: [],
    image_url: '',
    linkedin: '',
    email: '',
    github: '',
    sort_order: 0,
    is_visible: true,
  }),
  rowLead: (m) => <ImagePreview src={m.image_url} className="h-10 w-10 rounded-full" />,
  rowTitle: (m) => m.name,
  rowSubtitle: (m) => m.role,
  fields: [
    { kind: 'text', name: 'name', label: 'Name' },
    { kind: 'text', name: 'role', label: 'Role' },
    { kind: 'textarea', name: 'bio', label: 'Bio', rows: 4, full: true },
    { kind: 'chips', name: 'specialties', label: 'Specialties', full: true },
    { kind: 'image', name: 'image_url', label: 'Image URL', full: true },
    { kind: 'text', name: 'linkedin', label: 'LinkedIn URL' },
    { kind: 'text', name: 'email', label: 'Email' },
    { kind: 'text', name: 'github', label: 'GitHub URL' },
    { kind: 'number', name: 'sort_order', label: 'Sort Order' },
    { kind: 'toggle', name: 'is_visible', label: 'Visible on the website', full: true },
  ],
};

export const TeamPage: React.FC = () => <ResourcePage config={teamConfig} />;

/* ========================================================================= */
/* Testimonials                                                              */
/* ========================================================================= */

const testimonialsConfig: ResourceConfig<Testimonial> = {
  title: 'Testimonials',
  endpoint: '/testimonials',
  addLabel: 'Add Testimonial',
  noun: 'this testimonial',
  modalSize: 'md',
  slugFrom: (d) => slugify(d.name ?? ''),
  blank: () => ({
    name: '',
    role: '',
    company: '',
    badge: '',
    quote: '',
    rating: 5,
    avatar_url: '',
    sort_order: 0,
    is_visible: true,
  }),
  rowLead: (t) => <ImagePreview src={t.avatar_url} className="h-10 w-10 rounded-full" />,
  rowTitle: (t) => `${t.name} — ${t.company}`,
  rowSubtitle: (t) => (t.quote.length > 90 ? `${t.quote.slice(0, 90)}…` : t.quote),
  rowBadges: (t) => <Badge variant="category">{'★'.repeat(t.rating)}</Badge>,
  fields: [
    { kind: 'text', name: 'name', label: 'Name' },
    { kind: 'text', name: 'role', label: 'Role' },
    { kind: 'text', name: 'company', label: 'Company' },
    { kind: 'text', name: 'badge', label: 'Badge Label' },
    { kind: 'textarea', name: 'quote', label: 'Quote', rows: 4, full: true },
    { kind: 'number', name: 'rating', label: 'Rating (1-5)' },
    { kind: 'number', name: 'sort_order', label: 'Sort Order' },
    { kind: 'image', name: 'avatar_url', label: 'Avatar URL', full: true },
    { kind: 'toggle', name: 'is_visible', label: 'Visible on the website', full: true },
  ],
};

export const TestimonialsPage: React.FC = () => <ResourcePage config={testimonialsConfig} />;

/* ========================================================================= */
/* FAQ                                                                       */
/* ========================================================================= */

const faqConfig: ResourceConfig<FaqItem> = {
  title: 'FAQ',
  endpoint: '/faq',
  addLabel: 'Add Question',
  noun: 'this question',
  modalSize: 'sm',
  slugFrom: (d) => slugify(d.question ?? '').slice(0, 60) || `faq-${Date.now()}`,
  blank: () => ({ question: '', answer: '', sort_order: 0, is_visible: true }),
  rowTitle: (f) => f.question,
  rowSubtitle: (f) => (f.answer.length > 110 ? `${f.answer.slice(0, 110)}…` : f.answer),
  fields: [
    { kind: 'text', name: 'question', label: 'Question', full: true },
    { kind: 'textarea', name: 'answer', label: 'Answer', rows: 5, full: true },
    { kind: 'number', name: 'sort_order', label: 'Sort Order' },
    { kind: 'toggle', name: 'is_visible', label: 'Visible on the website' },
  ],
};

export const FaqPage: React.FC = () => <ResourcePage config={faqConfig} />;
