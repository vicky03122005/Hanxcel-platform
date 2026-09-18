import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Mail, MapPin, Phone, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { HanxcelLogo } from './HanxcelLogo';
import { submitNewsletter } from '../lib/api';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await submitNewsletter(email.trim());
      setSubscribed(true);
      setEmail('');
    } catch {
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="w-full bg-white text-[#0C0C0C] pt-20 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#E2E8F0]">
          {/* Logo & Description */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <HanxcelLogo className="w-10 h-10 text-[#0066FF]" />
              <div className="flex flex-col text-left justify-center">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0C0C0C] uppercase leading-none font-sans">
                  HANXCEL AI
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#0066FF] uppercase leading-none mt-1 font-sans">
                  TECHNOLOGIES
                </span>
              </div>
            </div>

            <p className="text-[#64748B] font-light leading-relaxed text-sm sm:text-base">
              Engineering intelligent products and technology solutions across electronics, embedded systems, IoT, AI, and manufacturing.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-1">
              <span className="text-xs font-bold tracking-wider uppercase text-[#0C0C0C] block mb-2">
                Hardware & AI Tech Briefing
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-[14px] bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    className="flex-1 px-4 py-3 sm:py-2.5 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-[#0C0C0C] placeholder:text-[#94A3B8]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#002266] via-[#0066FF] to-[#00D4FF] text-white text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 border-2 border-white shadow-[0_8px_25px_rgba(0,180,216,0.5),0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_32px_rgba(0,180,216,0.7),0_0_28px_rgba(0,102,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:contact@hanxcel.com" aria-label="Email" className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemaps & Capabilities */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#0C0C0C] tracking-wide uppercase text-xs sm:text-sm mb-4">
                Core Domains
              </h4>
              <ul className="space-y-2.5">
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">High-Speed PCB Design</a></li>
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Embedded Firmware & RTOS</a></li>
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Edge AI & Computer Vision</a></li>
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Industrial IoT Gateways</a></li>
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Turnkey Prototyping</a></li>
                <li><a href="#services" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Mass Production SMT</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0C0C0C] tracking-wide uppercase text-xs sm:text-sm mb-4">
                Industries Served
              </h4>
              <ul className="space-y-2.5">
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Automotive & Telematics</a></li>
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Medical & Diagnostic Tech</a></li>
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Aerospace & Defense</a></li>
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Consumer Robotics</a></li>
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Clean Energy & BMS</a></li>
                <li><a href="#solutions" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Smart Agriculture</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-[#0C0C0C] tracking-wide uppercase text-xs sm:text-sm mb-4">
                Company & Legal
              </h4>
              <ul className="space-y-2.5">
                <li><a href="#about" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">About Us</a></li>
                <li><a href="#portfolio" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Case Studies</a></li>
                <li>
                  <a href="#team" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors inline-flex items-center gap-1.5">
                    Engineering Team
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#EFF6FF] text-[#0066FF]">Hiring</span>
                  </a>
                </li>
                <li><a href="#blog" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Tech Articles</a></li>
                <li><a href="#" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[#64748B] text-xs sm:text-sm hover:text-[#0066FF] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Hubs & Standards Badges */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[#E2E8F0]">
          {/* Hub 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0C0C0C] uppercase tracking-wider">Electronic City</p>
              <p className="text-xs text-[#64748B] mt-0.5">1461, 2nd FLOOR, 14th CROSS ANANTHNAGAR PHASE 2, BENGALURU KARANATAKA 560100</p>
              <p className="text-[11px] text-[#94A3B8] font-mono mt-0.5">PST (UTC-8)</p>
            </div>
          </div>

          {/* Hub 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shrink-0">
              <Globe2 className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0C0C0C] uppercase tracking-wider">Bengaluru R&D Center</p>
              <p className="text-xs text-[#64748B] mt-0.5">Electronic City Tech Corridor, Bengaluru</p>
              <p className="text-[11px] text-[#94A3B8] font-mono mt-0.5">IST (UTC+5:30)</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0C0C0C] uppercase tracking-wider">Industry Accreditations</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-bold text-[#475569]">ISO 9001:2015</span>
                <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-bold text-[#475569]">IPC-A-610 Class 3</span>
                <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-bold text-[#475569]">CE / FCC / RoHS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94A3B8] text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Hanxcel AI Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All systems & manufacturing lines operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

