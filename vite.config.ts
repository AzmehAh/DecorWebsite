import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Ensure proper JSX runtime
      jsxRuntime: "automatic",
      // Explicitly enable React Refresh
      fastRefresh: true,
    }),
  ],
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // Include core React packages
    exclude: [], // Don't exclude packages to avoid runtime issues
  },
  
  define: {
    // Define environment explicitly
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
  },
  
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    minify: "esbuild",
    target: "es2018",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Ensure proper code splitting
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
        }
      },
      // Add tempo-routes to external to prevent build errors
      external: ['tempo-routes']
    },
  },
  
  server: {
    hmr: {
      overlay: true,
    },
    fs: {
      strict: false,
    },
    proxy: {
      '/api/db': {
        target: 'http://49.13.63.120:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/db/, ''),
        secure: false,
      },
    },
  },
});