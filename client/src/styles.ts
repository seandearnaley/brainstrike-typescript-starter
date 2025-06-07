import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import List from '@mui/material/List';

const drawerWidth = 240;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
});

// Styled components for the Dashboard layout
export const RootContainer = styled('div')({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  width: '100%',
  minHeight: 64, // Match AppBar height
  ...theme.mixins.toolbar,
}));

export const NavList = styled(List)({
  padding: 0,
  
  '& .MuiListItem-root': {
    padding: '12px 16px',
    
    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.08)',
    },
  },
});

export const Content = styled('main')({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: '#f9f9f9',
  padding: 0,
});

// Legacy styled components - can be removed if not used elsewhere
export const StyledAppBar = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const AppBarShift = styled(StyledAppBar)(({ theme }) => ({
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const MenuButton = styled('div')({
  marginRight: 24,
});

export const MenuButtonHidden = styled(MenuButton)({
  display: 'none',
});

export const Title = styled('div')({
  flexGrow: 1,
});

export const DrawerPaper = styled('div')({
  width: drawerWidth,
  backgroundColor: '#fff',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
});

export const ToolbarIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
  ...theme.mixins.toolbar,
}));

export const Toolbar = styled('div')({
  paddingRight: 16,
});

export const AppBarSpacer = styled('div')(({ theme }) => theme.mixins.toolbar);

export const NavRoot = styled('div')({
  height: 1000,
});