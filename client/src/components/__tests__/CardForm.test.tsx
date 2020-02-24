import React from 'react';

import { render, cleanup } from '../../test-utils';
import { CardForm } from '../CardForm';

describe('Card Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<CardForm initialValues={{ number: 100, label: "test", description: "Test description"}} onSubmit={(values, actions) => {}} />);
  });
});
