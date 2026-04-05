import React from 'react';
import { Box, Container, Typography, alpha, useTheme } from '@mui/material';
import { PORTFOLIO_DATA } from '../constants';

export const Footer: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.3)
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
            Built with React, Material UI & Framer Motion
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
