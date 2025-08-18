// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import showTailwindcssBreakpoint from "astro-show-tailwindcss-breakpoint";

// https://astro.build/config
export default defineConfig({
  site: "https://peridottherapy.com",
  integrations: [sitemap(), showTailwindcssBreakpoint()],

  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
