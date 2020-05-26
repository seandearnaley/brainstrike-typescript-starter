import { mergeResolvers } from "@graphql-tools/merge";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import { resolvers as cardResolvers } from "./card/cardResolvers";
import { resolvers as categoryResolvers } from "./category/categoryResolvers";
import { resolvers as nodeResolvers } from "./node/nodeResolvers";

const defaultResolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};

export default mergeResolvers([
  defaultResolvers,
  cardResolvers,
  categoryResolvers,
  nodeResolvers,
]);
