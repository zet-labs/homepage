export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zetlabs.ai";
export const SITE_EMAIL = "hello@zetlabs.ai";
export const SITE_EMAIL_JOBS = "hello+jobs@zetlabs.ai";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
}
