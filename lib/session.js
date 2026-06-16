import crypto from "crypto";

export const COOKIE_NAME = "meditime_admin_session";
const SECRET = process.env.ADMIN_SECRET || "meditime-super-secret-key-2026";
const DATA = "admin-authenticated";

export function createSessionToken() {
  return crypto.createHmac("sha256", SECRET).update(DATA).digest("hex");
}
