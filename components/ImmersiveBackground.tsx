import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Cloud = ({ x, y, scale, speed, opacity = 0.8 }: { x: number; y: number; scale: number; speed: number; opacity?: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      fontSize: `${scale * 100}px`,
      color: 'rgba(255, 255, 255, 0.8)',
      filter: 'blur(8px)',
      opacity,
    }}
    animate={{
      x: [0, 100, 0],
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    ☁️
  </motion.div>
);

const Bubble = ({ x, y, size, speed, color = 'rgba(255, 255, 255, 0.1)', borderColor = 'rgba(255, 255, 255, 0.5)' }: { x: number; y: number; size: number; speed: number; color?: string; borderColor?: string }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1px solid ${borderColor}`,
      backgroundColor: color,
    }}
    animate={{
      y: [0, -200],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const BackgroundLayer = ({ theme }: { theme: 'light' | 'dark' }) => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Color Palettes
  const darkColors = [
    '#1a2e1a', // Earth (Dark Green)
    '#0f2e4a', // Sea (Deep Blue)
    '#1e3a8a', // Sky (Dark Blue / Night Sky)
    '#020617', // Space (Deep Dark)
    '#000000'  // Deep Space (Black)
  ];

  const lightColors = [
    '#dcfce7', // Earth (Very Light Green)
    '#bae6fd', // Sea (Light Blue)
    '#7dd3fc', // Sky (Sky Blue)
    '#38bdf8', // High Sky (Blue)
    '#0284c7'  // Stratosphere (Darker Blue)
  ];

  const backgroundColor = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    theme === 'dark' ? darkColors : lightColors
  );

  // Opacity/Visibility controls for layers
  const earthOpacity = useTransform(smoothScroll, [0, 0.2, 0.3], [1, 1, 0]);
  const seaOpacity = useTransform(smoothScroll, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const skyOpacity = useTransform(smoothScroll, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const spaceOpacity = useTransform(smoothScroll, [0.7, 0.8, 1], [0, 1, 1]);

  // Parallax movements
  const earthY = useTransform(smoothScroll, [0, 0.3], ['0%', '50%']);
  const seaY = useTransform(smoothScroll, [0.2, 0.6], ['50%', '-50%']);
  const skyY = useTransform(smoothScroll, [0.4, 0.8], ['50%', '-50%']);
  const spaceY = useTransform(smoothScroll, [0.7, 1], ['20%', '0%']);

  const [stars] = useState<{x: number, y: number, size: number, delay: number, duration: number, driftX: number}[]>(() => 
    Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      driftX: Math.random() * 20 - 10,
    }))
  );
  const [bubbles] = useState<{x: number, y: number, size: number, speed: number}[]>(() => 
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 20 + 5,
      speed: Math.random() * 5 + 5,
    }))
  );

  useEffect(() => {
    // Initial state is already set by initializer
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor,
        overflow: 'hidden',
      }}
    >
      {/* Earth Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: earthOpacity,
          y: earthY,
          pointerEvents: 'none',
        }}
      >
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '40%', 
          background: theme === 'dark' 
            ? 'linear-gradient(to top, #052e16, transparent)' 
            : 'linear-gradient(to top, #86efac, transparent)',
          opacity: 0.5
        }} />
        {/* Mountains */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
          <path d="M0 100 L20 70 L40 100 Z" fill={theme === 'dark' ? "#14532d" : "#4ade80"} opacity="0.6" />
          <path d="M30 100 L60 50 L90 100 Z" fill={theme === 'dark' ? "#052e16" : "#22c55e"} opacity="0.4" />
          <path d="M70 100 L85 80 L100 100 Z" fill={theme === 'dark' ? "#14532d" : "#4ade80"} opacity="0.6" />
        </svg>
        {/* Particles: Fireflies (Dark) vs Pollen (Light) */}
        {stars.slice(0, 20).map((star, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#fbbf24' : '#fef08a', // Amber vs Light Yellow
              boxShadow: theme === 'dark' ? '0 0 10px #fbbf24' : 'none',
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20],
              x: [0, star.driftX],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Sea Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: seaOpacity,
          y: seaY,
          pointerEvents: 'none',
        }}
      >
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.2), transparent)'
            : 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.4), transparent)'
        }} />
        {bubbles.map((bubble, i) => (
          <Bubble 
            key={`bubble-${i}`} 
            {...bubble} 
            color={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}
            borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)'}
          />
        ))}
      </motion.div>

      {/* Sky Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: skyOpacity,
          y: skyY,
          pointerEvents: 'none',
        }}
      >
        <Cloud x={10} y={20} scale={1.5} speed={20} opacity={theme === 'dark' ? 0.2 : 0.9} />
        <Cloud x={60} y={40} scale={2} speed={25} opacity={theme === 'dark' ? 0.15 : 0.8} />
        <Cloud x={30} y={70} scale={1.2} speed={18} opacity={theme === 'dark' ? 0.25 : 0.9} />
        
        {/* Celestial Body: Sun or Moon */}
        <div style={{ 
          position: 'absolute', 
          top: '10%', 
          right: '10%', 
          width: 100, 
          height: 100, 
          borderRadius: '50%', 
          background: theme === 'dark' ? '#f1f5f9' : '#fcd34d', // Slate-100 (Moon) vs Amber-300 (Sun)
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(255, 255, 255, 0.5)' 
            : '0 0 40px rgba(252, 211, 77, 0.8)',
          filter: 'blur(1px)',
          opacity: 0.9 
        }} />
      </motion.div>

      {/* Space Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: spaceOpacity,
          y: spaceY,
          pointerEvents: 'none',
        }}
      >
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? 'white' : '#bae6fd',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, transparent 0%, #000 100%)'
            : 'radial-gradient(circle at center, transparent 0%, #0284c7 100%)',
          transform: 'translate(-50%, -50%)',
        }} />
      </motion.div>
    </motion.div>
  );
};

export const ImmersiveBackground: React.FC = () => {
  const { mode } = useTheme();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <motion.div
        initial={false}
        animate={{ opacity: mode === 'light' ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BackgroundLayer theme="light" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ opacity: mode === 'dark' ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BackgroundLayer theme="dark" />
      </motion.div>
    </div>
  );
};
