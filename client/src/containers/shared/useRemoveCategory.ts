import { ApolloError, FetchResult } from '@apollo/client';

import {
  GetCategoriesDocument,
  useRemoveCategoryMutation,
  CategoryPartsFragment,
  RemoveCategoryMutation,
} from '../../generated/graphql';

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCategory function can be used elsewhere with shared cache logic
export const useRemoveCategory = (): [
  (
    id: string | null,
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

  const removeCategory = (id: string | null) =>
    removeCategoryMutation({
      variables: {
        id: id ?? '',
      },
      update: (cache, { data }) => {
        const id = data?.removeCategory?.category?.id;
        if (!id) return;

        const { categories } =
          cache.readQuery({
            query: GetCategoriesDocument,
          }) || {};

        cache.writeQuery({
          query: GetCategoriesDocument,
          data: {
            categories: categories.filter(
              (category: CategoryPartsFragment) => category.id !== id,
            ),
          },
        });
      },
    });
  return [removeCategory, loading, error];
};
