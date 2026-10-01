import eslintPluginAstro from "eslint-plugin-astro";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettierPlugin from "eslint-config-prettier";

export default [
	{
		ignores: [
			"node_modules",
			"dist",
			".astro",
			".wrangler",
			".agents",
			".claude",
			".playwright-mcp",
			"backups",
			"sanity.types.ts",
			"*.mjs",
		],
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
	prettierPlugin,
	{
		// Astro's generated type references must use triple-slash directives
		files: ["src/env.d.ts"],
		rules: {
			"@typescript-eslint/triple-slash-reference": "off",
		},
	},
];
