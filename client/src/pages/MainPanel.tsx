import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CardManager } from './CardManager';
import { CardsNav } from './CardsNav';
import { useStyles } from '../styles';

export const MainPanel: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Switch>
        <Route path="/cards">
          <CardManager></CardManager>
        </Route>
        <Route path="/sets">
          <CardsNav></CardsNav>
        </Route>
        <Route path="/">Root</Route>
      </Switch>
    </main>
  );
};
