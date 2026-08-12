import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    // Avoid child-process workers in constrained CI/desktop environments.
    workerThreads: true,
    cpus: 1,
  },
  // `npm run build` runs tsc explicitly before Next to keep CI validation
  // visible while avoiding Next's extra type-check worker process.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
