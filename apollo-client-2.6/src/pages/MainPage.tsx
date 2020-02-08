import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import moment from 'moment';

import { DirectionEnum } from '../generated/globalTypes';
import * as GetCardsTypes from '../graphql/generated/getCards';

export const CARD_DATA = gql`
  fragment CardData on Card {
    __typename
    created
    updated
    id
    label
    number
  }
`;

export const GET_CARD_DATA = gql`
  query getCards(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderByColumn: String
    $orderByDirection: DirectionEnum
    $categoryId: ID
  ) {
    cards(
      first: $first
      last: $last
      after: $after
      before: $before
      orderByColumn: $orderByColumn
      orderByDirection: $orderByDirection
      categoryId: $categoryId
    ) @connection(key: "Card_card") {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        totalCount
      }
      edges {
        cursor
        node {
          ...CardData
        }
      }
    }
  }
  ${CARD_DATA}
`;

const MainPage: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<
    GetCardsTypes.getCards,
    GetCardsTypes.getCardsVariables
  >(GET_CARD_DATA, {
    variables: {
      first: 10,
      orderByColumn: 'number',
      orderByDirection: DirectionEnum.ASC,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Label</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {data?.cards.edges.map(edge => {
            const { id, number, label, created, updated } = edge.node;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{number}</td>
                <td>{label}</td>
                <td>{moment(created).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{moment(updated).format('MMMM Do YYYY, h:mm:ss a')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {data?.cards.pageInfo.hasNextPage && (
        <button
          onClick={(): Promise<ApolloQueryResult<GetCardsTypes.getCards>> =>
            fetchMore({
              variables: {
                first: 10,
                after: data.cards.pageInfo.endCursor,
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
            })
          }
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default MainPage;
