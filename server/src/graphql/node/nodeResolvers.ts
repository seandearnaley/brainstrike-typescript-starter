import { Resolvers } from "../../generated/graphql";

export const resolvers: Resolvers = {
  // Query: {
  //   node(parent, { id }, ctx, info): any {
  //     return ctx.db.query.node({ id }, info);
  //   }
  // },
  Node: {
    __resolveType(): any {
      // if (obj.title) {
      //   return "Card";
      // }

      return null;
    }
  }
};
