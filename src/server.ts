import express = require("express");
import bodyParser = require("body-parser");
import { createConnection, Connection } from "typeorm";
import { setupApollo } from "./apollo";

export default class Server {
  expressApp = express();
  connection: Connection;
  async setupDatabase(): Promise<Connection> {
    try {
      this.connection = await createConnection();
      console.log(`typeOrm db.isConnected=${this.connection.isConnected}`);
      await this.connection.synchronize();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    return this.connection;
  }

  addMiddleware(): void {
    this.expressApp.use(bodyParser.json());
  }

  addRouters(): void {
    this.expressApp.get("/", (req, res) =>
      res.status(418).json({
        title: "Server 1.0",
        version: "v1.0.0",
        message: "Success"
      })
    );
  }

  async start(): Promise<void> {
    const { NODE_PORT, NODE_HOST } = process.env;

    await this.setupDatabase();
    this.addMiddleware();
    this.addRouters();
    const apolloServer = setupApollo(this.connection, this.expressApp);

    this.expressApp.listen(NODE_PORT, () => {
      console.log(
        `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}${apolloServer.graphqlPath}`
      );
    });
  }
}
