import {
  GraphQLRequest,
  Observable,
  FetchResult,
  toPromise
} from "apollo-link";

import {
  startTestServer,
  constructTestServer,
  createTestingConnection,
  Connection
} from "./__utils";

import gql from "graphql-tag";

// limit to the first 25 seeded records
const GET_CARDS = gql`
  query getCards {
    cards(limit: 25) {
      id
      number
      label
      description
    }
  }
`;

describe("Server - e2e", () => {
  let connection: Connection;

  let stop: () => void,
    graphql: ({}: GraphQLRequest) => Observable<FetchResult>;

  beforeAll(async () => {
    connection = await createTestingConnection();
  });

  beforeEach(async () => {
    const { apolloServer } = await constructTestServer(connection);
    const testServer = await startTestServer(apolloServer);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(async () => {
    stop();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("gets list of cards", async () => {
    const res = await toPromise(
      graphql({
        query: GET_CARDS
      })
    );
    expect(res).toMatchSnapshot();
  });

  // TODO
  // it("gets a single card", async () => {});
});
