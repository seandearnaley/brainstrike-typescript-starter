import gql from "graphql-tag";

// NOTE @connection directives throw errors in tests

export const CARD_DATA = gql`
  fragment CardData on Card {
    __typename
    id
    label
    number
    description
    created
    updated
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
    ) {
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

export const GET_CARD = gql`
  query card($id: ID!) {
    card(id: $id) {
      ...CardData
    }
  }
  ${CARD_DATA}
`;

export const ADD_CARD = gql`
  mutation addCard($input: CardInput!) {
    addCard(input: $input) {
      success
      message
      card {
        ...CardData
      }
    }
  }
  ${CARD_DATA}
`;

export const UPDATE_CARD = gql`
  mutation updateCard($id: ID!, $input: CardInput!) {
    updateCard(id: $id, input: $input) {
      success
      message
      card {
        ...CardData
      }
    }
  }
  ${CARD_DATA}
`;

export const REMOVE_CARD = gql`
  mutation removeCard($id: ID!) {
    removeCard(id: $id) {
      success
      message
      card {
        ...CardData
      }
    }
  }
  ${CARD_DATA}
`;
