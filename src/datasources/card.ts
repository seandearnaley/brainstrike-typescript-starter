import { DataSource } from "apollo-datasource";

class CardAPI extends DataSource {
  constructor() {
    super();
    // this.store = store;
  }

  // /**
  //  * This is a function that gets called by ApolloServer when being setup.
  //  * This function gets called with the datasource config including things
  //  * like caches and context. We'll assign this.context to the request context
  //  * here, so we can know about the user making requests
  //  */
  // initialize(config) {
  //   this.context = config.context;
  // }
}

export default CardAPI;
