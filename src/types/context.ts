import { CardAPI } from "../datasources/card";
import { Connection } from "typeorm";

export interface ApolloContext {
  dataSources?: {
    cardAPI: CardAPI;
  };
  connection?: Connection;
}
