import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: rootDir,
  reactCompiler: true,
  devIndicators: false,
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
