import gql from 'graphql-tag';

export const NODE_FRAGMENT = gql`
  fragment NodeFragment on Node {
    created
    updated
  }
`;

export const CARD_FRAGMENT = gql`
  fragment CardFragment on Card {
    id
    ...NodeFragment
    __typename
    label
    number
  }
  ${NODE_FRAGMENT}
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
    ) @connection(key: "Cards") {
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
          ...CardFragment
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    __typename
    id
    created
    updated
    name
    parentId
  }
`;

export const GET_CARD_CATEGORIES = gql`
  query getCategories {
    categories {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_CATEGORY = gql`
  query getCategory(
    $id: ID!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderByColumn: String
    $orderByDirection: DirectionEnum
  ) {
    category: node(id: $id) {
      ... on Node {
        id
        created
        updated
      }
      ... on Category {
        __typename
        name
        parentId
        _cards(
          first: $first
          last: $last
          after: $after
          before: $before
          orderByColumn: $orderByColumn
          orderByDirection: $orderByDirection
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
              __typename
              id
              label
              number
              created
              updated
            }
          }
        }
      }
    }
  }
`;
