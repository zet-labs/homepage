import { neon } from "@neondatabase/serverless";
import { v7 as uuidv7 } from "uuid";

export const sql = neon(process.env.DATABASE_URL || "");

export function generateId(): string {
  return uuidv7();
}
