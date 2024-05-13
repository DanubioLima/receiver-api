import { inArray } from "drizzle-orm";
import db from "../src/database/client";
import { receivers } from "../src/receivers/receiver-schema";

export async function createReceivers(payload: any) {
  const result = await db.insert(receivers).values(payload).returning();

  return result;
}

export async function fetchReceivers() {
  const result = await db.select().from(receivers);

  return result;
}

// This function should be called for setup tests that use database
// to ensure consistency and isolation between tests
export async function testSetup() {
  await cleanDatabase();
}

async function cleanDatabase() {
  await db.delete(receivers);
}
