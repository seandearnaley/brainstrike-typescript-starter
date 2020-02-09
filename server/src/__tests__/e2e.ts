import {
  GraphQLRequest,
  Observable,
  FetchResult,
  toPromise
} from "apollo-link";
import gql from "graphql-tag";

import {
  startTestServer,
  constructTestServer,
  createTestingConnection,
  Connection
} from "./__utils";

import * as TDATA from "./__testData";
import * as GQL from "./__queries";

// NOTE: would've like to share the GQL.GET_CARD_DATA but doesn't work for some reason, will investigate later
// limit to the first 25 seeded records
const GET_CARDS = gql`
  query getCards {
    cards(first: 25) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          __typename
          id
          number
          label
        }
      }
    }
  }
`;

describe("Server - e2e", () => {
  let connection: Connection;

  let stop: () => void,
    graphql: ({}: GraphQLRequest) => Observable<FetchResult>;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();
  });

  afterAll(() => connection.close());

  beforeEach(async () => {
    const { apolloServer } = await constructTestServer(connection);
    const testServer = await startTestServer(apolloServer);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(async () => {
    stop();
  });

  it("gets list of cards", async () => {
    const res = await toPromise(
      graphql({
        query: GET_CARDS
      })
    );

    expect(res).toMatchSnapshot();
  });

  it("gets a single card", async () => {
    const res = await toPromise(
      graphql({
        query: GQL.GET_CARD,
        variables: { id: TDATA.mockE2EFirstId }
      })
    );
    expect(res).toMatchSnapshot();
  });
});
