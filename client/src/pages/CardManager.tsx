import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CategoryContainer } from '../containers/CategoryContainer';
import { CategoriesContainer } from '../containers/CategoriesContainer';
import { CardContainer } from '../containers/CardContainer';

export const CardManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  const onSelectCategory = (id: string | null): void => setSelectedCategory(id);
  const onSelectCard = (id: string | null): void => setSelectedCard(id);

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
          onSelectCategory={onSelectCategory}
          onSelectCard={onSelectCard}
        ></CategoryContainer>
      }
      right={
        <CardContainer
          onSelectCard={onSelectCard}
          selectedCard={selectedCard}
        ></CardContainer>
      }
    ></FlexLayout>
  );
};
