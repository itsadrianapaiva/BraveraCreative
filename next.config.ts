import type { NextConfig } from "next";

// GitHub Pages requires these settings:
const repoName = "BraveraCreative";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Fixes asset paths for GitHub Pages subdirectory hosting
  assetPrefix: isProd ? `/${repoName}/` : "",

  // Disable image optimization (not supported in static exports)
  images: {
    unoptimized: true,
  },

  // Optional: Add Prismic/Supabase env vars if needed client-side
  env: {
    NEXT_PUBLIC_PRISMIC_ENVIRONMENT: process.env.PRISMIC_REPOSITORY_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
