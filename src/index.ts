import express = require("express");
import { apolloServer } from "./apollo";

const PORT = 4000;

const app = express();
apolloServer.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🧠 brainstrike server running on: http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
);
