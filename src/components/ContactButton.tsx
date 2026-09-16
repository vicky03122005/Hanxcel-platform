import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
  label?: string;
  children?: React.ReactNode;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href = '#contact',
  className = '',
  id = 'contact-button',
  label,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      const elem = document.querySelector(href);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `mailto:hanxcelaitech14@gmail.com`;
      }
    }
  };

  return (
    <a
      id={id}
      href={href}
      onClick={handleClick}
      style={{
        background: 'linear-gradient(123deg, #0A1E3F 7%, #0066FF 37%, #00B4D8 72%, #00F0FF 100%)',
        boxShadow: '0px 4px 16px rgba(0, 180, 216, 0.4), 0px 0px 20px rgba(0, 102, 255, 0.35), 4px 4px 12px #0052CC inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`}
    >
      {children || label || 'Contact Me'}
    </a>
  );
};

export default ContactButton;
