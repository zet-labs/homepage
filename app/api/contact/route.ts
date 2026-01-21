import { NextResponse } from "next/server";
import { generateId, sql } from "../../../lib/db";
import { checkBotId } from "botid/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  reason?: string;
  message?: string;
  honeypot?: string;
  timestamp?: number;
  turnstileToken?: string;
};

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });

  const result = (await response.json()) as TurnstileResponse;
  return result.success;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: Payload;
  let verification;

  try {
    verification = await checkBotId();
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const company = (payload.company || "").trim();
  const reason = (payload.reason || "").trim();
  const message = (payload.message || "").trim();
  const honeypot = (payload.honeypot || "").trim();
  const timestamp = payload.timestamp || 0;
  const turnstileToken = payload.turnstileToken || "";

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";

  if (TURNSTILE_SECRET_KEY) {
    try {
      const turnstileValid = await verifyTurnstile(turnstileToken, ip);
      if (!turnstileValid) {
        return NextResponse.json({ error: "Verification failed" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Verification error" }, { status: 500 });
    }
  }

  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!timestamp || Date.now() - timestamp < 2000) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") || "";

  try {
    await sql`
      INSERT INTO contact_messages
        (id, name, email, company, reason, message, ip, user_agent)
      VALUES
        (${generateId()}, ${name}, ${email}, ${company || null}, ${reason || null}, ${message}, ${ip || null}, ${userAgent || null})
    `;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
