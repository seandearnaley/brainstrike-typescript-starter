import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection, Connection, Repository } from "typeorm";
import { Card } from "./entity/Card";

export class TypeORMDataSource<ApolloContext> extends DataSource {
  context!: ApolloContext;
  cardRepository: Repository<Card>;
  connection: Connection;
  constructor() {
    super();
    this.connection = getConnection();
  }

  /**
   * Apollo init function, used here to setup context and TypeORM repos
   * @param config used by apollo internally
   */
  initialize(config: DataSourceConfig<ApolloContext>): void {
    this.context = config.context;
    this.cardRepository = this.connection.getRepository(Card);
  }
}
