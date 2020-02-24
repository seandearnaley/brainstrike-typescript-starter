import React from 'react';

import { render, cleanup } from '../../test-utils';
import { CardTable } from '../CardTable';

const mockCardData = [
  {
    id: 'M2Y1NWI1N2YtNGRmNS00MmI1LThjY2ItY2Y2OWViODBmNWViOkNhcmQ=',
    number: 27162,
    label: 'et nostrum eligendi',
    created: '2020-02-02T07:25:52.528Z',
    updated: '2020-02-02T07:25:52.528Z',
  },
  {
    id: 'Yzg5MmFmZDEtNjFhYy00NDVkLTgyYjUtN2YwNjAyMTU4NTIyOkNhcmQ=',
    number: 27554,
    label: 'dolores non necessitatibus',
    created: '2020-02-02T01:41:42.362Z',
    updated: '2020-02-02T01:41:42.362Z',
  },
  {
    id: 'ZTY0NDczYmItOWZhOS00N2I5LWE4ZjEtMjMzMjYzYzhmMGEyOkNhcmQ=',
    number: 33521,
    label: 'quisquam quos quis',
    created: '2020-02-02T05:23:13.051Z',
    updated: '2020-02-02T05:23:13.051Z',
  },
  {
    id: 'YzNiYjUwYWMtZmZlNy00MTYwLWE5OGMtMjFiZDVjM2JkMGM2OkNhcmQ=',
    number: 39095,
    label: 'atque nihil est',
    created: '2020-02-02T00:17:47.717Z',
    updated: '2020-02-02T00:17:47.717Z',
  },
  {
    id: 'MmU4YjFlZmItYzA3OC00NTI3LWFlOWMtNTg2YTNmNWIxOTc0OkNhcmQ=',
    number: 51830,
    label: 'voluptates rem autem',
    created: '2020-02-02T11:20:28.463Z',
    updated: '2020-02-02T11:20:28.463Z',
  },
];

describe('Card Table', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<CardTable data={mockCardData} onSelectCard={() => {}} />);
  });
});
