// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.raflimalik.com",
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "hybrid",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath: "/admin",
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2024-07-29", // Set to date of setup to use the latest API version
    }),
    react(),
    // Required for Sanity Studio
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => page !== "https://blog.raflimalik.com/admin",
      serialize: (page) => {
        if (page.url == "https://blog.raflimalik.com/") {
          page.changefreq = "weekly";
          page.priority = 1;
          page.lastmod = new Date();
        } else {
          page.changefreq = "monthly";
          page.priority = 0.8;
          page.lastmod = new Date();
        }
        return page;
      },
    }),
  ],
});
