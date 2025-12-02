// .prettierrc.mjs
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
	useTabs: true,
	tabWidth: 2,
	printWidth: 120,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tailwindFunctions: ["clsx", "cn", "cva"],
	tailwindStylesheet: "./src/styles/global.css",
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
