import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Box, Card, CardContent, useTheme, alpha } from '@mui/material';
import { PROJECTS } from '../constants';

export const Projects: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="section" id="projects" sx={{ py: 12, bgcolor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" id="projects-heading" gutterBottom>Featured Projects</Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {PROJECTS.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                      display: 'flex', 
                      flexDirection: 'column',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      bgcolor: theme.palette.background.paper,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': { 
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: -0.5 }}>{project.title}</Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            px: 1.2, 
                            py: 0.4, 
                            bgcolor: project.category === 'Professional' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.secondary.main, 0.1), 
                            color: project.category === 'Professional' ? 'primary.main' : 'secondary.main',
                            borderRadius: '100px',
                            fontWeight: 800,
                            fontSize: '0.6rem',
                            textTransform: 'uppercase',
                            border: `1px solid ${project.category === 'Professional' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.secondary.main, 0.2)}`
                          }}
                        >
                          {project.category}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6, fontSize: '0.9rem' }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                        {project.tags.map(tag => (
                          <Typography 
                            key={tag} 
                            variant="caption" 
                            sx={{ 
                              px: 1.2, 
                              py: 0.4, 
                              bgcolor: alpha(theme.palette.text.primary, 0.03), 
                              color: 'text.secondary',
                              borderRadius: 1,
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                            }}
                          >
                            {tag}
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
