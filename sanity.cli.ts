/**
 * Sanity CLI Configuration
 * Used by `sanity` commands (dataset export, migrations, typegen).
 * The Studio itself is embedded in the Astro site at /admin.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from "sanity/cli";

const projectId = process.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_STUDIO_DATASET;

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
	typegen: {
		path: "./src/**/*.{ts,tsx,astro}",
		schema: "schema.json",
		generates: "./sanity.types.ts",
		overloadClientMethods: true,
	},
});
