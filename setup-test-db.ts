import { pgClient } from "./src/utils/helpers";

let client = pgClient();

// try to connect to the database test and create it if it doesn't exist
try {
  await client.connect();
} catch (error: any) {
  if (error.code === "3D000") {
    const dbNameToCreate = process.env.DB_NAME;
    process.env.DB_NAME = "postgres";
    const newClient = pgClient();
    await newClient.connect();
    await newClient.query(`CREATE DATABASE ${dbNameToCreate}`);
    await newClient.end();
  }
}

await client.end();
