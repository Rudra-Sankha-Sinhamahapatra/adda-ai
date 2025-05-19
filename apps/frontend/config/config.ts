export const config = {
  backend: {
    url: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    isProduction: process.env.SKIP_ENV === "production",
  },
  database: {
    url: process.env.DATABASE_URL || "",
    directUrl: process.env.DIRECT_URL || "",
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "",
  },
  supabase: {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
};
