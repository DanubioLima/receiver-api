import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { pgClient } from "../utils/helpers";

const client = pgClient();

await client.connect();
const db = drizzle(client);

export default db;
