import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { navigationItems } from './MenuItem';

const drawerWidth = 240;

function DashboardLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const handleNavigate = (path) => {
    // Close the drawer
    setMobileOpen(false);
    // Navigate
    navigate(path);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const toggleExpandItem = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };
  const renderNavigationItem = (item, level = 0) => (
    <React.Fragment key={item.id}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => item.children ? toggleExpandItem(item.id) : handleNavigate(item.path)}>
          <ListItemIcon sx={{ ml: level * 2 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {item.children && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandItem(item.id);
              }}
              sx={
                {
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-focusVisible': {
                    outline: 'none'
                  }
                }}
            >
              {expandedItemId === item.id ? '-' : '+'}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      {item.children && expandedItemId === item.id && (
        <List component="div" disablePadding>
          {item.children.map(child => renderNavigationItem(child, level + 1))} {/* Increase level for nested items */}
        </List>
      )}
    </React.Fragment>
  );

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const drawer = (
    <div>
      <Toolbar>
        <Avatar alt="Avatar" src={user.img || 'https://via.placeholder.com/150'} />
        <ListItemText className='px-3'>
          {user.username || 'admin'}
        </ListItemText>
      </Toolbar>

      <List>
        {navigationItems.map(item => renderNavigationItem(item))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayout;
