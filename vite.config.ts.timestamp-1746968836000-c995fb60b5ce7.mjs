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
      }
    }),
    tempo()
    // Add the tempo plugin
  ],
  optimizeDeps: {
    exclude: ["lucide-react", "jspdf", "framer-motion", "core-js"],
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
    // Polyfill for require to fix core-js issues
    require: '((path) => { throw new Error("Dynamic require of " + path + " is not supported"); })',
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
        inlineDynamicImports: true
        // Inline dynamic imports to reduce requests
      }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7IC8vIEFkZCBUZW1wbyBpbXBvcnRcblxuLy8gQWRkIGNvbmRpdGlvbmFsIHBsdWdpbnMgZm9yIFRlbXBvXG5jb25zdCBjb25kaXRpb25hbFBsdWdpbnMgPSBbXTtcbmlmIChwcm9jZXNzLmVudi5URU1QTyA9PT0gXCJ0cnVlXCIpIHtcbiAgY29uZGl0aW9uYWxQbHVnaW5zLnB1c2goXCJ0ZW1wby1kZXZ0b29scy9kaXN0L2JhYmVsLXBsdWdpblwiKTtcbn1cblxuLy8gU2V0IE5PREVfT1BUSU9OUyBmb3IgbWluaW1hbCBtZW1vcnkgYWxsb2NhdGlvbiB0byBhdm9pZCBidXMgZXJyb3JcbnByb2Nlc3MuZW52Lk5PREVfT1BUSU9OUyA9XG4gIHByb2Nlc3MuZW52Lk5PREVfT1BUSU9OUyB8fCBcIi0tbWF4LW9sZC1zcGFjZS1zaXplPTUxMlwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFsuLi5jb25kaXRpb25hbFBsdWdpbnNdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0ZW1wbygpLCAvLyBBZGQgdGhlIHRlbXBvIHBsdWdpblxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbXCJsdWNpZGUtcmVhY3RcIiwgXCJqc3BkZlwiLCBcImZyYW1lci1tb3Rpb25cIiwgXCJjb3JlLWpzXCJdLCAvLyBFeGNsdWRlIHByb2JsZW1hdGljIHBhY2thZ2VzXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIHRhcmdldDogXCJlczIwMjBcIiwgLy8gVXNlIGEgbW9yZSBjb21wYXRpYmxlIHRhcmdldFxuICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCIsIC8vIFJlbW92ZSBjb21tZW50cyB0byByZWR1Y2Ugc2l6ZVxuICAgICAgbWluaWZ5OiB0cnVlLCAvLyBNaW5pZnkgZHVyaW5nIG9wdGltaXphdGlvblxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIC8vIFBvbHlmaWxsIGZvciByZXF1aXJlIHRvIGZpeCBjb3JlLWpzIGlzc3Vlc1xuICAgIHJlcXVpcmU6XG4gICAgICAnKChwYXRoKSA9PiB7IHRocm93IG5ldyBFcnJvcihcIkR5bmFtaWMgcmVxdWlyZSBvZiBcIiArIHBhdGggKyBcIiBpcyBub3Qgc3VwcG9ydGVkXCIpOyB9KScsXG4gICAgZ2xvYmFsOiBcIndpbmRvd1wiLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIEFsaWFzIG1vdGlvbi1kb20gdG8gZnJhbWVyLW1vdGlvbiB0byByZXNvbHZlIGRlcGVuZGVuY3kgaXNzdWVzXG4gICAgICBcIm1vdGlvbi1kb21cIjogXCJmcmFtZXItbW90aW9uXCIsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IGZhbHNlLCAvLyBEaXNhYmxlIHNvdXJjZW1hcHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gSW5jcmVhc2UgY2h1bmsgc2l6ZSB3YXJuaW5nIGxpbWl0XG4gICAgbWluaWZ5OiBcImVzYnVpbGRcIiwgLy8gVXNlIGVzYnVpbGQgZm9yIG1pbmlmaWNhdGlvbiAobGVzcyBtZW1vcnkgaW50ZW5zaXZlKVxuICAgIHRhcmdldDogXCJlczIwMThcIiwgLy8gT2xkZXIgdGFyZ2V0IGZvciBiZXR0ZXIgY29tcGF0aWJpbGl0eVxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsIC8vIENvbWJpbmUgQ1NTIGludG8gc2luZ2xlIGZpbGVcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gSW5saW5lIHNtYWxsIGFzc2V0c1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBSZW1vdmVkIG1hbnVhbENodW5rcyBvcHRpb24gYXMgaXQncyBpbmNvbXBhdGlibGUgd2l0aCBpbmxpbmVEeW5hbWljSW1wb3J0c1xuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZSwgLy8gSW5saW5lIGR5bmFtaWMgaW1wb3J0cyB0byByZWR1Y2UgcmVxdWVzdHNcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGFsbG93ZWRIb3N0czogcHJvY2Vzcy5lbnYuVEVNUE8gPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHVuZGVmaW5lZCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLCAvLyBEaXNhYmxlIGVycm9yIG92ZXJsYXkgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IGZhbHNlLCAvLyBEaXNhYmxlIHBvbGxpbmcgdG8gcmVkdWNlIENQVSB1c2FnZVxuICAgIH0sXG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogZmFsc2UsIC8vIExlc3Mgc3RyaWN0IGZpbGUgc3lzdGVtIGNoZWNrc1xuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGFBQWE7QUFHdEIsSUFBTSxxQkFBcUIsQ0FBQztBQUM1QixJQUFJLFFBQVEsSUFBSSxVQUFVLFFBQVE7QUFDaEMscUJBQW1CLEtBQUssa0NBQWtDO0FBQzVEO0FBR0EsUUFBUSxJQUFJLGVBQ1YsUUFBUSxJQUFJLGdCQUFnQjtBQUc5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsR0FBRyxrQkFBa0I7QUFBQSxNQUNqQztBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGdCQUFnQixTQUFTLGlCQUFpQixTQUFTO0FBQUE7QUFBQSxJQUM3RCxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQTtBQUFBLE1BQ1IsZUFBZTtBQUFBO0FBQUEsTUFDZixRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixTQUNFO0FBQUEsSUFDRixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxjQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUE7QUFBQSxJQUNYLHVCQUF1QjtBQUFBO0FBQUEsSUFDdkIsUUFBUTtBQUFBO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQSxJQUNSLGNBQWM7QUFBQTtBQUFBLElBQ2QsbUJBQW1CO0FBQUE7QUFBQSxJQUNuQixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQSxRQUVOLHNCQUFzQjtBQUFBO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixjQUFjLFFBQVEsSUFBSSxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ3BELEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBLElBQ1g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQTtBQUFBLElBQ2Q7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
