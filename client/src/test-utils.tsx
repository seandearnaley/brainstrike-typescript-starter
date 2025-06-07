import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// this adds custom matchers from jest-dom
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import type { ApolloCache, DefaultOptions, Resolvers } from '@apollo/client';

// Use proper types for Apollo MockedProvider
type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: boolean;
  defaultOptions?: DefaultOptions;
  cache?: ApolloCache<{}>;
  resolvers?: Resolvers;
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
  const MockedProviderElement = React.createElement(
    MockedProvider,
    {
      mocks,
      addTypename,
      defaultOptions,
      cache,
      resolvers,
    },
    node
  );
  
  return render(MockedProviderElement, options);
};

export * from '@testing-library/react';
export { renderApollo };
