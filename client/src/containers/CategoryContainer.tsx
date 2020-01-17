import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useGetCategoriesQuery } from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    gridItem: {
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fabAdd: {
      margin: '0px',
      top: 'auto',
      right: '20px',
      bottom: '20px',
      left: 'auto',
      position: 'fixed',
    },
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export const CategoryContainer: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {data &&
            data.categories &&
            data.categories.map(category => (
              <div key={category.id}>
                {category.id}
                <br />
                {category.name}
              </div>
            ))}
        </Grid>
      </Container>
    </div>
  );
};
