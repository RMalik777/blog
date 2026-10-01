// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
import { defineConfig, fontProviders } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const {
	PUBLIC_SANITY_STUDIO_PROJECT_ID,
	PUBLIC_SANITY_STUDIO_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
} = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

// @sanity/astro 3.5.1's dev-only module dedupe strips "/package.json" with a forward-slash regex,
// so on Windows it aliases `sanity` to its package.json and the Studio fails to load in `astro dev`.
// pnpm installs a single copy of `sanity`, so dedupe isn't needed here.
if (process.platform === "win32") process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE ??= "1";

const site = "https://blog.raflimalik.com";

// https://astro.build/config
export default defineConfig({
	site,
	output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		locales: ["en", "id"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Newsreader",
			cssVariable: "--font-newsreader",
			weights: ["200 800"],
			styles: ["normal", "italic"],
			fallbacks: ["Georgia", "serif"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Geist",
			cssVariable: "--font-geist",
			weights: ["100 900"],
			styles: ["normal"],
			fallbacks: ["system-ui", "sans-serif"],
		},
	],
	integrations: [
		sanity({
			projectId,
			dataset,
			studioBasePath: "/admin",
			// Static build: always fetch fresh content at build time
			useCdn: false,
			apiVersion: "2026-09-30",
		}),
		// Required for Sanity Studio
		react(),
		sitemap({
			filter: (page) => !page.startsWith(`${site}/admin`),
			i18n: {
				defaultLocale: "en",
				locales: { en: "en", id: "id" },
			},
		}),
	],
});
