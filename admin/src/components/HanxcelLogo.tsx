import React from 'react';

interface HanxcelLogoProps {
  className?: string;
  size?: number | string;
  id?: string;
}

/**
 * Hanxcel "H" monogram — two flat brand colours split by a diagonal cut.
 *
 * Sampled by eye from the supplied artwork; adjust these two values to match
 * the brand exactly. Everything else derives from them.
 */
const INDIGO = '#2B0D63';
const CYAN = '#22B9EE';

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
      {/* 1. Upper-left piece */}
      <polygon points="22,16 38,25.28 38,41.04 22,31.76" fill={INDIGO} />

      {/* 2. Main upper piece */}
      <polygon points="62,16 78,25.28 78,64.24 41.38,43 62,43" fill={INDIGO} />

      {/* 3. Main lower piece */}
      <polygon points="38,84 22,74.72 22,35.76 58.62,57 38,57" fill={CYAN} />

      {/* 4. Lower-right piece */}
      <polygon points="62,58.96 78,68.24 78,84 62,74.72" fill={CYAN} />
    </svg>
  );
};

export default HanxcelLogo;
