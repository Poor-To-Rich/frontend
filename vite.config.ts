import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'fs';

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
    https: useHttps
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
        }
      : undefined,
  },
  ...vitestConfig,
});
