import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { sitemapPlugin } from "@corentints/tanstack-router-sitemap";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
    sitemapPlugin({
      baseUrl: "https://teoselectauto.ro",
      outputPath: "public/sitemap.xml",
      excludeRoutes: ["/admin", "/admin/*", "/auth"],
      defaultChangefreq: "weekly",
      defaultPriority: 0.8,
    }),
  ],
});