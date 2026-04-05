import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '@mui/material';

export const ScrollProgress: React.FC = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        transformOrigin: '0%',
        zIndex: 2000,
        scaleX
      }}
    />
  );
};
