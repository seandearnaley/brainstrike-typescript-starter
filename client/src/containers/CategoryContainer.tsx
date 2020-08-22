import React, { useMemo, useEffect, useCallback } from 'react';
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
  const variables = {
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.Asc,
    id: selectedCategory,
  };

  const [
    getCat,
    { data, loading, error, fetchMore },
  ] = useGetCategoryWithCardsLazyQuery({
    variables,
  });

  const cardData = useMemo(() => {
    return (
      data?.category.cards.edges.map(
        ({ node: { id, number, label, created, updated } }) => ({
          id,
          number,
          label,
          created,
          updated,
        }),
      ) ?? []
    );
  }, [data]);

  const memoizedGetCat = useCallback(getCat, [getCat]);

  useEffect(() => {
    if (selectedCategory) memoizedGetCat();
  }, [memoizedGetCat, selectedCategory]);

  const getMoreData = ():
    | Promise<ApolloQueryResult<GetCategoryWithCardsQuery>>
    | undefined => {
    if (!fetchMore) return; // ts started throwing errors saying it cannot avoke fetchMore because it could be undefined, this is a workaround

    fetchMore({
      variables: {
        ...variables,
        after: data?.category?.cards.pageInfo.endCursor,
      },
    });
  };

  if (loading) return <p data-testid="category-loading">Loading...</p>;
  if (error) return <p>ERROR</p>;

  if (!selectedCategory || !data?.category)
    return <p data-testid="select-category-message">Select Category</p>;
  return (
    <div>
      <EditCategoryContainer
        id={data.category.id}
        originalCategoryName={data.category.name}
      />
      <div data-testid="selected-id">Selected: {variables.id}</div>
      <CardTable data={cardData} onSelectCard={onSelectCard} />
      {data.category.cards.pageInfo.hasNextPage && (
        <button data-testid="load-more-button" onClick={getMoreData}>
          Load More
        </button>
      )}
      <div data-testid="showing-message">
        Showing {data.category.cards.edges.length} /{' '}
        {data.category.cards.pageInfo.totalCount}
      </div>
      <RemoveCategoryContainer
        id={data.category.id}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

export { CategoryContainer, GetCategoryWithCardsDocument };
