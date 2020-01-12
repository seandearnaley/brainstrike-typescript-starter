import { CardAPI, CategoryAPI } from "../datasources";
import { Connection } from "typeorm";

export interface ApolloContext {
  dataSources?: {
    cardAPI: Partial<CardAPI>;
    categoryAPI: Partial<CategoryAPI>;
  };
  connection?: Connection;
}
