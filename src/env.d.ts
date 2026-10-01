/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface Window {
	/** Defined inline in Layout.astro so the theme applies before first paint */
	applyTheme?: (pref: "light" | "dark" | "system") => void;
}
