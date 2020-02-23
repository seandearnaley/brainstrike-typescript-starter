export const mockCacheData = {
  'Category:NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5': {
    __typename: 'Category',
    id: 'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
    name: 'Automotive 17977',
    created: '2020-02-02T00:41:31.650Z',
    updated: '2020-02-02T00:41:31.650Z',
    'cards:{}': {
      __typename: 'CardConnection',
      pageInfo: {
        __typename: 'PageInfo',
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor:
          'Q3xDYXJkfDNmNTViNTdmLTRkZjUtNDJiNS04Y2NiLWNmNjllYjgwZjVlYnwx',
        endCursor:
          'Q3xDYXJkfGM4OTJhZmQxLTYxYWMtNDQ1ZC04MmI1LTdmMDYwMjE1ODUyMnwy',
        totalCount: 2,
      },
      edges: [
        {
          __typename: 'CardEdge',
          cursor:
            'Q3xDYXJkfDNmNTViNTdmLTRkZjUtNDJiNS04Y2NiLWNmNjllYjgwZjVlYnwx',
          node: {
            __ref:
              'Card:M2Y1NWI1N2YtNGRmNS00MmI1LThjY2ItY2Y2OWViODBmNWViOkNhcmQ=',
          },
        },
        {
          __typename: 'CardEdge',
          cursor:
            'Q3xDYXJkfGM4OTJhZmQxLTYxYWMtNDQ1ZC04MmI1LTdmMDYwMjE1ODUyMnwy',
          node: {
            __ref:
              'Card:Yzg5MmFmZDEtNjFhYy00NDVkLTgyYjUtN2YwNjAyMTU4NTIyOkNhcmQ=',
          },
        },
      ],
    },
  },
  ROOT_QUERY: {
    __typename: 'Query',
    categories: [
      {
        __ref:
          'Category:NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
      },
    ],
    'category({"id":"NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5"})': {
      __ref:
        'Category:NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
    },
  },
  'Card:M2Y1NWI1N2YtNGRmNS00MmI1LThjY2ItY2Y2OWViODBmNWViOkNhcmQ=': {
    __typename: 'Card',
    id: 'M2Y1NWI1N2YtNGRmNS00MmI1LThjY2ItY2Y2OWViODBmNWViOkNhcmQ=',
    created: '2020-02-02T07:25:52.528Z',
    updated: '2020-02-02T07:25:52.528Z',
    label: 'et nostrum eligendi',
    number: 27162,
  },
  'Card:Yzg5MmFmZDEtNjFhYy00NDVkLTgyYjUtN2YwNjAyMTU4NTIyOkNhcmQ=': {
    __typename: 'Card',
    id: 'Yzg5MmFmZDEtNjFhYy00NDVkLTgyYjUtN2YwNjAyMTU4NTIyOkNhcmQ=',
    created: '2020-02-02T01:41:42.362Z',
    updated: '2020-02-02T01:41:42.362Z',
    label: 'dolores non necessitatibus',
    number: 27554,
  },
};
