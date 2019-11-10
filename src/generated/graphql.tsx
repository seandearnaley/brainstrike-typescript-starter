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

export type Query = {
  __typename?: 'Query';
  techniques: Array<Technique>;
  technique?: Maybe<Technique>;
};

export type QueryTechniqueArgs = {
  id: Scalars['ID'];
};

export type Technique = {
  __typename?: 'Technique';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  updated?: Maybe<Scalars['DateTime']>;
};

export type GetTechsQueryVariables = {};

export type GetTechsQuery = { __typename?: 'Query' } & {
  techniques: Array<
    { __typename?: 'Technique' } & Pick<
      Technique,
      'id' | 'label' | 'description' | 'created'
    >
  >;
};

export const GetTechsDocument = gql`
  query GetTechs {
    techniques {
      id
      label
      description
      created
    }
  }
`;

/**
 * __useGetTechsQuery__
 *
 * To run a query within a React component, call `useGetTechsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTechsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTechsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTechsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTechsQuery,
    GetTechsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetTechsQuery, GetTechsQueryVariables>(
    GetTechsDocument,
    baseOptions,
  );
}
export function useGetTechsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTechsQuery,
    GetTechsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetTechsQuery, GetTechsQueryVariables>(
    GetTechsDocument,
    baseOptions,
  );
}
export type GetTechsQueryHookResult = ReturnType<typeof useGetTechsQuery>;
export type GetTechsLazyQueryHookResult = ReturnType<
  typeof useGetTechsLazyQuery
>;
export type GetTechsQueryResult = ApolloReactCommon.QueryResult<
  GetTechsQuery,
  GetTechsQueryVariables
>;
