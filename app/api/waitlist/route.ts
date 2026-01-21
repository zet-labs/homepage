import { z } from "zod";
import { generateId, sql } from "@/lib/db";
import { checkBotId } from "botid/server";

const schema = z.object({
  email: z.string().email().max(255),
  language: z.enum(["cs", "en"]),
  honeypot: z.string().max(0),
  timestamp: z.number(),
  turnstileToken: z.string().optional(),
});

const rateLimiter = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 3600000;
const MIN_TIME_MS = 2000;
const MAX_ENTRIES = 10000;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(ip) || [];
  const recent = requests.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return false;
  }

  recent.push(now);
  rateLimiter.set(ip, recent);

  if (rateLimiter.size > MAX_ENTRIES) {
    for (const [key, timestamps] of rateLimiter.entries()) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) {
        rateLimiter.delete(key);
      }
    }
  }

  return true;
}

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

export async function POST(request: Request) {
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      return Response.json({ error: "Access denied" }, { status: 403 });
    }
    const { email, language, honeypot, timestamp, turnstileToken } = schema.parse(
      await request.json(),
    );

    if (honeypot) {
      return Response.json({ success: true });
    }
    if (Date.now() - timestamp < MIN_TIME_MS) {
      return Response.json({ error: "Too fast" }, { status: 429 });
    }
    const ip = getClientIP(request);

    if (!checkRateLimit(ip)) {
      return Response.json({ error: "Rate limit" }, { status: 429 });
    }

    if (TURNSTILE_SECRET_KEY) {
      try {
        const turnstileValid = await verifyTurnstile(turnstileToken || "", ip);
        if (!turnstileValid) {
          return Response.json({ error: "Verification failed" }, { status: 403 });
        }
      } catch {
        return Response.json({ error: "Verification error" }, { status: 500 });
      }
    }

    await sql`
      INSERT INTO waitlist (id, email, language, created_at)
      VALUES (${generateId()}, ${email.toLowerCase()}, ${language}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
