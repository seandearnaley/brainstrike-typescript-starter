import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { css } from '@emotion/css';
import {
  useRemoveCategory,
  RemoveCategoryDocument,
  GetCategoriesDocument,
} from './shared/useRemoveCategory';

// Define the CategoryParts fragment explicitly to ensure it's available
const CATEGORY_PARTS = gql`
  fragment CategoryParts on Category {
    id
    name
    created
    updated
  }
`;

// Define the type for the category data
interface CategoryData {
  id: string;
  name?: string | null;
  created: string;
  updated?: string | null;
}

interface RemoveCategoryContainerProps {
  id: string | null;
  onSelectCategory: (id: string | null) => void;
}

const RemoveCategoryContainer: React.FC<RemoveCategoryContainerProps> = ({
  id,
  onSelectCategory,
}: RemoveCategoryContainerProps) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [removalSuccess, setRemovalSuccess] = useState(false);
  const [removedCategoryName, setRemovedCategoryName] = useState('');
  const [removeCategory, data, loading, error] = useRemoveCategory();
  const client = useApolloClient();

  const doRemoveCategory = async () => {
    console.log('doRemoveCategory function called');
    if (!id) {
      console.error('Cannot remove category: id is null');
      return;
    }
    try {
      console.log('Starting category removal process for ID:', id);
      // Store the category name before removal for the success message
      try {
        // Try to read the category from the cache
        const cacheId = `Category:${id}`;
        console.log('Attempting to read from cache with ID:', cacheId);
        // First try to read directly from the cache
        const categoryData = client.cache.readFragment<CategoryData>({
          id: cacheId,
          fragment: CATEGORY_PARTS,
        });
        console.log('Category cache data:', categoryData);
        if (categoryData && categoryData.name) {
          setRemovedCategoryName(categoryData.name);
        } else {
          // If that fails, try to query for the category
          console.log('Cache read failed, trying to query for category');
          const result = await client.query({
            query: gql`
              query GetCategory($id: ID!) {
                category(id: $id) {
                  id
                  name
                }
              }
            `,
            variables: { id },
            fetchPolicy: 'network-only', // Skip the cache
          });
          console.log('Query result:', result);
          if (result.data?.category?.name) {
            setRemovedCategoryName(result.data.category.name);
          } else {
            setRemovedCategoryName('the category');
          }
        }
      } catch (fragmentError) {
        console.error('Error reading category data:', fragmentError);
        setRemovedCategoryName('the category');
      }
      // First clear the selected category to prevent queries for a non-existent category
      onSelectCategory(null);
      console.log('Selected category cleared');
      // Wait a tick to ensure the UI updates before we remove the category
      await new Promise(resolve => setTimeout(resolve, 100));
      // Then remove the category
      console.log('Executing removeCategory mutation');
      const result = await removeCategory(id);
      console.log('Mutation result:', result);
      if (result.data?.removeCategory?.success) {
        console.log('Category successfully removed, clearing Apollo store');
        // Reset the Apollo cache if the mutation was successful
        try {
          // First evict the specific category from the cache
          client.cache.evict({ id: `Category:${id}` });
          console.log(`Manually evicted Category:${id} from cache`);
          // Then run garbage collection
          const gcResult = client.cache.gc();
          console.log(`Manual garbage collection removed ${gcResult.length} items`);
          // Finally clear the store to ensure all references are removed
          await client.clearStore();
          console.log('Apollo store cleared');
        } catch (cacheError) {
          console.error('Error clearing cache:', cacheError);
        }
        // Force a refetch of the categories list to ensure it's up to date
        await client.refetchQueries({
          include: [GetCategoriesDocument],
        });
        console.log('Categories refetched');
        // Set success state to show the success message
        setRemovalSuccess(true);
      } else {
        console.error('Category removal failed:', result.data?.removeCategory?.message);
      }
    } catch (error) {
      console.error('Error in doRemoveCategory function:', error);
      // Show the error to the user
      alert(`Error removing category: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // If we've successfully removed the category, show a success message
  if (removalSuccess) {
    return (
      <div className={css`
        padding: 16px;
        background-color: #e8f5e9;
        border-radius: 8px;
        margin-top: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      `}>
        <h3 className={css`
          margin-top: 0;
          color: #2e7d32;
          font-weight: 500;
          font-size: 1.25rem;
        `}>Success!</h3>
        <p data-testid="message" className={css`
          margin-bottom: 8px;
          font-size: 1rem;
        `}>
          <strong>{removedCategoryName}</strong> has been successfully removed.
        </p>
        <p className={css`
          margin-bottom: 0;
          font-size: 0.875rem;
          color: #43a047;
        `}>Please select another category from the list on the left.</p>
      </div>
    );
  }

  // If the mutation has completed, show the server's response message
  if (data && data.removeCategory) {
    return (
      <div className={css`
        padding: 16px;
        background-color: #e8f5e9;
        border-radius: 8px;
        margin-top: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      `}>
        <h3 className={css`
          margin-top: 0;
          color: #2e7d32;
          font-weight: 500;
          font-size: 1.25rem;
        `}>Success!</h3>
        <p data-testid="message" className={css`
          margin-bottom: 8px;
          font-size: 1rem;
        `}>{data.removeCategory.message}</p>
        <p className={css`
          margin-bottom: 0;
          font-size: 0.875rem;
          color: #43a047;
        `}>Please select another category from the list on the left.</p>
      </div>
    );
  }

  // Otherwise, show the remove button or confirmation button
  return (
    <div className={css`
      display: flex;
      justify-content: flex-end;
    `}>
      {!showConfirmRemove ? (
        <button
          onClick={() => {
            console.log('Remove Category button clicked');
            setShowConfirmRemove(true);
          }}
          data-testid="remove-category-button"
          className={css`
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: background-color 0.2s;
            
            &:hover {
              background-color: #d32f2f;
            }
          `}
        >
          Remove Category
        </button>
      ) : (
        <div className={css`
          padding: 16px;
          background-color: #ffebee;
          border-radius: 8px;
          margin-left: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        `}>
          <p className={css`
            margin-top: 0;
            margin-bottom: 8px;
            font-weight: 500;
            color: #d32f2f;
          `}>Are you sure you want to remove this category?</p>
          <p className={css`
            margin-bottom: 16px;
            font-size: 0.875rem;
            color: #757575;
          `}>This action cannot be undone. All cards in this category will be updated.</p>
          
          <div className={css`
            display: flex;
            gap: 8px;
          `}>
            <button
              onClick={() => {
                console.log('Confirm Remove Category button clicked');
                doRemoveCategory();
              }}
              data-testid="confirm-remove-category-button"
              className={css`
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #d32f2f;
                }
              `}
            >
              Confirm Remove
            </button>
            
            <button
              onClick={() => {
                console.log('Cancel button clicked');
                setShowConfirmRemove(false);
              }}
              className={css`
                background-color: #e0e0e0;
                color: #424242;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #bdbdbd;
                }
              `}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {loading && (
        <div className={css`
          margin-top: 16px;
          padding: 8px 16px;
          background-color: #e3f2fd;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #1976d2;
        `}>
          <span>Removing category...</span>
        </div>
      )}
      
      {error && (
        <div className={css`
          margin-top: 16px;
          padding: 8px 16px;
          background-color: #ffebee;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #d32f2f;
        `}>
          <span>Error: {error.message}</span>
        </div>
      )}
    </div>
  );
};

export {
  RemoveCategoryContainer,
  RemoveCategoryDocument,
  GetCategoriesDocument,
}; // document used by tests