import {
  Resolvers,
  Category,
  CategoryUpdatedResponse,
  CardConnection
} from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    categories: (_, args, { dataSources }): Promise<Category[]> =>
      dataSources.categoryAPI.getCategories(args),
    category: async (_, { id }, { dataSources }): Promise<Category> =>
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
  },
  Category: {
    _cards(root, args, { dataSources }): Promise<CardConnection> {
      return dataSources.cardAPI.getCardConnectionFor(root.id, args);
    }
  }
};
