import express = require("express");
import bodyParser = require("body-parser");
import { createConnection } from "typeorm";
import { apolloServer } from "./apollo";

export default class StrikeServer {
  public app = express();

  public addDatabase(): StrikeServer {
    createConnection()
      .then(async db => {
        console.log(`typeOrm db.isConnected=${db.isConnected}`);
        await db.synchronize();
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });

    return this;
  }

  public addMiddleware(): StrikeServer {
    this.app.use(bodyParser.json());
    apolloServer.applyMiddleware({ app: this.app });
    return this;
  }

  public addRouters(): StrikeServer {
    this.app.get("/", (req, res) =>
      res.status(418).json({
        title: "BrainStrike 1.0",
        version: "v0.0.1",
        message: "empty"
      })
    );

    return this;
  }

  public start(): void {
    const { NODE_PORT, NODE_HOST } = process.env;

    this.app.listen(NODE_PORT, () => {
      console.log(
        `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}${apolloServer.graphqlPath}`
      );
    });
  }
}
