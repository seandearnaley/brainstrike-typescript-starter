import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Cards } from './cards/Cards';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const MainPanel: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Typography
          component="div"
          style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
        >
          <Switch>
            <Route path="/cards">
              <Cards></Cards>
            </Route>
            <Route path="/sets"></Route>
            <Route path="/">Root</Route>
          </Switch>
        </Typography>
      </Container>
    </main>
  );
};
