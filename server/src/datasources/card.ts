import DataLoader = require("dataloader");
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Connection } from "typeorm";
import { Card as CardEntity, Category as CategoryEntity } from "../entity";
import { CardInput, DirectionEnum } from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { DataSourceRepos } from "../";
import { Category } from "../entity/Category";

import {
  encodeCursor,
  decodeCursor,
  buildPageInfo,
  Edge,
  escapeStringsWithDriver,
  encodeGlobalID,
  decodeGlobalID,
} from "./__utils";

export type GetCardsArguments = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  orderByColumn?: string;
  orderByDirection?: DirectionEnum;
  categoryId?: string;
};

// NOTE: using Omit here because categories is used on the Card entity to join to the categories table,
// but we actually want to use a dataloader for a "virtual" inner field using the same name "categories"
// we may want an even narrower type definition to give back to the resolver that does not overlap with
// the Card entity.
interface CardObject extends Omit<CardEntity, "categories"> {
  rowNumber?: number;
  categories: Category[];
}

type CardNodeObject = {
  cursor: string;
  node: CardObject;
};

type CardConnectionObject = {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
    totalCount: number;
  };
  edges: CardNodeObject[];
};

type CategoryLoader = {
  categoryId?: string;
  args?: GetCardsArguments;
};

type CardsUpdatedResponseObject = {
  success: boolean;
  message: string;
  card: CardObject;
};

