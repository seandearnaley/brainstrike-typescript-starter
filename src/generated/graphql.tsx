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
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   **/
  DateTime: any;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   **/
  Date: any;
  /**
   * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format
   * outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   **/
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  number?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  updated?: Maybe<Scalars['DateTime']>;
};

export type CardInput = {
  number?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CardsUpdatedResponse = {
  __typename?: 'CardsUpdatedResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  card: Card;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCard: CardsUpdatedResponse;
  updateCard: CardsUpdatedResponse;
  removeCard: CardsUpdatedResponse;
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

export type Query = {
  __typename?: 'Query';
  cards?: Maybe<Array<Card>>;
  card?: Maybe<Card>;
  me?: Maybe<User>;
};

export type QueryCardArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  updated?: Maybe<Scalars['DateTime']>;
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

export type GetCardsQueryVariables = {};

export type GetCardsQuery = { __typename?: 'Query' } & {
  cards: Maybe<
    Array<
      { __typename?: 'Card' } & Pick<
        Card,
        'created' | 'description' | 'id' | 'label' | 'number' | 'updated'
      >
    >
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
export const GetCardsDocument = gql`
  query getCards {
    cards {
      created
      description
      id
      label
      number
      updated
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
