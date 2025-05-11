// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { tempo } from "file:///home/project/node_modules/tempo-devtools/dist/vite/index.js";
var conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push("tempo-devtools/dist/babel-plugin");
}
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || "--max-old-space-size=512";
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [...conditionalPlugins]
      },
      // Ensure proper JSX runtime
      jsxRuntime: "automatic"
    }),
    tempo()
    // Add the tempo plugin
  ],
  optimizeDeps: {
    exclude: ["lucide-react", "jspdf", "framer-motion"],
    // Exclude problematic packages
    esbuildOptions: {
      target: "es2020",
      // Use a more compatible target
      legalComments: "none",
      // Remove comments to reduce size
      minify: true
      // Minify during optimization
    }
  },
  define: {
    // Replace dynamic require with a function that throws an error
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Don't use a function for require, use a string that will throw an error
    global: "window"
  },
  resolve: {
    alias: {
      // Alias motion-dom to framer-motion to resolve dependency issues
      "motion-dom": "framer-motion"
    }
  },
  build: {
    sourcemap: false,
    // Disable sourcemaps to reduce memory usage
    chunkSizeWarningLimit: 1e3,
    // Increase chunk size warning limit
    minify: "esbuild",
    // Use esbuild for minification (less memory intensive)
    target: "es2018",
    // Older target for better compatibility
    cssCodeSplit: false,
    // Combine CSS into single file
    assetsInlineLimit: 4096,
    // Inline small assets
    rollupOptions: {
      output: {
        // Removed manualChunks option as it's incompatible with inlineDynamicImports
        inlineDynamicImports: false
        // Changed to false to fix compatibility issues
      },
      // Add external dependencies to avoid bundling issues
      external: []
    }
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : void 0,
    hmr: {
      overlay: false
      // Disable error overlay to reduce memory usage
    },
    watch: {
      usePolling: false
      // Disable polling to reduce CPU usage
    },
    fs: {
      strict: false
      // Less strict file system checks
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7IC8vIEFkZCBUZW1wbyBpbXBvcnRcblxuLy8gQWRkIGNvbmRpdGlvbmFsIHBsdWdpbnMgZm9yIFRlbXBvXG5jb25zdCBjb25kaXRpb25hbFBsdWdpbnMgPSBbXTtcbmlmIChwcm9jZXNzLmVudi5URU1QTyA9PT0gXCJ0cnVlXCIpIHtcbiAgY29uZGl0aW9uYWxQbHVnaW5zLnB1c2goXCJ0ZW1wby1kZXZ0b29scy9kaXN0L2JhYmVsLXBsdWdpblwiKTtcbn1cblxuLy8gU2V0IE5PREVfT1BUSU9OUyBmb3IgbWluaW1hbCBtZW1vcnkgYWxsb2NhdGlvbiB0byBhdm9pZCBidXMgZXJyb3JcbnByb2Nlc3MuZW52Lk5PREVfT1BUSU9OUyA9XG4gIHByb2Nlc3MuZW52Lk5PREVfT1BUSU9OUyB8fCBcIi0tbWF4LW9sZC1zcGFjZS1zaXplPTUxMlwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFsuLi5jb25kaXRpb25hbFBsdWdpbnNdLFxuICAgICAgfSxcbiAgICAgIC8vIEVuc3VyZSBwcm9wZXIgSlNYIHJ1bnRpbWVcbiAgICAgIGpzeFJ1bnRpbWU6IFwiYXV0b21hdGljXCIsXG4gICAgfSksXG4gICAgdGVtcG8oKSwgLy8gQWRkIHRoZSB0ZW1wbyBwbHVnaW5cbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1wibHVjaWRlLXJlYWN0XCIsIFwianNwZGZcIiwgXCJmcmFtZXItbW90aW9uXCJdLCAvLyBFeGNsdWRlIHByb2JsZW1hdGljIHBhY2thZ2VzXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIHRhcmdldDogXCJlczIwMjBcIiwgLy8gVXNlIGEgbW9yZSBjb21wYXRpYmxlIHRhcmdldFxuICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCIsIC8vIFJlbW92ZSBjb21tZW50cyB0byByZWR1Y2Ugc2l6ZVxuICAgICAgbWluaWZ5OiB0cnVlLCAvLyBNaW5pZnkgZHVyaW5nIG9wdGltaXphdGlvblxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIC8vIFJlcGxhY2UgZHluYW1pYyByZXF1aXJlIHdpdGggYSBmdW5jdGlvbiB0aGF0IHRocm93cyBhbiBlcnJvclxuICAgIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogSlNPTi5zdHJpbmdpZnkoXCJwcm9kdWN0aW9uXCIpLFxuICAgIC8vIERvbid0IHVzZSBhIGZ1bmN0aW9uIGZvciByZXF1aXJlLCB1c2UgYSBzdHJpbmcgdGhhdCB3aWxsIHRocm93IGFuIGVycm9yXG4gICAgZ2xvYmFsOiBcIndpbmRvd1wiLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIEFsaWFzIG1vdGlvbi1kb20gdG8gZnJhbWVyLW1vdGlvbiB0byByZXNvbHZlIGRlcGVuZGVuY3kgaXNzdWVzXG4gICAgICBcIm1vdGlvbi1kb21cIjogXCJmcmFtZXItbW90aW9uXCIsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IGZhbHNlLCAvLyBEaXNhYmxlIHNvdXJjZW1hcHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gSW5jcmVhc2UgY2h1bmsgc2l6ZSB3YXJuaW5nIGxpbWl0XG4gICAgbWluaWZ5OiBcImVzYnVpbGRcIiwgLy8gVXNlIGVzYnVpbGQgZm9yIG1pbmlmaWNhdGlvbiAobGVzcyBtZW1vcnkgaW50ZW5zaXZlKVxuICAgIHRhcmdldDogXCJlczIwMThcIiwgLy8gT2xkZXIgdGFyZ2V0IGZvciBiZXR0ZXIgY29tcGF0aWJpbGl0eVxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsIC8vIENvbWJpbmUgQ1NTIGludG8gc2luZ2xlIGZpbGVcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gSW5saW5lIHNtYWxsIGFzc2V0c1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBSZW1vdmVkIG1hbnVhbENodW5rcyBvcHRpb24gYXMgaXQncyBpbmNvbXBhdGlibGUgd2l0aCBpbmxpbmVEeW5hbWljSW1wb3J0c1xuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogZmFsc2UsIC8vIENoYW5nZWQgdG8gZmFsc2UgdG8gZml4IGNvbXBhdGliaWxpdHkgaXNzdWVzXG4gICAgICB9LFxuICAgICAgLy8gQWRkIGV4dGVybmFsIGRlcGVuZGVuY2llcyB0byBhdm9pZCBidW5kbGluZyBpc3N1ZXNcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgYWxsb3dlZEhvc3RzOiBwcm9jZXNzLmVudi5URU1QTyA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogdW5kZWZpbmVkLFxuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogZmFsc2UsIC8vIERpc2FibGUgZXJyb3Igb3ZlcmxheSB0byByZWR1Y2UgbWVtb3J5IHVzYWdlXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogZmFsc2UsIC8vIERpc2FibGUgcG9sbGluZyB0byByZWR1Y2UgQ1BVIHVzYWdlXG4gICAgfSxcbiAgICBmczoge1xuICAgICAgc3RyaWN0OiBmYWxzZSwgLy8gTGVzcyBzdHJpY3QgZmlsZSBzeXN0ZW0gY2hlY2tzXG4gICAgfSxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsYUFBYTtBQUd0QixJQUFNLHFCQUFxQixDQUFDO0FBQzVCLElBQUksUUFBUSxJQUFJLFVBQVUsUUFBUTtBQUNoQyxxQkFBbUIsS0FBSyxrQ0FBa0M7QUFDNUQ7QUFHQSxRQUFRLElBQUksZUFDVixRQUFRLElBQUksZ0JBQWdCO0FBRzlCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyxHQUFHLGtCQUFrQjtBQUFBLE1BQ2pDO0FBQUE7QUFBQSxNQUVBLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxnQkFBZ0IsU0FBUyxlQUFlO0FBQUE7QUFBQSxJQUNsRCxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQTtBQUFBLE1BQ1IsZUFBZTtBQUFBO0FBQUEsTUFDZixRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTix3QkFBd0IsS0FBSyxVQUFVLFlBQVk7QUFBQTtBQUFBLElBRW5ELFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQTtBQUFBLElBQ1gsdUJBQXVCO0FBQUE7QUFBQSxJQUN2QixRQUFRO0FBQUE7QUFBQSxJQUNSLFFBQVE7QUFBQTtBQUFBLElBQ1IsY0FBYztBQUFBO0FBQUEsSUFDZCxtQkFBbUI7QUFBQTtBQUFBLElBQ25CLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQTtBQUFBLFFBRU4sc0JBQXNCO0FBQUE7QUFBQSxNQUN4QjtBQUFBO0FBQUEsTUFFQSxVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixjQUFjLFFBQVEsSUFBSSxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ3BELEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBLElBQ1g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQTtBQUFBLElBQ2Q7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
