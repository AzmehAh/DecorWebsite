import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tempo } from "tempo-devtools/dist/vite"; // Add Tempo import

// Add conditional plugins for Tempo
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push("tempo-devtools/dist/babel-plugin");
}

// Set NODE_OPTIONS for minimal memory allocation to avoid bus error
process.env.NODE_OPTIONS =
  process.env.NODE_OPTIONS || "--max-old-space-size=512";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [...conditionalPlugins],
      },
    }),
    tempo(), // Add the tempo plugin
  ],
  optimizeDeps: {
    exclude: ["lucide-react", "jspdf", "framer-motion", "core-js"], // Exclude problematic packages
    esbuildOptions: {
      target: "es2020", // Use a more compatible target
      legalComments: "none", // Remove comments to reduce size
      minify: true, // Minify during optimization
    },
  },
  define: {
    // Polyfill for require to fix core-js issues
    require:
      '((path) => { throw new Error("Dynamic require of " + path + " is not supported"); })',
    global: "window",
  },
  resolve: {
    alias: {
      // Alias motion-dom to framer-motion to resolve dependency issues
      "motion-dom": "framer-motion",
    },
  },
  build: {
    sourcemap: false, // Disable sourcemaps to reduce memory usage
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    minify: "esbuild", // Use esbuild for minification (less memory intensive)
    target: "es2018", // Older target for better compatibility
    cssCodeSplit: false, // Combine CSS into single file
    assetsInlineLimit: 4096, // Inline small assets
    rollupOptions: {
      output: {
        // Removed manualChunks option as it's incompatible with inlineDynamicImports
        inlineDynamicImports: true, // Inline dynamic imports to reduce requests
      },
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    hmr: {
      overlay: false, // Disable error overlay to reduce memory usage
    },
    watch: {
      usePolling: false, // Disable polling to reduce CPU usage
    },
    fs: {
      strict: false, // Less strict file system checks
    },
  },
});