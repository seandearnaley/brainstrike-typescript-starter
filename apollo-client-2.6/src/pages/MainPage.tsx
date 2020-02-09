import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CardContainer } from '../containers/CardContainer';
import { CategoryContainer } from '../containers/CategoryContainer';

export const MainPage: React.FC = () => {
  return (
    <FlexLayout
      left={<CategoryContainer></CategoryContainer>}
      middle={<CardContainer></CardContainer>}
      right={<div>right</div>}
    ></FlexLayout>
  );
};
