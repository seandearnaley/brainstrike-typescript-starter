import React from 'react';
import { useGetCardsQuery } from '../../generated/graphql';
import { SimpleCard } from './Card';
import NewCardForm from './NewCardForm';

export const Cards: React.FC = (): React.ReactElement => {
  const { data, loading, error } = useGetCardsQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  const cards = data && data.cards;

  return (
    <div>
      <NewCardForm></NewCardForm>
      {cards &&
        cards.map(card => <SimpleCard key={card.id} card={card}></SimpleCard>)}
    </div>
  );
};
