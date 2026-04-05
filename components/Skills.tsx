import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Box, Paper, useTheme, alpha } from '@mui/material';
import { SKILLS } from '../constants';

export const Skills: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="section" id="skills" sx={{ py: 12, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" id="skills-heading" gutterBottom>Technical Skills</Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {SKILLS.map((skill, index) => (
              <Grid item xs={12} sm={6} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': { borderColor: theme.palette.primary.main }
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" fontWeight={600}>{skill.name}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                        {skill.category}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
