import { merge } from "lodash";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import cardResolvers from "./card/resolvers";
import userResolvers from "./user/resolvers";

// Default Resolvers
const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

export default merge(resolvers, cardResolvers, userResolvers);
