import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Connection } from "typeorm";
import { Card } from "../entity";
import {
  CardInput,
  CardsUpdatedResponse,
  CardConnection,
  DirectionEnum
} from "../generated/graphql";
import { ApolloContext } from "../types/context";
// import { CursorPaginator, CursorPaginatorArgs } from "./utils/cursorPaginator";
import { DataSourceRepos } from "../";

import { encodeCursor, decodeCursor } from "./__utils";

export class CursorPaginatorArgs {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  orderByColumn?: string;
  orderByDirection?: DirectionEnum;
}

interface Edge {
  cursor: string;
  node: Card;
}

export class CardAPI extends DataSource {
  context!: ApolloContext;
  connection: Partial<Connection>;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: Partial<Connection> }) {
    super();
    this.connection = connection;
    this.repos = {
      cards: connection.getRepository(Card)
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
    first = 0,
    last = 0,
    before = null,
    after = null,
    orderByColumn = "number",
    orderByDirection = DirectionEnum.Desc
  }: CursorPaginatorArgs): Promise<CardConnection> {
    const cursorColumn = this.connection.driver.escape("id");
    const cardTableName = this.connection.driver.escape("card");
    const categoryTableName = this.connection.driver.escape("category");
    const categoryCardsTableName = this.connection.driver.escape(
      "category_cards_card"
    );

    orderByColumn = this.connection.driver.escape(orderByColumn); // escape string

    const rowNumberOverStr = `ROW_NUMBER () OVER (ORDER BY ${cardTableName}.${orderByColumn} ${orderByDirection})`;

    // MANY-to-MANY JOIN
    const joinCode = `
      LEFT JOIN ${categoryCardsTableName} ${categoryCardsTableName} on (${cardTableName}."id" = ${categoryCardsTableName}."cardId")
      LEFT JOIN ${categoryTableName} ${categoryTableName} on (${categoryCardsTableName}."categoryId" = ${categoryTableName}."id")
    `;

    const rowNumQuery = `
      SELECT ${cardTableName}."id", ${rowNumberOverStr} FROM ${cardTableName}
      ${joinCode}
    `;

    const wheres = [];
    const params = [];

    if (after) {
      params.push(decodeCursor(after, "card").id);

      wheres.push(
        `row_number > ( SELECT t2.row_number FROM (${rowNumQuery}) as t2 WHERE ${cursorColumn} = $1 )`
      );
    }

    if (before) {
      params.push(decodeCursor(before, "card").id);

      wheres.push(`
          row_number < (
            SELECT t3.row_number FROM (${rowNumQuery}) as t3
            WHERE ${cursorColumn} = ${after ? "$2" : "$1"}
          )
        `);
    }

    if (first > 0) {
      if (after) {
        wheres.push(`
          row_number <= (
            SELECT t4.row_number + ${first} FROM (${rowNumQuery}) as t4
            WHERE ${cursorColumn} = $1
          )
        `);
      } else {
        wheres.push(`row_number <= ${first}`);
      }
    }

    if (last > 0) {
      if (before) {
        wheres.push(`
          row_number >= (
            SELECT t5.row_number - ${last} FROM (${rowNumQuery}) as t5
            WHERE ${cursorColumn} = ${after ? "$2" : "$1"}
          )
        `);
      } else {
        wheres.push(
          `row_number > ( SELECT MAX(t6.row_number) - ${last} FROM (${rowNumQuery}) as t6 )`
        );
      }
    }

    let queryStr = `
      SELECT t1.* FROM (
        SELECT ${cardTableName}.*, ${categoryTableName}."name" as category_name, ${rowNumberOverStr} FROM ${cardTableName}
        ${joinCode}
      ) as t1
    `;

    if (wheres.length) queryStr += `WHERE ${wheres.join(" AND ")}`;

    const results = await this.connection.query(queryStr, [...params]);

    const [{ totalCount }] = await this.connection.query(
      `SELECT COUNT(*) as "totalCount" FROM (${rowNumQuery}) as countTable `
    );

    const edges = this.createEdges(results);
    const startCursor = edges[0].cursor;
    const endCursor = edges[edges.length - 1].cursor;

    return {
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        totalCount: Number(totalCount),
        hasNextPage:
          Number(results[results.length - 1]["row_number"]) <
          Number(totalCount),
        hasPreviousPage: Number(results[0]["row_number"]) > 1
      }
    };
  }

  protected createEdges(results: Card[]): Edge[] {
    return results.map((result: Card, i) => ({
      node: result,
      cursor: encodeCursor(result.id, "card", i) // TODO: this cursor column could probably be dynamic
    }));
  }

  /**
   * Get a particular card from the deck
   * @param id card uuid
   */
  async getCard(id: string): Promise<Card> {
    return this.repos.cards.findOne(id, { relations: ["categories"] }); // find by id
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
      card: savedCard
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
    const card = await this.getCard(id);
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
      card: savedCard
    };
  }

  /**
   * Removes a card from the deck
   * @param id card uuid
   */
  async removeCard(id: string): Promise<CardsUpdatedResponse> {
    const card = await this.getCard(id);
    const removedCard = await this.repos.cards.remove(card);
    return {
      success: true,
      message: "Card Removed",
      card: removedCard
    };
  }
}
