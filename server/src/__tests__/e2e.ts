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

let connection: Connection;

beforeAll(async () => {
  console.log("creating test connection");
  connection = await createTestingConnection();
  await connection.runMigrations();
  console.log("TypeORM runMigrations() COMPLETE.");
});

afterAll(async () => {
  console.log("closing test connection");
  await connection.close();
});

describe("Server - e2e", () => {
  let stop: () => void,
    graphql: ({}: GraphQLRequest) => Observable<FetchResult>;

  beforeEach(async () => {
    const { apolloServer } = await constructTestServer(connection);
    const testServer = await startTestServer(apolloServer);
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
    expect(res).toMatchSnapshot();
  });

  // TODO
  // it("gets a single card", async () => {});
});
