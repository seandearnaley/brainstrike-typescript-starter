import {
  Observable,
  FetchResult,
  toPromise,
  GraphQLRequest,
} from "apollo-link";
import {
  startTestServer,
  constructTestServer,
  createTestingConnection,
  DataSource,
} from "./__utils";

import * as TDATA from "./__testData";
import * as GQL from "./__queries";
import { Card, Category } from "../entity";

describe("Server - e2e", () => {
  let connection: DataSource;

  let stop: () => void,
    graphql: (request: GraphQLRequest) => Observable<FetchResult>;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();

    // Log entity metadata status
    console.log("Card metadata exists:", connection.hasMetadata(Card));
    console.log("Category metadata exists:", connection.hasMetadata(Category));
  });

  afterAll(() => connection.close());

  beforeEach(async () => {
    const { apolloServer } = await constructTestServer(connection);
    const testServer = await startTestServer(apolloServer, connection);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(async () => {
    if (typeof stop === "function") {
      stop();
    }
  });

  it("gets list of cards", async () => {
    const res = await toPromise(
      graphql({
        query: GQL.GET_CARD_DATA,
        variables: { first: 20 },
      }),
    );

    expect(res).toMatchSnapshot();
  });

  it("gets a single card", async () => {
    const res = await toPromise(
      graphql({
        query: GQL.GET_CARD,
        variables: { id: TDATA.mockE2EFirstId },
      }),
    );

    expect(res).toMatchSnapshot();
  });
});
