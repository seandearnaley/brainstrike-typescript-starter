import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  useGetCardsQuery,
  useAddCardMutation,
  GetCardsDocument,
  GetCardsQuery,
} from '../../generated/graphql';
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
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useGetCardsQuery();
  const [
    addCardMutation,
    {
      data: addMutationData,
      loading: addMutationLoading,
      error: addMutationError,
    },
  ] = useAddCardMutation({
    update(cache, { data }) {
      const cardQuery = cache.readQuery<GetCardsQuery>({
        query: GetCardsDocument,
      });

      cache.writeQuery<GetCardsQuery>({
        query: GetCardsDocument,
        data: {
          cards:
            cardQuery &&
            cardQuery.cards &&
            cardQuery.cards.concat(
              data && data.addCard.card ? [data.addCard.card] : [],
            ),
        },
      });
    },
  });

  if (queryLoading) return <div>loading....</div>;
  if (queryError) return <p>ERROR: {queryError.message}</p>;

  if (addMutationData) console.log(addMutationData.addCard.message);

  let renderComponent = (
    <NewCardForm addHandler={addCardMutation}></NewCardForm>
  );

  if (addMutationLoading) {
    renderComponent = <div>mutation loading....</div>;
  } else if (addMutationError) {
    renderComponent = <div>mutation ERROR: {addMutationError.message}</div>;
  }
  return (
    <div className={classes.root}>
      {renderComponent}
      <Grid container spacing={3}>
        {queryData &&
          queryData.cards &&
          queryData.cards.map(card => (
            <Grid key={card.id} item sm={3} className={classes.gridItem}>
              <SimpleCard card={card}></SimpleCard>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
