import React from 'react';

import { render, cleanup } from '../../test-utils';
import { CategorySelector } from '../CategorySelector';

const mockCategoryData = [
  {
    id: 'MGZkM2JhZjUtODM5NS00NDU2LWEyZTktYzFiOGRjNzcxOWYwOkNhdGVnb3J5',
    name: 'Automotive 17977',
    created: '2020-02-02T00:41:31.650Z',
    updated: '2020-02-02T00:41:31.650Z',
  },
  {
    id: 'ZDRlMGFiNGEtM2JhOS00MjU5LWE1OTgtZDJkNThiMTNlODNiOkNhdGVnb3J5',
    name: 'Automotive 19953',
    created: '2020-02-02T15:10:29.111Z',
    updated: '2020-02-02T15:10:29.111Z',
  },
  {
    id: 'ZDhkZDU4YzUtOWI0Zi00ZWVhLTk1NDktOTc3NmFkYmRhYzBmOkNhdGVnb3J5',
    name: 'Automotive 24005',
    created: '2020-02-01T23:20:53.131Z',
    updated: '2020-02-01T23:20:53.131Z',
  },
  {
    id: 'ODkwYWNiNWYtNmQ0ZS00MWVlLWFmMzQtMzM1NWY3OWMyOTRhOkNhdGVnb3J5',
    name: 'Automotive 24659',
    created: '2020-02-02T05:57:47.934Z',
    updated: '2020-02-02T05:57:47.934Z',
  },
  {
    id: 'Y2NhZDlkYzktNGVmYi00MmRhLTg5NDUtM2E0NjE2YTM5NGM5OkNhdGVnb3J5',
    name: 'Automotive 30064',
    created: '2020-02-02T13:08:37.875Z',
    updated: '2020-02-02T13:08:37.875Z',
  },
  {
    id: 'Y2I5OGMwMDMtYmE2Yi00N2QwLWIxNTEtZjVmNmEzOGRhMWZjOkNhdGVnb3J5',
    name: 'Automotive 30985',
    created: '2020-02-02T10:59:02.305Z',
    updated: '2020-02-02T10:59:02.305Z',
  },
];

describe('Category Selector', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);
  
    it('renders without error', () => {
      render(<CategorySelector data={mockCategoryData} onSelectCategory={() => {}} />);
    });
  });
  