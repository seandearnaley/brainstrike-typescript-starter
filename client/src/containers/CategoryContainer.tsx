import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { css } from '@emotion/css';
import {
  useGetCategoryWithCardsLazyQuery,
  GetCategoryWithCardsQuery,
  GetCategoryWithCardsDocument,
  DirectionEnum,
} from '../generated/graphql';
import { CardTable } from '../components/CardTable';
import { EditCategoryContainer } from './EditCategoryContainer';
import { RemoveCategoryContainer } from './RemoveCategoryContainer';

interface CategoryContainerProps {
  selectedCategory: string | null;
  onSelectCard: (id: string | null) => void;
  onSelectCategory: (id: string | null) => void;
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({
  selectedCategory,
  onSelectCard,
  onSelectCategory,
}: CategoryContainerProps) => {
  const variables = useMemo(() => ({
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.Asc,
    id: selectedCategory,
  }), [selectedCategory]);
  
  const [getCat, { data, loading, error, fetchMore, refetch }] =
    useGetCategoryWithCardsLazyQuery({
      variables,
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    });

  // Fetch data when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      console.log(`Fetching category with ID: ${selectedCategory}`);
      getCat();
    }
  }, [selectedCategory, getCat]);

  const cardData = useMemo(() => {
    if (!data?.category?.cards?.edges) {
      return [];
    }
    try {
      return data.category.cards.edges.map(
        ({ node: { id, number, label, created, updated } }) => ({
          id,
          number,
          label,
          created,
          updated,
        }),
      );
    } catch (error) {
      console.error('Error processing card data:', error);
      return [];
    }
  }, [data]);

  const getMoreData = useCallback((): Promise<ApolloQueryResult<GetCategoryWithCardsQuery>> | undefined => {
    if (!fetchMore || !data?.category?.cards?.pageInfo?.endCursor) {
      return;
    }
    return fetchMore({
      variables: {
        ...variables,
        after: data.category.cards.pageInfo.endCursor,
      },
    });
  }, [fetchMore, data, variables]);

  // If no category is selected, show a message to select one
  if (!selectedCategory) {
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
        `}>Category Manager</h2>
        <div className={css`
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 24px;
          max-width: 400px;
        `}>
          <p className={css`color: #757575; margin-bottom: 0;`}>
            Please select a category from the list on the left to view its details and cards.
          </p>
        </div>
        <div data-testid="selected-id" className={css`display: none;`}>Selected: null</div>
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
        <div className={css`
          color: #3f51b5;
          font-weight: 500;
          margin-bottom: 16px;
        `}>Loading...</div>
        <div data-testid="selected-id" className={css`
          font-size: 0.75rem;
          color: #757575;
        `}>Selected: {selectedCategory}</div>
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
            onClick={() => onSelectCategory(null)}
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
        <div data-testid="selected-id" className={css`
          font-size: 0.75rem;
          color: #757575;
          margin-top: 16px;
        `}>Selected: {selectedCategory}</div>
      </div>
    );
  }

  // Handle case where category is not found
  if (selectedCategory && !loading && !data?.category) {
    return (
      <div className={css`
        padding: 24px;
        color: #ff9800;
        background-color: #fff3e0;
        border-radius: 8px;
        margin-bottom: 16px;
      `}>
        <h3 className={css`margin-top: 0;`}>Category Not Found</h3>
        <p>The selected category may have been deleted or is no longer available.</p>
        <button
          onClick={() => onSelectCategory(null)}
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
          Return to Category Selection
        </button>
        <div data-testid="selected-id" className={css`
          font-size: 0.75rem;
          color: #757575;
          margin-top: 16px;
        `}>Selected: {selectedCategory}</div>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="selected-id" className={css`
        font-size: 0.75rem;
        color: #757575;
        margin-bottom: 8px;
      `}>Selected: {selectedCategory}</div>
      
      <div className={css`
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin-bottom: 16px;
      `}>
        <div className={css`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        `}>
          <EditCategoryContainer
            id={selectedCategory}
            originalCategoryName={data?.category?.name}
          />
          <RemoveCategoryContainer
            id={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
      
      <div className={css`
        margin-bottom: 16px;
      `}>
        <div className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        `}>
          <h3 className={css`
            margin: 0;
            color: #3f51b5;
            font-weight: 500;
            font-size: 1.25rem;
          `}>Cards in this Category</h3>
          
          {data?.category?.cards?.pageInfo?.totalCount !== undefined && (
            <div className={css`
              background-color: #e8eaf6;
              color: #3f51b5;
              border-radius: 16px;
              padding: 4px 12px;
              font-size: 0.75rem;
              font-weight: 500;
            `}>
              {cardData.length} / {data.category.cards.pageInfo.totalCount} cards
            </div>
          )}
        </div>
        
        <CardTable
          data={cardData}
          onSelectCard={onSelectCard}
        />
        
        {data?.category?.cards?.pageInfo?.hasNextPage && (
          <div className={css`
            display: flex;
            justify-content: center;
            margin-top: 16px;
          `}>
            <button
              data-testid="load-more-button"
              onClick={() => getMoreData()}
              className={css`
                background-color: #3f51b5;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #303f9f;
                }
              `}
            >
              Load More Cards
            </button>
          </div>
        )}
        
        {data?.category?.cards?.pageInfo?.totalCount && (
          <div data-testid="showing-message" className={css`
            text-align: center;
            color: #757575;
            font-size: 0.75rem;
            margin-top: 8px;
          `}>
            Showing {cardData.length} / {data.category.cards.pageInfo.totalCount}
          </div>
        )}
      </div>
    </div>
  );
};

export { CategoryContainer, GetCategoryWithCardsDocument };