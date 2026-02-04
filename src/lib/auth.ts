import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SEC = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const secret = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (secret.startsWith('"') && secret.endsWith('"')) {
    return secret.slice(1, -1).trim();
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionCookie(username: string): string {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_SEC);
  const payload = `${username}:${exp}`;
  const sig = sign(payload);
  const value = Buffer.from(JSON.stringify({ payload, sig })).toString("base64url");
  return value;
}

export async function verifySession(): Promise<{ username: string } | null> {
  // Require ADMIN_PASSWORD to be set; otherwise never accept a session
  if (!getSecret()) return null;

  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  let data: { payload?: string; sig?: string };
  try {
    data = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  const { payload, sig } = data;
  if (!payload || !sig) return null;

  let expectedSig: string;
  try {
    expectedSig = sign(payload);
  } catch {
    return null;
  }
  if (expectedSig.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expectedSig, "utf8"), Buffer.from(sig, "utf8"))) {
      return null;
    }
  } catch {
    return null;
  }

  const [username, expStr] = payload.split(":");
  const exp = parseInt(expStr, 10);
  if (Number.isNaN(exp) || Math.floor(Date.now() / 1000) > exp) return null;
  if (!username) return null;

  return { username };
}

export function getCookieName(): string {
  return COOKIE_NAME;
}

export const SESSION_MAX_AGE = MAX_AGE_SEC;
