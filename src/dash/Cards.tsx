import React from 'react';
import { useGetCardsQuery } from '../generated/graphql';

interface CardsProps {
  name: string;
}

export const Cards: React.FC<CardsProps> = (
  props: CardsProps,
): React.ReactElement => {
  const { data, loading, error } = useGetCardsQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  const cards = data && data.cards;

  return (
    <div>
      {cards &&
        cards.map(card => (
          <div key={card.id}>
            {card.id} {card.description} {card.label}
          </div>
        ))}{' '}
      {props.name}
    </div>
  );
};
