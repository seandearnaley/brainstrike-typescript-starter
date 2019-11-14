import { Resolvers, Card, CardsUpdatedResponse } from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    cards: (_, __, { dataSources }): Card[] => dataSources.cardAPI.getCards(),
    card: (_, { id }, { dataSources }): Card => dataSources.cardAPI.getCard(id)
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
    },
    updateCard: async (
      _,
      { id, input },
      { dataSources }
    ): Promise<CardsUpdatedResponse> => {
      const card = await dataSources.cardAPI.updateCard(id, input);
      return {
        success: true,
        message: "Card Updated",
        card
      };
    }
  }
};

export default resolvers;
