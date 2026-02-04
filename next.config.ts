import type { NextConfig } from "next";
import path from "path";

const appRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  basePath: "/compare-quotes",
  env: { NEXT_PUBLIC_BASE_PATH: "/compare-quotes" },
  // Use Frontend as project root so tailwindcss/postcss resolve from Frontend/node_modules
  // (avoids resolving from repo root or home dir when lockfiles exist elsewhere)
  turbopack: {
    root: appRoot,
  },
  // Same for webpack when using --webpack
  webpack: (config) => {
    config.context = appRoot;
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      path.join(appRoot, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : []),
    ];
    config.resolveLoader = config.resolveLoader ?? {};
    config.resolveLoader.modules = [
      path.join(appRoot, "node_modules"),
      ...(Array.isArray(config.resolveLoader.modules) ? config.resolveLoader.modules : []),
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
