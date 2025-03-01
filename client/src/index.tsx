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

import * as serviceWorker from './serviceWorker';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
export const cache = new InMemoryCache(cacheConfig);

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      'client-name': 'brainstrike',
      'client-version': '1.0.0',
    },
  }),
});

const container = document.getElementById('root');

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  </ApolloProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
