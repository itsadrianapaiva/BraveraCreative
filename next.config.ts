import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },

  // Optional: Add Prismic/Supabase env vars if needed client-side
  env: {
    NEXT_PUBLIC_PRISMIC_ENVIRONMENT: process.env.PRISMIC_REPOSITORY_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
