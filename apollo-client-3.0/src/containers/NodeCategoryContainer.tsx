// experimental

import React, { useMemo, useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  useGetCategoryNodeQuery,
  GetCategoryNodeQuery,
  DirectionEnum,
} from '../generated/graphql';
import { CardTable } from '../components/CardTable';

interface NodeCategoryContainerProps {
  selectedCategory: string;
}

export const NodeCategoryContainer: React.FC<NodeCategoryContainerProps> = ({
  selectedCategory,
}: NodeCategoryContainerProps) => {
  const variables = {
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.Asc,
    id: selectedCategory,
  };

  const { data, loading, error, fetchMore, refetch } = useGetCategoryNodeQuery({
    variables,
  });

  const retval = ((): any => {
    switch (data?.category?.__typename) {
      case 'Category':
        return data.category;
    }
  })();

  const cardData = useMemo(
    () =>
      retval?._cards?.edges.map(
        ({ node: { id, number, label, created, updated } }: any) => ({
          id,
          number,
          label,
          created,
          updated,
        }),
      ) ?? [],
    [retval],
  );

  useEffect(() => {
    if (selectedCategory !== '') refetch();
  }, [refetch, selectedCategory]);

  const getMoreData = (): Promise<ApolloQueryResult<GetCategoryNodeQuery>> =>
    fetchMore({
      variables: {
        ...variables,
        after: retval?._cards?.pageInfo.endCursor,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.category._cards?.edges;
        const pageInfo = fetchMoreResult.category._cards?.pageInfo;

        return newEdges.length
          ? {
              // Put the new cards at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              category: {
                ...previousResult.category,
                _cards: {
                  edges: [...previousResult.category._cards.edges, ...newEdges],
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
      <h1>{retval?.name}</h1>
      <div>Selected: {variables.id}</div>
      <CardTable data={cardData}></CardTable>
      {retval?._cards?.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
      Showing {retval?._cards?.edges.length} /{' '}
      {retval?._cards?.pageInfo.totalCount} Total
    </div>
  );
};
