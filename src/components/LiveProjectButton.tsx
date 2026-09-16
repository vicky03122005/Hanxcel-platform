import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  href = '#',
  className = '',
  id,
  label = 'Live Project',
}) => {
  return (
    <a
      id={id}
      href={href}
      target={href && href !== '#' ? '_blank' : undefined}
      rel={href && href !== '#' ? 'noopener noreferrer' : undefined}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${className}`}
    >
      {label}
    </a>
  );
};

export default LiveProjectButton;
