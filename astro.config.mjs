import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Astro uses this the URL to generate sitemap and canonical URLs in the final build
  // site: "https://cartmandos.github.io",
  // base: "blog-website",
  site: "https://damienshomrai.com/",

  integrations: [sitemap()],
});