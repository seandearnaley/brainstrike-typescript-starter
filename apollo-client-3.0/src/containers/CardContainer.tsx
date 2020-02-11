import React, { useMemo, useEffect } from 'react';
import { ApolloQueryResult, useQuery } from '@apollo/client';
import { DirectionEnum } from '../generated/globalTypes';
import * as GetCardsTypes from '../graphql/generated/getCards';

import * as GQL from '../graphql/gql';
import { CardTable } from '../components/CardTable';

interface CardContainerProps {
  selectedCategory: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  selectedCategory,
}: CardContainerProps) => {
  const variables = {
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.ASC,
    categoryId: selectedCategory,
  };

  const { data, loading, error, fetchMore, refetch } = useQuery<
    GetCardsTypes.getCards,
    GetCardsTypes.getCardsVariables
  >(GQL.GET_CARD_DATA, { variables });

  const cardData = useMemo(
    () =>
      data?.cards.edges.map(
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

  useEffect(() => {
    refetch();
  }, [refetch, selectedCategory]);

  const getMoreData = (): Promise<ApolloQueryResult<GetCardsTypes.getCards>> =>
    fetchMore({
      variables: {
        ...variables,
        after: data?.cards.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.cards.edges;
        const pageInfo = fetchMoreResult.cards.pageInfo;

        return newEdges.length
          ? {
              // Put the new cards at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              cards: {
                __typename: previousResult.cards.__typename,
                edges: [...previousResult.cards.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <div>Selected: {variables.categoryId}</div>
      <CardTable data={cardData}></CardTable>
      {data?.cards.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
      Showing {data?.cards.edges.length} / {data?.cards.pageInfo.totalCount}{' '}
      Total
    </div>
  );
};
