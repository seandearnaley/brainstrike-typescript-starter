import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as serviceWorker from './serviceWorker';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
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

// TODO: add Reach router

export const GET_HELLO = gql`
  query SayHello {
    hello
  }
`;

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = (props: HelloProps): React.ReactElement => {
  const { data, loading, error } = useQuery(GET_HELLO);

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      {data && data.hello} {props.name}
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Hello name="sean" />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
