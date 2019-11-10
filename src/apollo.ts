import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date
  scalar DateTime
  scalar Time

  type Query {
    techniques: [Technique!]!
    technique(id: ID!): Technique
    # Queries for the current user
  }

  type Technique {
    id: ID!
    label: String
    description: String
    created: DateTime
    updated: DateTime
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

const mocks = {
  Date: (): Date => new Date(),
  DateTime: (): Date => new Date(),
  Time: (): Date => new Date()
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  mocks
});
