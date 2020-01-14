import { Category } from "../entity/Category";
import { CategoryInput, CategoryUpdatedResponse } from "../generated/graphql";
import { ApolloContext } from "../types/context";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { DataSourceRepos } from "..";

export class CategoryAPI extends DataSource {
  context!: ApolloContext;
  repos: DataSourceRepos;
  constructor({ repos }: { repos: DataSourceRepos }) {
    super();
    this.repos = repos;
  }

  /**
   * Apollo init function, called by apollo when setup
   * @param config used by apollo internally
   */
  initialize(config: DataSourceConfig<ApolloContext>): void {
    this.context = config.context;
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return this.repos.categories.find(); // get all
  }

  /**
   * Get a particular category
   * @param id category uuid
   */
  async getCategory(id: string): Promise<Category> {
    return this.repos.categories.findOne(id); // find by id
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
      category: savedCategory
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
    const category = await this.getCategory(id);
    category.name = name;
    const savedCategory = await this.repos.categories.save(category);
    return {
      success: true,
      message: "Category Updated",
      category: savedCategory
    };
  }

  /**
   * Removes a category from the deck
   * @param id category uuid
   */
  async removeCategory(id: string): Promise<CategoryUpdatedResponse> {
    const category = await this.getCategory(id);
    const removedCategory = await this.repos.categories.remove(category);
    return {
      success: true,
      message: "Category Removed",
      category: removedCategory
    };
  }
}
