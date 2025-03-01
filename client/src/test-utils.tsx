import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ApolloCache } from '@apollo/client';

// Use more generic types to avoid type errors
type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: boolean;
  defaultOptions?: Record<string, unknown>;
  cache?: unknown;
  resolvers?: unknown;
  [key: string]: unknown;
} & Omit<RenderOptions, 'queries'>;

const renderApollo = (
  node: ReactElement,
  {
    mocks,
    addTypename,
    defaultOptions,
    cache,
    resolvers,
    ...options
  }: RenderApolloOptions = {},
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache as any}
      resolvers={resolvers as any}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

export * from '@testing-library/react';
export { renderApollo };
