import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Code2, Database, Server, Globe, Cpu, Layers } from 'lucide-react';

export const TechCube: React.FC = () => {
  const theme = useTheme();
  const size = 200;
  const halfSize = size / 2;

  const faceStyle = {
    position: 'absolute' as const,
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(4px)',
    boxShadow: `inset 0 0 30px ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 2,
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        perspective: '1200px',
        mx: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -40,
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1
        }
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180, 0],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Front */}
        <Box sx={{ ...faceStyle, transform: `translateZ(${halfSize}px)` }}>
          <Code2 size={64} color={theme.palette.primary.main} />
        </Box>
        {/* Back */}
        <Box sx={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${halfSize}px)` }}>
          <Database size={64} color={theme.palette.secondary.main} />
        </Box>
        {/* Right */}
        <Box sx={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${halfSize}px)` }}>
          <Server size={64} color={theme.palette.info.main} />
        </Box>
        {/* Left */}
        <Box sx={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}>
          <Globe size={64} color={theme.palette.success.main} />
        </Box>
        {/* Top */}
        <Box sx={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${halfSize}px)` }}>
          <Cpu size={64} color={theme.palette.warning.main} />
        </Box>
        {/* Bottom */}
        <Box sx={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}>
          <Layers size={64} color={theme.palette.error.main} />
        </Box>
      </motion.div>
    </Box>
  );
};
