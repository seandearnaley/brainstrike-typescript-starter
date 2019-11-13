import { Resolvers, Card } from "../../generated/graphql";

export const resolvers: Partial<Resolvers> = {
  Query: {
    cards: (): Card[] => [],
    card: (): Card => ({
      id: "test"
    })
  }
};

export default resolvers;
