import { configure, run } from "@japa/runner";
import { assert } from "@japa/assert";
import { startServer } from "../src/index";
import getPort from "get-port";

async function startHttpServer() {
  process.env.PORT = String(await getPort());
  startServer();
}

configure({
  forceExit: true,
  files: ["tests/**/*.spec.ts"],
  plugins: [assert()],
  setup: [startHttpServer],
});

run();
