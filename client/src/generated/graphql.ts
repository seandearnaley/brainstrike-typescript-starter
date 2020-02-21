import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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
  categories: Array<Category>;
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
  updated?: Maybe<Scalars['DateTime']>;
  created: Scalars['DateTime'];
  cards: CardConnection;
};

export type CategoryCardsArgs = {
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
  category: Category;
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
  totalCount: Scalars['Int'];
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
  id?: Maybe<Scalars['ID']>;
};

export type QueryCategoriesArgs = {
  cardIds?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type QueryCategoryArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type CardPartsFragment = { __typename?: 'Card' } & Pick<
  Card,
  'id' | 'created' | 'updated' | 'label' | 'number'
>;

export type CategoryPartsFragment = { __typename?: 'Category' } & Pick<
  Category,
  'id' | 'name' | 'created' | 'updated'
>;

export type GetCardWithCategoriesQueryVariables = {
  id?: Maybe<Scalars['ID']>;
};

export type GetCardWithCategoriesQuery = { __typename?: 'Query' } & {
  card: Maybe<
    { __typename?: 'Card' } & Pick<Card, 'description'> & {
        categories: Array<{ __typename?: 'Category' } & CategoryPartsFragment>;
      } & CardPartsFragment
  >;
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
          node: { __typename?: 'Card' } & CardPartsFragment;
        }
    >;
  };
};

export type GetCategoriesQueryVariables = {};

export type GetCategoriesQuery = { __typename?: 'Query' } & {
  categories: Maybe<Array<{ __typename?: 'Category' } & CategoryPartsFragment>>;
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
        'id' | 'created' | 'updated'
      > & {
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
                  node: { __typename?: 'Card' } & CardPartsFragment;
                }
            >;
          };
        } & CategoryPartsFragment)
  >;
};

export type GetCategoryWithCardsQueryVariables = {
  id?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  orderByColumn?: Maybe<Scalars['String']>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type GetCategoryWithCardsQuery = { __typename?: 'Query' } & {
  category: Maybe<
    { __typename?: 'Category' } & {
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
              node: { __typename?: 'Card' } & CardPartsFragment;
            }
        >;
      };
    } & CategoryPartsFragment
  >;
};

export type RemoveCardMutationVariables = {
  id: Scalars['ID'];
};

export type RemoveCardMutation = { __typename?: 'Mutation' } & {
  removeCard: { __typename?: 'CardsUpdatedResponse' } & Pick<
    CardsUpdatedResponse,
    'success' | 'message'
  > & {
      card: { __typename?: 'Card' } & {
        categories: Array<{ __typename?: 'Category' } & Pick<Category, 'id'>>;
      } & CardPartsFragment;
    };
};

export type RemoveCategoryMutationVariables = {
  id: Scalars['ID'];
};

export type RemoveCategoryMutation = { __typename?: 'Mutation' } & {
  removeCategory: { __typename?: 'CategoryUpdatedResponse' } & Pick<
    CategoryUpdatedResponse,
    'success' | 'message'
  > & { category: { __typename?: 'Category' } & CategoryPartsFragment };
};

export type UpdateCategoryMutationVariables = {
  id: Scalars['ID'];
  input?: Maybe<CategoryInput>;
};

export type UpdateCategoryMutation = { __typename?: 'Mutation' } & {
  updateCategory: { __typename?: 'CategoryUpdatedResponse' } & Pick<
    CategoryUpdatedResponse,
    'success' | 'message'
  > & { category: { __typename?: 'Category' } & CategoryPartsFragment };
};

export const CardPartsFragmentDoc = gql`
  fragment CardParts on Card {
    id
    created
    updated
    label
    number
  }
`;
export const CategoryPartsFragmentDoc = gql`
  fragment CategoryParts on Category {
    id
    name
    created
    updated
  }
`;
export const GetCardWithCategoriesDocument = gql`
  query GetCardWithCategories($id: ID) {
    card(id: $id) {
      ...CardParts
      description
      categories @connection(key: "Categories") {
        ...CategoryParts
      }
    }
  }
  ${CardPartsFragmentDoc}
  ${CategoryPartsFragmentDoc}
`;

