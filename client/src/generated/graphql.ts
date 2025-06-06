import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Time: { input: any; output: any; }
};

export type Card = Node & {
  __typename?: 'Card';
  categories: Array<Category>;
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type CardConnection = {
  __typename?: 'CardConnection';
  edges: Array<CardEdge>;
  pageInfo: PageInfo;
};

export type CardEdge = {
  __typename?: 'CardEdge';
  cursor: Scalars['String']['output'];
  node: Card;
};

export type CardInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
};

export type CardsUpdatedResponse = {
  __typename?: 'CardsUpdatedResponse';
  card: Card;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Category = Node & {
  __typename?: 'Category';
  cards: CardConnection;
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdatedResponse = {
  __typename?: 'CategoryUpdatedResponse';
  category: Category;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum DirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCard: CardsUpdatedResponse;
  addCategory: CategoryUpdatedResponse;
  removeCard: CardsUpdatedResponse;
  removeCategory: CategoryUpdatedResponse;
  updateCard: CardsUpdatedResponse;
  updateCategory: CategoryUpdatedResponse;
};


export type MutationAddCardArgs = {
  input?: InputMaybe<CardInput>;
};


export type MutationAddCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};


export type MutationRemoveCardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCardArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<CardInput>;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<CategoryInput>;
};

export type Node = {
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  card: Card;
  cards: CardConnection;
  categories: Array<Category>;
  category: Category;
  node: Node;
};


export type QueryCardArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};


export type QueryCategoriesArgs = {
  cardIds?: InputMaybe<Scalars['String']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CardPartsFragment = { __typename?: 'Card', id: string, created: any, updated?: any | null, label?: string | null, number?: number | null };

export type CategoryPartsFragment = { __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null };

export type GetCardWithCategoriesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCardWithCategoriesQuery = { __typename?: 'Query', card: { __typename?: 'Card', description?: string | null, id: string, created: any, updated?: any | null, label?: string | null, number?: number | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null }> } };

export type GetCardsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCardsQuery = { __typename?: 'Query', cards: { __typename?: 'CardConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, totalCount: number }, edges: Array<{ __typename?: 'CardEdge', cursor: string, node: { __typename?: 'Card', id: string, created: any, updated?: any | null, label?: string | null, number?: number | null } }> } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null }> };

export type GetCategoryNodeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
}>;


export type GetCategoryNodeQuery = { __typename?: 'Query', category: { __typename: 'Card', id: string, created: any, updated?: any | null } | { __typename: 'Category', id: string, created: any, updated?: any | null, name?: string | null, cards: { __typename?: 'CardConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, totalCount: number }, edges: Array<{ __typename?: 'CardEdge', cursor: string, node: { __typename?: 'Card', id: string, created: any, updated?: any | null, label?: string | null, number?: number | null } }> } } };

export type GetCategoryWithCardsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  orderByColumn?: InputMaybe<Scalars['String']['input']>;
  orderByDirection?: InputMaybe<DirectionEnum>;
}>;


export type GetCategoryWithCardsQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null, cards: { __typename?: 'CardConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, totalCount: number }, edges: Array<{ __typename?: 'CardEdge', cursor: string, node: { __typename?: 'Card', id: string, created: any, updated?: any | null, label?: string | null, number?: number | null } }> } } };

export type RemoveCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCardMutation = { __typename?: 'Mutation', removeCard: { __typename?: 'CardsUpdatedResponse', success: boolean, message: string, card: { __typename?: 'Card', id: string, created: any, updated?: any | null, label?: string | null, number?: number | null, categories: Array<{ __typename?: 'Category', id: string }> } } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'CategoryUpdatedResponse', success: boolean, message: string, category: { __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null } } };

export type UpdateCategoryNameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input?: InputMaybe<CategoryInput>;
}>;


export type UpdateCategoryNameMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CategoryUpdatedResponse', success: boolean, message: string, category: { __typename?: 'Category', id: string, name?: string | null, created: any, updated?: any | null } } };

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
${CategoryPartsFragmentDoc}`;

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
export function useGetCardWithCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>(GetCardWithCategoriesDocument, options);
      }
export function useGetCardWithCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>(GetCardWithCategoriesDocument, options);
        }
export function useGetCardWithCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>(GetCardWithCategoriesDocument, options);
        }
export type GetCardWithCategoriesQueryHookResult = ReturnType<typeof useGetCardWithCategoriesQuery>;
export type GetCardWithCategoriesLazyQueryHookResult = ReturnType<typeof useGetCardWithCategoriesLazyQuery>;
export type GetCardWithCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCardWithCategoriesSuspenseQuery>;
export type GetCardWithCategoriesQueryResult = Apollo.QueryResult<GetCardWithCategoriesQuery, GetCardWithCategoriesQueryVariables>;
export const GetCardsDocument = gql`
    query GetCards($first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum, $categoryId: ID) {
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
    ${CardPartsFragmentDoc}`;

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
export function useGetCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
      }
export function useGetCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
        }
export function useGetCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
        }
export type GetCardsQueryHookResult = ReturnType<typeof useGetCardsQuery>;
export type GetCardsLazyQueryHookResult = ReturnType<typeof useGetCardsLazyQuery>;
export type GetCardsSuspenseQueryHookResult = ReturnType<typeof useGetCardsSuspenseQuery>;
export type GetCardsQueryResult = Apollo.QueryResult<GetCardsQuery, GetCardsQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    ...CategoryParts
  }
}
    ${CategoryPartsFragmentDoc}`;

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
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryNodeDocument = gql`
    query GetCategoryNode($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {
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
${CardPartsFragmentDoc}`;

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
export function useGetCategoryNodeQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryNodeQuery, GetCategoryNodeQueryVariables> & ({ variables: GetCategoryNodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>(GetCategoryNodeDocument, options);
      }
export function useGetCategoryNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>(GetCategoryNodeDocument, options);
        }
export function useGetCategoryNodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>(GetCategoryNodeDocument, options);
        }
export type GetCategoryNodeQueryHookResult = ReturnType<typeof useGetCategoryNodeQuery>;
export type GetCategoryNodeLazyQueryHookResult = ReturnType<typeof useGetCategoryNodeLazyQuery>;
export type GetCategoryNodeSuspenseQueryHookResult = ReturnType<typeof useGetCategoryNodeSuspenseQuery>;
export type GetCategoryNodeQueryResult = Apollo.QueryResult<GetCategoryNodeQuery, GetCategoryNodeQueryVariables>;
export const GetCategoryWithCardsDocument = gql`
    query GetCategoryWithCards($id: ID, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {
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
${CardPartsFragmentDoc}`;

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
export function useGetCategoryWithCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>(GetCategoryWithCardsDocument, options);
      }
export function useGetCategoryWithCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>(GetCategoryWithCardsDocument, options);
        }
