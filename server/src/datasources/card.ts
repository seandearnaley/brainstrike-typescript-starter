import DataLoader = require("dataloader");
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Connection } from "typeorm";
import { Card, Category } from "../entity";
import {
  CardInput,
  CardsUpdatedResponse,
  CardConnection,
  DirectionEnum
} from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { DataSourceRepos } from "../";

import {
  encodeCursor,
  decodeCursor,
  buildPageInfo,
  Edge,
  escapeStringsWithDriver,
  encodeGlobalID,
  decodeGlobalID
} from "./__utils";

export class CardDsArgs {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  orderByColumn?: string;
  orderByDirection?: DirectionEnum;
  categoryId?: string;
}

interface CardWithRowNumber extends Card {
  rowNumber?: number;
}

interface CategoryLoader {
  categoryId?: string;
  args?: CardDsArgs;
}

export class CardAPI extends DataSource {
  context!: ApolloContext;
  connection: Partial<Connection>;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: Partial<Connection> }) {
    super();
    this.connection = connection;
    this.repos = {
      cards: connection.getRepository(Card),
      categories: connection.getRepository(Category)
    };
  }

  /**
   * Apollo init function, called by apollo when setup
   * @param config used by apollo internally
   */
  initialize(config: DataSourceConfig<ApolloContext>): void {
    this.context = config.context;
  }

  /**
   * Get all cards in a deck, based on Relay Style Pagination Spec
   * https://facebook.github.io/relay/graphql/connections.htm#
   */
  async getCards({
    first = 100,
    last = 0,
    before = null,
    after = null,
    orderByColumn = "created",
    orderByDirection = DirectionEnum.Desc,
    categoryId
  }: CardDsArgs): Promise<CardConnection> {
    // escape input values for Postgres
    const [
      cursorColumn,
      cardTableName,
      categoryTableName,
      categoryCardsTableName,
      _orderByColumn
    ] = escapeStringsWithDriver(
      this.connection.driver,
      "id",
      "card",
      "category",
      "category_cards_card",
      orderByColumn
    );

    // MANY-to-MANY JOIN
    const rowNumQuery = `
      SELECT ${cardTableName}.*, ROW_NUMBER () OVER (ORDER BY ${cardTableName}.${_orderByColumn} ${orderByDirection}) as "rowNumber" FROM ${cardTableName}
      ${
        categoryId // only need to add the joins if a categoryId is supplied, note its a many to many relationship, cards can be in multiple categories
          ? `
            LEFT JOIN ${categoryCardsTableName} on (${cardTableName}."id" = ${categoryCardsTableName}."cardId")
            LEFT JOIN ${categoryTableName} on (${categoryCardsTableName}."categoryId" = ${categoryTableName}."id")
            WHERE ${categoryCardsTableName}."categoryId" = '${
              decodeGlobalID(categoryId).id
            }'
          `
          : ""
      }
    `;

    const wheres = [];
    const params = [];

    if (after) {
      params.push(decodeCursor(after, "card").id);

      wheres.push(
        `"rowNumber" > ( SELECT "t2"."rowNumber" FROM (${rowNumQuery}) as t2 WHERE ${cursorColumn} = $1 )`
      );
    }

    if (before) {
      params.push(decodeCursor(before, "card").id);

      wheres.push(`
          "rowNumber" < (
            SELECT "t3"."rowNumber" FROM (${rowNumQuery}) as t3
            WHERE ${cursorColumn} = ${after ? "$2" : "$1"}
          )
        `);
    }

    if (first > 0) {
      if (after) {
        wheres.push(`
          "rowNumber" <= (
            SELECT "t4"."rowNumber" + ${first} FROM (${rowNumQuery}) as t4
            WHERE ${cursorColumn} = $1
          )
        `);
      } else {
        wheres.push(`"rowNumber" <= ${first}`);
      }
    }

    if (last > 0) {
      if (before) {
        wheres.push(`
          "rowNumber" >= (
            SELECT "t5"."rowNumber" - ${last} FROM (${rowNumQuery}) as t5
            WHERE ${cursorColumn} = ${after ? "$2" : "$1"}
          )
        `);
      } else {
        wheres.push(
          `"rowNumber" > ( SELECT MAX("t6"."rowNumber") - ${last} FROM (${rowNumQuery}) as t6 )`
        );
      }
    }

    let queryStr = `
      SELECT t1.* FROM (${rowNumQuery}) as t1
    `;

    if (wheres.length) queryStr += `WHERE ${wheres.join(" AND ")}`;

    const [results, [{ totalCount }]] = await Promise.all([
      this.connection.query(queryStr, [...params]),
      this.connection.query(
        `SELECT COUNT(*) as "totalCount" FROM (${rowNumQuery}) as countTable `
      )
    ]);

    const edges = this.createEdges(results);
    const pageInfo = buildPageInfo<Edge<CardWithRowNumber>>(edges, totalCount);

    return {
      edges: edges.map(edge => ({
        node: this.encodeCard(edge.node),
        cursor: edge.cursor
      })),
      pageInfo
    };
  }

  protected encodeCard(data: Card): Card {
    return {
      ...data,
      id: encodeGlobalID(data.id, "Card") // replace ID with a global ID
    };
  }

  protected createEdges(
    results: CardWithRowNumber[]
  ): Edge<CardWithRowNumber>[] {
    return results.map((result: CardWithRowNumber) => ({
      node: result,
      cursor: encodeCursor(result.id, "card") // TODO: this cursor column could probably be dynamic
    }));
  }

  private cardLoader = new DataLoader<CategoryLoader, CardConnection>(
    async (categoryIds: CategoryLoader[]): Promise<CardConnection[]> =>
      Promise.all(
        categoryIds.map(async ({ categoryId, args }) =>
          this.getCards({
            ...args,
            categoryId
          })
        )
      )
  );

  async getCardConnectionFor(
    categoryId: string,
    args: CardDsArgs
  ): Promise<CardConnection> {
    return this.cardLoader.load({ categoryId, args });
  }

  /**
   * Get a particular card from the deck using global id
   * @param id global id
   */
  async getCardByGlobalID(id: string): Promise<Card> {
    id = decodeGlobalID(id).id;
    const card = await this.repos.cards.findOne(id); // find by id

    if (!card) throw new Error("Card Not Found");
    return card;
  }

  /**
   * Get a particular card from the deck, returns encoded card
   * @param id global id
   */
  async getCard(id: string): Promise<Card> {
    const card = await this.getCardByGlobalID(id); // find by global id
    return this.encodeCard(card);
  }

  /**
   * Adds a new card to a deck
   * @param input card number, label, description
   */
  async addCard({
    number,
    label,
    description,
    categoryId
  }: CardInput): Promise<CardsUpdatedResponse> {
    const card = new Card();
    card.number = number;
    card.label = label;
    card.description = description;

    if (categoryId) {
      const category = await this.repos.categories.findOne(categoryId);
      card.categories = [category];
    } else {
      card.categories = null;
    }

    const savedCard = await this.repos.cards.save(card);
    return {
      success: true,
      message: "Card Added",
      card: this.encodeCard(savedCard)
    };
  }

  /**
   * Updates a card in a deck
   * @param id card uuid
   * @param input card number, label, description
   */
  async updateCard(
    id: string,
    { number, label, description, categoryId }: CardInput
  ): Promise<CardsUpdatedResponse> {
    const card = await this.getCardByGlobalID(id); // find by id
    card.number = number;
    card.label = label;
    card.description = description;

    if (categoryId) {
      const category = await this.repos.categories.findOne(categoryId);
      card.categories = [category];
    } else {
      card.categories = null;
    }

    const savedCard = await this.repos.cards.save(card);
    return {
      success: true,
      message: "Card Updated",
      card: this.encodeCard(savedCard)
    };
  }

  /**
   * Removes a card from the deck
   * @param id card uuid
   */
  async removeCard(id: string): Promise<CardsUpdatedResponse> {
    const card = await this.getCardByGlobalID(id); // find by id
    const originalCard = { ...card }; // remove wipes the ip, creating a copy for the card field
    await this.repos.cards.remove(card);
    return {
      success: true,
      message: "Card Removed",
      card: this.encodeCard(originalCard)
    };
  }
}
