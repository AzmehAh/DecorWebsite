import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  
  // Ensure routes work correctly
  base: "/",
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    minify: "esbuild",
    target: "es2018",
    cssCodeSplit: true,
    outDir: "dist",
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
        }
      }
    },
  },
  
  server: {
    hmr: true,
    host: true
  },
  
  preview: {
    port: 3000,
    host: true
  }
});