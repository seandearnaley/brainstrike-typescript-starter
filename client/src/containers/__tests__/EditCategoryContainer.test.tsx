import React from 'react';
import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';

// The component AND the query need to be exported
import {
  EditCategoryContainer,
  UpdateCategoryNameDocument,
} from '../EditCategoryContainer';

const mockId = 'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5';

const oldCategoryName = 'Automotive 1219';
const newCategoryName = 'Updated Automative 1219';

const mockReturnCategory = {
  __typename: 'Category',
  id: mockId,
  name: newCategoryName,
  created: '2020-02-02T10:22:55.849Z',
  updated: '2020-02-02T10:22:55.849Z',
};

// IMPORTANT: make sure your mocks match the query exactly or you'll get empty data in your implementations.
const mocks = [
  {
    request: {
      query: UpdateCategoryNameDocument,
      variables: { id: mockId, input: { name: newCategoryName } },
    },
    result: {
      data: {
        __typename: 'Mutation',
        updateCategory: {
          __typename: 'CategoryUpdatedResponse',
          success: true,
          message: 'Category Updated',
          category: mockReturnCategory,
        },
      },
    },
  },
];

describe('Edit Category Container', () => {
  afterEach(cleanup);

  it('renders without error', async () => {
    const { getByTestId } = renderApollo(
      <EditCategoryContainer
        id={mockId}
        originalCategoryName={'Original Category'}
      />,
      { mocks, addTypename: false },
    );
    expect(getByTestId('update-category-content-div')).toBeTruthy();
  });

  it('updates category name', async () => {
    const { getByTestId } = renderApollo(
      <EditCategoryContainer
        id={mockId}
        originalCategoryName={'Original Category'}
      />,
      { mocks, addTypename: false },
    );

    await waitForElement(() => [
      getByTestId('update-category-content-div'),
      getByTestId('update-category-edit-button'),
    ]);

    fireEvent.click(getByTestId('update-category-edit-button'));

    await waitForElement(() => getByTestId('update-category-save-button'));

    // contenteditable doesn't accept fireEvent.change, but you can focus and blur to trigger onChange
    fireEvent.focus(getByTestId('update-category-content-div'));

    getByTestId('update-category-content-div').innerHTML = newCategoryName;

    fireEvent.blur(getByTestId('update-category-content-div'));

    fireEvent.click(getByTestId('update-category-save-button'));

    await waitForElement(() => getByTestId('update-category-messsage'));
  });
});
