// vite.config.js
import { defineConfig } from 'vite';
import externalImport from 'vite-plugin-external-import';

export default defineConfig({
  plugins: [
    externalImport({
      // Exclude mongoose from being processed by Vite
      exclude: ['mongoose'],
    }),
  ],
});
