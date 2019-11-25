import React from 'react';
import {
  useGetCardsQuery,
  useAddCardMutation,
  GetCardsDocument,
  GetCardsQuery,
} from '../../generated/graphql';
import { SimpleCard } from './SimpleCard';
import NewCardForm from './NewCardForm';

export const Cards: React.FC = (): React.ReactElement => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useGetCardsQuery();
  const [
    addCardMutation,
    {
      // data: addMutationData,
      loading: addMutationLoading,
      error: addMutationError,
    },
  ] = useAddCardMutation({
    update(cache, { data }) {
      const cardQuery = cache.readQuery<GetCardsQuery>({
        query: GetCardsDocument,
      });

      const acard = data && data.addCard && data.addCard.card;

      cache.writeQuery<GetCardsQuery>({
        query: GetCardsDocument,
        data: {
          cards:
            cardQuery &&
            cardQuery.cards &&
            cardQuery.cards.concat(acard ? [acard] : []),
        },
      });
    },
  });

  if (queryLoading) return <div>loading....</div>;
  if (queryError) return <p>ERROR: {queryError.message}</p>;
  if (addMutationLoading) return <div>mutation loading....</div>;
  if (addMutationError)
    return <div>mutation ERROR: {addMutationError.message}</div>;

  const cards = queryData && queryData.cards;

  return (
    <div>
      <NewCardForm addHandler={addCardMutation}></NewCardForm>
      {cards &&
        cards.map(card => <SimpleCard key={card.id} card={card}></SimpleCard>)}
    </div>
  );
};
