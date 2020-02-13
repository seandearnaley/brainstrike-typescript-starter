import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CategoryContainer } from '../containers/CategoryContainer';
import { CategoriesContainer } from '../containers/CategoriesContainer';
import { CardContainer } from '../containers/CardContainer';

export const CardManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState('');

  const onSelectCategory = (categoryId: string): void =>
    setSelectedCategory(categoryId);

  const onSelectCard = (cardId: string): void => setSelectedCard(cardId);

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
          onSelectCard={onSelectCard}
        ></CategoryContainer>
      }
      right={<CardContainer selectedCard={selectedCard}></CardContainer>}
    ></FlexLayout>
  );
};
