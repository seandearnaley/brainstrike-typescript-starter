import React from 'react';
import { render, cleanup, screen } from '../../test-utils';
import { ListItemLink } from '../ListItemLink';

// Automatically use the mock from __mocks__ directory
jest.mock('react-router-dom');

describe('List Item Link', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<ListItemLink primary="Cards" to="/cards" />);
    
    // Verify the component rendered correctly
    expect(screen.getByText('Cards')).toBeInTheDocument();
  });
});
