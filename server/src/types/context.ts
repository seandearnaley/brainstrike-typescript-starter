import { CardAPI, CategoryAPI } from "../datasources";
import { DataSource } from "typeorm";

export interface APIInterface {
  cardAPI: CardAPI;
  categoryAPI: CategoryAPI;
}

export interface ApolloContext {
  dataSources: APIInterface;
  connection?: DataSource;
}
