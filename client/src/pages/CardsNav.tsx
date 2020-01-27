import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { CategoryContainer } from '../containers/CategoryContainer';
import { useStyles } from '../styles';

export const CardsNav: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.navRoot}>
      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.navPaper}>
            <CategoryContainer></CategoryContainer>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.navPaper}>Card Container Goes Here</Paper>
        </Grid>
      </Grid>
    </div>
  );
};
