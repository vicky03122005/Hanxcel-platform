import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { submitContact } from '../lib/api';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitContact({ ...formData, source: 'contact_section' });
      setStatus('sent');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        message: '',
      });
      setTimeout(() => {
        setStatus('idle');
      }, 4500);
    } catch {
      setStatus('idle');
      alert('Failed to send. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-white text-[#0C0C0C] z-20 relative rounded-t-[48px] sm:rounded-t-[64px] md:rounded-t-[80px] -mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-20">
        {/* Header */}
        <FadeIn delay={0} y={40} className="w-full flex flex-col items-center justify-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] shadow-sm mb-4 text-[10px]">
            <Mail className="w-3 h-3 text-[#0066FF] stroke-[2.2]" />
            <span className="text-[#0066FF] font-bold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
          </span>

          <h2
            className="text-black font-black uppercase leading-none tracking-tight text-center mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Let's Talk
          </h2>

          <p className="text-[#64748B] max-w-2xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-center">
            Ready to bring your hardware vision to life? Reach out to our engineering team to discuss your next big project.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Info */}
          <FadeIn delay={0.1} x={-30} className="space-y-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Contact Information</h3>
              <p className="text-[#64748B] font-light leading-relaxed mb-8 max-w-md">
                Whether you need a full turnkey solution or expert consulting, our team is here to help you succeed.
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:hanxcelaitech14@gmail.com" className="group flex items-start gap-4 p-5 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#64748B] mb-1">Email Us</p>
                  <p className="text-lg font-bold text-[#0C0C0C] group-hover:text-[#0066FF] transition-colors">hanxcelaitech14@gmail.com</p>
                </div>
              </a>

              <a href="tel:+1234567890" className="group flex items-start gap-4 p-5 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#64748B] mb-1">Call Us</p>
                  <p className="text-lg font-bold text-[#0C0C0C] group-hover:text-[#0066FF] transition-colors">+91 8148637170</p>
                </div>
              </a>

              <div className="group flex items-start gap-4 p-5 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:bg-[#F1F5F9] transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#64748B] mb-1">Visit Us</p>
                  <p className="text-lg font-bold text-[#0C0C0C] group-hover:text-[#0066FF] transition-colors">1461, 2nd FLOOR, 14th CROSS ANANTHNAGAR PHASE 2, ELECTRONIC CITY BENGALURU KARANATAKA 560100 INDIA<br /></p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Contact Form */}
          <div
            id="contact-form-container"
            className="group bg-white border border-[#E2E8F0] shadow-xl rounded-[32px] p-8 sm:p-10 relative overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#0066FF]/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/5 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            
            <h3 className="text-2xl font-extrabold tracking-tight mb-6 text-[#0C0C0C] group-hover:text-[#0066FF] transition-colors duration-300">Send us a message</h3>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-bold text-[#64748B] pl-1">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10 transition-[border-color,background-color,box-shadow] duration-200 outline-none text-[#0C0C0C] placeholder:text-[#94A3B8]"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-bold text-[#64748B] pl-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10 transition-[border-color,background-color,box-shadow] duration-200 outline-none text-[#0C0C0C] placeholder:text-[#94A3B8]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-bold text-[#64748B] pl-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10 transition-[border-color,background-color,box-shadow] duration-200 outline-none text-[#0C0C0C] placeholder:text-[#94A3B8]"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="service" className="text-sm font-bold text-[#64748B] pl-1">Service Needed</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10 transition-[border-color,background-color,box-shadow] duration-200 outline-none text-[#0C0C0C] appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service...</option>
                  <option value="hardware">Hardware &amp; PCB Design</option>
                  <option value="firmware">Firmware &amp; IoT</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-bold text-[#64748B] pl-1">Project Details *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/10 transition-[border-color,background-color,box-shadow] duration-200 outline-none text-[#0C0C0C] placeholder:text-[#94A3B8] resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={status === 'submitting'}
                style={
                  status === 'sent'
                    ? {
                        background: 'linear-gradient(123deg, #064E3B 7%, #059669 45%, #10B981 80%, #34D399 100%)',
                        boxShadow: '0px 4px 18px rgba(16, 185, 129, 0.45), 0px 0px 24px rgba(5, 150, 105, 0.4), 4px 4px 12px #047857 inset',
                        outline: '2px solid #ECFDF5',
                        outlineOffset: '-3px',
                      }
                    : {
                        background: 'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
                        boxShadow: '0px 4px 18px rgba(0, 180, 216, 0.45), 0px 0px 24px rgba(0, 102, 255, 0.4), 4px 4px 12px #0052CC inset',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }
                }
                className={`w-full py-4 rounded-full text-white font-extrabold tracking-widest uppercase text-sm sm:text-base transition-all duration-300 ${
                  status === 'sent'
                    ? 'scale-[1.01] shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-default'
                    : 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                } flex items-center justify-center gap-2 group select-none mt-2`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
                    <span>SENT SUCCESSFULLY ✓</span>
                  </>
                ) : (
                  <>
                    <span>MESSAGE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

