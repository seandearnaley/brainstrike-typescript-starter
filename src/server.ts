import express = require("express");
import bodyParser = require("body-parser");
import { createConnection, Connection } from "typeorm";
import { setupApollo, setupDatasources } from "./apollo";

export default class Server {
  expressApp = express();
  connection: Connection;
  async setupDBConnection(): Promise<Connection> {
    let connection;
    try {
      connection = await createConnection();
      console.log(`typeOrm db.isConnected=${connection.isConnected}`);
      await connection.synchronize();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    return connection;
  }

  async start(): Promise<void> {
    const { NODE_PORT, NODE_HOST } = process.env;

    this.connection = await this.setupDBConnection();

    // add middleware
    this.expressApp.use(bodyParser.json());

    // add routers
    this.expressApp.get("/", (req, res) =>
      res.status(418).json({
        title: "Server 1.0",
        version: "v1.0.0",
        message: "Running"
      })
    );

    // setup apollo datasources, which use TypeORM repos
    const dataSources = setupDatasources(this.connection);

    const apolloServer = setupApollo(dataSources);

    apolloServer.applyMiddleware({ app: this.expressApp });

    this.expressApp.listen(NODE_PORT, () => {
      console.log(
        `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}${apolloServer.graphqlPath}`
      );
    });
  }
}
