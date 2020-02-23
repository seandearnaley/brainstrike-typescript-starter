import React, { useState } from 'react';
import {
  useRemoveCategory,
  RemoveCategoryDocument,
  GetCategoriesDocument,
} from './shared/useRemoveCategory';

interface RemoveCategoryContainerProps {
  id: string | null;
  onSelectCategory: (id: string | null) => void;
}

const RemoveCategoryContainer: React.FC<RemoveCategoryContainerProps> = ({
  id,
  onSelectCategory,
}: RemoveCategoryContainerProps) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [removeCategory, data, loading, error] = useRemoveCategory();

  const doRemoveCategory = async () => {
    if (!id) return;
    await removeCategory(id);
    onSelectCategory(null);
  };

  return data && data.removeCategory ? (
    <p data-testid="message">{data.removeCategory.message}</p>
  ) : (
    <div>
      {!showConfirmRemove && (
        <button
          onClick={() => setShowConfirmRemove(true)}
          data-testid="remove-category-button"
        >
          Remove Category
        </button>
      )}
      {showConfirmRemove && (
        <button
          onClick={doRemoveCategory}
          data-testid="confirm-remove-category-button"
        >
          Please Confirm Remove Category
        </button>
      )}
      {loading && <span>Removing...</span>}
      {error && <span>Error...</span>}
    </div>
  );
};

export {
  RemoveCategoryContainer,
  RemoveCategoryDocument,
  GetCategoriesDocument,
}; // document used by tests
