import eslintPluginAstro from "eslint-plugin-astro";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettierPlugin from "eslint-config-prettier";

export default [
	js.configs.recommended,
	...ts.configs.strict,
	...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
	prettierPlugin,
	{
		ignores: ["node_modules", "*.mjs"],
	},
];
