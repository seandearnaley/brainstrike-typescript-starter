import gql from 'graphql-tag';

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

export const GET_CARD_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
      parentId
      created
      updated
    }
  }
`;
