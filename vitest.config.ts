import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup/setupTests.ts'],
    include: ['./src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/test/**', '**/*.{test,spec}.{ts,tsx}'],
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components'),
      pages: resolve(__dirname, 'src/pages'),
      services: resolve(__dirname, 'src/services'),
      utils: resolve(__dirname, 'src/utils'),
      __tests__: resolve(__dirname, 'src/__tests__'),
    },
  },
});
