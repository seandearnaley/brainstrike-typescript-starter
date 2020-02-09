import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ApolloQueryResult } from 'apollo-client';
import { DirectionEnum } from '../generated/globalTypes';
import * as GetCardsTypes from '../graphql/generated/getCards';

import * as GQL from '../graphql/gql';
import { CardTable } from '../components/CardTable';

export const CardContainer: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<
    GetCardsTypes.getCards,
    GetCardsTypes.getCardsVariables
  >(GQL.GET_CARD_DATA, {
    variables: {
      first: 10,
      orderByColumn: 'number',
      orderByDirection: DirectionEnum.ASC,
    },
  });

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

  const getMoreData = (): Promise<ApolloQueryResult<GetCardsTypes.getCards>> =>
    fetchMore({
      variables: {
        first: 10,
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
  if (error || !data) return <p>ERROR</p>;

  return (
    <div>
      <CardTable data={cardData}></CardTable>

      {data?.cards.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
    </div>
  );
};
