import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tempo } from "tempo-devtools/dist/vite"; // Add Tempo import

// Add conditional plugins for Tempo
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push("tempo-devtools/dist/babel-plugin");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [...conditionalPlugins],
      },
      // Ensure proper JSX runtime
      jsxRuntime: "automatic",
      // Explicitly enable React Refresh
      fastRefresh: true,
    }),
    // Only add tempo plugin when in development with TEMPO env var
    process.env.TEMPO === "true" ? tempo() : null,
  ].filter(Boolean), // Filter out null plugins
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // Include core React packages
    exclude: ["lucide-react", "jspdf", "framer-motion"], // Exclude problematic packages
    esbuildOptions: {
      target: "es2020",
      legalComments: "none",
      minify: true,
    },
  },
  
  define: {
    // Define environment explicitly
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    "global": "window",
  },
  
  resolve: {
    alias: {
      // Alias motion-dom to framer-motion to resolve dependency issues
      "motion-dom": "framer-motion",
    },
  },
  
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    target: "es2018",
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Avoid inlining dynamic imports to prevent refresh issues
        inlineDynamicImports: false,
        // Ensure proper code splitting
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group common packages together
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            return 'vendor';
          }
        }
      },
    },
  },
  
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    hmr: {
      overlay: true, // Re-enable overlay for better debugging
    },
    watch: {
      usePolling: false,
    },
    fs: {
      strict: false,
    },
  },
});