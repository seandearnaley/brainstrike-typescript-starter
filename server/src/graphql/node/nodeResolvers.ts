import { Resolvers } from "../../generated/graphql";

export const resolvers: Resolvers = {
  // Query: {
  //   node(parent, { id }, ctx, info): any {
  //     return ctx.db.query.node({ id }, info);
  //   }
  // },
  Node: {
    __resolveType: (obj, args, ctx): "Card" | null => {
      if (obj.hasOwnProperty("number")) {
        return "Card";
      }

      return null;
    }
  }
};
