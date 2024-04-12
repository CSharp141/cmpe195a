import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
	mode: "standalone"
  }),
  integrations: [svelte(), tailwind(), db()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
});