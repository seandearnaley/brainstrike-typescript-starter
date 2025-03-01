import React, { useEffect, useCallback, useState, useMemo } from 'react';
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

  const variables = useMemo(() => ({
    id: selectedCard,
  }), [selectedCard]);

  const [getCard, { data, loading, error, refetch }] = useGetCardWithCategoriesLazyQuery(
    {
      variables,
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
  );

  // Fetch data when selectedCard changes
  useEffect(() => {
    if (selectedCard) {
      console.log(`Fetching card with ID: ${selectedCard}`);
      getCard();
    }
  }, [selectedCard, getCard]);

  const doRemoveCard = async () => {
    if (!selectedCard) return;
    
    try {
      // First clear the selection to prevent queries for a non-existent card
      onSelectCard(null);
      
      // Small delay to ensure UI updates before removing the card
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Remove the card
      await removeCard(selectedCard);
      
      // Hide the confirmation button
      setShowConfirmRemove(false);
      
      console.log('Card removed successfully');
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };

  // If no card is selected, show a message to select one
  if (!selectedCard) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Card Details</h2>
        <p>Please select a card to view its details.</p>
      </div>
    );
  }

  // Handle loading state
  if (loading && !data) {
    return <p data-testid="card-container-loading">Loading...</p>;
  }

  // Handle error state
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h3>Error</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch?.(variables)}>Retry</button>
        <button onClick={() => onSelectCard(null)}>Clear Selection</button>
      </div>
    );
  }

  // Handle case where card is not found
  if (selectedCard && !loading && !data?.card) {
    return (
      <div style={{ padding: '20px', color: 'orange' }}>
        <h3>Card Not Found</h3>
        <p>The selected card may have been deleted or is no longer available.</p>
        <button onClick={() => onSelectCard(null)}>Return to Card Selection</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{data?.card?.number}</h1>
      <div>Selected: {variables.id}</div>
      <div>Label: {data?.card?.label}</div>
      <div>Description: {data?.card?.description}</div>
      <div>
        <button onClick={() => setShowConfirmRemove(true)}>Remove Card</button>

        {showConfirmRemove && (
          <button 
            onClick={doRemoveCard}
            disabled={removeCardLoading}
            style={{ backgroundColor: removeCardLoading ? '#ccc' : '#f44336', color: 'white', marginLeft: '10px' }}
          >
            {removeCardLoading ? 'Removing...' : 'Please Confirm Remove Card'}
          </button>
        )}
        {removeCardError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Error: {removeCardError.message}
          </div>
        )}
      </div>
    </div>
  );
};

export { CardContainer, GetCardWithCategoriesDocument };
