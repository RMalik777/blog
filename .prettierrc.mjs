// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 2,
	printWidth: 120,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tailwindFunctions: ["clsx", "cn", "cva"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
