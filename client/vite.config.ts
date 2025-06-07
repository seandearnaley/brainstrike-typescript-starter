import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        '**/.vscode/**',
        '**/src/generated/**',
        '**/*.config.ts',
        '**/src/index.tsx',
        '**/src/main.tsx',
        '**/src/vite-env.d.ts',
        '**/src/apollo.ts',
        '**/src/types.ts',
      ],
      all: true,
    },
  },
  define: {
    // Handle process.env for compatibility with CRA
    'process.env': {},
  },
});
