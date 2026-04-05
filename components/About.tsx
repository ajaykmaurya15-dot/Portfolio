import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Box, Paper, useTheme } from '@mui/material';
import { PORTFOLIO_DATA } from '../constants';
import { User, MapPin, Calendar, Globe } from 'lucide-react';
import { ReflowText } from './ReflowText';

const InfoCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string | React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 2 }
      }}
    >
      <Icon size={24} color={theme.palette.primary.main} style={{ marginBottom: 8 }} />
      <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" fontWeight={600} color="text.primary">
        {value}
      </Typography>
    </Paper>
  );
};

export const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="section" id="about" sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" id="about-heading" gutterBottom>About Me</Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    inset: -4, 
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 4,
                    filter: 'blur(10px)',
                    opacity: 0.3
                  }} 
                />
                <Box 
                  component="img"
                  src="https://lh3.googleusercontent.com/d/1Y2cx_KodK0Rnt4pBLybtnlhFgXAV7e7B"
                  alt={PORTFOLIO_DATA.name}
                  referrerPolicy="no-referrer"
                  sx={{ 
                    width: '100%', 
                    borderRadius: 4, 
                    position: 'relative', 
                    display: 'block',
                    boxShadow: 4,
                    aspectRatio: '3/4',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {PORTFOLIO_DATA.title} based in {PORTFOLIO_DATA.location}
              </Typography>
              <ReflowText 
                text={PORTFOLIO_DATA.about}
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
              />
              
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <InfoCard icon={User} title="Experience" value="5+ Years" />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <InfoCard icon={MapPin} title="Location" value={PORTFOLIO_DATA.location} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <InfoCard icon={Calendar} title="Availability" value="Open to work" />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <InfoCard icon={Globe} title="Working Style" value="Remote / Hybrid" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
