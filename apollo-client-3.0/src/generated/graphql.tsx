import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
  Time: any;
};

export type Card = Node & {
  __typename?: 'Card';
  id: Scalars['ID'];
  number?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  updated?: Maybe<Scalars['DateTime']>;
  _categories?: Maybe<Array<Category>>;
};

export type CardConnection = {
  __typename?: 'CardConnection';
  pageInfo: PageInfo;
  edges: Array<CardEdge>;
};

export type CardEdge = {
  __typename?: 'CardEdge';
  cursor: Scalars['String'];
  node: Card;
};

export type CardInput = {
  number?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['ID']>;
};

export type CardsUpdatedResponse = {
  __typename?: 'CardsUpdatedResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  card: Card;
};

export type Category = Node & {
  __typename?: 'Category';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  children?: Maybe<Array<Maybe<Category>>>;
  updated?: Maybe<Scalars['DateTime']>;
  created: Scalars['DateTime'];
  _cards?: Maybe<CardConnection>;
};

export type Category_CardsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type CategoryInput = {
  name?: Maybe<Scalars['String']>;
};

export type CategoryUpdatedResponse = {
  __typename?: 'CategoryUpdatedResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  category?: Maybe<Category>;
};

export enum DirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Mutation = {
  __typename?: 'Mutation';
  addCard: CardsUpdatedResponse;
  updateCard: CardsUpdatedResponse;
  removeCard: CardsUpdatedResponse;
  addCategory: CategoryUpdatedResponse;
  updateCategory: CategoryUpdatedResponse;
  removeCategory: CategoryUpdatedResponse;
};

export type MutationAddCardArgs = {
  input?: Maybe<CardInput>;
};

export type MutationUpdateCardArgs = {
  id: Scalars['ID'];
  input?: Maybe<CardInput>;
};

export type MutationRemoveCardArgs = {
  id: Scalars['ID'];
};

export type MutationAddCategoryArgs = {
  input?: Maybe<CategoryInput>;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'];
  input?: Maybe<CategoryInput>;
};

export type MutationRemoveCategoryArgs = {
  id: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  updated?: Maybe<Scalars['DateTime']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cards: CardConnection;
  card?: Maybe<Card>;
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  node?: Maybe<Node>;
};

export type QueryCardsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
  categoryId?: Maybe<Scalars['ID']>;
};

export type QueryCardArgs = {
  id: Scalars['ID'];
};

export type QueryCategoriesArgs = {
  cardIds?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type GetCardsQueryVariables = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
  categoryId?: Maybe<Scalars['ID']>;
};

export type GetCardsQuery = { __typename?: 'Query' } & {
  cards: { __typename?: 'CardConnection' } & {
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      | 'hasNextPage'
      | 'hasPreviousPage'
      | 'startCursor'
      | 'endCursor'
      | 'totalCount'
    >;
    edges: Array<
      { __typename?: 'CardEdge' } & Pick<CardEdge, 'cursor'> & {
          node: { __typename: 'Card' } & Pick<
            Card,
            'id' | 'created' | 'updated' | 'label' | 'number'
          >;
        }
    >;
  };
};

export type GetCategoriesQueryVariables = {};

export type GetCategoriesQuery = { __typename?: 'Query' } & {
  categories: Maybe<
    Array<
      { __typename: 'Category' } & Pick<
        Category,
        'id' | 'created' | 'updated' | 'name' | 'parentId'
      >
    >
  >;
};

export type GetCategoryNodeQueryVariables = {
  id: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type GetCategoryNodeQuery = { __typename?: 'Query' } & {
  category: Maybe<
    | ({ __typename: 'Card' } & Pick<Card, 'id' | 'created' | 'updated'>)
    | ({ __typename: 'Category' } & Pick<
        Category,
        'id' | 'created' | 'updated' | 'name' | 'parentId'
      > & {
          _cards: Maybe<
            { __typename?: 'CardConnection' } & {
              pageInfo: { __typename?: 'PageInfo' } & Pick<
                PageInfo,
                | 'hasNextPage'
                | 'hasPreviousPage'
                | 'startCursor'
                | 'endCursor'
                | 'totalCount'
              >;
              edges: Array<
                { __typename?: 'CardEdge' } & Pick<CardEdge, 'cursor'> & {
                    node: { __typename: 'Card' } & Pick<
                      Card,
                      'id' | 'label' | 'number' | 'created' | 'updated'
                    >;
                  }
              >;
            }
          >;
        })
  >;
};

export const GetCardsDocument = gql`
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
          __typename
          id
          created
          updated
          label
          number
        }
      }
    }
  }
`;

/**
 * __useGetCardsQuery__
 *
 * To run a query within a React component, call `useGetCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      orderByColumn: // value for 'orderByColumn'
 *      orderByDirection: // value for 'orderByDirection'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCardsQuery,
    GetCardsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCardsQuery, GetCardsQueryVariables>(
    GetCardsDocument,
    baseOptions,
  );
}
export function useGetCardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCardsQuery,
    GetCardsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCardsQuery, GetCardsQueryVariables>(
    GetCardsDocument,
    baseOptions,
  );
}
export type GetCardsQueryHookResult = ReturnType<typeof useGetCardsQuery>;
export type GetCardsLazyQueryHookResult = ReturnType<
  typeof useGetCardsLazyQuery
>;
export type GetCardsQueryResult = ApolloReactCommon.QueryResult<
  GetCardsQuery,
  GetCardsQueryVariables
>;
export const GetCategoriesDocument = gql`
  query getCategories {
    categories {
      __typename
      id
      created
      updated
      name
      parentId
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, baseOptions);
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, baseOptions);
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const GetCategoryNodeDocument = gql`
  query getCategoryNode(
    $id: ID!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderByColumn: String
    $orderByDirection: DirectionEnum
  ) {
    category: node(id: $id) {
      __typename
      ... on Node {
        id
        created
        updated
      }
      ... on Category {
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

/**
 * __useGetCategoryNodeQuery__
 *
 * To run a query within a React component, call `useGetCategoryNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryNodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      orderByColumn: // value for 'orderByColumn'
 *      orderByDirection: // value for 'orderByDirection'
 *   },
 * });
 */
export function useGetCategoryNodeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoryNodeQuery,
    GetCategoryNodeQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCategoryNodeQuery,
    GetCategoryNodeQueryVariables
  >(GetCategoryNodeDocument, baseOptions);
}
export function useGetCategoryNodeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoryNodeQuery,
    GetCategoryNodeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCategoryNodeQuery,
    GetCategoryNodeQueryVariables
  >(GetCategoryNodeDocument, baseOptions);
}
export type GetCategoryNodeQueryHookResult = ReturnType<
  typeof useGetCategoryNodeQuery
>;
export type GetCategoryNodeLazyQueryHookResult = ReturnType<
  typeof useGetCategoryNodeLazyQuery
>;
export type GetCategoryNodeQueryResult = ApolloReactCommon.QueryResult<
  GetCategoryNodeQuery,
  GetCategoryNodeQueryVariables
>;
