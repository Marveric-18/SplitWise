// App.js
import React from "react";
import AppRoutes from "./AppRoutes";
import { ApolloProvider } from "@apollo/client";
import graphQLClient from "./graphql/client";


const App = () => {
  return (
    <ApolloProvider client={graphQLClient.getDefaultClient()}>
      <div className="App">
        <AppRoutes />
      </div>
    </ApolloProvider>
  );
};

export default App;
