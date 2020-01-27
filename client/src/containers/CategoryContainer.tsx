import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useGetCategoriesQuery } from '../generated/graphql';
import { useStyles } from '../styles';

export const CategoryContainer: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div className={classes.cardContainerRoot}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {data?.categories?.map(category => (
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
