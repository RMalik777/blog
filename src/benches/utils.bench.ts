import { bench } from "vitest";
import { cn } from "../lib/utils";

// Benchmark for cn (classname utility)
bench("cn: merge single class", () => {
	cn("text-red-500");
});

bench("cn: merge multiple classes", () => {
	cn("text-red-500", "bg-blue-200", "p-4", "rounded-lg");
});

bench("cn: merge with conditionals", () => {
	cn("base-class", true && "conditional-class", false && "hidden-class", "final-class");
});

bench("cn: merge with object conditionals", () => {
	cn("base", {
		active: true,
		disabled: false,
		"text-xl": true,
		"text-sm": false,
	});
});

// Benchmark complex class merging scenarios
bench("cn: complex tailwind class merging", () => {
	cn("bg-blue-500 px-4 py-2 hover:bg-blue-600", "rounded font-bold text-white", "transition-colors duration-200");
});
