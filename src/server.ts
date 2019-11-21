import express = require("express");
import bodyParser = require("body-parser");
import { createConnection, Connection } from "typeorm";
import { setupApollo, setupDataSources } from "./apollo";
import { ApolloServer } from "apollo-server-express";

export default class Server {
  expressApp = express();
  // connection: Connection;
  apolloServer: ApolloServer;
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

  async setupApolloServer(): Promise<void> {
    // setup TypeORM connection
    const connection = await this.setupDBConnection();

    // setup Apollo datasources, which use TypeORM repos
    const dataSources = setupDataSources(connection);

    // setup Apollo GraphQL with Typedefs, Resolvers + Datasources
    this.apolloServer = setupApollo(dataSources);
  }

  async start(): Promise<void> {
    const { NODE_PORT, NODE_HOST } = process.env;

    await this.setupApolloServer();

    // add Express middleware
    this.expressApp.use(bodyParser.json());

    // add default Express router
    this.expressApp.get("/", (req, res) =>
      res.status(418).json({
        title: "Server 1.0",
        version: "v1.0.0",
        message: "Running"
      })
    );

    // attach Apollo to Express
    this.apolloServer.applyMiddleware({
      app: this.expressApp
    });

    // start listening
    this.expressApp.listen(NODE_PORT, () => {
      console.log(
        `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}${this.apolloServer.graphqlPath}`
      );
    });
  }
}
