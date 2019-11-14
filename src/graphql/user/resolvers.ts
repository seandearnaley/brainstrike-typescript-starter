import { Resolvers, User } from "../../generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    me: (): User => ({
      id: ""
    })
  }
};

export default resolvers;
