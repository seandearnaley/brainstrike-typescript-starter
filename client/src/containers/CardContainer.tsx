import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { css } from '@emotion/css';
import {
  useGetCardWithCategoriesLazyQuery,
  GetCardWithCategoriesDocument,
} from '../generated/graphql';
import { useRemoveCard } from './shared/useRemoveCard';
import { format } from 'date-fns';

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
      <div className={css`
        padding: 24px;
        text-align: center;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}>
        <h2 className={css`
          color: #3f51b5;
          margin-bottom: 16px;
          font-weight: 500;
        `}>Card Details</h2>
        <div className={css`
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 24px;
          max-width: 400px;
          text-align: center;
        `}>
          <p className={css`color: #757575; margin-bottom: 0;`}>
            Please select a card from the list to view its details.
          </p>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (loading && !data) {
    return (
      <div className={css`
        padding: 24px;
        text-align: center;
      `}>
        <p data-testid="card-container-loading" className={css`
          color: #3f51b5;
          font-weight: 500;
        `}>Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={css`
        padding: 24px;
        color: #f44336;
        background-color: #ffebee;
        border-radius: 8px;
        margin-bottom: 16px;
      `}>
        <h3 className={css`margin-top: 0;`}>Error</h3>
        <p>{error.message}</p>
        <div className={css`
          display: flex;
          gap: 8px;
          margin-top: 16px;
        `}>
          <button
            onClick={() => refetch?.(variables)}
            className={css`
              background-color: #3f51b5;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 8px 16px;
              font-size: 0.875rem;
              cursor: pointer;
              
              &:hover {
                background-color: #303f9f;
              }
            `}
          >
            Retry
          </button>
          <button
            onClick={() => onSelectCard(null)}
            className={css`
              background-color: #e0e0e0;
              color: #424242;
              border: none;
              border-radius: 4px;
              padding: 8px 16px;
              font-size: 0.875rem;
              cursor: pointer;
              
              &:hover {
                background-color: #bdbdbd;
              }
            `}
          >
            Clear Selection
          </button>
        </div>
      </div>
    );
  }

  // Handle case where card is not found
  if (selectedCard && !loading && !data?.card) {
    return (
      <div className={css`
        padding: 24px;
        color: #ff9800;
        background-color: #fff3e0;
        border-radius: 8px;
        margin-bottom: 16px;
      `}>
        <h3 className={css`margin-top: 0;`}>Card Not Found</h3>
        <p>The selected card may have been deleted or is no longer available.</p>
        <button
          onClick={() => onSelectCard(null)}
          className={css`
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 0.875rem;
            cursor: pointer;
            margin-top: 8px;
            
            &:hover {
              background-color: #f57c00;
            }
          `}
        >
          Return to Card Selection
        </button>
      </div>
    );
  }

  return (
    <div className={css`
      height: 100%;
      display: flex;
      flex-direction: column;
    `}>
      <div className={css`
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 24px;
        margin-bottom: 16px;
        flex-grow: 1;
      `}>
        <div className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        `}>
          <h1 className={css`
            margin: 0;
            color: #3f51b5;
            font-size: 2rem;
            font-weight: 500;
          `}>
            {data?.card?.number || 'N/A'}
          </h1>
          <div className={css`
            background-color: #e8eaf6;
            color: #3f51b5;
            border-radius: 16px;
            padding: 4px 12px;
            font-size: 0.75rem;
            font-weight: 500;
          `}>
            Card #{data?.card?.number}
          </div>
        </div>
        
        <div className={css`margin-bottom: 16px;`}>
          <h3 className={css`
            margin-top: 0;
            margin-bottom: 4px;
            color: #424242;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
          `}>Label</h3>
          <p className={css`
            margin: 0;
            font-size: 1.25rem;
            color: #212121;
          `}>{data?.card?.label || 'Untitled'}</p>
        </div>
        
        {data?.card?.description && (
          <div className={css`margin-bottom: 24px;`}>
            <h3 className={css`
              margin-top: 0;
              margin-bottom: 4px;
              color: #424242;
              font-size: 0.75rem;
              font-weight: 500;
              text-transform: uppercase;
            `}>Description</h3>
            <p className={css`
              margin: 0;
              font-size: 1rem;
              color: #424242;
              line-height: 1.5;
              white-space: pre-wrap;
            `}>{data.card.description}</p>
          </div>
        )}
        
        <div className={css`
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        `}>
          <h3 className={css`
            margin: 0;
            width: 100%;
            color: #424242;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 4px;
          `}>Categories</h3>
          
          {data?.card?.categories && data.card.categories.length > 0 ? (
            data.card.categories.map(category => (
              <div key={category.id} className={css`
                background-color: #e8eaf6;
                color: #3f51b5;
                border-radius: 16px;
                padding: 4px 12px;
                font-size: 0.75rem;
                display: inline-block;
              `}>
                {category.name}
              </div>
            ))
          ) : (
            <p className={css`
              margin: 0;
              font-size: 0.875rem;
              color: #757575;
              font-style: italic;
            `}>No categories assigned</p>
          )}
        </div>
        
        <div className={css`
          display: flex;
          justify-content: space-between;
          color: #757575;
          font-size: 0.75rem;
          border-top: 1px solid #e0e0e0;
          padding-top: 16px;
        `}>
          <div>
            <span className={css`font-weight: 500;`}>Created:</span>{' '}
            {data?.card?.created && format(new Date(data.card.created), 'MMM dd, yyyy, h:mm a')}
          </div>
          <div>
            <span className={css`font-weight: 500;`}>Updated:</span>{' '}
            {data?.card?.updated
              ? format(new Date(data.card.updated), 'MMM dd, yyyy, h:mm a')
              : 'Never'}
          </div>
        </div>
      </div>
      
      <div className={css`
        display: flex;
        gap: 16px;
        justify-content: flex-start;
      `}>
        {!showConfirmRemove ? (
          <button 
            onClick={() => setShowConfirmRemove(true)}
            className={css`
              background-color: #f44336;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 8px 16px;
              font-size: 0.875rem;
              cursor: pointer;
              transition: background-color 0.2s;
              
              &:hover {
                background-color: #d32f2f;
              }
            `}
          >
            Remove Card
          </button>
        ) : (
          <>
            <button
              onClick={doRemoveCard}
              disabled={removeCardLoading}
              className={css`
                background-color: ${removeCardLoading ? '#bdbdbd' : '#f44336'};
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-size: 0.875rem;
                cursor: ${removeCardLoading ? 'not-allowed' : 'pointer'};
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: ${removeCardLoading ? '#bdbdbd' : '#d32f2f'};
                }
              `}
            >
              {removeCardLoading ? 'Removing...' : 'Confirm Remove'}
            </button>
            
            <button
              onClick={() => setShowConfirmRemove(false)}
              className={css`
                background-color: #e0e0e0;
                color: #424242;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #bdbdbd;
                }
              `}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      
      {removeCardError && (
        <div className={css`
          color: #f44336;
          background-color: #ffebee;
          padding: 12px;
          border-radius: 4px;
          margin-top: 16px;
          font-size: 0.875rem;
        `}>
          Error: {removeCardError.message}
        </div>
      )}
    </div>
  );
};

export { CardContainer, GetCardWithCategoriesDocument };