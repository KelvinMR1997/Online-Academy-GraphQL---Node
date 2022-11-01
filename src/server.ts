import express from "express";
import compression from "compression";
import cors from "cors";
import schema from "./schema";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";

const app = express();
app.use("*", cors());
app.use(compression());
const server = new ApolloServer({
  schema,
  introspection: true,
});
const PORT = 5200;
const httpServer = createServer(app);
const serverStart = async () => {
  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen({ port: PORT }, () =>
    console.log(`GraphQL is running on  http://localhost:${PORT}/graphql`)
  );
};

serverStart();
