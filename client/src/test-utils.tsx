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
  // Use a wrapper component to avoid React 19 JSX type issues
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(MockedProvider, {
      mocks,
      addTypename,
      defaultOptions,
      cache,
      resolvers,
    }, children);
  };
  
  return render(React.createElement(TestWrapper, { children: node }), options);
};

export * from '@testing-library/react';
export { renderApollo };
