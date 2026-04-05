import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Button, 
  Container, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  useTheme as useMuiTheme,
  alpha
} from '@mui/material';
import { Menu as MenuIcon, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const { mode, toggleColorMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Ajaykumar<span style={{ color: muiTheme.palette.primary.main }}>.dev</span>
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component="a" href={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="inherit" 
        elevation={isScrolled ? 1 : 0}
        sx={{ 
          transition: 'all 0.3s',
          bgcolor: isScrolled 
            ? alpha(muiTheme.palette.background.paper, 0.8) 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          backgroundImage: 'none',
          borderBottom: isScrolled ? `1px solid ${muiTheme.palette.divider}` : 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: isScrolled ? 64 : 80, transition: 'min-height 0.3s' }}>
            <Typography variant="h6" component="a" href="#" sx={{ flexGrow: 1, fontWeight: 700, textDecoration: 'none', color: 'text.primary', fontSize: '1.5rem' }}>
              Ajaykumar<span style={{ color: muiTheme.palette.primary.main }}>.dev</span>
            </Typography>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navLinks.map((item) => (
                <Button 
                  key={item.name} 
                  href={item.href}
                  sx={{ 
                    color: 'text.secondary', 
                    '&:hover': { color: 'primary.main', bgcolor: alpha(muiTheme.palette.primary.main, 0.05) } 
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <IconButton onClick={toggleColorMode} sx={{ ml: 1 }}>
                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </Box>

            {/* Mobile Nav Toggle */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
              <IconButton onClick={toggleColorMode}>
                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};