import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as Express from "express";
import { initializeDatabase } from "./db";

import {UserResolver, GroupResolver, ExpenseResolver} from "./modules/__init__";

const app = Express();

const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, GroupResolver, ExpenseResolver],
    validate: { forbidUnknownValues: false },
  });

  const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res, headers: req.headers }) });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

startApolloServer();

initializeDatabase();

// const httpServer = http.createServer(app);

app.use("/rest", function (_, res) {
  res.json({ data: "api working" });
});

export { app };
