// Different environments use different variables
const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || process.env.PUBLIC_SANITY_STUDIO_PROJECT_ID!;
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || process.env.PUBLIC_SANITY_STUDIO_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
	throw new Error(
		`Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
			import.meta.env,
			null,
			2,
		)}`,
	);
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./schema";

export default defineConfig({
	name: "project-name",
	title: "Project Name",
	projectId,
	dataset,
	plugins: [
		structureTool(),
		visionTool(),
		documentInternationalization({
			supportedLanguages: [
				{ id: "en", title: "English" },
				{ id: "id", title: "Indonesian" },
			],
			schemaTypes: ["post"],
			apiVersion: "2024-08-16",
		}),
	],
	schema: {
		types: schemaTypes,
	},
});
