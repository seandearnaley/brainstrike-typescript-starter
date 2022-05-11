import DataLoader = require("dataloader");
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Connection } from "typeorm";

import { Category as CategoryEntity } from "../entity";
import { CategoryInput, DirectionEnum } from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { DataSourceRepos } from "..";
import { encodeGlobalID, decodeGlobalID } from "./__utils";

type GetCategoriesArguments = {
  orderByColumn?: string;
  orderByDirection?: DirectionEnum;
  cardIds?: string;
};

// NOTE: using Omit here because cards is used on the Category entity to join to the cards table,
// but we actually want to use a dataloader for a "virtual" inner field using the same name "cards"
// we may want an even narrower type definition to give back to the resolver that does not overlap with
// the Category entity.
interface CategoryObject
  extends Omit<CategoryEntity, "cards" | "parent" | "children"> {
  cards: null;
  parent: null;
  children: null;
}

type CategoryUpdatedResponseObject = {
  success: boolean;
  message: string;
  category: CategoryObject;
};

export class CategoryAPI extends DataSource {
  context!: ApolloContext;
  connection: Connection;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: Connection }) {
    super();
    this.connection = connection;
    this.repos = {
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

  protected encodeCategory(data: CategoryEntity): CategoryObject {
    const { id, name, created, updated } = data;
    return {
      id: encodeGlobalID(id, "Category"), // replace ID with a global ID
      name,
      created,
      updated,
      cards: null, // will use virtual inner queries for cards
      parent: null, // will use custom implementation for parent
      children: null, // will use custom implementation for children
    };
  }

  private categoryLoader = new DataLoader<string, CategoryObject[]>(
    async (cardIds: string[]): Promise<Array<CategoryObject[]>> => {
      // batches cardIds into a single call per request
      const categories = await this.getCategoryEntities({
        cardIds: cardIds.join(","),
      });

      return cardIds.map((id) =>
        categories
          .filter((category) =>
            category.cards.find((card) => card.id === decodeGlobalID(id).id)
          )
          .map(this.encodeCategory)
      );
    }
  );

  async getCategoriesFor(cardId: string): Promise<CategoryObject[]> {
    return this.categoryLoader.load(cardId);
  }

  /**
   * Get all categories, note we need the cards field on the entity here to filter on the dataloader
   * but we don't want to return that to the resolver because it will clash with our 'cards' virtual field
   */
  async getCategoryEntities({
    cardIds,
    orderByColumn = "category.name",
    orderByDirection = DirectionEnum.Asc,
  }: GetCategoriesArguments): Promise<CategoryEntity[]> {
    let query = this.repos.categories
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.cards", "card");

    if (cardIds?.length) {
      // filter by CardID

      const decodedIds = cardIds
        .split(",")
        .map((encodedId) => decodeGlobalID(encodedId).id);

      query = query.where("card.id IN (:...cardIds)", { cardIds: decodedIds });
    }

    if (orderByColumn) {
      query = query.orderBy(orderByColumn, orderByDirection);
    }

    return query.getMany();
  }

  /**
   * Get all categories
   */
  async getCategories(args: GetCategoriesArguments): Promise<CategoryObject[]> {
    const data = await this.getCategoryEntities(args);

    return data.map(this.encodeCategory); // get all
  }

  /**
   * Get a particular category using global id
   * @param id global id
   */
  async getCategoryByGlobalID(id: string): Promise<CategoryEntity> {
    id = decodeGlobalID(id).id;
    const category = await this.repos.categories.findOne(id); // find by id

    if (!category) throw new Error("Category Not Found");
    return category;
  }

  /**
   * Get a particular category
   * @param id category uuid
   */
  async getCategory(id: string): Promise<CategoryObject> {
    const category = await this.getCategoryByGlobalID(id); // find by global id
    return this.encodeCategory(category);
  }

  /**
   * Adds a new category
   * @param input category name
   */
  async addCategory({
    name,
  }: CategoryInput): Promise<CategoryUpdatedResponseObject> {
    const category = new CategoryEntity();
    category.name = name;
    const savedCategory = await this.repos.categories.save(category);
    return {
      success: true,
      message: "Category Added",
      category: this.encodeCategory(savedCategory),
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
  ): Promise<CategoryUpdatedResponseObject> {
    const category = await this.getCategoryByGlobalID(id);
    category.name = name;
    const savedCategory = await this.repos.categories.save(category);
    return {
      success: true,
      message: "Category Updated",
      category: this.encodeCategory(savedCategory),
    };
  }

  /**
   * Removes a category from the deck
   * @param id category uuid
   */
  async removeCategory(id: string): Promise<CategoryUpdatedResponseObject> {
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
      category: this.encodeCategory(originalCategory),
    };
  }
}
