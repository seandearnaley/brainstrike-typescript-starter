import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ListItemLink } from '../components/ListItemLink';
import { MainPanel } from './MainPanel';
import { 
  RootContainer, 
  Content,
  DrawerHeader,
  NavList
} from '../styles';

const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  return (
    <RootContainer>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ paddingRight: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: 3 }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Brainstrike Card Manager
          </Typography>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Router>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              width: 240,
              backgroundColor: '#fff',
              boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
            }
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerHeader>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              noWrap
              sx={{ fontWeight: 500 }}
            >
              Brainstrike
            </Typography>
            <IconButton 
              onClick={toggleDrawer} 
              size="large"
              aria-label="close drawer"
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NavList>
            <ListItemLink 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <DashboardIcon sx={{ color: 'primary.main', minWidth: 24 }} />
                  <span>Cards</span>
                </Box>
              } 
              to="/cards" 
            />
            <ListItemLink 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LayersIcon sx={{ color: 'primary.main', minWidth: 24 }} />
                  <span>Sets</span>
                </Box>
              } 
              to="/sets" 
            />
          </NavList>
        </Drawer>
        <Content>
          <MainPanel />
        </Content>
      </Router>
    </RootContainer>
  );
};

export default Dashboard;