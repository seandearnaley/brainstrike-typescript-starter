// import our production apollo-server instance
import Server from "../server";

import {
  GraphQLRequest,
  Observable,
  FetchResult,
  toPromise
} from "apollo-link";

import { startTestServer } from "./__utils";
import gql from "graphql-tag";

const GET_CARDS = gql`
  query getCards {
    cards {
      id
      number
      label
      description
    }
  }
`;

describe("Server - e2e", () => {
  let stop: () => void,
    graphql: ({}: GraphQLRequest) => Observable<FetchResult>;

  beforeEach(async () => {
    const server = new Server();
    await server.setupApolloServer();
    const testServer = await startTestServer(server.apolloServer);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach((): void => stop());

  it("gets list of cards", async () => {
    const res = await toPromise(
      graphql({
        query: GET_CARDS
      })
    );
    // expect(res).toMatchSnapshot();
  });

  // TODO
  // it("gets a single card", async () => {});
});
