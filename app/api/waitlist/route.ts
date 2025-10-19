import { sql } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  email: z.email().max(255),
  honeypot: z.string().max(0),
  timestamp: z.number(),
});

const rateLimiter = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = 5;
const RATE_LIMIT_WINDOW = 3600000;
const MIN_SUBMIT_TIME = 2000;
const MAX_RATE_LIMITER_SIZE = 10000;

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(ip) || [];
  const recentRequests = requests.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_HOUR) return false;

  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);

  if (rateLimiter.size > MAX_RATE_LIMITER_SIZE) {
    for (const [key, timestamps] of rateLimiter.entries()) {
      if (timestamps.every(t => now - t >= RATE_LIMIT_WINDOW)) {
        rateLimiter.delete(key);
      }
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, honeypot, timestamp } = schema.parse(body);

    if (honeypot) {
      return Response.json({ success: true });
    }

    if (Date.now() - timestamp < MIN_SUBMIT_TIME) {
      return Response.json(
        { error: "Please wait a moment before submitting" },
        { status: 429 }
      );
    }

    if (!checkRateLimit(getClientIP(request))) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    await sql`
      INSERT INTO waitlist (email, created_at)
      VALUES (${email.toLowerCase()}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
