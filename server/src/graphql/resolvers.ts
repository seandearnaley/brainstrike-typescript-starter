import { merge } from "lodash";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import { resolvers as cardResolvers } from "./card/cardResolvers";
// import { resolvers as userResolvers } from "./user/userResolvers";
// import { resolvers as categoryResolvers } from "./category/categoryResolvers";
import { resolvers as nodeResolvers } from "./node/nodeResolvers";

const defaultResolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

export default merge(
  defaultResolvers,
  cardResolvers,
  // userResolvers,
  // categoryResolvers,
  nodeResolvers
);
