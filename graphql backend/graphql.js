const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    name: String
    email: String
  }

  type UserResponse {
    hello: String!
    user: User
  }

  schema {
    query: UserResponse
  }
`;

const resolvers = {
  UserResponse: {
    hello: () => "Hello World",
    user: () => {
      return {
        name: "marven parmar",
        email: "mparmar@gmail.com",
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(8082).then(({ url }) => {
  console.log(`Server started on: ${url}`);
});
