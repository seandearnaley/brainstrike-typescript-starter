import React from 'react';
import { Cards } from './cards/Cards';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    //flexGrow: 1,
    padding: '10px',
    height: '100vh',
    overflow: 'auto',
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
        <Route path="/sets"></Route>
        <Route path="/">Root</Route>
      </Switch>
    </main>
  );
};
