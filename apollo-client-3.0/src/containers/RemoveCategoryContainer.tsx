import React, { useState } from 'react';
import { useRemoveCategory } from './shared/useRemoveCategory';

interface RemoveCategoryContainerProps {
  id: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const RemoveCategoryContainer: React.FC<RemoveCategoryContainerProps> = ({
  id,
  onSelectCategory,
}: RemoveCategoryContainerProps) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [removeCategory, loading, error] = useRemoveCategory();

  const doRemoveCategory = async () => {
    if (!id) return;
    await removeCategory(id);
    onSelectCategory(null);
  };

  return (
    <div>
      <button onClick={() => setShowConfirmRemove(true)}>
        Remove Category
      </button>

      {showConfirmRemove && (
        <button onClick={doRemoveCategory}>
          Please Confirm Remove Category
        </button>
      )}
      {loading && <span>Updating...</span>}
      {error && <span>Error...</span>}
    </div>
  );
};
