import React from 'react';
import { vi } from 'vitest';

// Mock the formik-mui TextField component
vi.mock('formik-mui', () => ({
  TextField: ({ field, form, InputLabelProps, fullWidth, multiline, ...props }: any) => {
    // Filter out props that cause warnings
    const safeProps = { ...props };
    delete safeProps.variant;
    delete safeProps.margin;
    
    return <input {...field} {...safeProps} data-testid="text-field" />;
  }
}));

import { render, cleanup } from '../../test-utils';
import { CardForm } from '../CardForm';

describe('Card Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<CardForm initialValues={{ number: 100, label: "test", description: "Test description"}} onSubmit={(values, actions) => {}} />);
  });
});
