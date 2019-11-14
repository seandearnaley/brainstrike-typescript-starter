import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Card } from "../entity/Card";
import { getConnection, Connection, Repository } from "typeorm";
import { CardInput } from "../generated/graphql";

export class CardAPI<TContext> extends DataSource {
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

  async getCards(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async getCard(id: string): Promise<Card> {
    return this.cardRepository.findOne(id); // find by id
  }

  async addCard({ number, label, description }: CardInput): Promise<Card> {
    const card = new Card();
    card.number = number;
    card.label = label;
    card.description = description;
    await this.cardRepository.save(card);
    return card;
  }

  async updateCard(
    id: string,
    { number, label, description }: CardInput
  ): Promise<Card> {
    const card = await this.getCard(id);
    card.number = number;
    card.label = label;
    card.description = description;
    await this.cardRepository.save(card);
    return card;
  }

  async removeCard(id: string): Promise<void> {
    const card = await this.getCard(id);
    await this.cardRepository.remove(card);
  }
}

export default CardAPI;
