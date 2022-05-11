import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '../../test-utils';
import { ListItemLink } from '../ListItemLink';

describe('List Item Link', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(
      <Router>
        <ListItemLink primary="Cards" to="/cards" />
      </Router>,
    );
  });
});
