import { CardAPI, CategoryAPI } from "../datasources";
import { Connection } from "typeorm";

export interface APIInterface {
  cardAPI: CardAPI;
  categoryAPI: CategoryAPI;
}

export interface ApolloContext {
  dataSources: APIInterface;
  connection?: Connection;
}
