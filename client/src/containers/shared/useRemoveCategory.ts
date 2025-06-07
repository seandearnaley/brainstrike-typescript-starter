import {
  ApolloError,
  FetchResult,
  Reference,
  StoreObject,
} from '@apollo/client';

import {
  useRemoveCategoryMutation,
  RemoveCategoryMutation,
  RemoveCategoryDocument,
  GetCategoriesDocument,
  GetCategoryWithCardsDocument,
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
  const [removeCategoryMutation, { data, loading, error }] =
    useRemoveCategoryMutation();

  const removeCategory = (id: string) =>
    removeCategoryMutation({
      variables: {
        id,
      },
      update: (cache, { data }) => {
        if (!data?.removeCategory?.success) {
          console.log('Mutation failed, not updating cache');
          return;
        }

        try {
          console.log('Updating cache after category removal');

          // Step 1: Evict the specific category from the cache
          cache.evict({ id: `Category:${id}` });
          console.log(`Evicted Category:${id} from cache`);

          // Step 2: Update the categories list query to remove this category
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              categories(existingCategories = [], { readField }) {
                console.log('Updating categories list in cache');
                return existingCategories.filter((categoryRef: Reference) => {
                  const categoryId = readField('id', categoryRef);
                  const result = id !== categoryId;
                  console.log(`Category ${categoryId}: keeping = ${result}`);
                  return result;
                });
              },
            },
          });

          // Step 3: Remove any specific category query that references this ID
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              category(_, { storeFieldName }) {
                // Check if this field is for the removed category
                if (storeFieldName.includes(`({"id":"${id}"`)) {
                  console.log(`Removing category query for ID ${id}`);
                  return undefined;
                }
                return _;
              },
            },
          });

          // Step 4: Clean up any references to this category in cards
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              cards(existingCards = [], { readField }) {
                console.log('Checking card references to removed category');
                return existingCards;
              },
            },
          });

          // Step 5: Run garbage collection to clean up any dangling references
          const gcResult = cache.gc();
          console.log(`Garbage collection removed ${gcResult.length} items`);
        } catch (e) {
          console.error('Error updating cache after category removal:', e);
        }
      },
      // Force a refetch to ensure we have fresh data
      refetchQueries: [{ query: GetCategoriesDocument }],
      // Don't merge with existing data
      fetchPolicy: 'network-only',
    });

  return [removeCategory, data, loading, error];
};

export { useRemoveCategory, RemoveCategoryDocument };
