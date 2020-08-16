import { ApolloError, FetchResult, Reference } from '@apollo/client';

import {
  useRemoveCategoryMutation,
  RemoveCategoryMutation,
  RemoveCategoryDocument,
  GetCategoriesDocument,
} from '../../generated/graphql';

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCategory function can be used elsewhere with shared cache logic
const useRemoveCategory = (): [
  (
    id: string,
  ) => Promise<
    FetchResult<
      RemoveCategoryMutation,
      Record<string, any>,
      Record<string, any>
    >
  >,
  RemoveCategoryMutation | null | undefined,
  boolean,
  ApolloError | undefined,
] => {
  const [
    removeCategoryMutation,
    { data, loading, error },
  ] = useRemoveCategoryMutation();

  const removeCategory = (id: string) =>
    removeCategoryMutation({
      variables: {
        id,
      },
      update: (cache) => {
        cache.modify({
          id: 'ROOT_QUERY',
          fields: {
            categories(categories: Reference[], { readField }) {
              return categories.filter(
                (category) => id !== readField('id', category),
              );
            },
          },
        });
        // evict this item from the in memory cache
        cache.evict({ id: `Category:${id}` });
      },
    });

  return [removeCategory, data, loading, error];
};

export { useRemoveCategory, RemoveCategoryDocument, GetCategoriesDocument };
