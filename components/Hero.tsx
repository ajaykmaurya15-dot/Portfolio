import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Container, Box, Button, Stack, useTheme, alpha } from '@mui/material';
import { Terminal, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import { TechCube } from './TechCube';
import { ReflowText } from './ReflowText';

export const Hero: React.FC = () => {
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      id="home"
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 8, md: 0 },
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} alignItems="center">
          <Box sx={{ flex: 1, position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: '50px', bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 3 }}>
                <Terminal size={16} color={theme.palette.primary.main} />
                <Typography variant="caption" color="primary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {PORTFOLIO_DATA.title} • {PORTFOLIO_DATA.yearsOfExperience} Exp
                </Typography>
              </Box>
              
              <ReflowText 
                text={PORTFOLIO_DATA.headline}
                variant="h1"
                sx={{ 
                  fontWeight: 800, 
                  mb: 2, 
                  fontSize: { xs: '3rem', md: '4.5rem' }, 
                  lineHeight: 1.1,
                  display: 'block'
                }}
              />

              <ReflowText 
                text={`Hi, I'm ${PORTFOLIO_DATA.name.split(' ')[0]}. ${PORTFOLIO_DATA.tagline}`}
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: 600, lineHeight: 1.6, fontWeight: 400 }}
              />

              <Stack direction="row" spacing={2} sx={{ mb: 6 }}>
                <Button 
                  href="#projects" 
                  variant="contained" 
                  size="large" 
                  endIcon={<ChevronRight size={18} />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  View Projects
                </Button>
                <Button 
                  href="#contact" 
                  variant="outlined" 
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Contact Me
                </Button>
              </Stack>

              <Stack direction="row" spacing={3}>
                {[
                  { icon: Github, url: PORTFOLIO_DATA.github },
                  { icon: Linkedin, url: PORTFOLIO_DATA.linkedin },
                  { icon: Mail, url: `https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.email}` }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.url} 
                    target="_blank" 
                    rel="noopener"
                    whileHover={{ scale: 1.2, color: theme.palette.primary.main }}
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <item.icon size={24} />
                  </motion.a>
                ))}
              </Stack>
            </motion.div>
          </Box>

          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, position: 'relative', perspective: '1000px' }}>
             <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
            >
              <TechCube />
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};