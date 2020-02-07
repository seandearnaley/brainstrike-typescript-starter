import {
  Resolvers,
  Category,
  CategoryUpdatedResponse
} from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    categories: (_, __, { dataSources }): Promise<Category[]> =>
      dataSources.categoryAPI.getCategories(),
    category: (_, { id }, { dataSources }): Promise<Category> =>
      dataSources.categoryAPI.getCategory(id)
  },
  Mutation: {
    addCategory: (
      _,
      { input },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> =>
      dataSources.categoryAPI.addCategory(input),
    updateCategory: (
      _,
      { id, input },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> =>
      dataSources.categoryAPI.updateCategory(id, input),
    removeCategory: (
      _,
      { id },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> =>
      dataSources.categoryAPI.removeCategory(id)
  }
};
