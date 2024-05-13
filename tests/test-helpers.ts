import { inArray } from "drizzle-orm";
import db from "../src/database/client";
import { receivers } from "../src/receivers/receiver-schema";

export async function createReceivers(payload: any) {
  const result = await db.insert(receivers).values(payload).returning();

  return result;
}

export async function fetchReceivers(receiverIds: string[]) {
  const result = await db
    .select()
    .from(receivers)
    .where(inArray(receivers.id, receiverIds));

  return result;
}
