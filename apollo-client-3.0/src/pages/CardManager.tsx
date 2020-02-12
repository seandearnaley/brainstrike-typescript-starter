import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CategoryContainer } from '../containers/CategoryContainer';
import { CategoriesContainer } from '../containers/CategoriesContainer';

export const CardManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const onSelectCategory = (categoryId: string): void =>
    setSelectedCategory(categoryId);

  return (
    <FlexLayout
      left={
        <CategoriesContainer
          onSelectCategory={onSelectCategory}
        ></CategoriesContainer>
      }
      middle={
        <CategoryContainer
          selectedCategory={selectedCategory}
        ></CategoryContainer>
      }
      right={<div>right</div>}
    ></FlexLayout>
  );
};
