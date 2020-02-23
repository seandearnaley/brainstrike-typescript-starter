import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import cacheConfig from './__cacheConfig';
import Dashboard from './pages/Dashboard';

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Dashboard></Dashboard>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
