import { configure, run } from "@japa/runner";
import { assert } from "@japa/assert";
import { startServer } from "../src/index";
import getPort from "get-port";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pgClient } from "../src/utils/helpers";

// Run migrations before starting the server
let client = pgClient();

await client.connect();
await runMigrations(client);

async function runMigrations(client: pg.Client) {
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
}

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
