import { DataSource, DataSourceConfig } from "apollo-datasource";
// import { TypeORMDatasource } from "./typeOrmDatasource";
import { Card } from "../entity/Card";
import { getConnection, Connection, Repository } from "typeorm";

export interface CardAPIInterface extends DataSource {
  context?: any;
  cardRepository: Repository<Card>;
  connection: Connection;
}

export class CardAPI<TContext = any> extends DataSource
  implements CardAPIInterface {
  context!: TContext;
  cardRepository: Repository<Card>;
  connection: Connection;
  constructor() {
    super();
    this.connection = getConnection();
  }

  // called when apollo sets up
  initialize(config: DataSourceConfig<TContext>): void {
    this.context = config.context;
    this.cardRepository = this.connection.getRepository(Card);
  }

  async getAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }
}

export default CardAPI;
