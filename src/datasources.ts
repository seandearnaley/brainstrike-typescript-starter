import { CardAPI } from "./datasources/card";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloContext } from "./types/context";

// set up any dataSources our resolvers need
export const dataSources = (): DataSources<ApolloContext> => {
  return {
    cardAPI: new CardAPI()
  };
};
