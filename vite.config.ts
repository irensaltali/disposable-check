import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from 'vite-plugin-sitemap';
import { blogSitemapRoutes } from "./src/content/blogPosts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: 'https://disposablecheck.com',
      dynamicRoutes: [
        '/bulk',
        '/report',
        '/docs',
        '/get-api-key',
        '/terms',
        '/the-disposable-email-epidemic',
        '/value-proposition',
        ...blogSitemapRoutes,
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
