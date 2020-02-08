import React from 'react';

import { FlexLayout } from '../components/FlexLayout';
import { CardContainer } from '../containers/CardContainer';

export const MainPage: React.FC = () => {
  return (
    <FlexLayout
      left={<div>Test</div>}
      middle={<CardContainer></CardContainer>}
      right={<div>right</div>}
    ></FlexLayout>
  );
};
