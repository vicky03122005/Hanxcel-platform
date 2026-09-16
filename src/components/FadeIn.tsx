import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'nav' | 'header' | 'footer' | 'article' | 'span' | 'h1' | 'h2' | 'p';
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const motionMap = {
  div: motion.div,
  section: motion.section,
  nav: motion.nav,
  header: motion.header,
  footer: motion.footer,
  article: motion.article,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  id,
  style,
  onClick,
}) => {
  const MotionComponent = motionMap[as] || motion.div;

  return (
    <MotionComponent
      id={id}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;

