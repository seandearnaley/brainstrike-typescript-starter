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
    <div>
      {renderComponent}
      {queryData &&
        queryData.cards &&
        queryData.cards.map(card => (
          <SimpleCard key={card.id} card={card}></SimpleCard>
        ))}
    </div>
  );
};
