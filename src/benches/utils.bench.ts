import { bench } from "vitest";
import { formatDate } from "../utils";
import { cn } from "../lib/utils";

// Benchmark for formatDate utility
bench("formatDate: format ISO date string", () => {
	formatDate("2024-12-22T10:30:00Z");
});

bench("formatDate: format date with various timestamps", () => {
	const dates = ["2024-01-15T08:00:00Z", "2023-06-30T15:45:00Z", "2025-12-31T23:59:59Z"];
	dates.forEach((date) => formatDate(date));
});

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
