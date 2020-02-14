import React, { useMemo, useEffect, useCallback } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  useGetCategoryWithCardsLazyQuery,
  GetCategoryWithCardsQuery,
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

export const CategoryContainer: React.FC<CategoryContainerProps> = ({
  selectedCategory,
  onSelectCard,
  onSelectCategory,
}: CategoryContainerProps) => {
  const variables = {
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.Asc,
    id: selectedCategory ?? '',
  };

  const [
    getCat,
    { data, loading, error, fetchMore },
  ] = useGetCategoryWithCardsLazyQuery({
    variables,
  });

  const cardData = useMemo(() => {
    return (
      data?.category?._cards?.edges.map(
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

  const getMoreData = (): Promise<ApolloQueryResult<
    GetCategoryWithCardsQuery
  >> =>
    fetchMore({
      variables: {
        ...variables,
        after: data?.category?._cards?.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.category?._cards?.edges;
        const pageInfo = fetchMoreResult.category?._cards?.pageInfo;

        return newEdges?.length && previousResult.category && pageInfo
          ? {
              // Put the new cards at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              category: {
                ...previousResult.category,
                _cards: {
                  edges: [
                    ...(previousResult.category?._cards?.edges ?? []),
                    ...newEdges,
                  ],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });

  if (!selectedCategory || !data?.category) return <p>Select Category</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <EditCategoryContainer data={data.category}></EditCategoryContainer>
      <div>Selected: {variables.id}</div>
      <CardTable data={cardData} onSelectCard={onSelectCard}></CardTable>
      {data.category?._cards?.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
      Showing {data.category?._cards?.edges.length} /{' '}
      {data.category?._cards?.pageInfo.totalCount}
      <RemoveCategoryContainer
        id={data.category.id}
        onSelectCategory={onSelectCategory}
      ></RemoveCategoryContainer>
    </div>
  );
};