export class CardAPI extends DataSource {
  context!: ApolloContext;
  connection: Connection;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: Connection }) {
    super();
    this.connection = connection;
    this.repos = {
      cards: connection.getRepository(CardEntity),
      categories: connection.getRepository(CategoryEntity),
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
    before = undefined,
    after = undefined,
    orderByColumn = "created",
    orderByDirection = DirectionEnum.Desc,
    categoryId,
  }: GetCardsArguments): Promise<CardConnectionObject> {
    // NOTE: we're using straight SQL for Postgres here because TypeORM has a bug where it can't resolve the subquery meta data,
    // it should be possible to rewrite this using the ORM syntax but will have to wait https://github.com/typeorm/typeorm/issues/4015

    // The advantage of this apporach using ROW_NUMBER () OVER is that it can be easily adapted to other engines, can do first and last,
    // is sortable, is executed in one query and needs no CTE's- if there is a better solution, let me know! seandearnaley@hotmail.com

    // escape input values for Postgres
    const [
      cursorColumn,
      cardTableName,
      categoryTableName,
      categoryCardsTableName,
      _orderByColumn,
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
      const decodedAfter = decodeCursor(after, "Card") as
        | { id: string }
        | undefined;
      if (!decodedAfter) {
        throw new Error("Invalid 'after' cursor");
      }
      params.push(decodedAfter.id);
      wheres.push(
        `"rowNumber" > ( SELECT "t2"."rowNumber" FROM (${rowNumQuery}) as t2 WHERE ${cursorColumn} = $1 )`
      );
    }

    if (before) {
      const decodedBefore = decodeCursor(before, "Card") as
        | { id: string }
        | undefined;
      if (!decodedBefore) {
        throw new Error("Invalid 'before' cursor");
      }
      params.push(decodedBefore.id);
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

    const [results, countResult] = await Promise.all([
      this.connection.query(queryStr, [...params]),
      this.connection.query(
        `SELECT COUNT(*) as "totalCount" FROM (${rowNumQuery}) as countTable `
      ),
    ]);

    // Extract totalCount and default to 0 if undefined
    const totalCountRaw = countResult[0]?.totalCount;
    const total = Number(totalCountRaw ?? 0);

    const edges = this.createEdges(results);

    const computedPageInfo =
      buildPageInfo<Edge<CardObject>>(edges, total, "Card") || {};

    const cleanPageInfo = {
      hasNextPage: computedPageInfo.hasNextPage ?? false,
      hasPreviousPage: computedPageInfo.hasPreviousPage ?? false,
      startCursor: computedPageInfo.startCursor ?? "",
      endCursor: computedPageInfo.endCursor ?? "",
      totalCount: computedPageInfo.totalCount ?? 0,
    };

    return {
      edges: edges.map(({ node, cursor }) => ({
        node: this.encodeCard(node),
        cursor,
      })),
      pageInfo: cleanPageInfo,
    };
  }

  protected encodeCard(data: CardEntity): CardObject {
    return {
      ...data,
      id: encodeGlobalID(data.id, "Card"), // replace ID with a global ID
      categories: data.categories || [],
    };
  }

  protected createEdges(results: CardObject[]): Edge<CardObject>[] {
    return results.map((result: CardObject) => ({
      node: result,
      cursor: encodeCursor(result.id, "Card", result.rowNumber ?? 0), // using default if rowNumber is undefined or null
    }));
  }

  private cardLoader = new DataLoader<CategoryLoader, CardConnectionObject>(
    async (
      categoryIds: readonly CategoryLoader[]
    ): Promise<CardConnectionObject[]> =>
      Promise.all(
        categoryIds.map(async ({ categoryId, args }) =>
          this.getCards({
            ...(args || {}),
            categoryId,
          })
        )
      )
  );

  async getCardConnectionFor(
    categoryId: string,
    args: GetCardsArguments
  ): Promise<CardConnectionObject> {
    return this.cardLoader.load({ categoryId, args });
  }

  /**
   * Get a particular card from the deck using global id
   * @param id global id
   */
  async getCardByGlobalID(id: string): Promise<CardEntity> {
    const decoded = decodeGlobalID(id);
    if (!decoded) {
      throw new Error("Invalid global id");
    }
    const realId = decoded.id;
    const cardsRepo = this.repos.cards!;
    if (!cardsRepo.findOne) {
      throw new Error("cards repository findOne method is undefined");
    }
    const card = await cardsRepo.findOne!(realId);

    if (!card) throw new Error("Card Not Found");
    return card; // returning as a CardEntity because it hasn't been encoded yet
  }

  /**
   * Get a particular card from the deck, returns encoded card
   * @param id global id
   */
  async getCard(id: string): Promise<CardObject> {
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
    categoryId,
  }: CardInput): Promise<CardsUpdatedResponseObject> {
    const card = new CardEntity();
    card.number = number ?? 0;
    card.label = label ?? "";
    card.description = description ?? "";

    if (categoryId) {
      const categoriesRepo = this.repos.categories!;
      if (!categoriesRepo.findOne) {
        throw new Error("categories repository findOne method is undefined");
      }
      const category = await categoriesRepo.findOne!(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
      card.categories = [category];
    } else {
      card.categories = [];
    }

    const cardsRepo = this.repos.cards!;
    if (!cardsRepo.save) {
      throw new Error("cards repository save method is undefined");
    }
    const savedCard = await cardsRepo.save!(card);
    return {
      success: true,
      message: "Card Added",
      card: this.encodeCard(savedCard),
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
  ): Promise<CardsUpdatedResponseObject> {
    const card = await this.getCardByGlobalID(id); // find by id
    card.number =
      number != null
        ? number
        : ((card.number != null ? card.number : 0) as number);
    card.label =
      label != null
        ? label
        : ((card.label != null ? card.label : "") as string);
    card.description =
      description != null
        ? description
        : ((card.description != null ? card.description : "") as string);

    if (categoryId) {
      const categoriesRepo = this.repos.categories!;
      if (!categoriesRepo.findOne) {
        throw new Error("categories repository findOne method is undefined");
      }
      const category = await categoriesRepo.findOne!(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
      card.categories = [category];
    } else {
      card.categories = [];
    }

    const cardsRepo = this.repos.cards!;
    if (!cardsRepo.save) {
      throw new Error("cards repository save method is undefined");
    }
    const savedCard = await cardsRepo.save!(card);
    return {
      success: true,
      message: "Card Updated",
      card: this.encodeCard(savedCard),
    };
  }

  /**
   * Removes a card from the deck
   * @param id card uuid
   */
  async removeCard(id: string): Promise<CardsUpdatedResponseObject> {
    const card = await this.getCardByGlobalID(id); // find by id
    const originalCard = { ...card }; // remove wipes the ip, creating a copy for the card field
    const cardsRepo = this.repos.cards!;
    if (!cardsRepo.remove) {
      throw new Error("cards repository remove method is undefined");
    }
    await cardsRepo.remove(card);
    return {
      success: true,
      message: "Card Removed",
      card: this.encodeCard(originalCard),
    };
  }
}
