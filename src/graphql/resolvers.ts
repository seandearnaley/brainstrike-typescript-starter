import { merge } from "lodash";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import { resolvers as cardResolvers } from "./card/cardResolvers";
import { resolvers as userResolvers } from "./user/userResolvers";

// Default Resolvers
const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

export default merge(resolvers, cardResolvers, userResolvers);
