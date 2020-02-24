import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '../../test-utils';
import { FlexLayout } from '../FlexLayout';

describe('Flex Layout', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(
            <FlexLayout left={<div>Left</div>} middle={<div>Middle</div>} right={<div>Right</div>}/>
    );
  });
});
