import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import { CategoryContainer } from '../containers/CategoryContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }),
);

export const CardsNav: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CategoryContainer></CategoryContainer>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Card Container Goes Here</Paper>
        </Grid>
      </Grid>
    </div>
  );
};
