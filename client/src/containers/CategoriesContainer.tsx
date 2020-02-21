import React, { useMemo } from 'react';
import {
  useGetCategoriesQuery,
  GetCategoriesDocument,
} from '../generated/graphql';
import { CategorySelector } from '../components/CategorySelector';

interface CategoriesContainerProps {
  onSelectCategory: (id: string) => void;
}

const CategoriesContainer: React.FC<CategoriesContainerProps> = ({
  onSelectCategory,
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

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <CategorySelector
      data={categoryData}
      onSelectCategory={onSelectCategory}
    ></CategorySelector>
  );
};

export { CategoriesContainer, GetCategoriesDocument };
