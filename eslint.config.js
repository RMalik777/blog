import eslintPluginAstro from "eslint-plugin-astro";
import jsPlugin from "@eslint/js";
import prettierPlugin from "eslint-config-prettier";

export default [
	jsPlugin.configs.recommended,
	...eslintPluginAstro.configs["jsx-a11y-recommended"],
	prettierPlugin,
	{
		ignores: ["node_modules", "*.mjs"],
	},
];
