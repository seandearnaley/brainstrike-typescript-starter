import DataLoader = require("dataloader");
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Connection } from "typeorm";

import { Category } from "../entity";
import {
  CategoryInput,
  CategoryUpdatedResponse,
  DirectionEnum
} from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { DataSourceRepos } from "..";
import { encodeGlobalID, decodeGlobalID } from "./__utils";

export class CategoryDsArgs {
  orderByColumn?: string;
  orderByDirection?: DirectionEnum;
  cardIds?: string;
}

export class CategoryAPI extends DataSource {
  context!: ApolloContext;
  connection: Connection;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: Connection }) {
    super();
    this.connection = connection;
    this.repos = {
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

  protected encodeCategory(data: Category): Category {
    const { id, name, parent, created, updated, cards } = data;
    return {
      id: encodeGlobalID(id, "Category"), // replace ID with a global ID
      name,
      parent,
      created,
      updated,
      cards
    };
  }

  private categoryLoader = new DataLoader<string, Category[]>(
    async (cardIds: string[]): Promise<Array<Category[]>> => {
      // batches cardIds into a single call per request
      const categories = await this.getCategories({
        cardIds: cardIds.join(",")
      });

      return cardIds.map(id =>
        categories.filter(category =>
          category.cards.find(card => card.id === decodeGlobalID(id).id)
        )
      );
    }
  );

  async getCategoriesFor(cardId: string): Promise<Category[]> {
    return this.categoryLoader.load(cardId);
  }

  /**
   * Get all categories
   */
  async getCategories({
    cardIds,
    orderByColumn = "category.name",
    orderByDirection = DirectionEnum.Asc
  }: CategoryDsArgs): Promise<Category[]> {
    let query = this.repos.categories
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.cards", "card");

    if (cardIds?.length) {
      // filter by CardID

      const decodedIds = cardIds
        .split(",")
        .map(encodedId => decodeGlobalID(encodedId).id);

      query = query.where("card.id IN (:...cardIds)", { cardIds: decodedIds });
    }

    if (orderByColumn) {
      query = query.orderBy(orderByColumn, orderByDirection);
    }

    const data = await query.getMany();

    return data.map(this.encodeCategory); // get all
  }

  /**
   * Get a particular category using global id
   * @param id global id
   */
  async getCategoryByGlobalID(id: string): Promise<Category> {
    id = decodeGlobalID(id).id;
    const category = await this.repos.categories.findOne(id); // find by id

    if (!category) throw new Error("Category Not Found");
    return category;
  }

  /**
   * Get a particular category
   * @param id category uuid
   */
  async getCategory(id: string): Promise<Category> {
    const category = await this.getCategoryByGlobalID(id); // find by global id
    return this.encodeCategory(category);
  }

  /**
   * Adds a new category
   * @param input category name
   */
  async addCategory({ name }: CategoryInput): Promise<CategoryUpdatedResponse> {
    const category = new Category();
    category.name = name;
    const savedCategory = await this.repos.categories.save(category);
    return {
      success: true,
      message: "Category Added",
      category: this.encodeCategory(savedCategory)
    };
  }

  /**
   * Updates a category
   * @param id category uuid
   * @param input category name
   */
  async updateCategory(
    id: string,
    { name }: CategoryInput
  ): Promise<CategoryUpdatedResponse> {
    const category = await this.getCategoryByGlobalID(id);
    category.name = name;
    const savedCategory = await this.repos.categories.save(category);
    return {
      success: true,
      message: "Category Updated",
      category: this.encodeCategory(savedCategory)
    };
  }

  /**
   * Removes a category from the deck
   * @param id category uuid
   */
  async removeCategory(id: string): Promise<CategoryUpdatedResponse> {
    const category = await this.getCategoryByGlobalID(id);
    const originalCategory = { ...category }; // remove wipes the ip, creating a copy for the category field

    id = decodeGlobalID(id).id;
    // remove dependant tree relations, unfortunately hasn't been implemented in TypeORM yet
    await this.repos.categories
      .createQueryBuilder()
      .delete()
      .from("category_closure") // check your db or migrations for the actual table name
      .where('"id_ancestor" = :id', { id })
      .execute();

    await this.repos.categories.remove(category);

    return {
      success: true,
      message: "Category Removed",
      category: this.encodeCategory(originalCategory)
    };
  }
}
