import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    https: process.env.VERCEL
      ? undefined
      : {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
        },
  },
});
