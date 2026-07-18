import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone output: required for the Docker build (small runtime image, 512 MiB limit)
  output: "standalone",
};

export default nextConfig;
