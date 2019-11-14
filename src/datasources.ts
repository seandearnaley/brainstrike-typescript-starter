import { CardAPI } from "./datasources/card";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloContext } from "./types/context";
// import UserAPI from "./datasources/user";

export interface MyDataSources {
  cardAPI: CardAPI<ApolloContext>;
}

// set up any dataSources our resolvers need
export const dataSources = (): DataSources<MyDataSources> => ({
  cardAPI: new CardAPI()
});
