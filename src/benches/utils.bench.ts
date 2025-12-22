import { bench } from "vitest";
import { formatDate } from "../utils";

// Benchmark for formatDate utility
bench("formatDate: format ISO date string", () => {
	formatDate("2024-12-22T10:30:00Z");
});

bench("formatDate: format date with various timestamps", () => {
	const dates = ["2024-01-15T08:00:00Z", "2023-06-30T15:45:00Z", "2025-12-31T23:59:59Z"];
	dates.forEach((date) => formatDate(date));
});
