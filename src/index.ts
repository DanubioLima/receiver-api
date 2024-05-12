import express from "express";
import routes from "./router";
import "dotenv/config";

export function startServer() {
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());
  app.use(routes);

  const server = app.listen(port);

  return server;
}

startServer();
