import { defineConfig } from "vitest/config";
import codspeedPlugin from "@codspeed/vitest-plugin";

export default defineConfig({
	plugins: [codspeedPlugin()],
	test: {
		benchmark: {
			// Optional: Configure benchmark options
			include: ["**/*.bench.ts"],
		},
	},
});
