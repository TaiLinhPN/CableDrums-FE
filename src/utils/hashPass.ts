import * as crypto from "crypto";

const secretKey = "mySecretKey";

export function hashPassword(password: string): string {
  const hash = crypto.createHmac("sha256", secretKey);
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  return hashedPassword;
}
