import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';

import { CardContainer } from '../CardContainer';


describe('card container', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without crashing', async () => {
    const component  = renderApollo(<CardContainer />)
    await waitForElement(() => component );
  });

});