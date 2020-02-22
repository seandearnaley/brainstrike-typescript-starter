import React from 'react';
import { renderApollo, cleanup, fireEvent, waitForElement } from '../../test-utils';

// The component AND the query need to be exported
import {
  RemoveCategoryContainer,
  RemoveCategoryDocument,
} from '../RemoveCategoryContainer';

const mockRemoveId =
  'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5';

// IMPORTANT: make sure your mocks match the query exactly or you'll get empty data in your implementations.
const mocks = [
  {
    request: {
      query: RemoveCategoryDocument,
      variables: { id: mockRemoveId },
    },
    result: {
      data: {
        removeCategory: {
          success: true,
          message: 'Category Removed',
          category: {
            id: mockRemoveId,
            name: 'Automotive 1219',
            created: '2020-02-02T10:22:55.849Z',
            updated: '2020-02-02T10:22:55.849Z',
          },
        },
      },
    },
  },
];

const onSelectCategory = (id: string | null): void => {
  // eslint-disable-line
  // do nothing;
};

afterEach(cleanup);

it('renders without error', async () => {
  const { getByTestId } = renderApollo(
    <RemoveCategoryContainer
      id={mockRemoveId}
      onSelectCategory={onSelectCategory}
    />,
    { mocks, addTypename: false },
  );
  expect(getByTestId('remove-category-button')).toBeTruthy();
});

it('renders without error', async () => {
  const { getByTestId } = renderApollo(
    <RemoveCategoryContainer
      id={mockRemoveId}
      onSelectCategory={onSelectCategory}
    />,
    { mocks, addTypename: false },
  );

  fireEvent.click(getByTestId('remove-category-button'));

  // Let's wait until our mocked mutation resolves and
  // the component re-renders.
  // getByTestId throws an error if it cannot find an element with the given ID
  // and waitForElement will wait until the callback doesn't throw an error
  await waitForElement(() => getByTestId('confirm-remove-category-button'));

  fireEvent.click(getByTestId('confirm-remove-category-button'));

  await waitForElement(() => getByTestId('message'));
});
