import React from 'react';
import {
  renderApollo,
  cleanup,
  waitFor,
  getByTestId,
} from '../../test-utils';

// The component AND the query need to be exported
import { CardContainer, GetCardWithCategoriesDocument } from '../CardContainer';

const selectedCard = 'MmM0NjczMjctZTE4YS00OTJkLWEyZGEtYTVjODQ4NzQxYjg5OkNhcmQ=';

// IMPORTANT: make sure your mocks match the query exactly or you'll get empty data in your implementations.
const mocks = [
  {
    request: {
      query: GetCardWithCategoriesDocument,
      variables: {
        id: selectedCard,
      },
    },
    result: {
      data: {
        card: {
          __typename: 'Card',
          id: selectedCard,
          created: '2020-02-02T01:56:49.399Z',
          updated: '2020-02-02T01:56:49.399Z',
          label: 'neque autem qui',
          number: 4257,
          categories: [
            {
              __typename: 'Category',
              id: 'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
              name: 'Automotive 81880',
              created: '2020-02-02T04:46:40.205Z',
              updated: '2020-02-02T04:46:40.205Z',
            }
          ]
        },
      },
    },
  },
];

describe('Card Container', () => {
  afterEach(cleanup);

  it('renders without error', async () => {
    const { container } = renderApollo(
      <CardContainer
        selectedCard={selectedCard}
        onSelectCard={() => {}}
      />,
      { mocks, addTypename: false },
    );

    await waitFor(() => expect(container.textContent).toBeTruthy());
  });

  it('should render loading state initially', async () => {
    const { container } = renderApollo(
      <CardContainer
        selectedCard={selectedCard}
        onSelectCard={() => {}}
      />,
      { mocks, addTypename: false },
    );

    await waitFor(() => expect(container.textContent).toBe('Loading...'));
    
  });

  // TODO: remove card test

  // TODO: content test
});
