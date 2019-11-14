import { Card } from "../entity/Card";
import { CardInput, CardsUpdatedResponse } from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { TypeORMDataSource } from "../utils";
import { DataSourceConfig } from "apollo-datasource";

export class CardAPI<ApolloContext> extends TypeORMDataSource<ApolloContext> {
  constructor() {
    super();
  }

  /**
   * Apollo init function, called by apollo when setup
   * @param config used by apollo internally
   */
  initialize(config: DataSourceConfig<ApolloContext>): void {
    super.initialize(config);
  }

  /**
   * Get all cards in a deck
   */
  async getCards(): Promise<Card[]> {
    return this.cardRepository.find(); // get all cards
  }

  /**
   * Get a particular card from the deck
   * @param id card uuid
   */
  async getCard(id: string): Promise<Card> {
    return this.cardRepository.findOne(id); // find by id
  }

  /**
   * Adds a new card to a deck
   * @param input card number, label, description
   */
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

  /**
   * Updates a card in a deck
   * @param id card uuid
   * @param input card number, label, description
   */
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

  /**
   * Removes a card from the deck
   * @param id card uuid
   */
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
