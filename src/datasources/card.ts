import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Card } from "../entity/Card";
import { getConnection, Connection, Repository } from "typeorm";
import { CardInput, CardsUpdatedResponse } from "../generated/graphql";
import { ApolloContext } from "../types/context";

export class CardAPI<ApolloContext> extends DataSource {
  context!: ApolloContext;
  cardRepository: Repository<Card>;
  connection: Connection;
  constructor() {
    super();
    this.connection = getConnection();
  }

  // called when apollo sets up
  initialize(config: DataSourceConfig<ApolloContext>): void {
    this.context = config.context;
    this.cardRepository = this.connection.getRepository(Card);
  }

  async getCards(): Promise<Card[]> {
    return this.cardRepository.find(); // get all cards
  }

  async getCard(id: string): Promise<Card> {
    return this.cardRepository.findOne(id); // find by id
  }

  async addCard({
    number,
    label,
    description
  }: CardInput): Promise<CardsUpdatedResponse> {
    const card = new Card();
    card.number = number;
    card.label = label;
    card.description = description;
    await this.cardRepository.save(card);
    return {
      success: true,
      message: "Card Added",
      card
    };
  }

  async updateCard(
    id: string,
    { number, label, description }: CardInput
  ): Promise<CardsUpdatedResponse> {
    const card = await this.getCard(id);
    card.number = number;
    card.label = label;
    card.description = description;
    await this.cardRepository.save(card);
    return {
      success: true,
      message: "Card Updated",
      card
    };
  }

  async removeCard(id: string): Promise<CardsUpdatedResponse> {
    const card = await this.getCard(id);
    await this.cardRepository.remove(card);
    return {
      success: true,
      message: "Card Removed"
    };
  }
}

export default CardAPI;
