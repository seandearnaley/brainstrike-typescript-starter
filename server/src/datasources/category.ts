import DataLoader = require("dataloader");
import {
  DataSource as ApolloDataSource,
  DataSourceConfig,
} from "apollo-datasource";
import { DataSource, Repository } from "typeorm";

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

export class CategoryAPI extends ApolloDataSource {
  context!: ApolloContext;
  connection: DataSource;
  repos: DataSourceRepos;

  constructor({ connection }: { connection: DataSource }) {
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
    async (cardIds: readonly string[]): Promise<CategoryObject[][]> => {
      // batches cardIds into a single call per request
      const categories = await this.getCategoryEntities({
        cardIds: cardIds.join(","),
      });

      return cardIds.map((id) =>
        categories
          .filter((category) =>
            (category.cards || []).find((card) => {
              const decoded = decodeGlobalID(id);
              return decoded && card.id === decoded.id;
            }),
          )
          .map(this.encodeCategory),
      );
    },
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
    const categoryRepo = this.repos.categories as Repository<CategoryEntity>;

    let query = categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.cards", "card");

    if (cardIds?.length) {
      // filter by CardID
      const decodedIds = cardIds
        .split(",")
        .map((encodedId) => {
          const decoded = decodeGlobalID(encodedId);
          return decoded ? decoded.id : "";
        })
        .filter((id) => id !== "");

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
    const decoded = decodeGlobalID(id);
    if (!decoded) {
      throw new Error("Invalid Global ID");
    }

    const categoryRepo = this.repos.categories as Repository<CategoryEntity>;
    const category = await categoryRepo.findOneBy({ id: decoded.id }); // find by id

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
    category.name = name ?? "";

    const categoryRepo = this.repos.categories as Repository<CategoryEntity>;
    const savedCategory = await categoryRepo.save(category);

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
    { name }: CategoryInput,
  ): Promise<CategoryUpdatedResponseObject> {
    const category = await this.getCategoryByGlobalID(id);
    category.name = name ?? "";

    const categoryRepo = this.repos.categories as Repository<CategoryEntity>;
    const savedCategory = await categoryRepo.save(category);

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

    const decoded = decodeGlobalID(id);
    if (!decoded) {
      throw new Error("Invalid Global ID");
    }

    // Clear the cards relationship before removing the category
    category.cards = [];

    const categoryRepo = this.repos.categories as Repository<CategoryEntity>;

    // Use a transaction to ensure atomicity
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First save the category with empty cards to clear join table entries
      await queryRunner.manager.save(category);

      // remove dependant tree relations, unfortunately hasn't been implemented in TypeORM yet
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from("category_closure") // check your db or migrations for the actual table name
        .where('"id_ancestor" = :id', { id: decoded.id })
        .execute();

      // Then remove the category
      await queryRunner.manager.remove(category);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        success: true,
        message: "Category Removed",
        category: this.encodeCategory(originalCategory),
      };
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
