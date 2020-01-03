import { CardAPI } from "../datasources/card";
import { Connection } from "typeorm";

export interface ApolloContext {
  dataSources?: {
    cardAPI: Partial<CardAPI>;
  };
  connection?: Connection;
}
