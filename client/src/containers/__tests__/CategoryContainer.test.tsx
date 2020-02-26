import React from 'react';
import { renderApollo, cleanup, wait } from '../../test-utils';
import { DirectionEnum } from '../../generated/graphql';
// The component AND the query need to be exported
import {
  GetCategoryWithCardsDocument,
  CategoryContainer,
} from '../CategoryContainer';

const selectedCategory =
  'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5';

// IMPORTANT: make sure your mocks match the query exactly or you'll get empty data in your implementations.
const mocks = [
  {
    request: {
      query: GetCategoryWithCardsDocument,
      variables: {
        first: 5,
        orderByColumn: 'number',
        orderByDirection: DirectionEnum.Asc,
        id: selectedCategory,
      },
    },
    result: {
      data: {
        category: {
          __typename: 'Category',
          id: 'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
          name: 'Automotive 81880',
          created: '2020-02-02T04:46:40.205Z',
          updated: '2020-02-02T04:46:40.205Z',
          cards: {
            __typename: 'CardConnection',
            pageInfo: {
              __typename: 'PageInfo',
              hasNextPage: true,
              hasPreviousPage: false,
              startCursor:
                'Q3xDYXJkfGNkNzU0MWE2LWRkYzAtNGUxZC1iZTE4LTRiOTdmZTNiNjJlNXwx',
              endCursor:
                'Q3xDYXJkfGM5YmYzYzg3LTQ1OTAtNGNiMi05NjdhLTdkZmY3MDhjMTkxYnw1',
              totalCount: 11,
            },
            edges: [
              {
                __typename: 'CardEdge',
                cursor:
                  'Q3xDYXJkfDJjNDY3MzI3LWUxOGEtNDkyZC1hMmRhLWE1Yzg0ODc0MWI4OXwx',
                node: {
                  __typename: 'Card',
                  id:
                    'MmM0NjczMjctZTE4YS00OTJkLWEyZGEtYTVjODQ4NzQxYjg5OkNhcmQ=',
                  created: '2020-02-02T01:56:49.399Z',
                  updated: '2020-02-02T01:56:49.399Z',
                  label: 'neque autem qui',
                  number: 4257,
                },
              },
              {
                __typename: 'CardEdge',
                cursor:
                  'Q3xDYXJkfGNmNWIwYWM5LTUzNzgtNGMyOC04OTk1LTUwMmVmOTI1ZDcyMHwy',
                node: {
                  __typename: 'Card',
                  id:
                    'Y2Y1YjBhYzktNTM3OC00YzI4LTg5OTUtNTAyZWY5MjVkNzIwOkNhcmQ=',
                  created: '2020-02-01T23:38:32.523Z',
                  updated: '2020-02-01T23:38:32.523Z',
                  label: 'reiciendis quo voluptatem',
                  number: 9548,
                },
              },
              {
                __typename: 'CardEdge',
                cursor:
                  'Q3xDYXJkfGNkNzU0MWE2LWRkYzAtNGUxZC1iZTE4LTRiOTdmZTNiNjJlNXwz',
                node: {
                  __typename: 'Card',
                  id:
                    'Y2Q3NTQxYTYtZGRjMC00ZTFkLWJlMTgtNGI5N2ZlM2I2MmU1OkNhcmQ=',
                  created: '2020-02-02T17:45:05.384Z',
                  updated: '2020-02-02T17:45:05.384Z',
                  label: 'omnis unde aut',
                  number: 33066,
                },
              },
              {
                __typename: 'CardEdge',
                cursor:
                  'Q3xDYXJkfGZkOGJjODlkLTFmODctNDY0Ni1hY2FiLTY0NjJiNjI3M2E2OHw0',
                node: {
                  __typename: 'Card',
                  id:
                    'ZmQ4YmM4OWQtMWY4Ny00NjQ2LWFjYWItNjQ2MmI2MjczYTY4OkNhcmQ=',
                  created: '2020-02-02T04:37:41.878Z',
                  updated: '2020-02-02T04:37:41.878Z',
                  label: 'laborum hic perspiciatis',
                  number: 37840,
                },
              },
              {
                __typename: 'CardEdge',
                cursor:
                  'Q3xDYXJkfGM5YmYzYzg3LTQ1OTAtNGNiMi05NjdhLTdkZmY3MDhjMTkxYnw1',
                node: {
                  __typename: 'Card',
                  id:
                    'YzliZjNjODctNDU5MC00Y2IyLTk2N2EtN2RmZjcwOGMxOTFiOkNhcmQ=',
                  created: '2020-02-02T05:19:34.660Z',
                  updated: '2020-02-02T05:19:34.660Z',
                  label: 'veritatis doloribus consequatur',
                  number: 54372,
                },
              },
            ],
          },
        },
      },
    },
  },
];

describe('Category Container', () => {
  afterEach(cleanup);

  it('renders without error', async () => {
    const { container } = renderApollo(
      <CategoryContainer
        selectedCategory={selectedCategory}
        onSelectCard={() => {}}
        onSelectCategory={() => {}}
      />,
      { mocks, addTypename: false },
    );

    expect(container.textContent).toBeTruthy();
  });

  it('should render loading state initially', async () => {
    const { container } = renderApollo(
      <CategoryContainer
        selectedCategory={selectedCategory}
        onSelectCard={() => {}}
        onSelectCategory={() => {}}
      />,
      { mocks, addTypename: false },
    );

    expect(container.textContent).toBe('Loading...');
  });

  it('should render category with cards', async () => {
    const { getByTestId } = renderApollo(
      <CategoryContainer
        selectedCategory={selectedCategory}
        onSelectCard={() => {}}
        onSelectCategory={() => {}}
      />,
      { mocks, addTypename: false },
    );

    await wait();
    expect(getByTestId('selected-id').textContent).toBe(
      `Selected: ${selectedCategory}`,
    );
  });

  //TODO: fetch more test
});
