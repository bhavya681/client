// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['mongoose'], // Exclude mongoose from being bundled
    },
  },
});
