import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardManager } from './CardManager';
import { CardsNav } from './CardsNav';
import { AppBarSpacer } from '../styles';

export const MainPanel: React.FC = () => {
  return (
    <>
      <AppBarSpacer />
      <Box sx={{ height: 'calc(100% - 64px)' }}>
        <Routes>
          <Route path="/cards" element={<CardManager />} />
          <Route path="/sets" element={<CardsNav />} />
          <Route path="/" element={
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              padding: 3,
            }}>
              <Typography 
                variant="h4" 
                component="h2"
                color="primary"
                sx={{ 
                  marginBottom: 2,
                  fontWeight: 500,
                }}
              >
                Welcome to Brainstrike Card Manager
              </Typography>
              <Typography 
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  lineHeight: 1.5,
                }}
              >
                Use the navigation menu to access cards and sets. Click on the menu icon in the top left
                to expand the navigation drawer.
              </Typography>
            </Box>
          } />
        </Routes>
      </Box>
    </>
  );
};