import { Resolvers, Card, CardsUpdatedResponse } from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    cards: (_, __, { dataSources }): Card[] => dataSources.cardAPI.getCards(),
    card: (_, { id }, { dataSources }): Card => dataSources.cardAPI.getCard(id)
  },
  Mutation: {
    addCard: (_, { input }, { dataSources }): CardsUpdatedResponse =>
      dataSources.cardAPI.addCard(input),
    updateCard: (_, { id, input }, { dataSources }): CardsUpdatedResponse =>
      dataSources.cardAPI.updateCard(id, input),
    removeCard: (_, { id }, { dataSources }): CardsUpdatedResponse =>
      dataSources.cardAPI.removeCard(id)
  }
};

export default resolvers;
