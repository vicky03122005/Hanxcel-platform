import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-nowrap mr-[0.28em]">
      {/* Invisible placeholder for exact layout dimensions */}
      <span className="opacity-0 select-none">
        {word}
      </span>
      {/* Absolute positioned animated word */}
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {word}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  return (
    <p
      ref={containerRef}
      id={id}
      className={`relative leading-[1.75] font-normal text-center max-w-[860px] text-[#D7E2EA] mx-auto break-words [text-wrap:pretty] ${className}`}
      style={{
        fontSize: '20.9568px',
        letterSpacing: '0.01em',
      }}
    >
      {words.map((word, index) => {
        const start = index / totalWords;
        const end = Math.min(1, start + 1 / (totalWords * 0.75));
        return (
          <Word
            key={`${index}-${word}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

export default AnimatedText;
