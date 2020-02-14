import React, { useState } from 'react';
import {
  GetCategoryWithCardsQuery,
  GetCategoriesDocument,
  useRemoveCategoryMutation,
  CategoryPartsFragment,
} from '../generated/graphql';
import { cache } from '../index';

interface RemoveCategoryContainerProps {
  data: GetCategoryWithCardsQuery;
  onSelectCategory: (id: string | null) => void;
}

export const RemoveCategoryContainer: React.FC<RemoveCategoryContainerProps> = ({
  data,
  onSelectCategory,
}: RemoveCategoryContainerProps) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const [
    removeCategoryMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useRemoveCategoryMutation();

  const removeCategory = async () => {
    if (data.category) {
      await removeCategoryMutation({
        variables: {
          id: data.category.id,
        },
        update: (store, { data }) => {
          const id = data?.removeCategory?.category?.id;
          if (!id) return;
          onSelectCategory(null);

          // cache.evict(data.removeCategory.category.id);
          // cache.gc();

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
    }
  };

  return (
    <div>
      <button onClick={() => setShowConfirmRemove(true)}>
        Remove Category
      </button>

      {showConfirmRemove && (
        <button onClick={removeCategory}>Please Confirm Remove Category</button>
      )}
      {mutationLoading && <span>Updating...</span>}
      {mutationError && <span>Error...</span>}
    </div>
  );
};
