import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Typography, TypographyProps, Box } from '@mui/material';

interface ReflowTextProps extends TypographyProps {
  text: string;
}

const Character: React.FC<{ char: string; megamiPos: { x: number; y: number } | null }> = ({ char, megamiPos }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 100, damping: 15 });
  const y = useSpring(0, { stiffness: 100, damping: 15 });

  useEffect(() => {
    if (!megamiPos || !ref.current) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;

    const dx = charX - megamiPos.x;
    const dy = charY - megamiPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 80; // Influence radius
    if (distance < radius) {
      const force = (radius - distance) / radius;
      const angle = Math.atan2(dy, dx);
      
      // Push away from Megami
      const pushX = Math.cos(angle) * force * 40;
      const pushY = Math.sin(angle) * force * 40;
      
      x.set(pushX);
      y.set(pushY);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [megamiPos, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </motion.span>
  );
};

export const ReflowText: React.FC<ReflowTextProps> = ({ text, ...props }) => {
  const [megamiPos, setMegamiPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMove = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMegamiPos(customEvent.detail);
    };

    window.addEventListener('megami-move', handleMove);
    return () => window.removeEventListener('megami-move', handleMove);
  }, []);

  // Split into words but keep spaces as characters
  const words = text.split(' ');

  return (
    <Typography 
      {...props} 
      component="div" 
      sx={{ 
        ...props.sx, 
        display: 'block', // Use block display for normal wrapping
      }}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-flex', 
              whiteSpace: 'nowrap',
              verticalAlign: 'baseline'
            }}
          >
            {word.split('').map((char, charIndex) => (
              <Character key={charIndex} char={char} megamiPos={megamiPos} />
            ))}
          </Box>
          {/* Add a space character between words that also reacts to Megami */}
          {wordIndex < words.length - 1 && (
            <Character char=" " megamiPos={megamiPos} />
          )}
        </React.Fragment>
      ))}
    </Typography>
  );
};
