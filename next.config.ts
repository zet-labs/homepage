import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withBotId } from "botid/next/config";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  reactCompiler: true,
  poweredByHeader: false,
  allowedDevOrigins: ["localhost", "elixeum.local"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
} satisfies NextConfig;

export default withBotId(withNextIntl(nextConfig));
