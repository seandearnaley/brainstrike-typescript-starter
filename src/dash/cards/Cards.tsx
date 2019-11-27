import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useGetCardsQuery } from '../../generated/graphql';
import { SimpleCard } from './SimpleCard';
import NewCardForm from './NewCardForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    gridItem: {
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export const Cards: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { data, loading, error } = useGetCardsQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div className={classes.root}>
      <NewCardForm></NewCardForm>
      <Grid container spacing={3}>
        {data &&
          data.cards &&
          data.cards.map(card => (
            <Grid key={card.id} item sm={3} className={classes.gridItem}>
              <SimpleCard card={card}></SimpleCard>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
