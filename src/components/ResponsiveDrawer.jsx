import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mainTabValue, setMainTabValue] = React.useState(0);
  const [actionTabValue, setActionTabValue] = React.useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
    setActionTabValue(-1);
  };

  const handleActionTabChange = (event, newValue) => {
    setActionTabValue(newValue);
    setMainTabValue(-1);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, newValue) => {
    if (newValue < 5) {
      setMainTabValue(newValue);
      setActionTabValue(-1);
    } else {
      setActionTabValue(newValue - 5);
      setMainTabValue(-1);
    }
    handleMenuClose();
  };

  const tabs = [
    { label: 'Home', path: '/home' },
    { label: 'Blog', path: '/blog' },
    { label: 'Services', path: '/salonService' },
    { label: 'Products', path: '/products' },
    { label: 'Elegance AI', path: '/eleganceAi' },
    { label: 'Sign In', path: '/login' },
    { label: 'Sign Up', path: '/register' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#8d6e63', 
          height: '90px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="/logo2.png" alt="logo" style={{ height: '90px' }} />
          </Box>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {tabs.map((tab, index) => (
                  <MenuItem
                    key={tab.label}
                    selected={mainTabValue === index || actionTabValue === index - 5}
                    component={Link}
                    to={tab.path}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {tab.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 20px',
                }}
              >
                <Tabs
                  value={mainTabValue}
                  onChange={handleMainTabChange}
                  aria-label="centered tabs"
                  TabIndicatorProps={{
                    style: { display: 'none' },
                  }}
                  sx={{
                    '& .MuiTab-root': {
                      marginRight: '10px',
                      marginLeft: '10px',
                      padding: '12px 24px',
                    },
                  }}
                >
                  {tabs.slice(0, 5).map((tab, index) => (
                    <Tab
                      key={tab.label}
                      label={tab.label}
                      component={Link}
                      to={tab.path}
                      sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#E8D3B5', 
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#D4B499', 
                        },
                        '&.Mui-selected': {
                          color: '#FFFFFF', 
                          backgroundColor: '#704F41', 
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
              <Tabs
                value={actionTabValue}
                onChange={handleActionTabChange}
                aria-label="right-aligned tabs"
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
                sx={{
                  flexGrow: 0,
                  '& .MuiTab-root': {
                    marginRight: '30px',
                    padding: '12px 24px',
                  },
                }}
              >
                {tabs.slice(5).map((tab, index) => (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    component={Link}
                    to={tab.path}
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#E8D3B5',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#D4B499',
                      },
                      '&.Mui-selected': {
                        color: '#FFFFFF',
                        backgroundColor: '#704F41',
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        <Toolbar />
        {/* Add your main content here */}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
