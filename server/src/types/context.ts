import { CardAPI, CategoryAPI } from "../datasources";
import { Connection } from "typeorm";

interface APIInterface {
  cardAPI: Partial<CardAPI>;
  categoryAPI: Partial<CategoryAPI>;
}

export interface ApolloContext {
  dataSources?: Partial<APIInterface>;
  connection?: Connection;
}
