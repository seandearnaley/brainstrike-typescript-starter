import { Resolvers } from "../../generated/graphql";

export const resolvers: Resolvers = {
  // Query: {
  //   node(parent, { id }, ctx, info): any {
  //     console.log("parent=", parent);
  //     console.log("ctx=", ctx);
  //     console.log("info=", info.fieldNodes);

  //     return {};
  //   }
  // },
  Node: {
    __resolveType: (parent): "Card" | null => {
      if (parent.hasOwnProperty("number")) {
        return "Card";
      }

      return null;
    }
  }
};
