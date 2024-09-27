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
          backgroundColor: '#ffe9d7',
          height: '150px'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="/HeySaraa.png" alt="logo" style={{ height: '150px' }} />
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
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Tabs value={mainTabValue} onChange={handleMainTabChange} aria-label="centered tabs" TabIndicatorProps={{
                  style: { display: 'none' }
                }} >
                  {tabs.slice(0, 5).map((tab, index) => (
                    <Tab
                      key={tab.label}
                      label={tab.label}
                      component={Link}
                      to={tab.path}
                      sx={{
                        fontSize:'16px',
                        fontWeight: '900',
                        color: '#0b0a09',
                        textDecoration: 'none',
                        '&.Mui-selected': {
                          color: '#563412',
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
              <Tabs value={actionTabValue} onChange={handleActionTabChange} aria-label="right-aligned tabs" TabIndicatorProps={{
                style: { display: 'none' }
              }} sx={{ flexGrow: 0 }}>
                {tabs.slice(5).map((tab, index) => (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    component={Link}
                    to={tab.path}
                    sx={{
                      fontSize:'16px',
                      fontWeight: '900',
                      color: '#0b0a09',
                      textDecoration: 'none',
                      '&.Mui-selected': {
                        color: '#563412',
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: '100%' }}
      >
        <Toolbar />
        <Typography paragraph>
          {/* Add your main content here */}
          Content for Main Tab {mainTabValue + 1}
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
