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

import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	vite: {
    // @ts-expect-error - vite version mismatch between Astro and Tailwind CSS. Waiting for Astro to use Vite 7
		plugins: [tailwindcss()],
		resolve: {
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			// @ts-expect-error - temporary fix https://github.com/withastro/adapters/pull/436
			alias: import.meta.env.PROD && {
				"react-dom/server": "react-dom/server.edge",
			},
		},
	},
	site: "https://blog.raflimalik.com",
	output: "static",
	adapter: cloudflare(),
	integrations: [
		sanity({
			projectId,
			dataset,
			studioBasePath: "/admin",
			useCdn: false,
			// `false` if you want to ensure fresh data
			apiVersion: "2024-12-27", // Set to date of setup to use the latest API version
		}),
		react(),
		// Required for Sanity Studio
		sitemap({
			filter: (page) => page !== "https://blog.raflimalik.com/admin",
			serialize: (page) => {
				if (page.url == "https://blog.raflimalik.com/") {
					page.changefreq = ChangeFreqEnum.MONTHLY;
					page.priority = 1;
					page.lastmod = new Date().toString();
				} else {
					page.changefreq = ChangeFreqEnum.YEARLY;
					page.priority = 0.8;
					page.lastmod = new Date().toString();
				}
				return page;
			},
		}),
	],
});
