import { Resolvers, Card, CardsUpdatedResponse } from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    cards: (_, { limit }, { dataSources }): Promise<Card[]> =>
      dataSources.cardAPI.getCards({ limit }),
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
