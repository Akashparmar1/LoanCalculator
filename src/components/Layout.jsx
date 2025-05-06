import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Container, useMediaQuery, Paper
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Menu, Home, BarChart2, DollarSign, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Layout = ({ children }) => {
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <Home size={20} />, path: '/' },
    { text: 'Amortization', icon: <BarChart2 size={20} />, path: '/amortization' },
    { text: 'Currency Rates', icon: <DollarSign size={20} />, path: '/currency-rates' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: mode === 'light' ? 'white' : '#121212',
          color: mode === 'light' ? 'text.primary' : 'white',
          transition: 'all 0.3s ease',
          borderBottom: 1,
          borderColor: mode === 'light' ? 'grey.200' : 'grey.800',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: 0.5,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Loan Calculator
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor:
                        mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton
            color="inherit"
            onClick={toggleColorMode}
            sx={{
              ml: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(30deg)',
              }
            }}
          >
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>

      <Paper
        component="footer"
        square
        elevation={0}
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: mode === 'light' ? 'grey.100' : 'grey.900',
          borderTop: 1,
          borderColor: mode === 'light' ? 'grey.200' : 'grey.800',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} LoanCalc. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Layout;
