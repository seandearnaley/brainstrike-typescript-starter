module.exports = {
  client: {
    includes: ['./src/**/*.graphql'],
    service: {
      name: 'brainstrike',
      url: 'http://localhost:4000/graphql',
    },
  },
};
