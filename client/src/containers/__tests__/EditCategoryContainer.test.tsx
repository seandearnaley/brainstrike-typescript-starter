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
  UpdateCategoryNameDocument
} from '../EditCategoryContainer';


const mockId =
  'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5';

describe("Edit Category Container", () => {

  afterEach(cleanup);

  it('renders without error', async () => {
    const { getByTestId } = renderApollo(
      <EditCategoryContainer id={mockId} originalCategoryName={"Original Category"}/>,
      { addTypename: false },
    );
    expect(getByTestId('update-category-content-div')).toBeTruthy();
  });

  it('removes category', async () => {

    const { getByTestId } = renderApollo(
      <EditCategoryContainer
        id={mockId}
        originalCategoryName={'Original Category'}
      />,
      { addTypename: false },
    );
    
    //fireEvent.click(getByTestId('remove-category-button'));

    // Let's wait until our mocked mutation resolves and
    // the component re-renders.
    // getByTestId throws an error if it cannot find an element with the given ID
    // and waitForElement will wait until the callback doesn't throw an error
    await waitForElement(() => getByTestId('update-category-content-div'));

    fireEvent.focus(getByTestId('update-category-content-div'));

    getByTestId('update-category-content-div').innerHTML = "New Category";

    fireEvent.blur(getByTestId('update-category-content-div'));

    

    // await waitForElement(() => getByTestId('message'));

  });

});
