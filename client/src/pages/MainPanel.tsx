import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { Cards } from '../containers/CardContainer';
import { CardsNav } from './CardsNav';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '10px',
    height: '100vh',
    overflow: 'auto',
    width: '100vw',
  },
}));

export const MainPanel: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Switch>
        <Route path="/cards">
          <Cards></Cards>
        </Route>
        <Route path="/sets">
          <CardsNav></CardsNav>
        </Route>
        <Route path="/">Root</Route>
      </Switch>
    </main>
  );
};
