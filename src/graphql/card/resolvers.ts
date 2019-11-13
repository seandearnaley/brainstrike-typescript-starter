import { Resolvers, Card } from "../../generated/graphql";

export const resolvers: Partial<Resolvers> = {
  Query: {
    cards: (_, __, { dataSources }): Card[] => dataSources.cardAPI.getAll(),
    card: (): Card => ({
      id: "test"
    })
  }
};

export default resolvers;
