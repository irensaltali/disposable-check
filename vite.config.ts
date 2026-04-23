import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from 'vite-plugin-sitemap';
import { blogSitemapRoutes } from "./src/content/blogPosts";
import { glossarySitemapRoutes } from "./src/content/glossaryTerms";
import { comparisonSitemapRoutes } from "./src/content/comparisons";
import { useCaseSitemapRoutes } from "./src/content/useCases";

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
      hostname: 'https://disposablecheck.irensaltali.com/',
      dynamicRoutes: [
        '/bulk',
        '/report',
        '/docs',
        '/get-api-key',
        '/terms',
        '/the-disposable-email-epidemic',
        '/value-proposition',
        ...blogSitemapRoutes,
        ...glossarySitemapRoutes,
        ...comparisonSitemapRoutes,
        ...useCaseSitemapRoutes,
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("plotly.js") || id.includes("react-plotly")) return "plotly";
            if (id.includes("chart.js") || id.includes("react-chartjs-2") || id.includes("chartjs-plugin")) return "chartjs";
            if (id.includes("recharts") || id.includes("d3-")) return "recharts";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("react-router") || id.includes("@remix-run")) return "router";
            if (id.includes("react-dom") || id.includes("scheduler")) return "react-dom";
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
}));
