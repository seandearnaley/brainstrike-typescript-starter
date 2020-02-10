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

import * as TDATA from "./__testData";
import * as GQL from "./__queries";

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
        query: GQL.GET_CARD_DATA,
        variables: { first: 20 }
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
