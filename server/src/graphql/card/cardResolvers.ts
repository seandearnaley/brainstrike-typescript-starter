import {
  Resolvers,
  CardsUpdatedResponse,
  CardConnection,
  Card
} from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    cards: async (_, args, { dataSources }): Promise<CardConnection> =>
      dataSources.cardAPI.getCards(args),
    card: (_, { id }, { dataSources }): Promise<Card> =>
      dataSources.cardAPI.getCard(id)
  },
  Mutation: {
    addCard: (_, { input }, { dataSources }): Promise<CardsUpdatedResponse> =>
      dataSources.cardAPI.addCard(input),
    updateCard: (
      _,
      { id, input },
      { dataSources }
    ): Promise<CardsUpdatedResponse> =>
      dataSources.cardAPI.updateCard(id, input),
    removeCard: (_, { id }, { dataSources }): Promise<CardsUpdatedResponse> =>
      dataSources.cardAPI.removeCard(id)
  }
};
