import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { ImmersiveBackground } from './components/ImmersiveBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Megami } from './components/Megami';
import { Box } from '@mui/material';

const SectionWrapper = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <Box 
    id={id}
    sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      py: { xs: 8, md: 0 }
    }}
  >
    {children}
  </Box>
);

function App() {
  return (
    <ThemeProvider>
      <Box sx={{ position: 'relative', overflowX: 'hidden' }}>
        <ScrollProgress />
        <Megami />
        <ImmersiveBackground />
        <Header />
        <main>
          <SectionWrapper>
            <Hero />
          </SectionWrapper>
          
          <SectionWrapper>
            <About />
          </SectionWrapper>
          
          <SectionWrapper>
            <Skills />
          </SectionWrapper>
          
          <SectionWrapper>
            <Experience />
          </SectionWrapper>
          
          <SectionWrapper>
            <Projects />
          </SectionWrapper>
          
          <SectionWrapper>
            <Contact />
          </SectionWrapper>
          <Footer />
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default App;