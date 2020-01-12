import { Category } from "../entity/Category";
// import { CategoryInput, CategoryUpdatedResponse } from "../generated/graphql";
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
   * Get all cards in a deck
   */
  async getCategories(): Promise<Category[]> {
    return this.repos.categories.find(); // get all
  }
}
