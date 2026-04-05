import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Box, Paper, useTheme, alpha } from '@mui/material';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

export const Contact: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="section" id="contact" sx={{ py: 12 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" id="contact-heading" gutterBottom>Let's Connect</Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>Contact Information</Typography>
                <Typography variant="body1" color="text.secondary">
                  I'm always open to discussing new opportunities, technical challenges, or professional networking.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: '50%', display: 'flex' }}>
                    <Mail size={32} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Email</Typography>
                    <Typography variant="body1" fontWeight={600}>{PORTFOLIO_DATA.email}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: '50%', display: 'flex' }}>
                    <Phone size={32} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Phone</Typography>
                    <Typography variant="body1" fontWeight={600}>{PORTFOLIO_DATA.phone}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: '50%', display: 'flex' }}>
                    <MapPin size={32} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Location</Typography>
                    <Typography variant="body1" fontWeight={600}>{PORTFOLIO_DATA.location}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};
