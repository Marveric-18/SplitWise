import { useApolloClient, InMemoryCache, ApolloClient } from "@apollo/client";

export const defaultClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

class GraphQLClient {
  constructor() {
    this.defaultClient = new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_SERVER,
      cache: new InMemoryCache(),
    });
    this.headers = {};
  }

  getDefaultClient = () => {
    return this.defaultClient;
  };

  setAuthHeaders = () => {
    const authToken = localStorage.getItem("authToken");
    return {
        "x-access-token" : authToken
    }
  }

  fetchQuery = ({ query, variables, headers, auth }) => {
    try {
      if(auth) headers = { ...headers, ...this.setAuthHeaders()}
      // console.log(headers)
      return this.defaultClient
        .query({
          query: query,
          variables: variables, 
          context: {
            headers: { ...headers },
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.log("Error on Fetch ", query, "=> ", error);
          return null;
        });
    } catch (error) {
      console.log("Error on Fetch ", query, "=> ", error);
      return null;
    }
  };

  mutateData = ({ mutateQuery, variables, headers, auth }) => {
    try {
      if(auth) headers = { ...headers, ...this.setAuthHeaders()}
      return this.defaultClient
        .mutate({
          mutation: mutateQuery,
          variables: variables,
          context: {
            headers: { ...headers, ...this.headers },
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log("Error on Mutation ", mutateQuery, "=> ", error);
      return null;
    }
  };
}

const graphQLClient = new GraphQLClient();

export default graphQLClient;
