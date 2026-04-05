import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Typography, TypographyProps } from '@mui/material';

interface TextRevealProps extends TypographyProps {
  text: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  delay = 0, 
  stagger = 0.05, 
  once = true,
  ...props 
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Typography
      component={motion.span}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      sx={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap', 
        gap: '0.25em',
        ...props.sx 
      }}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="walkable-word"
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </Typography>
  );
};
