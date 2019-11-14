import { Resolvers, Card, CardsUpdatedResponse } from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    cards: (_, __, { dataSources }): Card[] => dataSources.cardAPI.getAll(),
    card: (_, { id }, { dataSources }): Card => dataSources.cardAPI.getAll(id)
  },
  Mutation: {
    addCard: async (
      _,
      { input },
      { dataSources }
    ): Promise<CardsUpdatedResponse> => {
      const card = await dataSources.cardAPI.addCard(input);
      return {
        success: true,
        message: "Card Added",
        card
      };
    }
  }
};

export default resolvers;
