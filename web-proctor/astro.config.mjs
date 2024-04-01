import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), tailwind(), db()],
  vite: {
		optimizeDeps: {
			exclude: ["oslo"]
		}
	},
});