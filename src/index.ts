import "reflect-metadata";
import express = require("express");
import { apolloServer } from "./apollo";
import * as dotenv from "dotenv";

dotenv.config(); // enables .env support for process vars

const PORT = 4000;
const app = express();
apolloServer.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🧠 brainstrike server running on: http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
);
