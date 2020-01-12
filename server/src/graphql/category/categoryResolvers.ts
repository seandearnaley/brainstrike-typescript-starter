import {
  Resolvers,
  Category
  // CategoryUpdatedResponse
} from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    categories: (_, __, { dataSources }): Promise<Category[]> =>
      dataSources.categoryAPI.getCategories()
    // category: (_, { id }, { dataSources }): Promise<Category> =>
    //   Promise.resolve({ id: "1234" })
  }
  // Mutation: {
  //   addCategory: (_, { input }, { dataSources }): Promise<any> =>
  //     Promise.resolve({}),
  //   updateCategory: (_, { id, input }, { dataSources }): Promise<any> =>
  //     Promise.resolve({}),
  //   removeCategory: (_, { id }, { dataSources }): Promise<any> =>
  //     Promise.resolve({})
  // }
};
