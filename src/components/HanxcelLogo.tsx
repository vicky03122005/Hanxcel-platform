import React from 'react';

interface HanxcelLogoProps {
  className?: string;
  size?: number | string;
  id?: string;
}

export const HanxcelLogo: React.FC<HanxcelLogoProps> = ({
  className = 'w-8 h-8 sm:w-9 sm:h-9',
  size,
  id = 'hanxcel-logo',
}) => {
  return (
    <svg
      id={id}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-all duration-300 hover:scale-105 select-none drop-shadow-[0_2px_10px_rgba(0,184,245,0.35)] ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Hanxcel AI Technologies Logo"
    >
      <defs>
        {/* Deep Vibrant Blue (Right & Top-Right) */}
        <linearGradient id="hanxcel-blue-dark" x1="40" y1="16" x2="80" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="60%" stopColor="#0052CC" />
          <stop offset="100%" stopColor="#003D99" />
        </linearGradient>

        {/* Bright Electric Cyan / Sky Blue (Left & Center) */}
        <linearGradient id="hanxcel-cyan-light" x1="20" y1="20" x2="60" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#00B0FF" />
          <stop offset="100%" stopColor="#0080FF" />
        </linearGradient>
      </defs>

      {/* 1. Upper-left piece (Cyan / Sky) */}
      <polygon
        points="22,16 38,25.28 38,41.04 22,31.76"
        fill="url(#hanxcel-cyan-light)"
      />

      {/* 2. Main Upper piece (Deep Blue) */}
      <polygon
        points="62,16 78,25.28 78,64.24 41.38,43 62,43"
        fill="url(#hanxcel-blue-dark)"
      />

      {/* 3. Main Lower piece (Cyan / Sky) */}
      <polygon
        points="38,84 22,74.72 22,35.76 58.62,57 38,57"
        fill="url(#hanxcel-cyan-light)"
      />

      {/* 4. Lower-right piece (Deep Blue) */}
      <polygon
        points="62,58.96 78,68.24 78,84 62,74.72"
        fill="url(#hanxcel-blue-dark)"
      />
    </svg>
  );
};

export default HanxcelLogo;
