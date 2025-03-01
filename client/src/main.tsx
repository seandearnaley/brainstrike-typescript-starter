import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';

import cacheConfig from './__cacheConfig';
import Dashboard from './pages/Dashboard';
import { theme } from './styles';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
export const cache = new InMemoryCache(cacheConfig);

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
    headers: {
      'client-name': 'brainstrike',
      'client-version': '1.0.0',
    },
  }),
});

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  </ApolloProvider>,
); 