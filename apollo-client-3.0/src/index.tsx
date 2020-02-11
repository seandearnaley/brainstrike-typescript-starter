import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { CardManager } from './pages/CardManager';

import * as serviceWorker from './serviceWorker';

// Set up our apollo-client to point at the server we created
// this can be local or a remote en}dpoint
const cache = new InMemoryCache({
  possibleTypes: {
    Node: ['Card', 'Category'],
  },
});
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
    <CardManager></CardManager>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
