import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  uuid,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const pixKeyTypeEnum = pgEnum("pix_key_type", [
  "CPF",
  "CNPJ",
  "EMAIL",
  "TELEFONE",
  "CHAVE_ALEATORIA",
]);

export const statusEnum = pgEnum("receiver_status", ["VALID", "DRAFT"]);

export const receivers = pgTable("receivers", {
  id: uuid("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: varchar("email", { length: 250 }).notNull(),
  document: varchar("document", { length: 14 }).notNull(),
  status: statusEnum("status").notNull().default("DRAFT"),
  pix_key_type: pixKeyTypeEnum("pix_key_type").notNull(),
  pix_key: varchar("pix_key", { length: 140 }).notNull(),
  deletedAt: timestamp("deleted_at").default(null),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
