import { ApolloError, FetchResult, Reference } from '@apollo/client';

import {
  useRemoveCategoryMutation,
  RemoveCategoryMutation,
} from '../../generated/graphql';

import { cache as inMemoryCache } from '../../index';

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCategory function can be used elsewhere with shared cache logic
export const useRemoveCategory = (): [
  (
    id: string,
  ) => Promise<
    FetchResult<
      RemoveCategoryMutation,
      Record<string, any>,
      Record<string, any>
    >
  >,
  boolean,
  ApolloError | undefined,
] => {
  const [
    removeCategoryMutation,
    { loading, error },
  ] = useRemoveCategoryMutation();

  const removeCategory = (id: string) =>
    removeCategoryMutation({
      variables: {
        id,
      },
      update: () => {
        inMemoryCache.modify('ROOT_QUERY', {
          categories(categories: Reference[], { readField }) {
            return categories.filter(
              category => id !== readField('id', category),
            );
          },
        });
      },
    });

  return [removeCategory, loading, error];
};
