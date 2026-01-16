import { NextResponse } from "next/server";
import { generateId, sql } from "../../../lib/db";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  reason?: string;
  message?: string;
  honeypot?: string;
  timestamp?: number;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: Payload;

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

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";
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
