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
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Card = Node & {
  __typename?: 'Card';
  id: Scalars['ID'];
  number?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  updated?: Maybe<Scalars['DateTime']>;
  categoryId?: Maybe<Scalars['String']>;
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

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  children?: Maybe<Array<Maybe<Category>>>;
  updated?: Maybe<Scalars['DateTime']>;
  created?: Maybe<Scalars['DateTime']>;
  cardConnection?: Maybe<CardConnection>;
};

export type CategoryCardConnectionArgs = {
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
  card?: Maybe<Card>;
  cards: CardConnection;
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
};

export type QueryCardArgs = {
  id: Scalars['ID'];
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

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};

export type AddCardMutationVariables = {
  input: CardInput;
};

export type AddCardMutation = { __typename?: 'Mutation' } & {
  addCard: { __typename?: 'CardsUpdatedResponse' } & Pick<
    CardsUpdatedResponse,
    'success' | 'message'
  > & {
      card: { __typename?: 'Card' } & Pick<
        Card,
        'created' | 'description' | 'id' | 'label' | 'number' | 'updated'
      >;
    };
};

export type AddCategoryMutationVariables = {
  input: CategoryInput;
};

export type AddCategoryMutation = { __typename?: 'Mutation' } & {
  addCategory: { __typename?: 'CategoryUpdatedResponse' } & Pick<
    CategoryUpdatedResponse,
    'success' | 'message'
  > & {
      category: Maybe<
        { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>
      >;
    };
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
          node: { __typename?: 'Card' } & Pick<
            Card,
            'created' | 'updated' | 'id' | 'label' | 'number'
          >;
        }
    >;
  };
};

export type GetCategoriesQueryVariables = {};

export type GetCategoriesQuery = { __typename?: 'Query' } & {
  categories: Maybe<
    Array<
      { __typename?: 'Category' } & Pick<
        Category,
        'id' | 'name' | 'parentId' | 'created' | 'updated'
      > & {
          children: Maybe<
            Array<
              Maybe<{ __typename?: 'Category' } & Pick<Category, 'id' | 'name'>>
            >
          >;
        }
    >
  >;
};

export type GetCategoryQueryVariables = {
  id: Scalars['ID'];
};

export type GetCategoryQuery = { __typename?: 'Query' } & {
  category: Maybe<
    { __typename?: 'Category' } & Pick<Category, 'id' | 'name'> & {
        children: Maybe<
          Array<Maybe<{ __typename?: 'Category' } & Pick<Category, 'id'>>>
        >;
      }
  >;
};

export type RemoveCardMutationVariables = {
  id: Scalars['ID'];
};

export type RemoveCardMutation = { __typename?: 'Mutation' } & {
  removeCard: { __typename?: 'CardsUpdatedResponse' } & Pick<
    CardsUpdatedResponse,
    'success' | 'message'
  >;
};

export type RemoveCategoryMutationVariables = {
  id: Scalars['ID'];
};

export type RemoveCategoryMutation = { __typename?: 'Mutation' } & {
  removeCategory: { __typename?: 'CategoryUpdatedResponse' } & Pick<
    CategoryUpdatedResponse,
    'success' | 'message'
  > & {
      category: Maybe<
        { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>
      >;
    };
};

export type UpdateCardMutationVariables = {
  id: Scalars['ID'];
  input: CardInput;
};

export type UpdateCardMutation = { __typename?: 'Mutation' } & {
  updateCard: { __typename?: 'CardsUpdatedResponse' } & Pick<
    CardsUpdatedResponse,
    'success' | 'message'
  > & {
      card: { __typename?: 'Card' } & Pick<
        Card,
        'id' | 'number' | 'label' | 'description'
      >;
    };
};

export const AddCardDocument = gql`
  mutation addCard($input: CardInput!) {
    addCard(input: $input) {
      success
      message
      card {
        created
        description
        id
        label
        number
        updated
      }
    }
  }
`;
export type AddCardMutationFn = ApolloReactCommon.MutationFunction<
  AddCardMutation,
  AddCardMutationVariables
>;

/**
 * __useAddCardMutation__
 *
 * To run a mutation, you first call `useAddCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardMutation, { data, loading, error }] = useAddCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddCardMutation,
    AddCardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddCardMutation,
    AddCardMutationVariables
  >(AddCardDocument, baseOptions);
}
export type AddCardMutationHookResult = ReturnType<typeof useAddCardMutation>;
export type AddCardMutationResult = ApolloReactCommon.MutationResult<
  AddCardMutation
>;
export type AddCardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddCardMutation,
  AddCardMutationVariables
>;
export const AddCategoryDocument = gql`
  mutation addCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      success
      message
      category {
        id
        name
      }
    }
  }
`;
export type AddCategoryMutationFn = ApolloReactCommon.MutationFunction<
  AddCategoryMutation,
  AddCategoryMutationVariables
>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCategoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >(AddCategoryDocument, baseOptions);
}
export type AddCategoryMutationHookResult = ReturnType<
  typeof useAddCategoryMutation
>;
export type AddCategoryMutationResult = ApolloReactCommon.MutationResult<
  AddCategoryMutation
>;
export type AddCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddCategoryMutation,
  AddCategoryMutationVariables
>;
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
          created
          updated
          id
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
      id
      name
      parentId
      created
      updated
      children {
        id
        name
      }
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
export const GetCategoryDocument = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      name
      children {
        id
      }
    }
  }
`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(
    GetCategoryDocument,
    baseOptions,
  );
}
export function useGetCategoryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GetCategoryDocument, baseOptions);
}
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<
  typeof useGetCategoryLazyQuery
>;
export type GetCategoryQueryResult = ApolloReactCommon.QueryResult<
  GetCategoryQuery,
  GetCategoryQueryVariables
>;
export const RemoveCardDocument = gql`
  mutation removeCard($id: ID!) {
    removeCard(id: $id) {
      success
      message
    }
  }
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
        id
        name
      }
    }
  }
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
export const UpdateCardDocument = gql`
  mutation updateCard($id: ID!, $input: CardInput!) {
    updateCard(id: $id, input: $input) {
      success
      message
      card {
        id
        number
        label
        description
      }
    }
  }
`;
export type UpdateCardMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >(UpdateCardDocument, baseOptions);
}
export type UpdateCardMutationHookResult = ReturnType<
  typeof useUpdateCardMutation
>;
export type UpdateCardMutationResult = ApolloReactCommon.MutationResult<
  UpdateCardMutation
>;
export type UpdateCardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
