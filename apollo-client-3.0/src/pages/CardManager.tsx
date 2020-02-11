import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CardContainer } from '../containers/CardContainer';
import { CategoryContainer } from '../containers/CategoryContainer';

export const CardManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const onSelectCategory = (categoryId: string): void =>
    setSelectedCategory(categoryId);

  return (
    <FlexLayout
      left={
        <CategoryContainer
          onSelectCategory={onSelectCategory}
        ></CategoryContainer>
      }
      middle={
        <CardContainer selectedCategory={selectedCategory}></CardContainer>
      }
      right={<div>right</div>}
    ></FlexLayout>
  );
};
