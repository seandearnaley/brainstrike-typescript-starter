import React, { useMemo } from 'react';
import {
  useGetCategoriesQuery,
  GetCategoriesDocument,
} from '../generated/graphql';
import { CategorySelector } from '../components/CategorySelector';

interface CategoriesContainerProps {
  onSelectCategory: (id: string) => void;
  selectedCategory?: string | null;
}

const CategoriesContainer: React.FC<CategoriesContainerProps> = ({
  onSelectCategory,
  selectedCategory,
}: CategoriesContainerProps) => {
  const { data, loading, error } = useGetCategoriesQuery();
  
  const categoryData = useMemo(
    () =>
      data?.categories.map(({ id, name, created, updated }) => ({
        id,
        name,
        created,
        updated,
      })) ?? [],
    [data],
  );

  if (loading) return (
    <div className="categories-loading" style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <p style={{ color: '#3f51b5', fontWeight: 500 }}>Loading...</p>
    </div>
  );
  
  if (error || !data) return (
    <div className="categories-error" style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      color: '#f44336',
      padding: '0 16px',
      textAlign: 'center'
    }}>
      <p>Error loading categories. Please try again later.</p>
    </div>
  );
  
  return (
    <CategorySelector
      data={categoryData}
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory}
      data-testid="category-selector"
    />
  );
};

export { CategoriesContainer, GetCategoriesDocument }; // document used by tests