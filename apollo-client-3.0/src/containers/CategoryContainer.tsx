import React, { useMemo, useEffect, useCallback } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  useGetCategoryWithCardsLazyQuery,
  GetCategoryWithCardsQuery,
  DirectionEnum,
} from '../generated/graphql';
import { CardTable } from '../components/CardTable';

interface CategoryContainerProps {
  selectedCategory: string;
}

export const CategoryContainer: React.FC<CategoryContainerProps> = ({
  selectedCategory,
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

  const cardData = useMemo(
    () =>
      data?.category?._cards?.edges.map(
        ({ node: { id, number, label, created, updated } }) => ({
          id,
          number,
          label,
          created,
          updated,
        }),
      ) ?? [],
    [data],
  );

  const memoizedGetCat = useCallback(getCat, [getCat]);

  useEffect(() => {
    if (selectedCategory !== '') memoizedGetCat();
  }, [memoizedGetCat, selectedCategory]);

  const getMoreData = (): Promise<ApolloQueryResult<
    GetCategoryWithCardsQuery
  >> =>
    fetchMore({
      variables: {
        ...variables,
        after: data?.category?._cards?.pageInfo.endCursor,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.category?._cards?.edges;
        const pageInfo = fetchMoreResult.category?._cards?.pageInfo;

        return newEdges?.length
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

  if (!data) return <p>Pick Category</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <h1>{data.category?.name}</h1>
      <div>Selected: {variables.id}</div>
      <CardTable data={cardData}></CardTable>
      {data.category?._cards?.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
      Showing {data.category?._cards?.edges.length} /{' '}
      {data.category?._cards?.pageInfo.totalCount} Total
    </div>
  );
};