export function useGetCategoryWithCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>(GetCategoryWithCardsDocument, options);
        }
export type GetCategoryWithCardsQueryHookResult = ReturnType<typeof useGetCategoryWithCardsQuery>;
export type GetCategoryWithCardsLazyQueryHookResult = ReturnType<typeof useGetCategoryWithCardsLazyQuery>;
export type GetCategoryWithCardsSuspenseQueryHookResult = ReturnType<typeof useGetCategoryWithCardsSuspenseQuery>;
export type GetCategoryWithCardsQueryResult = Apollo.QueryResult<GetCategoryWithCardsQuery, GetCategoryWithCardsQueryVariables>;
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
    ${CardPartsFragmentDoc}`;
export type RemoveCardMutationFn = Apollo.MutationFunction<RemoveCardMutation, RemoveCardMutationVariables>;

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
export function useRemoveCardMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCardMutation, RemoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCardMutation, RemoveCardMutationVariables>(RemoveCardDocument, options);
      }
export type RemoveCardMutationHookResult = ReturnType<typeof useRemoveCardMutation>;
export type RemoveCardMutationResult = Apollo.MutationResult<RemoveCardMutation>;
export type RemoveCardMutationOptions = Apollo.BaseMutationOptions<RemoveCardMutation, RemoveCardMutationVariables>;
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
    ${CategoryPartsFragmentDoc}`;
export type RemoveCategoryMutationFn = Apollo.MutationFunction<RemoveCategoryMutation, RemoveCategoryMutationVariables>;

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
export function useRemoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
      }
export type RemoveCategoryMutationHookResult = ReturnType<typeof useRemoveCategoryMutation>;
export type RemoveCategoryMutationResult = Apollo.MutationResult<RemoveCategoryMutation>;
export type RemoveCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const UpdateCategoryNameDocument = gql`
    mutation updateCategoryName($id: ID!, $input: CategoryInput) {
  updateCategory(id: $id, input: $input) {
    success
    message
    category {
      ...CategoryParts
    }
  }
}
    ${CategoryPartsFragmentDoc}`;
export type UpdateCategoryNameMutationFn = Apollo.MutationFunction<UpdateCategoryNameMutation, UpdateCategoryNameMutationVariables>;

/**
 * __useUpdateCategoryNameMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryNameMutation, { data, loading, error }] = useUpdateCategoryNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryNameMutation, UpdateCategoryNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryNameMutation, UpdateCategoryNameMutationVariables>(UpdateCategoryNameDocument, options);
      }
export type UpdateCategoryNameMutationHookResult = ReturnType<typeof useUpdateCategoryNameMutation>;
export type UpdateCategoryNameMutationResult = Apollo.MutationResult<UpdateCategoryNameMutation>;
export type UpdateCategoryNameMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryNameMutation, UpdateCategoryNameMutationVariables>;