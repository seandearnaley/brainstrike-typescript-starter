import React from 'react';
import clsx from 'clsx';
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
import { ListItemLink } from '../components/ListItemLink';
import { MainPanel } from './MainPanel';
import { useStyles } from '../styles';
import { css } from '@emotion/css';

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  // Simple toggle function instead of separate open/close
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="primary"
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            className={classes.menuButton}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
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
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
        >
          <div className={classes.toolbarIcon}>
            <div className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 16px;
              width: 100%;
              min-height: 64px; /* Match AppBar height */
            `}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={css`
                  color: #3f51b5;
                  font-weight: 500;
                `}
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
            </div>
          </div>
          <Divider />
          <List className={css`
            padding: 0;
            
            & .MuiListItem-root {
              padding: 12px 16px;
              
              &:hover {
                background-color: rgba(63, 81, 181, 0.08);
              }
            }
          `}>
            <ListItemLink primary={
              <div className={css`
                display: flex;
                align-items: center;
                gap: 16px;
                
                & svg {
                  color: #3f51b5;
                  min-width: 24px;
                }
              `}>
                <DashboardIcon /> <span>Cards</span>
              </div>
            } to="/cards" />
            <ListItemLink primary={
              <div className={css`
                display: flex;
                align-items: center;
                gap: 16px;
                
                & svg {
                  color: #3f51b5;
                  min-width: 24px;
                }
              `}>
                <LayersIcon /> <span>Sets</span>
              </div>
            } to="/sets" />
          </List>
        </Drawer>
        <main className={classes.content}>
          <MainPanel />
        </main>
      </Router>
    </div>
  );
};

export default Dashboard;