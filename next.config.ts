import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepository = repository.endsWith(".github.io");
const shouldUseBasePath = Boolean(process.env.GITHUB_ACTIONS) && repository.length > 0 && !isUserSiteRepository;
const basePath = shouldUseBasePath ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath
      }
    : {})
};

export default nextConfig;
