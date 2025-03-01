import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
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
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Welcome to the Category Manager</h2>
        <p>Please select a category from the list on the left to view its details and cards.</p>
        <div data-testid="selected-id">Selected: null</div>
      </div>
    );
  }

  // Handle loading state
  if (loading && !data) {
    return (
      <div>
        <div>Loading...</div>
        <div data-testid="selected-id">Selected: {selectedCategory}</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h3>Error</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch?.(variables)}>Retry</button>
        <button onClick={() => onSelectCategory(null)}>Clear Selection</button>
        <div data-testid="selected-id">Selected: {selectedCategory}</div>
      </div>
    );
  }

  // Handle case where category is not found
  if (selectedCategory && !loading && !data?.category) {
    return (
      <div style={{ padding: '20px', color: 'orange' }}>
        <h3>Category Not Found</h3>
        <p>The selected category may have been deleted or is no longer available.</p>
        <button onClick={() => onSelectCategory(null)}>Return to Category Selection</button>
        <div data-testid="selected-id">Selected: {selectedCategory}</div>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="selected-id">Selected: {selectedCategory}</div>
      <div>
        <h2>{data?.category?.name}</h2>
        <div>
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
      <CardTable
        data={cardData}
        onSelectCard={onSelectCard}
      />
      {data?.category?.cards?.pageInfo?.hasNextPage && (
        <button data-testid="load-more-button" onClick={() => getMoreData()}>
          Load More
        </button>
      )}
      {data?.category?.cards?.pageInfo?.totalCount && (
        <div data-testid="showing-message">
          Showing {cardData.length} / {data.category.cards.pageInfo.totalCount}
        </div>
      )}
    </div>
  );
};

export { CategoryContainer, GetCategoryWithCardsDocument };
