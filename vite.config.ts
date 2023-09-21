import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AnalyticsSDK',
      formats: ['umd'],
      fileName: 'analytics'
    }
  }
});