/**
 * __useGetCardWithCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCardWithCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardWithCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardWithCategoriesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCardWithCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCardWithCategoriesQuery,
    GetCardWithCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCardWithCategoriesQuery,
    GetCardWithCategoriesQueryVariables
  >(GetCardWithCategoriesDocument, baseOptions);
}
export function useGetCardWithCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCardWithCategoriesQuery,
    GetCardWithCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCardWithCategoriesQuery,
    GetCardWithCategoriesQueryVariables
  >(GetCardWithCategoriesDocument, baseOptions);
}
export type GetCardWithCategoriesQueryHookResult = ReturnType<
  typeof useGetCardWithCategoriesQuery
>;
export type GetCardWithCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCardWithCategoriesLazyQuery
>;
export type GetCardWithCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCardWithCategoriesQuery,
  GetCardWithCategoriesQueryVariables
>;
export const GetCardsDocument = gql`
  query GetCards(
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
    ) @connection(key: "CardConnection") {
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
          ...CardParts
        }
      }
    }
  }
  ${CardPartsFragmentDoc}
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
  query GetCategories {
    categories {
      ...CategoryParts
    }
  }
  ${CategoryPartsFragmentDoc}
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
  query GetCategoryNode(
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
        ...CategoryParts
        cards(
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
              ...CardParts
            }
          }
        }
      }
    }
  }
  ${CategoryPartsFragmentDoc}
  ${CardPartsFragmentDoc}
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
export const GetCategoryWithCardsDocument = gql`
  query GetCategoryWithCards(
    $id: ID
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderByColumn: String
    $orderByDirection: DirectionEnum
  ) {
    category(id: $id) {
      ...CategoryParts
      cards(
        first: $first
        last: $last
        after: $after
        before: $before
        orderByColumn: $orderByColumn
        orderByDirection: $orderByDirection
      ) @connection(key: "cards") {
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
            ...CardParts
          }
        }
      }
    }
  }
  ${CategoryPartsFragmentDoc}
  ${CardPartsFragmentDoc}
`;

/**
 * __useGetCategoryWithCardsQuery__
 *
 * To run a query within a React component, call `useGetCategoryWithCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWithCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWithCardsQuery({
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
export function useGetCategoryWithCardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoryWithCardsQuery,
    GetCategoryWithCardsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCategoryWithCardsQuery,
    GetCategoryWithCardsQueryVariables
  >(GetCategoryWithCardsDocument, baseOptions);
}
export function useGetCategoryWithCardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoryWithCardsQuery,
    GetCategoryWithCardsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCategoryWithCardsQuery,
    GetCategoryWithCardsQueryVariables
  >(GetCategoryWithCardsDocument, baseOptions);
}
export type GetCategoryWithCardsQueryHookResult = ReturnType<
  typeof useGetCategoryWithCardsQuery
>;
export type GetCategoryWithCardsLazyQueryHookResult = ReturnType<
  typeof useGetCategoryWithCardsLazyQuery
>;
export type GetCategoryWithCardsQueryResult = ApolloReactCommon.QueryResult<
  GetCategoryWithCardsQuery,
  GetCategoryWithCardsQueryVariables
>;
export const RemoveCardDocument = gql`
  mutation removeCard($id: ID!) {
    removeCard(id: $id) {
      success
      message
      card {
        ...CardParts
        categories {
          id
        }
      }
    }
  }
  ${CardPartsFragmentDoc}
`;
export type RemoveCardMutationFn = ApolloReactCommon.MutationFunction<
  RemoveCardMutation,
  RemoveCardMutationVariables
>;

/**
 * __useRemoveCardMutation__
 *
 * To run a mutation, you first call `useRemoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCardMutation, { data, loading, error }] = useRemoveCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveCardMutation,
    RemoveCardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveCardMutation,
    RemoveCardMutationVariables
  >(RemoveCardDocument, baseOptions);
}
export type RemoveCardMutationHookResult = ReturnType<
  typeof useRemoveCardMutation
>;
export type RemoveCardMutationResult = ApolloReactCommon.MutationResult<
  RemoveCardMutation
>;
export type RemoveCardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveCardMutation,
  RemoveCardMutationVariables
>;
export const RemoveCategoryDocument = gql`
  mutation removeCategory($id: ID!) {
    removeCategory(id: $id) {
      success
      message
      category {
        ...CategoryParts
      }
    }
  }
  ${CategoryPartsFragmentDoc}
`;
export type RemoveCategoryMutationFn = ApolloReactCommon.MutationFunction<
  RemoveCategoryMutation,
  RemoveCategoryMutationVariables
>;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCategoryMutation, { data, loading, error }] = useRemoveCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCategoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveCategoryMutation,
    RemoveCategoryMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveCategoryMutation,
    RemoveCategoryMutationVariables
  >(RemoveCategoryDocument, baseOptions);
}
export type RemoveCategoryMutationHookResult = ReturnType<
  typeof useRemoveCategoryMutation
>;
export type RemoveCategoryMutationResult = ApolloReactCommon.MutationResult<
  RemoveCategoryMutation
>;
export type RemoveCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveCategoryMutation,
  RemoveCategoryMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation updateCategory($id: ID!, $input: CategoryInput) {
    updateCategory(id: $id, input: $input) {
      success
      message
      category {
        ...CategoryParts
      }
    }
  }
  ${CategoryPartsFragmentDoc}
`;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, baseOptions);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<
  UpdateCategoryMutation
>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
