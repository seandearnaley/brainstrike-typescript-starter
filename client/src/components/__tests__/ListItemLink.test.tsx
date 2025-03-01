import React from 'react';
import { render, cleanup, screen } from '../../test-utils';
import { ListItemLink } from '../ListItemLink';
import { vi } from 'vitest';

// Mock the useLocation hook directly in the test
vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({ 
      pathname: '/cards', 
      search: '', 
      hash: '', 
      state: null,
      key: 'default'
    })
  };
});

// Mock the MUI components used in ListItemLink
vi.mock('@mui/material/ListItem', () => ({
  default: ({ children, component, ...props }: { children?: React.ReactNode; component?: any; [key: string]: any }) => (
    <div data-testid="list-item" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/ListItemText', () => ({
  default: ({ primary, disableTypography, ...props }: { primary?: React.ReactNode; disableTypography?: boolean; [key: string]: any }) => (
    <div data-testid="list-item-text" {...props}>
      {primary}
    </div>
  ),
}));

describe('List Item Link', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<ListItemLink primary="Cards" to="/cards" />);
    
    // Use a more flexible approach to find the text
    expect(screen.getByTestId('list-item-text')).toHaveTextContent('Cards');
  });
});
