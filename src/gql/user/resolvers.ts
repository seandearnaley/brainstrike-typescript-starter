import { Resolvers, User } from "../../generated/graphql";

export const resolvers: Partial<Resolvers> = {
  Query: {
    me: (): User => ({
      id: ""
    })
  }
};

export default resolvers;
