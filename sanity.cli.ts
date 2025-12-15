/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
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
	studioHost: "https://blog.raflimalik.com/admin",
	deployment: {
		autoUpdates: true,
	},
});
