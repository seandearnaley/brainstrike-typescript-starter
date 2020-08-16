import React, { useEffect, useCallback, useState } from 'react';
import {
  useGetCardWithCategoriesLazyQuery,
  GetCardWithCategoriesDocument,
} from '../generated/graphql';
import { useRemoveCard } from './shared/useRemoveCard';

interface CardContainerProps {
  selectedCard: string | null;
  onSelectCard: (id: string | null) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
  selectedCard,
  onSelectCard,
}: CardContainerProps): React.ReactElement => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [removeCard, removeCardLoading, removeCardError] = useRemoveCard();

  const variables = {
    id: selectedCard,
  };

  const [getCard, { data, loading, error }] = useGetCardWithCategoriesLazyQuery(
    {
      variables,
    },
  );

  const memoizedGetCard = useCallback(getCard, [getCard]);

  useEffect(() => {
    if (selectedCard) {
      memoizedGetCard();
    }
  }, [memoizedGetCard, selectedCard]);

  const doRemoveCard = async () => {
    if (!selectedCard) return;
    await removeCard(selectedCard);
    onSelectCard(null);
  };

  if (loading) return <p data-testid="card-container-loading">Loading...</p>;
  if (error) return <p>ERROR {error.message}</p>;
  if (!selectedCard || !data?.card) return <p>Pick Card</p>;

  return (
    <div>
      <h1>{data.card?.number}</h1>
      <div>Selected: {variables.id}</div>
      <div>Label: {data.card?.label}</div>
      <div>Description: {data.card?.description}</div>
      <div>
        <button onClick={() => setShowConfirmRemove(true)}>Remove Card</button>

        {showConfirmRemove && (
          <button onClick={doRemoveCard}>Please Confirm Remove Card</button>
        )}
        {removeCardLoading && <span>Removing...</span>}
        {removeCardError && <span>Error...</span>}
      </div>
    </div>
  );
};

export { CardContainer, GetCardWithCategoriesDocument };
