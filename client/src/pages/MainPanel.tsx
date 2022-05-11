import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CardManager } from './CardManager';
import { CardsNav } from './CardsNav';
import { useStyles } from '../styles';

export const MainPanel: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Routes>
        <Route path="/cards" element={<CardManager />} />
        <Route path="/sets" element={<CardsNav />} />
        <Route path="/">Open drawer with icon in top left.</Route>
      </Routes>
    </main>
  );
};
