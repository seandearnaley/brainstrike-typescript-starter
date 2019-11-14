import { CardAPI } from "./datasources/card";
// import UserAPI from "./datasources/user";

// set up any dataSources our resolvers need
export const dataSources = (): any => ({
  cardAPI: new CardAPI()
});
