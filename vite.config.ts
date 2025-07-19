import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/postcss';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isCI = process.env.CI === 'true';
const isVercel = process.env.VERCEL_ENV === 'production';

// 로컬 개발환경에서는 https 설정, Vercel 환경에서는 https 설정 안 함
const useHttps = !isCI && !isVercel;

const vitestConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '부자될거지',
        short_name: '부자될거지',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }) as any,
      ],
    },
  },
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
    https: useHttps
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
        }
      : undefined,
  },
  ...vitestConfig,
});
