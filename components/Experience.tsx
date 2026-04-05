import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Box, Card, CardContent, useTheme, alpha } from '@mui/material';
import { EXPERIENCE } from '../constants';

export const Experience: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="section" id="experience" sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" id="experience-heading" gutterBottom>Experience</Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {EXPERIENCE.map((exp, index) => (
              <Grid item xs={12} sm={6} md={4} key={exp.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%', 
                      position: 'relative',
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-5px)',
                        bgcolor: theme.palette.background.paper,
                        boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'primary.main', 
                          fontWeight: 800, 
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          mb: 1,
                          display: 'block'
                        }}
                      >
                        {exp.period}
                      </Typography>
                      <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                        {exp.role}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
                        {exp.company}
                      </Typography>
                      
                      <Box component="ul" sx={{ mt: 2, pl: 2, color: 'text.secondary', flexGrow: 1 }}>
                        {exp.description.map((item, i) => (
                          <Typography 
                            key={i} 
                            component="li" 
                            variant="body2" 
                            sx={{ 
                              mb: 1,
                              fontSize: '0.85rem',
                              '&::marker': { color: theme.palette.primary.main }
                            }}
                          >
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
